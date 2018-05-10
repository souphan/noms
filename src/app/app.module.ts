import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { routing } from "./app.routing";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AgmCoreModule } from '@agm/core';
import { KeysPipe } from './pipes/keys.pipe';
import { DerpPipe } from './pipes/derp.pipe';
// import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {GoogleAnalyticsEventsService} from "./google-analytics-events.service";
import {
  NgModule,
  Component,
  Pipe,
  OnInit
} from '@angular/core';

import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';

import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatFormFieldModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
} from '@angular/material';
import {CdkTableModule} from '@angular/cdk/table';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { PasswordComponent } from './password/password.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { DetailsComponent } from './details/details.component';
import { MapComponent } from './map/map.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { WeekendComponent } from './weekend/weekend.component';
import { LogoutComponent } from './logout/logout.component';
// Cognito User Login Services
import { UserRegistrationService } from '../service/user-registration.service';
import { UserParametersService } from '../service/user-parameters.service';
import { UserLoginService } from '../service/user-login.service';
import { CognitoUtil } from '../service/cognito.service';
import {AwsUtil} from "../service/aws.service";
import { DynamoDBService } from '../service/ddb.service';
import { CompanyService } from "./services/company.service";
import { DatabaseService } from "./services/database.service";
import { PastOrdersComponent } from './past-orders/past-orders.component';
import { ProfileComponent } from './profile/profile.component';
import { SecureHomeComponent } from '../secure/landing/securehome.component';
import { JwtComponent } from '../secure/jwttokens/jwt.component';
import { UseractivityComponent } from '../secure/useractivity/useractivity.component';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { ReservedTodayDialogComponent } from './reserved-today-dialog/reserved-today-dialog.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ResetPasswordTwoComponent } from './reset-password-two/reset-password-two.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { ReservationClosedComponent } from './reservation-closed/reservation-closed.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    PasswordComponent,
    FooterComponent,
    LoginComponent,
    RestaurantsComponent,
    DetailsComponent,
    MapComponent,
    KeysPipe,
    DerpPipe,
    ConfirmationDialogComponent,
    WeekendComponent,
    LogoutComponent,
    PastOrdersComponent,
    ProfileComponent,
    SecureHomeComponent,
    JwtComponent,
    UseractivityComponent,
    ThankYouComponent,
    ReservedTodayDialogComponent,
    ResetPasswordComponent,
    ResetPasswordTwoComponent,
    PrivacyPolicyComponent,
    ReservationClosedComponent,
    // ResetPasswordStepTwoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    routing,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatStepperModule,
    MatFormFieldModule,
    
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCZDOc9IlUbFMBwIX1JOB8_-Rd3HY17GnA'
    }),
  ],
  entryComponents: [
    DetailsComponent
  ],
  providers: [
    CognitoUtil,
    AwsUtil,
    DynamoDBService,
    UserLoginService,
    CompanyService,
    UserRegistrationService,
    GoogleAnalyticsEventsService,
    DatabaseService,
    UserParametersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
