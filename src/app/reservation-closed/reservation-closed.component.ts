import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-reservation-closed',
  templateUrl: './reservation-closed.component.html',
  styleUrls: ['./reservation-closed.component.scss']
})
export class ReservationClosedComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ReservationClosedComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  public closeDialog(): void {
    this.dialogRef.close();
  }

}
