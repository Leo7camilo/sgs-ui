import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AttendenceCallComponent } from './attendence-call/attendence-call.component';
import { AttendenceComponent } from './attendence.component';
import { AttendenceConsultComponent } from './attendence-consult/attendence-consult.component';
import { AttendenceQueueComponent } from './attendence-queue/attendence-queue.component';
import { AttendencePasswordComponent } from './attendence-password/attendence-password.component';

const routes: Routes = [{
  path: '',
  component: AttendenceComponent,
  children: [
    {
      path: 'attendence-call',
      component: AttendenceCallComponent,
    },
    {
      path: 'attendence-consult',
      component: AttendenceConsultComponent,
    },
    {
      path: 'attendence-queue',
      component: AttendenceQueueComponent,
    },
    {
      path: 'attendence-password',
      component: AttendencePasswordComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AttendenceRoutingModule {
}
