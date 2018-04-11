
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from "rxjs";

export class ReservedStatusService {
    // private countSource = new Subject<boolean>();
    
    public myBool$: Observable<boolean>;

    private boolSubject: Subject<boolean>;
    // count = this.countSource.asObservable();

    constructor() {
        this.boolSubject = new Subject<boolean>();
        this.myBool$ = this.boolSubject.asObservable();
    }

    public updateBool(newValue) {
        this.myBool$ = newValue;
        this.boolSubject.next(newValue);
        console.log(this.myBool$, 'getting into this.myBool$ ');
      }
    // private reservedTodayStatus = new Subject<boolean>();
    // constructor() {
  
    // }
    // public status = this.reservedTodayStatus.asObservable();
    // public updateCount(status: boolean) {
    //     this.reservedTodayStatus.next(status);
    // }

  }
  