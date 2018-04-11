import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-weekend',
  templateUrl: './weekend.component.html',
  styleUrls: ['./weekend.component.scss']
})
export class WeekendComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }
  public goBack() {
    this.router.navigate(['/past-orders']);
  }

}
