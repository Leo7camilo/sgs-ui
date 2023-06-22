import { AttendenceComponent } from './attendence/attendence.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { AdministrativeComponent } from './administrative/administrative.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'miscellaneous',
      loadChildren: () => import('./miscellaneous/miscellaneous.module')
        .then(m => m.MiscellaneousModule),
    },
    {
      path: 'manager',
      loadChildren: () => import('./manager/manager.module')
        .then(m => m.ManagerModule),
    },
    {
      path: 'parameterization',
      loadChildren: () => import('./parameterization/parameterization.module')
        .then(m => m.ParameterizationModule),
    },
    {
      path: 'attendence',
      component: AttendenceComponent
    },

    {
      path: 'administrative',
      component: AdministrativeComponent
    },

  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
