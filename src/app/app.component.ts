import { Component, OnInit } from '@angular/core';
import {AwsUtil} from "../service/aws.service";
import {UserLoginService} from "../service/user-login.service";
import {CognitoUtil, LoggedInCallback} from "../service/cognito.service";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { DatabaseService } from "./services/database.service";
import { CompanyInfoListResponse } from './model/CompanyInfoListResponse';
import { CompanyService } from "./services/company.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers:[DatabaseService]
})
export class AppComponent implements OnInit, LoggedInCallback {
  private title = 'nomfoods';
  private currentUser: any;

  constructor(private database: DatabaseService,
    public awsUtil: AwsUtil, 
    public userService: UserLoginService,
    public cognito: CognitoUtil,
    public companyService: CompanyService,
    private router: Router) {
        this.currentUser = this.userService.currentUser;
        console.log("AppComponent: constructor");
    }

    // Adding Google analytics. Work in progress at the moment.
    // public router: Router, public googleAnalyticsEventsService: GoogleAnalyticsEventsService) {
    //     console.log("AppComponent: constructor");

    //     this.router.events.subscribe(event => {
    //         if (event instanceof NavigationEnd) {
    //           ga('set', 'page', event.urlAfterRedirects);
    //           ga('send', 'pageview');
    //         }
    //       });
    // }
    // submitEvent() {
    //     this.googleAnalyticsEventsService.emitEvent("testCategory", "testAction", "testLabel", 10);
    //   }

    ngOnInit() {
        console.log("AppComponent: Checking if the user is already authenticated");
        this.userService.isAuthenticated(this);
    }

    isLoggedIn(message: string, isLoggedIn: boolean) {
        // this.currentUser = this.userService.currentUser;
        console.log("AppComponent: the user is authenticated: " + isLoggedIn);
        let mythis = this;
        // this.companyService.retrieveCompanyInfo(this.currentUser.signInUserSession.idToken.payload['custom:company'])
        this.cognito.getIdToken({
            callback() {

            },
            callbackWithParam(token: any) {
                // Include the passed-in callback here as well so that it's executed downstream
                console.log("AppComponent: calling initAwsService in callback")
                mythis.awsUtil.initAwsService(null, isLoggedIn, token);
            }
        });
    }
    
}
