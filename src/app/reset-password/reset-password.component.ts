import { Component, OnInit, OnDestroy, Inject } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserRegistrationService } from "../../service/user-registration.service";
import { UserLoginService } from "../../service/user-login.service";
import { CognitoCallback } from "../../service/cognito.service";
import { ResetPasswordTwoComponent } from '../reset-password-two/reset-password-two.component';

export class NewPasswordUser {
    // username: string;
    firstName: string;
    lastName: string;
    // existingPassword: string;
    password: string;
}

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements CognitoCallback{
    public userIsLoggedIn: boolean;

  registrationUser: NewPasswordUser;
    router: Router;
    email: string;
    errorMessage: string;

    constructor(public userRegistration: UserRegistrationService,
      public dialog: MatDialog,
      public userService: UserLoginService, 
      router: Router,
      public dialogRef: MatDialogRef<ResetPasswordComponent>) {
      this.router = router;
    }
    onNext() {
        this.errorMessage = null;
        this.userService.forgotPassword(this.email, this);
    }

    cognitoCallback(message: string, result: any) {
        if (message == null && result == null) { //error
            this.openDialogResetPassword();
        } else { //success
            this.errorMessage = message;
        }
    }

    public openDialogResetPassword(): void {
        // this.closeDialog();
        // setTimeout(() => {
        //     let dialogRefResetPassword = this.dialog.open(ResetPasswordTwoComponent, {
        //         width: '250px',
        //         data: { 
        //             email: this.email
        //         }
        //     });
        
        //     dialogRefResetPassword.afterClosed().subscribe(result => {
        //         this.userIsLoggedIn = result;
        //         this.closeDialog();
        //     });
        // }, 1000);
        let dialogRefResetPassword = this.dialog.open(ResetPasswordTwoComponent, {
            width: '250px',
            data: { 
                email: this.email
            }
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
