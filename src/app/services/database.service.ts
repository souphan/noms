import { Injectable, Input } from '@angular/core';
import { Response, RequestOptions, Headers } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs/Rx"
import { catchError, retry } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import * as _ from 'lodash';
// import * as models from '../model/models';
import { ReservationsListResponse } from '../model/ReservationsListResponse';
import { CompanyInfoListResponse } from '../model/CompanyInfoListResponse';
import { RestaurantsListResponse } from '../model/RestaurantsListResponse';
import { ReservedStatus } from '../model/ReservedStatus';

 @Injectable()
 export class DatabaseService {
  private restaurants: any;
  private reservations: any;
  private reservedTodayStatus: any;

  // API Gatway and serverless Lambda endpoint
  private api = "https://9x778lz944.execute-api.us-east-1.amazonaws.com/dev/";

  constructor(private http: HttpClient) { }
  
  /**
   * HTTP Post call to update reserved status
   * @param {Object} event object of information for reservedStatus API call
   */
  public updateReservedTodayStatus(event) {
    let userId = event['userId'];
    let info =  Object.assign(event);
    let body = JSON.stringify(info);
    return this.http.post(this.api + 'users/' + userId + '/reservationStatus', body)
    .catch((err) => {
        // Do messaging and error handling here
        return Observable.throw(err)
      });;
  }

  /**
  * HTTP Post call to insert food reservation object
  * @param {Object} event object of information for food reservation API call
  */
  public postReservation(event) {
    let userId = event['userId'];
    let info =  Object.assign(event);
    let body = JSON.stringify(info);
    return this.http.post(this.api + 'users/' + userId + '/reservations', body)
    .catch((err) => {
      // Do messaging and error handling here
      return Observable.throw(err)
    });;
  }

  /**
  * HTTP Post call to insert new registered users into our database
  * @param {Object} event object of information for users
  */
  public postCompanyRegisteredEmployees(event) {
    let company = event['companyName'];
    let info =  Object.assign(event);
    let body = JSON.stringify(info);
    return this.http.post(this.api + 'companies/' + company, body)
    .catch((err) => {
        // Do messaging and error handling here
        return Observable.throw(err)
      });;
  }

  /**
  * HTTP Get call for specific restaurant
  * @param {String} RestaurantId restaurant ID
  */
  public getInfo(RestaurantId: string){
    return this.http.get(this.api + 'restaurants' + RestaurantId)
    .catch((err) => {
      // Do messaging and error handling here
      return Observable.throw(err)
    });
  }

  /**
  * HTTP Get call for list of all restaurants
  * @param {Observable} RestaurantsListResponse Restaurants listing object
  */
  public getRestaurants(): Observable<RestaurantsListResponse> {
    return this.http.get(this.api + 'restaurants')
    .catch((err) => {
        // Do messaging and error handling here
        return Observable.throw(err)
    });
  }

  /**
  * HTTP Get call for list of all restaurants in a certain metro area
  * @param {Observable} RestaurantsListResponse Restaurants listing object
  */
  public getRestaurantsMetro(metro): Observable<RestaurantsListResponse> {
    return this.http.get(this.api + 'restaurants/' + metro)
    .catch((err) => {
        // Do messaging and error handling here
        return Observable.throw(err)
      });
  }

  /**
  * HTTP Get call for user company information
  * @param {Object} event object of information for user company
  */
  public getCompanyInfo(event) {
    let company = event;
    return this.http.get(this.api + 'companies/' + company)
    .catch((err) => {
        // Do messaging and error handling here
        return Observable.throw(err)
      });
  }

  /**
  * HTTP Post call to send an email to myself when user wants to contact me.
  * @param {Object} event object of information for food reservation API call
  */
  public sendMail(event) {
    let info =  Object.assign(event);
    let body = JSON.stringify(info);
    return this.http.post(this.api + 'contact', body)
    .catch((err) => {
      // Do messaging and error handling here
      return Observable.throw(err)
    });;
  }

  /**
  * HTTP Get call retrieve all reservations you have made in the past
  * @param {any} userId userId of user
  * @param {any} extraHttpRequestParams any optional HTTP params
  */
  public getReservations(userId: any, extraHttpRequestParams?: any): Observable<ReservationsListResponse> {
    return this.reservationsListByUserIdWithHttpInfo(userId, extraHttpRequestParams)
    .catch((err) => {
        return Observable.throw(err)
      });;
  }

  /**
  * HTTP Get call for reservations made by UserId
  * @param {any} userId userId of user
  * @param {any} extraHttpRequestParams any optional HTTP params
  */
  public reservationsListByUserIdWithHttpInfo(userId: string, extraHttpRequestParams?: any) {
    let path:any = this.api + 'users/${userId}/reservations'
                .replace('${' + 'userId' + '}', String(userId));
    // console.log(path, 'getting into path reservationsListByUserIdWithHttpInfo');
    let queryParameters = new URLSearchParams();
    // let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
    // verify required parameter 'userId' is not null or undefined
    if (userId === null || userId === undefined) {
        throw new Error('Required parameter userId was null or undefined when calling bookingsListByUserId.');
    }
    // to determine the Content-Type header
    let consumes: string[] = [
    ];

    let headers = new HttpHeaders()
    .append('Content-Type', 'application/json')
    .append('x-api-key','ZKCycscIEK5ChiYLVbia52YskmrXqSKS3PqQn7I8')
    .append('Accept', 'application/json')
    .append('Access-Control-Allow-Headers', 'Content-Type')

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type',
        'x-api-key': 'ZKCycscIEK5ChiYLVbia52YskmrXqSKS3PqQn7I8'
      })
    };

    // to determine the Accept header
    let produces: string[] = [
        'application/json'
    ];

    return this.http.get(path);
  }

  /**
  * HTTP Get call for list of all restaurants in a certain metro area
  * @param {Observable} RestaurantsListResponse Restaurants listing object
  */
  public getRestaurantsMetroArea(metroArea: string, extraHttpRequestParams?: any): Observable<ReservationsListResponse> {
    return this.restaurantsMetroAreaList(metroArea, extraHttpRequestParams)
    .catch((err) => {
      //  console.log(err, 'getting error and catching');
        // Do messaging and error handling here
        return Observable.throw(err)
      });;
  }

  /**
  * HTTP Get call for list of all restaurants in a certain metro area
  * @param {Observable} RestaurantsListResponse Restaurants listing object
  */
  public restaurantsMetroAreaList(metroArea: string, extraHttpRequestParams?: any) {
    const path = this.api + 'users/${userId}/reservations'
                .replace('${' + 'userId' + '}', String(metroArea));
    // console.log(path, 'getting into path reservationsListByUserIdWithHttpInfo');
    let queryParameters = new URLSearchParams();
    // let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
    // verify required parameter 'userId' is not null or undefined
    if (metroArea === null || metroArea === undefined) {
        throw new Error('Required parameter userId was null or undefined when calling metroArea.');
    }
    // to determine the Content-Type header
    let consumes: string[] = [
    ];

    // to determine the Accept header
    let produces: string[] = [
        'application/json'
    ];

    return this.http.get(path);
  }

  /**
  * HTTP Get call for reservedStatus
  * @param {Object} event object of information for reservationStatus API call
  */
  public getReservedTodayStatus(event): Observable<ReservedStatus> {
    let userId = event['userId'];
    let companyName = event['companyName'];
    let info =  Object.assign(event);
    let body = JSON.stringify(info);
    return this.http.get(this.api + 'users/'+ userId + '/reservationStatus/' + companyName)
    .catch((err) => {
        // Do messaging and error handling here
        return Observable.throw(err)
      });
    }

  /**
  * HTTP Get call for reservedStatus
  * @param {Object} event object of information for reservationStatus API call
  */
  public reservedTodayByUserIdWithHttpInfo(userId: string, extraHttpRequestParams?: any) {
    const path = this.api + 'users/${userId}/reservationStatus'
                .replace('${' + 'userId' + '}', String(userId));
    let queryParameters = new URLSearchParams();
    // let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
    // verify required parameter 'userId' is not null or undefined
    if (userId === null || userId === undefined) {
        throw new Error('Required parameter userId was null or undefined when calling bookingsListByUserId.');
    }
    // to determine the Content-Type header
    let consumes: string[] = [
    ];

    // to determine the Accept header
    let produces: string[] = [
        'application/json'
    ];

    return this.http.get(path);
  }

  }