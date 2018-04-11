import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PrivacyPolicyComponent>,) { }

  ngOnInit() {
  }

  public closeDialog(): void {
    this.dialogRef.close();
  }
}
