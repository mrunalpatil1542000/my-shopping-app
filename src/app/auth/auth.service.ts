import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';

import { User } from './user.model';

export interface AuthResponseData {                   //declaring the fields that we get in response of login and sign-up as interface and giving this interface to http methods as return type
  kind: string;    
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;                              //this field we will only get in login so declared as optional.
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User>(null);            //BehaviorSubject is one type of subject. A BehaviorSubject holds one value. When it is subscribed it emits the value immediately. A Subject doesn't hold a value.
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(                        //specifying the response (AuthResponseData interface) we get in post method
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key= firebase auth key',
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      )
      .pipe(                                           
        catchError(this.handleError),                       //catchError operator is used to catch errors from the response
        tap(resData => {                                    //we can use switch case in ts file on specified error msgs given in firebase endpoints page but this is good approach
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key= firebase auth key',
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      )
      .pipe(
        catchError(this.handleError),                        //Created private method handleError to handle both login and sign-up errors
        tap(resData => {
          this.handleAuthentication(                         //Created private method handleAuthentication to create user for both login and sign-up methods
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  autoLogin() {                                           //as after refresh data went, we use this method to get the already logged in user and its data
    const userData: {
      email: string;                                      //specifying which type of data we will get
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));      //getting user data from browser using "userData" key and parse it in js object as it is in string
    if (!userData) {                                       //user data present or not (user signed-in or not)
      return;
    }

    const loadedUser = new User(                           //creating user with loaded data if user data is present
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)               //converting date to Date format as its in string
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(                                   //creating new user for login and sign-up
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));      //If we refresh the page the user data will vanished, so we use browser's local storage
  }                                                              //data is in js object so converting it in string using stringify method

  private handleError(errorRes: HttpErrorResponse) {              //this code is same for login and sign-up method.
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {              //For network error (does not return error key)
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }
    return throwError(errorMessage);                              //throwError is used to wrap the error into observable. here we are returning error observable which has error message
  }
}
