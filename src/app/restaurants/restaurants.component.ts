import { Component, OnInit, EventEmitter, Input} from '@angular/core';
import { DatabaseService } from "../services/database.service";
import { TimeService } from "../services/time.service";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DetailsComponent } from '../details/details.component';
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { UserLoginService } from "../../service/user-login.service";
import { Callback, LoggedInCallback } from "../../service/cognito.service";
import { LoginComponent } from '../login/login.component';
import { ReservedStatus } from '../../app/model/ReservedStatus';
import { RestaurantsListResponse } from '../model/RestaurantsListResponse';
import { CompanyInfoListResponse } from '../model/CompanyInfoListResponse';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss'],
  providers:[DatabaseService, TimeService]
})
export class RestaurantsComponent implements OnInit, LoggedInCallback {
  public restaurants: RestaurantsListResponse;
  public companyInfo: any;
  public foodDisplayDay: any;
  public isItFivePM: boolean;
  public isReservationOpen: boolean;
  public isItWeekday: boolean;
  public isItFiveAndFriday: boolean;
  public imageURL: any;
  public isLoading: boolean = false;
  private currentUser: any;
  private reservedToday: any;
  private error: any;
  private companyFromStorage: any;
  private reservedStatusItem: any;

  constructor(private database: DatabaseService,
    private time: TimeService,
    public dialog: MatDialog,
    public router: Router,
    public userService: UserLoginService,
    ) {
      this.currentUser = this.userService.currentUser;
    }

  public isLoggedIn(message: string, isLoggedIn: boolean) {
      if (!isLoggedIn) {
          this.router.navigate(['/home']);
      }
  }
  /**
   * Utility method that should be in a util class, or module
   * @param {string} obj object for checking
   * @return {void} boolean
   */
  public isEmpty(obj: any): boolean {
      for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
              return false;
          }
      }
      return true;
  }

  public openDialog(index): void {  
    let dialogRef = this.dialog.open(DetailsComponent, {
      width: '250px',
      data: { 
        restaurants: this.restaurants[index],
        index: this.foodDisplayDay,
        closed: this.isReservationOpen
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      const isResultEmpty = this.isEmpty(result);
      if (!isResultEmpty) {
        this.reservedToday = result.reservedToday;
      }
    });
  }

  public ngOnInit() {
    this.userService.isAuthenticated(this);
    this.currentUser = this.userService.currentUser;
    this.isItFivePM = this.time.isItFivePM();
    this.foodDisplayDay = this.time.getDay(this.isItFivePM);
    this.isReservationOpen = this.time.isReservationOpen();
    this.isItWeekday = this.time.isItWeekday();
    this.isItFiveAndFriday = this.time.isItFiveAndFriday();
    this.database.getCompanyInfo(this.currentUser.signInUserSession.idToken.payload['custom:company']).subscribe( data => {
      this.companyFromStorage = data;
      sessionStorage.setItem('currentCompany', JSON.stringify(this.companyFromStorage));
      this.retrieveRestaurants();
    });
    this.checkWeekend(this.isItWeekday, this.isItFiveAndFriday);
    
    this.retrieveReservedTodayStatus();
  }

  public getReservedTodayStatus() {
   if (this.currentUser.signInUserSession.idToken.payload.hasOwnProperty('custom:company')){
      this.reservedStatusItem = {
        "userId": this.currentUser.username,
        "companyName": this.currentUser.signInUserSession.idToken.payload['custom:company']
      }
      this.database.getReservedTodayStatus(this.reservedStatusItem)
      .subscribe(
          data => {
              this.reservedToday = data;
          },
          error => this.error = error
      )
    }
  }

  public getRestaurants() {
    this.isLoading = true;
    this.database.getRestaurantsMetro(this.companyFromStorage['metroArea']).subscribe( data => {
      this.isLoading = false;
      this.restaurants = data; 
    });
  }
  
  public async retrieveRestaurants() {
    await this.getRestaurants();
  }
  
  public async retrieveReservedTodayStatus() {
    await this.getReservedTodayStatus();
  }

  public checkWeekend(isItWeekday:boolean, isItFiveAndFriday:boolean) {
    if (!isItWeekday || isItFiveAndFriday) {
      this.router.navigate(['/weekend']);
    }
  }
}
