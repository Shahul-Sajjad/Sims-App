//import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { VendorMasterComponent } from './vendor-master/vendor-master.component';
import { LocationMasterRoutingModule } from './location-master-routing.module';
import { MaterialModule } from 'src/app/material.module';
import { LocationMasterComponent } from './location-master/location-master.component';
//import { VendorBankDetailsComponent } from './vendor-bank-details/vendor-bank-details.component';
//import { VendorDetailDialogComponent } from './vendor-detail-dialog/vendor-detail-dialog.component';
import { FeatureModule } from '../../feature-module/feature.module';
import { LocationDetailDailogComponent } from './location-detail-dailog/location-detail-dailog.component';
import { AddLocationDetailDialogComponent } from './add-location-detail-dialog/add-location-detail-dialog.component';

@NgModule({
  declarations: [
      LocationMasterComponent,
      LocationDetailDailogComponent,
      AddLocationDetailDialogComponent
    
  ],
  imports: [
    CommonModule, FeatureModule,
   
    LocationMasterRoutingModule,MaterialModule,FormsModule,ReactiveFormsModule
  ],entryComponents: [LocationDetailDailogComponent,AddLocationDetailDialogComponent]
})
export class LocationMasterModule {
  
  
}

// ,entryComponents: [VendorBankDetailsComponent,VendorDetailDialogComponent]

//