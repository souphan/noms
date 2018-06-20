import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { UserLoginService } from "../../service/user-login.service";
import { AwsUtil } from "../../service/aws.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {
  public fullImagePath: string;
  public userIsLoggedIn:boolean;
  private errorMessage: string;
  private currentUser: any;

  constructor(public dialog: MatDialog,
    public userService: UserLoginService,
    public awsUtil: AwsUtil,
    public router: Router) {
    this.fullImagePath = '/assets/images/nomfoods.PNG';
  }

  public ngOnInit() {
    // this.currentUser = this.userService.currentUser;
    if(this.userService.currentUser != null) {
      this.userIsLoggedIn = true;
    } else {
      this.userIsLoggedIn = false;
    }
  }

  public openDialog(): void {
    let dialogRef = this.dialog.open(LoginComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.userIsLoggedIn = result;
      console.log('The dialog was closed');
    });
  }
  
  public logout() {
        this.userService.logout();
        this.userIsLoggedIn = false;
        this.router.navigate(['/home']);
    }

}
