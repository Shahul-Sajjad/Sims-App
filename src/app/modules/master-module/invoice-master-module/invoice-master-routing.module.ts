import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvoiceTypeComponent } from './invoice-type/invoice-type.component';


const routes: Routes = [
    {
      path: '',
      component: InvoiceTypeComponent
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  
  export class InvoiceMasterRoutingModule { }