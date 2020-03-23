import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { EditUserBasicInfoComponent } from '../edit-user-basic-info/edit-user-basic-info.component';
import { EditUserContactInfoComponent } from '../edit-user-contact-info/edit-user-contact-info.component';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openEditBasicInfoDialog() {
    const dialogRef = this.dialog.open(EditUserBasicInfoComponent, { disableClose: true });

    dialogRef.afterClosed().subscribe();
  }

  openEditContactInfoDialog() {
    const contactDialogRef = this.dialog.open(EditUserContactInfoComponent, { disableClose: true });

    contactDialogRef.afterClosed().subscribe();
  }

}
