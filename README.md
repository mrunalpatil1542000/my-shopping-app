Shopping list project is using Firebase as backend for database and authentication.
1. Creating database in firebase...(For initial use without authentication)
    Go to firebase website. Sign-in with google account. Go to console. Create new database and use that database url for http requests.

2. For authentication...
    Go to realtime database. Change the database rules accordingly. Then to set up authentication method, go in authentication tab. click on Get started. Select the       method and save.
 
 Now we are using firebase's authentication. In users we can see logged in users.
 
 We will use firebase's dedicated auth api. This firebase's api provide us the readymade endpoints to signup and login user instead of building our own.
 To get the endpoints https://firebase.google.com/docs/reference/rest/auth 
 Use the url for post method in our client(Angular) code with API key. API key is present in settings -> project settings -> Web api key in firebase.



# MyShoppingApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.0.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
