import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PasswordComponent } from '../password/password.component';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import { Router } from "@angular/router";
import { UserLoginService } from "../../service/user-login.service";
import { CognitoCallback } from "../../service/cognito.service";
import { DynamoDBService } from "../../service/ddb.service";
import { CompanyService } from "../services/company.service";
import { DatabaseService } from "../services/database.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers:[DatabaseService]
})
export class LoginComponent implements CognitoCallback, OnInit {
    public email: string;
    public password: string;
    public errorMessage: string;
    public value = '';
    public userIsLoggedIn: boolean;
    private currentUser: any;
    

    constructor(public router: Router,
        private database: DatabaseService,
        public ddb: DynamoDBService,
        public userService: UserLoginService,
        public companyService: CompanyService,
        public dialog: MatDialog,
        public dialogRef: MatDialogRef<LoginComponent>
            ) {
        console.log("LoginComponent constructor");
    }

    public update(value: string) { 
        this.value = value; 
    }

    public ngOnInit() {
        this.errorMessage = null;
        console.log("Checking if the user is already authenticated. If so, then redirect to the secure site");
    }

    public onLogin() {
        if (this.email == null || this.password == null) {
            this.errorMessage = "All fields are required";
            return;
        }
        this.errorMessage = null;
        this.userService.authenticate(this.email.toLocaleLowerCase(), this.password, this);
    }

   public cognitoCallback(message: string, result: any) {
        if (message != null) { //error
            this.errorMessage = message;
            console.log("result: " + this.errorMessage);
            if (this.errorMessage === 'User is not confirmed.') {
                console.log("redirecting");
                // this.router.navigate(['/confirmRegistration', this.email]);
            } else if (this.errorMessage === 'User needs to set password.') {
                console.log("redirecting to set new password");
                // this.router.navigate(['/password'])
                this.openDialogSetPassword();
            }
        } else { //success
            // this.ddb.writeLogEntry("login");
            this.currentUser = this.userService.currentUser;
            this.userIsLoggedIn = true;
            this.companyService.retrieveCompanyInfo(this.currentUser.signInUserSession.idToken.payload['custom:company']);
            this.closeDialog();
        }
    }

    public openDialogSetPassword(): void {
        let dialogRefResetPassword = this.dialog.open(PasswordComponent, {
            width: '250px'
        });

        dialogRefResetPassword.afterClosed().subscribe(result => {
            this.userIsLoggedIn = result;
            this.closeDialog();
        });
    }

    public openDialogResetPassword(): void {
        let dialogRefResetPassword = this.dialog.open(ResetPasswordComponent, {
            width: '250px'
        });

        dialogRefResetPassword.afterClosed().subscribe(result => {
            if (result) {
                this.userIsLoggedIn = result;
                this.closeDialog();
            }
            
        });
        
    }

    public closeDialog(): void {
        this.dialogRef.close(this.userIsLoggedIn);
    }

}
