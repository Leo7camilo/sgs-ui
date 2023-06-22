import { UsersComponent } from './users/users.component';
import { ParameterizationRoutingModule } from './parameterization-routing.module';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NbAccordionModule,
  NbActionsModule,
  NbButtonModule,
  NbCalendarModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule,
  NbIconModule,
  NbInputModule,
  NbListModule,
  NbPopoverModule,
  NbRadioModule,
  NbRouteTabsetModule,
  NbSelectModule,
  NbStepperModule,
  NbTabsetModule, NbTooltipModule, NbUserModule,
} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { TerminalsComponent } from './terminals/terminals.component';
import { ParameterizationComponent } from './parameterization.component';
import { QueuesComponent } from './queues/queues.component';
import { ProfilesComponent } from './profiles/profiles.component';
import { PermissionsComponent } from './permissions/permissions.component';
import { ProfileDialogComponent } from './profiles/modal/dialog/profile-dialog.component';
import { TerminalDialogComponent } from './terminals/modal/dialog/terminal-dialog.component';
import { PermissionDialogComponent } from './permissions/modal/dialog/permission-dialog.component';
import { QueueDialogComponent } from './queues/model/dialog/queue-dialog.component';


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
    ParameterizationRoutingModule,
    Ng2SmartTableModule,
    NbCheckboxModule,
    NbPopoverModule,
    NbInputModule,
    NbSelectModule,
    NbTooltipModule,
    NbStepperModule,
    NbActionsModule,
    NbUserModule,
    NbRadioModule,
    NbDatepickerModule,
    NbIconModule,
    NbCalendarModule
  ],
  declarations: [
    ParameterizationComponent,
    TerminalsComponent,
    QueuesComponent,
    ProfilesComponent,
    PermissionsComponent,
    UsersComponent,
    ProfileDialogComponent,
    TerminalDialogComponent,
    PermissionDialogComponent,
    QueueDialogComponent
  ],
  providers: [

  ],
})
export class ParameterizationModule { }
