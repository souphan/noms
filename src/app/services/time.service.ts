
export class TimeService {

  public date: any;

  constructor() {
    this.date = new Date();
  }

  // Checking for what day it is, and making sure we are displaying Monday - Friday correctly.
  public getDay(isItFivePM) {
    const day = this.date.getDay();
    // Need to handle sunday as 0. array of food is 0 - 4. We show food Sunday at 5 PM.
    if ( day === 0 || day === 6 || isItFivePM) {
      return day;
    }
    else {
      return day - 1;
    }
  }
 //it is open Sunday after 5 PM through Friday at 10 AM. Closes on Weekdays after 5 PM.
  public isReservationOpen(): boolean {
    const hour = this.date.getHours();
    return hour <= 10 || hour >= 17;
  }

  // Check if it's a weekday, because we don't open on the weekends.
  // You can only order food once a day from 5 PM to 10 AM window.
  // Return Boolean True if it is a weekday
  public isItWeekday(): boolean {
    const day = this.date.getDay();
    const isItFiveAndSunday = this.isItFiveAndSunday();
    const isItMondayAndOpen = this.isItMondayAndOpen();
    const isItFiveAndFriday = this.isItFiveAndFriday();
    return (day > 0 && day <= 5) || (isItMondayAndOpen) || (isItFiveAndSunday);
  }

  // Return Boolean True if it is the weekend.
  public isItWeekend(): boolean {
    const day = this.date.getDay();
    const isItFiveAndSunday = this.isItFiveAndSunday();
    const isItFiveAndFriday = this.isItFiveAndFriday();
    return (day >= 5) || (isItFiveAndFriday);
  }

  // Return Boolean True if it is the above 5PM.
  public isItFivePM(): boolean {
    const hour = this.date.getHours();
    return hour >= 17;
  }

  // Return Boolean True if it is Five and Sunday.
  // This is when the app is open for ordering on Monday.
  public isItFiveAndSunday(): boolean {
    const hour = this.date.getHours();
    const day = this.date.getDay();
    return hour >= 17 && day === 0;
  }

  // Return Boolean True if it is Five PM and Friday.
  // This is when the app is closed for the weekend
  public isItFiveAndFriday(): boolean {
    const hour = this.date.getHours();
    const day = this.date.getDay();
    return hour >= 17 && day === 5;
  }

  // Return Boolean True if it is Monday and open.
  public isItMondayAndOpen(): boolean {
    const hour = this.date.getHours();
    const day = this.date.getDay();
    return (hour <= 10 || hour >= 17) && (day === 1);
  }

}
