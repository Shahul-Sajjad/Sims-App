import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { MatDialogModule } from '@angular/material/dialog';

import { SawLoaderComponent } from './saw-loader/saw-loader.component';
import { SawFooterComponent } from './saw-footer/saw-footer.component';
import { SawDatatableComponent } from './saw-datatable/saw-datatable.component';
@NgModule({
  declarations: [
    SawLoaderComponent,
    SawFooterComponent,
    SawDatatableComponent
  ],
  exports: [
    SawLoaderComponent,
    SawFooterComponent,
    SawDatatableComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MatDialogModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
]
})
export class FeatureModule { }
