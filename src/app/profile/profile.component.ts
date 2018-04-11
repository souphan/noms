import { Component, OnInit } from '@angular/core';
import {Callback, LoggedInCallback, CognitoUtil} from "service/cognito.service";
import { Router } from "@angular/router";
import {environment} from "environments/environment";
import {Injectable} from "@angular/core";
import {UserLoginService} from "../../service/user-login.service";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PrivacyPolicyComponent } from '../privacy-policy/privacy-policy.component';
import {UserParametersService} from "../../service/user-parameters.service";
import * as _ from 'lodash';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, LoggedInCallback {
  public currentUser: any;
  public parameters: Array<Parameters> = [];
  public cognitoId: String;
  public firstName: String;
  public lastName: String;
  public email: String;
  public locale: String;

  constructor(public userService: UserLoginService,
    public router: Router,
    public userParams: UserParametersService,
    public dialog: MatDialog, 
    public cognitoUtil: CognitoUtil) {
  }

  public isLoggedIn(message: string, isLoggedIn: boolean) {
    if (!isLoggedIn) {
        this.router.navigate(['/home']);
    } else {
      this.userParams.getParameters(new GetParametersCallback(this, this.cognitoUtil));
    }
  }

  ngOnInit() {
    this.userService.isAuthenticated(this);
    this.currentUser = this.userService.currentUser.signInUserSession.idToken.payload;
  }

  public openDialog(index): void {  
    let dialogRef = this.dialog.open(PrivacyPolicyComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("getting closed");
    });
  }

}

export class Parameters {
  name: string;
  value: string;
}

export class GetParametersCallback implements Callback {

  constructor(public me: ProfileComponent, public cognitoUtil: CognitoUtil) {

  }

  callback() {

  }

  callbackWithParam(result: any) {

      for (let i = 0; i < result.length; i++) {
          let parameter = new Parameters();
          parameter.name = result[i].getName();
          parameter.value = result[i].getValue();
          this.me.parameters.push(parameter);
      }
      let param = new Parameters()
      param.name = "cognito ID";
      param.value = this.cognitoUtil.getCognitoIdentity();
      this.me.parameters.push(param)

      for (let param of this.me.parameters) {
        if (param.name === 'given_name') {
          this.me.firstName = param.value
        }
        if (param.name === 'family_name') {
          this.me.lastName = param.value
        }
        if (param.name === 'email') {
          this.me.email = param.value
        }
    }
  }
}
