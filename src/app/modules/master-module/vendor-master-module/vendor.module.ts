//import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorMasterComponent } from './vendor-master/vendor-master.component';
import { VendorMasterRoutingModule } from './vendor-master-routing.module';
import { MaterialModule } from 'src/app/material.module';
import { VendorBankDetailsComponent } from './vendor-bank-details/vendor-bank-details.component';
import { VendorDetailDialogComponent } from './vendor-detail-dialog/vendor-detail-dialog.component';
import { FeatureModule } from '../../feature-module/feature.module';

@NgModule({
  declarations: [
    VendorMasterComponent,
    VendorBankDetailsComponent,
    VendorDetailDialogComponent
  ],
  imports: [
    CommonModule,
    FeatureModule,
    VendorMasterRoutingModule,MaterialModule,FormsModule,ReactiveFormsModule
  ],entryComponents: [VendorBankDetailsComponent,VendorDetailDialogComponent]
})
export class VendorMasterModule {
  
  
}