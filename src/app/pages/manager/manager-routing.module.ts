import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagerCompaniesComponent } from './manager-companies/manager-companies.component';
import { ManagerComponent } from './manager.component';


const routes: Routes = [{
  path: '',
  component: ManagerComponent,
  children: [
    {
      path: 'manager-companies',
      component: ManagerCompaniesComponent,
    },
    {
      path: 'manager-user',
      component: ManagerCompaniesComponent,
    },
    /*
    {
      path: 'list',
      component: ListComponent,
    },
    {
      path: 'infinite-list',
      component: InfiniteListComponent,
    },
    {
      path: 'accordion',
      component: AccordionComponent,
    },
    {
      path: 'tabs',
      component: TabsComponent,
      children: [
        {
          path: '',
          redirectTo: 'tab1',
          pathMatch: 'full',
        },
        {
          path: 'tab1',
          component: Tab1Component,
        },
        {
          path: 'tab2',
          component: Tab2Component,
        },
      ],
    },
    */
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagerRoutingModule {
}
