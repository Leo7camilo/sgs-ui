import { NgxStatusComponent } from '../../../shared/status.component';
import { AttendenceFilter } from '../../../shared/model/attendenceFilter';
import { AttendenceService } from './attendence.service';
import { TerminalsService } from '../../parameterization/terminals/terminals.service';
import {Component, OnDestroy, OnInit} from '@angular/core';
import { NbComponentStatus, NbDialogService, NbThemeService } from '@nebular/theme';
import { TerminalFilter } from '../../../shared/model/terminalFilter';
import { ToastService } from '../../toast.service';
import { QueueFilter } from '../../../shared/model/queueFilter';
import { QueueService } from '../../parameterization/queues/queues.service';
import { LocalDataSource } from 'ng2-smart-table';
import { AttendenceDialogComponent } from '../modal/dialog/attendence-dialog.component';
import { Queue } from '../../../shared/model/queue';
import { Terminal } from '../../../shared/model/terminal';
import { EventEmitterService } from '../../../shared/services/event-emitter.service';
import { Attendence } from '../../../shared/model/attendence';
import * as internal from 'stream';
import { interval } from 'rxjs';


@Component({
  selector: 'ngx-attendence-password',
  styleUrls: ['./attendence-password.component.scss'],
  templateUrl: './attendence-password.component.html',
})
export class AttendencePasswordComponent {

  password: number = 0;

  constructor(
              private attendenceService: AttendenceService,
              private toast: ToastService) {
  }

  getPassword(){
    this.attendenceService.getPassword()
      .then((password) => {
        this.password = password['password'];
        let status: NbComponentStatus = 'success';
        let title = "Senha";
        this.toast.showToast(status, title, "Senha Gerada");
      })
      .catch((response => {
        let status: NbComponentStatus = 'danger';
        let title = "Erro";
        this.toast.showToast(status, title, response.error['0'].mensagemUsuario);
      }));
  }

  playSong(){
    const audio = new Audio();
      audio.src = '/assets/song/som-atendimento.mp3';
      audio.load();
      audio.play();
  }

}
