import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PrivacyPolicyComponent } from '../privacy-policy/privacy-policy.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  public fullImagePath: string;

  constructor(public dialog: MatDialog) { 
    this.fullImagePath = '/assets/images/nomfoods.PNG';
  }

  public openDialog(): void {  
    let dialogRef = this.dialog.open(PrivacyPolicyComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("getting closed");
    });
  }

  ngOnInit() {
  }

}
