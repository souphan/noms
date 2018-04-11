import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { DatabaseService } from "../services/database.service";
import { Observable } from "rxjs";
import {CognitoCallback, CognitoUtil, LoggedInCallback} from "service/cognito.service";
import {environment} from "environments/environment";
import {Injectable} from "@angular/core";
import { Router } from "@angular/router";
import {AuthenticationDetails} from "amazon-cognito-identity-js";
import {UserLoginService} from "../../service/user-login.service";
import { ReservationsListResponse } from '../model/ReservationsListResponse';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-past-orders',
  templateUrl: './past-orders.component.html',
  styleUrls: ['./past-orders.component.scss'],
  providers:[DatabaseService]
})
export class PastOrdersComponent implements OnInit, LoggedInCallback {
  public reservations: ReservationsListResponse;
  public showStyle: true;
  private currentUser: any;
  private error: any;
  public isLoading: boolean = false;

  public times = [
    { 
      time: '11:00 AM',
      clicked: false,
      disabled: false
    },
    { 
      time: '11:30 AM',
      clicked: false,
      disabled: false
    },
    { 
      time: '12:00 PM',
      clicked: false,
      disabled: false
    },
    { 
      time: '12:30 PM',
      clicked: false,
      disabled: false
    },
    { 
      time: '1:00 PM',
      clicked: false,
      disabled: false
    },
    { 
      time: '1:30 PM',
      clicked: false,
      disabled: false
    },
  ];

  constructor(private database: DatabaseService, 
    public userService: UserLoginService,
    public router: Router,
    public cognitoUtil: CognitoUtil) {
    this.currentUser = this.userService.currentUser;
  }

  public isLoggedIn(message: string, isLoggedIn: boolean) {
    if (!isLoggedIn) {
        this.router.navigate(['/home']);
    }
  }

  public ngOnInit() {
    this.userService.isAuthenticated(this);
    this.currentUser = this.userService.currentUser;
    this.retrieveReservations();
  }

  public getReservations() {
    this.isLoading = true;
    this.database.getReservations(this.currentUser.username).subscribe( data => {
      this.isLoading = false;
      this.reservations = data 
    });
  }

  public async retrieveReservations() {
    await this.getReservations();
  }

  public getMealOfDay(chosen) {
    let todaysDate = new Date();
    let utcDate = new Date(chosen);
    let todaysDateString = todaysDate.getMonth().toString() + todaysDate.getDate().toString()  + todaysDate.getFullYear().toString();
    let utcDateString = utcDate.getMonth().toString()  + utcDate.getDate().toString()  + utcDate.getFullYear().toString();
    if (todaysDateString === utcDateString) {
      return true;
    }
  }
}