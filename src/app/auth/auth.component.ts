import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService, AuthResponseData } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;                                       //To display loading spinner accordingly
  error: string = null;

  constructor(private authService: AuthService, private router: Router) {}

  onSwitchMode() {                                         //To switch the button label to login or sign up.
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {                                    //For extra checking layer if user change it through browser by hacking.
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;           //as we have same function to do on both login and signup, we declared one observable variable authObs.
                                                        
    this.isLoading = true;

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);   //login will return AuthResponseData interface object as an observable in response
    } else {
      authObs = this.authService.signup(email, password);  //sign-up will return AuthResponseData interface object as an observable in response
    }

    authObs.subscribe(                                     //subscribing the collected observable from login or sign-up.
      resData => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      }
    );

    form.reset();
  }
}
