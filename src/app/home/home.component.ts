import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatabaseService } from "../services/database.service";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { UserLoginService } from "../../service/user-login.service";
import { CognitoCallback, LoggedInCallback } from "../../service/cognito.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers:[DatabaseService]
})
export class HomeComponent implements OnInit, LoggedInCallback {
  public imagePadThai: string;
  public imageBurger: string;
  public imageKimchi: string;

  public myform: FormGroup;
  public name: FormControl; 
  public email: FormControl;

  constructor(private database: DatabaseService, 
    public router: Router,
    public userService: UserLoginService,) {
  }


  ngOnInit() {
    this.userService.isAuthenticated(this);
    this.createFormControls();
    this.createForm();
  }

  public isLoggedIn(message: string, isLoggedIn: boolean) {
    if (isLoggedIn) {
        this.router.navigate(['/home']);
    }
  }

  createFormControls() {
    this.name = new FormControl('', Validators.required);
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern("[^ @]*@[^ @]*")
    ]);
  }

  createForm() { 
    this.myform = new FormGroup({
      name: new FormGroup({
        name: this.name,
      }),
      email: new FormGroup({
        email: this.email,
      }),
    });
  }

  public sendMail() {

    let Item = {
      "name": this.name.value,
      "email": this.email.value,
    }

    if(this.name.value && this.email.value && !this.email.invalid) {
      this.database.sendMail(Item).subscribe(
        data => {
          this.name.reset();
          this.email.reset();
          this.router.navigate(['/thank-you']);
          return true;
        },
        error => {
          console.error("Error posting contact");
          return Observable.throw(error);
        }
      );
    } else {
      this.validateAllFormFields(this.name)
      this.validateAllFormFields(this.email)
    }
  }

  public validateAllFormFields(control: FormControl) {
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      }
  }

}
