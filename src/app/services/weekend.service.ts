import { TimeService } from "./time.service";
import { Router } from '@angular/router';
import { Injectable, Input } from '@angular/core';

@Injectable()
export class WeekendService {
  private foodDisplayTime: any;
  private foodDisplayDay: any;

  constructor(public time: TimeService,
    public router: Router) {
    this.weekendPage();
  }

  // Weekends cannot order food. You are blocked.
  // You can only order food once a day.
  // From 5 PM to 10 AM is your window for ordering food.

  public weekendPage() {
    if(this.foodDisplayDay === 6 || this.foodDisplayDay === 0) {
    //   this.router.navigate(['/weekend']);
      // console.log('its the weekend');
    }
  }
}