import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { UserLoginService } from "../service/user-login.service";
import { HomeComponent } from "./home/home.component";
import { PasswordComponent } from './password/password.component';
import { LoginComponent } from './login/login.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { DetailsComponent } from './details/details.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { ReservedTodayDialogComponent } from './reserved-today-dialog/reserved-today-dialog.component';
import { MapComponent } from './map/map.component';
import { WeekendComponent } from './weekend/weekend.component';
import { LogoutComponent } from './logout/logout.component';
import { PastOrdersComponent } from './past-orders/past-orders.component';
import { ProfileComponent } from './profile/profile.component';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ResetPasswordTwoComponent } from './reset-password-two/reset-password-two.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { ReservationClosedComponent } from './reservation-closed/reservation-closed.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'password', component: PasswordComponent },
  { path: 'login', component: LoginComponent },
  // { path: 'logout', component: LogoutComponent},
  { path: 'restaurants', component: RestaurantsComponent },
  { path: 'details', component: DetailsComponent },
  { path: 'map', component: MapComponent },
  { path: 'confirmation', component: ConfirmationDialogComponent },
  { path: 'weekend', component: WeekendComponent },
  { path: 'past-orders', component: PastOrdersComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'reserved-today', component: ReservedTodayDialogComponent},
  { path: 'reset', component: ResetPasswordComponent},
  { path: 'reset-password', component: ResetPasswordTwoComponent},
  { path: 'thank-you', component: ThankYouComponent},
  { path: 'closed', component: ReservationClosedComponent},
  { path: 'privacy', component: PrivacyPolicyComponent}
];


const homeRoutes: Routes = [
  {
      path: '',
      redirectTo: '/home',
      pathMatch: 'full'
  },
  {
      path: 'home',
      component: HomeComponent,
      children: [
        { path: 'password', component: PasswordComponent },
        { path: 'login', component: LoginComponent },
        { path: 'thank-you', component: ThankYouComponent},
        { path: 'reset', component: ResetPasswordComponent},
        { path: 'reset-password', component: ResetPasswordTwoComponent},
      ]
  },
];

const secureHomeRoutes: Routes = [
  {

      path: '',
      redirectTo: '/restaurants',
      pathMatch: 'full'
  },
  {
      path: 'restaurants', 
      component: RestaurantsComponent, 
      children: [
      { path: 'logout', component: LogoutComponent },
      { path: 'restaurants', component: RestaurantsComponent },
      { path: 'details', component: DetailsComponent },
      { path: 'map', component: MapComponent },
      { path: 'confirmation', component: ConfirmationDialogComponent },
      { path: 'past-orders', component: PastOrdersComponent},
      { path: 'profile', component: ProfileComponent},
      { path: 'reserved-today', component: ReservedTodayDialogComponent}
    ]
  }
];

const routes: Routes = [
  {
      path: '',
      children: [
          ...homeRoutes,
          ...secureHomeRoutes,
          {
              path: '',
              component: HomeComponent
          }
      ]
  },


];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);