import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { NgxAuthModule } from './auth/auth.module';
import { AdministrativeModule } from './administrative/administrative.module';
import { AttendenceModule } from './attendence/attendence.module';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    MiscellaneousModule,
    NgxAuthModule,
    AdministrativeModule,
    AttendenceModule
  ],
  declarations: [
    PagesComponent,
  ],
})
export class PagesModule {
}
