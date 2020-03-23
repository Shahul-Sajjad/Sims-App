import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { MatDialogModule } from '@angular/material/dialog';
import { FeatureModule } from '../../feature-module/feature.module';
import { InvoiceTypeComponent } from './invoice-type/invoice-type.component';
import { InvoiceMasterRoutingModule } from './invoice-master-routing.module';
import { AddInvoiceTypeDetailsComponent } from './add-invoice-type-details/add-invoice-type-details.component';
import { UpdateInvoiceTypeDetailsComponent } from './update-invoice-type-details/update-invoice-type-details.component';


@NgModule({
    declarations: [
        InvoiceTypeComponent,
        AddInvoiceTypeDetailsComponent,
        UpdateInvoiceTypeDetailsComponent
    ],
    imports: [
      CommonModule,
      FormsModule,
      InvoiceMasterRoutingModule,
      ReactiveFormsModule,
      MaterialModule,
      MatDialogModule,
      FeatureModule
    ], entryComponents : [UpdateInvoiceTypeDetailsComponent,AddInvoiceTypeDetailsComponent]
  })
  export class InvoiceMasterModule { }