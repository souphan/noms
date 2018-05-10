import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { ReservedTodayDialogComponent } from '../reserved-today-dialog/reserved-today-dialog.component';
import { DatabaseService } from "../services/database.service";
import { Observable } from "rxjs";
import { UserLoginService } from "../../service/user-login.service";
import { environment } from "environments/environment";
import { Injectable } from "@angular/core";
import { AuthenticationDetails } from "amazon-cognito-identity-js";
import { UUID } from 'angular2-uuid';
import { Router } from "@angular/router";
import { TimeService } from "../services/time.service";
import { ReservationClosedComponent } from '../reservation-closed/reservation-closed.component';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  providers:[DatabaseService, TimeService]
})
export class DetailsComponent implements OnInit {
  public restaurants: any;
  public isInvalid: boolean;
  private index: any;
  private foodIsReserved: boolean;
  private reservedToday: any;
  private isReservationOpen: boolean;
  private companyFromStorage: any;
  private error: any;
  private currentUser: any;
  private uuid = UUID.UUID();

  // Creating a Array of Objects for time button.
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

  /**
   * When components gets created we want to check the dialog data we are getting from restaurants
   * This gives us the index, and if hours are closed we will disable the buttons
   */
  constructor(public dialog: MatDialog,
    public dialogRef: MatDialogRef<DetailsComponent>,
    public dialogRefReserved: MatDialogRef<ReservedTodayDialogComponent>,
    public database: DatabaseService,
    private time: TimeService,
    public userService: UserLoginService,
    public router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.isReservationOpen = data.closed;
      this.restaurants = data.restaurants;
      this.index = data.index;
      if(!data.closed){
        for (const t in this.times) {
            this.times[t].clicked = true;
            // loop and disable all buttons.
        }
      }
    }

  public closeDialog(): void {
    this.dialogRef.close();
  }

  /**
   * Submit button for selecting your order. We call the postReservation method that calls a post API.
   * We also open a openConfirmationDialog for notification. You will also get a reservedToday dialog if
   * the reservation have already been made.
   */
  public submit(): void {
    this.getReservedTodayStatus();

    setTimeout(() => {
      if (this.reservedToday) {
        this.dialogRef.close(
          this.restaurants
        );
        this.openReservedTodayDialog();
      } else {
        this.postReservation(this.restaurants.foodSelected,
          this.restaurants.nameSelected, 
          this.restaurants.timeSelected,
          this.restaurants.imageSelected
        );
  
        this.updateReservedTodayStatus();
  
        this.dialogRef.close(
          this.restaurants
        );
  
        this.openConfirmationDialog(this.restaurants);
        
      }
    }, 350);
  }

  /**
   * Opens the dialog with the selected food you submitted
   * @param {restaurant} restaurant Restaurant object
   */
  public openConfirmationDialog(restaurant): void {
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: { 
        food: this.restaurants.foodSelected,
        time: this.restaurants.timeSelected,
        name: this.restaurants.nameSelected,
        image: this.restaurants.imageSelected
      }
    });
  }

  // Opens ReservedTodayDialogComponent
  public openReservedTodayDialog(): void {
    let dialogRefReserved = this.dialog.open(ReservedTodayDialogComponent, {
      width: '250px'
    });
  }

  /**
   * On initialization we want to set some things, and check for reservation hours.
   */
  public ngOnInit() {
    this.reservedToday = false;
    this.isInvalid = true;
    this.companyFromStorage = JSON.parse(sessionStorage.getItem('currentCompany'));
    this.currentUser = this.userService.currentUser;
    this.retrieveReservedTodayStatus();
    this.checkIsReservationOpen(this.isReservationOpen);
  }

  /**
   * API method to do a HTTP Post of your selected food.
   * @param {string} food selected food
   * @param {string} name selected food
   * @param {string} time selected food
   * @param {string} image selected food
   */
  public postReservation(food, name, time, image) {

    let date = new Date();

    let Item = {
      "reservationId": this.uuid,
      "userId": this.currentUser.username,
      "companyName": this.currentUser.signInUserSession.idToken.payload['custom:company'],
      "restaurantName": name,
      "restaurantChosenMeal": food,
      "restaurantImage": image, //S3 bucket image
      "userFirstName": this.currentUser.signInUserSession.idToken.payload.given_name,
      "userLastName": this.currentUser.signInUserSession.idToken.payload.family_name,
      "chosenTimeLocal": time.time.toLowerCase(),
      "chosenTimeIso": date.toISOString().split('.')[0]+"Z"
    }

    this.database.postReservation(Item).subscribe(
      data => {
        return true;
      },
      error => {
        console.error("Error updating item");
        return Observable.throw(error);
      }
    );
  }

  /**
   * API HTTP Update call that updates the reservedToday status
   */
  public updateReservedTodayStatus() {
    // We need company name for this api call
    let Item = {
      "userId": this.currentUser.username,
      "companyName": this.companyFromStorage['companyName']
    }

    this.database.updateReservedTodayStatus(Item).subscribe(
      data => {
        return true;
      },
      error => this.error = error // error path
    );
  }

  /**
   * API Get call to check for reservation status. If reserved Boolean true, then disable all buttons
   */
  public getReservedTodayStatus() {
    let Item = {
      "userId": this.currentUser.username,
      "companyName": this.companyFromStorage['companyName']
    }
    this.database.getReservedTodayStatus(Item)
    .subscribe(
      data => {
        this.reservedToday = data;
        if (this.reservedToday === true) {
          for (const t in this.times) {
              this.times[t].clicked = true;
              // loop and disable all buttons.
          }
        }
      },
      error => this.error = error // error path
    )
  }

  /**
   * Open dialog openDialogReservationClosed if reservation hours are closed.
   */
  public checkIsReservationOpen(isReservationOpen:boolean) {
    if(!isReservationOpen) {
      this.openDialogReservationClosed()
    }
  }

  /**
   * Opens ReservationClosedComponent dialog
   */
  public openDialogReservationClosed(): void {  
    let dialogRef = this.dialog.open(ReservationClosedComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(this.restaurants, "getting closed");
    });
  }

  public async retrieveReservedTodayStatus() {
    await this.getReservedTodayStatus();
  }


  /**
   * Disable buttons if one button is clicked. Enable buttons if the clicked button is reclicked.
   */
  private timeSelected(time, name, food, image) {
    // When button is clicked it should mark the other buttons as disabled.
    // When no button is clicked then all buttons are clickable.
    // maybe add a property for a check in is button clicked?
    if (time.clicked === false && time.disabled === false){
      time.clicked = false;
      time.disabled = true;
      this.isInvalid = false;
      this.restaurants.timeSelected = time;
      this.restaurants.foodSelected = food;
      this.restaurants.nameSelected = name;
      this.restaurants.imageSelected = image;

      this.buttonClickedTrue(time);
    } else {
      time.clicked = false;
      time.disabled = false;
      this.isInvalid = true;
      this.buttonClickedFalse(time);
    }
  }

  /**
   * Disable buttons if one button is clicked.
   */
  private buttonClickedTrue(time) {
    for (const t in this.times) {
      if (this.times.hasOwnProperty(t)) {
        if (time.time !== this.times[t].time) {
          this.times[t].clicked = true;
        }
      }
    }
  }

  /**
   * Enable buttons if clicked is false.
   */
  private buttonClickedFalse(time) {
    for (const t in this.times) {
      if (this.times.hasOwnProperty(t)) {
        if (time.time !== this.times[t].time) {
          this.times[t].clicked = false;
        }
      }
    }
  }

}
