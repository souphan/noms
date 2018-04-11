import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { MatDialogRef } from '@angular/material';
import {MatDialogModule} from '@angular/material/dialog';
import { UserRegistrationService } from "../../service/user-registration.service";
import { UserLoginService } from "../../service/user-login.service";
import { CognitoCallback } from "../../service/cognito.service";
import { DatabaseService } from "../services/database.service";
import { Observable } from "rxjs";
import { CompanyService } from "../services/company.service";

export class NewPasswordUser {
    username: string;
    firstName: string;
    lastName: string;
    existingPassword: string;
    password: string;
    company: string;
}

export class RegistrationUser {
    name: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    company: string;
}

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
  providers:[DatabaseService]
})

export class PasswordComponent implements CognitoCallback {
    registrationUser: NewPasswordUser;
    router: Router;
    errorMessage: string;
    public userIsLoggedIn: boolean;
    public selectedValue: string;
    private currentUser: any;

    constructor(public userRegistration: UserRegistrationService, 
        public database: DatabaseService,
        public userService: UserLoginService,
        public dialogRef: MatDialogRef<PasswordComponent>,
        public companyService: CompanyService,
        router: Router) {
        this.router = router;
        this.onInit();
        this.currentUser = this.userService.currentUser;
    }

    onInit() {
        this.registrationUser = new NewPasswordUser();
        this.errorMessage = null;
    }

    ngOnInit() {
        this.errorMessage = null;
        console.log("Checking if the user is already authenticated. If so, then redirect to the secure site");
        this.userService.isAuthenticated(this);
    }

    onRegister() {
        this.errorMessage = null;
        this.registrationUser.company.replace(/[.,'\s]/g, '').toLowerCase();
        this.userRegistration.newPassword(this.registrationUser, this);
    }

    cognitoCallback(message: string, result: any) {
        if (message != null) { //error
            this.errorMessage = message;
            console.log("result: " + this.errorMessage);
        } else { //success
            //move to the next step
            console.log("redirecting callback cogn");
            this.companyService.retrieveCompanyInfo(this.registrationUser.company,)
            this.postCompany();
            this.userIsLoggedIn = true;
            this.closeDialog();
            // this.router.navigate(['/newpassword']);
        }
    }

    isLoggedIn(message: string, isLoggedIn: boolean) {
        if (isLoggedIn) {
            console.log("redirecting is loggedin");
            this.router.navigate(['/restaurants']);
        }
    }

    public closeDialog(): void {
        this.dialogRef.close(this.userIsLoggedIn);
    }

    public async postCompany() {
        await this.postCompanyRegisteredEmployees(this.registrationUser.username, 
            this.registrationUser.company, this.currentUser.username);
    }

    public postCompanyRegisteredEmployees(email, companyName, sub) {
        
        let Item = {
          "email": email,
          "companyName": companyName,
          "userId": sub
        }
    
        this.database.postCompanyRegisteredEmployees(Item).subscribe(
          data => {
            return true;
          },
          error => {
            console.error("Error updating item");
            return Observable.throw(error);
          }
        );
      }

}
