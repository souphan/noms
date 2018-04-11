import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {
  public timeSelected: any;
  public foodSelected: string;
  public nameSelected: string;
  public imageSelected: string;

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.timeSelected = data.time;
      this.foodSelected = data.food; 
      this.nameSelected = data.name; 
      this.imageSelected = data.image;
    }

  ngOnInit() {
  }

  public closeDialog(): void {
    this.dialogRef.close();
  }

}
