import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "../services/database.service";
import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from "rxjs";
import { UserLoginService } from "../../service/user-login.service";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  public latlong: any;
  public location = [];
  public locationLatLong = [];
  public latitude: any;
  public longitude: any;
  private error: any;
  private isLoading: boolean;
  private companyFromStorage: any;
  private currentUser: any;

  constructor(private database: DatabaseService, 
    public userService: UserLoginService) {
      
      this.currentUser = this.userService.currentUser;
    }

  public ngOnInit() {
    this.currentUser = this.userService.currentUser;
    this.companyFromStorage = JSON.parse(sessionStorage.getItem('currentCompany'));
    this.database.getCompanyInfo(this.currentUser.signInUserSession.idToken.payload['custom:company']).subscribe( data => {
      this.companyFromStorage = data;
      sessionStorage.setItem('currentCompany', JSON.stringify(this.companyFromStorage));
      this.retrieveRestaurants();
    });
    this.getGeoLocation();
  }

  public getRestaurants(){

    if (this.companyFromStorage != null) {
      this.database.getRestaurantsMetro(this.companyFromStorage['metroArea']).subscribe( data => {
        this.isLoading = false;
        this.latlong = data;
          for (const ll of this.latlong) {
            this.location.push(
              {
                location:ll.location,
                name: ll.restaurantName
            });
          }
          for (const loc of this.location) {
            this.locationLatLong.push(
              {
              lat: parseFloat(loc.location.latitude),
              long: parseFloat(loc.location.longitude),
              city: loc.location.city,
              state: loc.location.state,
              label: loc.location.label,
              name: loc.name
            });
          }
      });
    }
  }

  public async retrieveRestaurants() {
    await this.getRestaurants();
  }

  public getGeoLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.latitude = parseFloat(this.latitude)
        this.longitude = parseFloat(this.longitude)
      });
    } else {
      console.log('geolocation IS NOT available');
      /* geolocation IS NOT available */
    }
    
  }
}
