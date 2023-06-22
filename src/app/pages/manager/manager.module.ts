import { ManagerRoutingModule } from './manager-routing.module';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NbAccordionModule,
  NbButtonModule,
  NbCardModule,
  NbListModule,
  NbRouteTabsetModule,
  NbStepperModule,
  NbTabsetModule, NbUserModule,
} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { ManagerComponent } from './manager.component';
import { ManagerCompaniesComponent } from './manager-companies/manager-companies.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';


@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ThemeModule,
    NbTabsetModule,
    NbRouteTabsetModule,
    NbStepperModule,
    NbCardModule,
    NbButtonModule,
    NbListModule,
    NbAccordionModule,
    NbUserModule,
    ManagerRoutingModule,
    Ng2SmartTableModule
  ],
  declarations: [
    ManagerComponent,
    ManagerCompaniesComponent
  ],
  providers: [

  ],
})
export class ManagerModule { }
