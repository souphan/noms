// import { Injectable } from '@angular/core';
// import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
// import {Callback, LoggedInCallback, CognitoUtil} from "service/cognito.service";
// import { UserLoginService } from "../../service/user-login.service";

// @Injectable()
// export class AuthGuardService implements CanActivate, LoggedInCallback {

//   constructor(private userService: UserLoginService, private router: Router) {}
  
//   public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot, isLoggedIn?) {
//     if (this.userService.isLoggedIn()) {
//       return true;
//     } else {
//       this.router.navigate(['/home'], {
//         queryParams: {
//           return: state.url
//         }
//       });
//       return false;
//     }
//   }

//   public isLoggedIn(message: string, isLoggedIn: boolean) {
//     if (!isLoggedIn) {
//         this.router.navigate(['/home']);
//     }
//   }
// }