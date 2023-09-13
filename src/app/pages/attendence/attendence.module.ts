import { Attendence } from './../../shared/model/attendence';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NbAccordionModule,
  NbActionsModule,
  NbAutocompleteModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule,
  NbIconModule,
  NbInputModule,
  NbListModule,
  NbPopoverModule,
  NbRadioModule,
  NbRouteTabsetModule,
  NbSearchModule,
  NbSelectModule,
  NbTabsetModule, NbTooltipModule, NbTreeGridModule, NbUserModule,
} from '@nebular/theme';

import { AttendenceRoutingModule } from './attendence-routing.module'
import { AttendenceDialogComponent } from './modal/dialog/attendence-dialog.component';
import { ClientDialogComponent } from './modal/client/client-dialog.component';
import { AttendenceComponent } from './attendence.component';
import { AttendenceCallComponent } from './attendence-call/attendence-call.component';
import { AttendenceConsultComponent } from './attendence-consult/attendence-consult.component';
import { AttendenceQueueComponent } from './attendence-queue/attendence-queue.component';

import { ClientAttendencePipe } from '../../shared/pipes/clientAttendencePipe';
import { NullResultPipe } from '../../shared/pipes/nullResultPipe';
import { QueueAttendencePipe } from '../../shared/pipes/queueAttendencePipe';
import { TerminalAttendencePipe } from '../../shared/pipes/terminalAttendencePipe';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ThemeModule,
    NbTabsetModule,
    NbRouteTabsetModule,
    NbCardModule,
    NbButtonModule,
    NbListModule,
    NbAccordionModule,
    NbUserModule,
    Ng2SmartTableModule,
    NbSelectModule,
    NbCheckboxModule,
    NbPopoverModule,
    NbInputModule,
    NbTooltipModule,
    NbActionsModule,
    NbRadioModule,
    NbDatepickerModule,
    NbIconModule,
    NbSearchModule,
    NbAutocompleteModule,
    AttendenceRoutingModule,
    NbTreeGridModule,

  ],
  declarations: [
    AttendenceQueueComponent,
    AttendenceConsultComponent,
    AttendenceCallComponent,
    AttendenceComponent,
    AttendenceDialogComponent,
    ClientDialogComponent,
    ClientAttendencePipe,
    NullResultPipe,
    QueueAttendencePipe,
    TerminalAttendencePipe
  ],
  providers: [
  ],
})
export class AttendenceModule { }
