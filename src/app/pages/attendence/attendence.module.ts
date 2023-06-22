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
  NbTabsetModule, NbTooltipModule, NbUserModule,
} from '@nebular/theme';


import { AttendenceDialogComponent } from './modal/dialog/attendence-dialog.component';
import { ClientDialogComponent } from './modal/client/client-dialog.component';
import { AttendenceComponent } from './attendence.component';

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
    NbAutocompleteModule
  ],
  declarations: [
    AttendenceComponent,
    AttendenceDialogComponent,
    ClientDialogComponent
  ],
  providers: [
  ],
})
export class AttendenceModule { }
