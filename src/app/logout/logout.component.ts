import {Component, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {UserRegistrationService} from "../../service/user-registration.service";
import {UserLoginService} from "../../service/user-login.service";
import {LoggedInCallback} from "../../service/cognito.service";

@Component({
    selector: 'awscognito-angular2-app',
    template: ''
})
export class LogoutComponent implements LoggedInCallback {

    constructor(public router: Router,
                public userService: UserLoginService) {
        this.userService.isAuthenticated(this)
    }

    isLoggedIn(message: string, isLoggedIn: boolean) {
        if (isLoggedIn) {
            this.userService.logout();
            console.log(isLoggedIn, 'getting is log out');
            this.router.navigate(['/home']);
        }

        this.router.navigate(['/home']);
    }
}