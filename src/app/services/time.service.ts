
export class TimeService {

  public date: any;

  constructor() {
    this.date = new Date();
  }

  // Weekends cannot order food. You are blocked.
  // You can only order food once a day.
  // From 5 PM to 10 AM is your window for ordering food.

  public getTime() {
    const hour = this.date.getHours();
    return hour;
  }

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

  public isItWeekday(): boolean {
    const day = this.date.getDay();
    const isItFiveAndSunday = this.isItFiveAndSunday();
    const isItMondayAndOpen = this.isItMondayAndOpen();
    const isItFiveAndFriday = this.isItFiveAndFriday();
    return (day > 0 && day <= 5) || (isItMondayAndOpen) || (isItFiveAndSunday);
  }

  public isItWeekend(): boolean {
    const day = this.date.getDay();
    const isItFiveAndSunday = this.isItFiveAndSunday();
    const isItFiveAndFriday = this.isItFiveAndFriday();
    return (day >= 5) || (isItFiveAndFriday);
  }

  public isItFivePM(): boolean {
    const hour = this.date.getHours();
    return hour >= 17;
  }

  public isItFiveAndSunday(): boolean {
    const hour = this.date.getHours();
    const day = this.date.getDay();
    return hour >= 17 && day === 0;
  }

  public isItFiveAndFriday(): boolean {
    const hour = this.date.getHours();
    const day = this.date.getDay();
    return hour >= 17 && day === 5;
  }

  public isItMondayAndOpen(): boolean {
    const hour = this.date.getHours();
    const day = this.date.getDay();
    return (hour <= 10 || hour >= 17) && (day === 1);
  }

}
