import { Component, OnInit, OnDestroy, Inject } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CognitoCallback } from "../../service/cognito.service";
import { UserRegistrationService } from "../../service/user-registration.service";
import { UserLoginService } from "../../service/user-login.service";

@Component({
  selector: 'app-reset-password-two',
  templateUrl: './reset-password-two.component.html',
  styleUrls: ['./reset-password-two.component.scss'],
})
export class ResetPasswordTwoComponent implements CognitoCallback, OnInit, OnDestroy {

  verificationCode: string;
  email: string;
  password: string;
  errorMessage: string;
  public userIsLoggedIn: boolean;
  private sub: any;

  constructor(public router: Router, public route: ActivatedRoute,
              public userService: UserLoginService,
              public dialogRef: MatDialogRef<ResetPasswordTwoComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
              this.email = data.email;
      console.log("email from the url: " + this.email);
  }

  ngOnInit() {
      // this.sub = this.route.params.subscribe(params => {
      //     this.email = params['email'];

      // });
      this.errorMessage = null;
  }

  ngOnDestroy() {
      // this.sub.unsubscribe();
  }

  onNext() {
      this.errorMessage = null;
      this.userService.confirmNewPassword(this.email, this.verificationCode, this.password, this);
      this.onLogin()
  }

  cognitoCallback(message: string) {
      if (message != null) { //error
          this.errorMessage = message;
          console.log("result: " + this.errorMessage);
      } else { //success
        this.userIsLoggedIn = true;
        this.closeDialog();
        // this.onLogin();
        this.router.navigate(['/restaurants']);
      }
  }

public onLogin() {
    if (this.email == null || this.password == null) {
        this.errorMessage = "All fields are required";
        return;
    }
    this.errorMessage = null;
    this.userService.authenticate(this.email, this.password, this);
}

  public closeDialog(): void {
    this.dialogRef.close(this.userIsLoggedIn);
  }

}
