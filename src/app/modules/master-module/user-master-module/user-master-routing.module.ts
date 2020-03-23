import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserMasterComponent } from './user-master/user-master.component';


const routes: Routes = [
  {
    path: '',
    component: UserMasterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UserMasterRoutingModule { }