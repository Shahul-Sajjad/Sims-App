import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserMasterComponent } from './user-master/user-master.component';
import { UserMasterRoutingModule } from './user-master-routing.module';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { MatDialogModule } from '@angular/material/dialog';
import { UserMasterDetailsDailogComponent } from './user-master-details-dailog/user-master-details-dailog.component';
import { FeatureModule } from '../../feature-module/feature.module';
import { UserMasterUpdateDetailsDailogComponent } from './user-master-update-details-dailog/user-master-update-details-dailog.component';
@NgModule({
  declarations: [
    UserMasterComponent,
    UserMasterDetailsDailogComponent,
    UserMasterUpdateDetailsDailogComponent
  ],
  imports: [
    CommonModule,
    UserMasterRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MatDialogModule,
    FeatureModule
  ], entryComponents : [UserMasterDetailsDailogComponent,UserMasterUpdateDetailsDailogComponent]
})
export class UserMasterModule { }
