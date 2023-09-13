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
  selector: 'ngx-attendence-queue',
  styleUrls: ['./attendence-queue.component.scss'],
  templateUrl: './attendence-queue.component.html',
})
export class AttendenceQueueComponent implements OnInit, OnDestroy {

  private sub: any = null;

  /*attendences = [
    {name: "Leonardo", password: 1, queue: "CARDIOLOGISTA"},
    {name: "Lais", password: 1, queue: "ATENDIMENTO"},
    {name: "Jonathan", password: 1, queue: "ECO"},
    {name: "Gessi", password: 1, queue: "AUDIOMETRIA"},
  ]; */

  private previousAttendenceId: string = null;
  startDay: boolean = true;
  attendences : Attendence[] = [];
  attendence : Attendence;

  constructor(private terminalService: TerminalsService,
              private queueService: QueueService,
              private attendenceService: AttendenceService,
              private toast: ToastService,
              private dialogService: NbDialogService) {
  }

  ngOnInit(): void {
    /*this.sub = EventEmitterService.get('clientCall').subscribe((callClient) => {
      console.log('Capturado evento: clientCall');

      this.attendence.client = callClient['client'] ? callClient['client']['name'] : ' - ';
      this.attendence.queue = callClient['queue'];
      this.attendence.terimnal = callClient['terminal'];
      this.attendence.password = callClient['password'];
    }); */


    this.getLasAttendence();
    this.sub = interval(10000).subscribe(() => {
      this.getLasAttendence();
    });

    this.getAttendences();
  }

  /**
   *
   * let objectCall = {
          queue: this.queue,
          terminal: this.terminal,
          client: this.attendence.client
        }
   */

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }


  getAttendences(){
    let attendenceFilter =  new AttendenceFilter();
    attendenceFilter.status = 'IN_ATTENDENCE';

    const dataAtualUTC = new Date();
    const dataStringUTC = this.convertDataToString(dataAtualUTC);

    attendenceFilter.dtCreated = dataStringUTC;

    this.attendenceService.getAttendencesHist(attendenceFilter)
      .then((attendences) => {
        this.attendences = attendences['attendence'];
      })
      .catch((response => {
        let status: NbComponentStatus = 'danger';
        let title = "Erro";
        this.toast.showToast(status, title, response.error['0'].mensagemUsuario);
      }));
  }

  getLasAttendence(){
    let attendenceFilter =  new AttendenceFilter();
    attendenceFilter.status = 'IN_ATTENDENCE';

    const dataAtualUTC = new Date();
    const dataStringUTC = this.convertDataToString(dataAtualUTC);

    attendenceFilter.dtCreated = dataStringUTC;

    this.attendenceService.getLastAttendenceHist(attendenceFilter)
      .then((attendence) => {
        if(attendence != null){
          console.log(JSON.stringify(attendence));

          if (!this.previousAttendenceId) {
            // Se é a primeira chamada, defina o ID anterior e toque a música
            this.previousAttendenceId = attendence['attendence'][0].attendenceId;
            this.playSong();
            this.attendence = attendence['attendence'][0];
            console.log("dentro do primerio valor: "+JSON.stringify(this.attendence));
          } else {
            const currentAttendenceId = attendence['attendence'][0].attendenceId;
            if (currentAttendenceId !== this.previousAttendenceId) {
              // Se o ID atual for diferente do anterior, toque a música
              this.attendence = attendence['attendence'][0];
              this.previousAttendenceId = currentAttendenceId;
              this.playSong();
              console.log("dentro do valor diferente: "+JSON.stringify(this.attendence));

            }
          }
        }
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


  convertDataToString(date: Date): string {

    const ano = date.getUTCFullYear();
    const mes = String(date.getUTCMonth() + 1).padStart(2, '0');
    const dia = String(date.getUTCDate()).padStart(2, '0');


    let hora = String(date.getUTCHours()).padStart(2, '0');
    let minutos = String(date.getUTCMinutes()).padStart(2, '0');
    let segundos = String(date.getUTCSeconds()).padStart(2, '0');

    if(this.startDay){
      hora = '00';
      minutos = '00';
      segundos = '00';
    }

    return `${ano}-${mes}-${dia}T${hora}:${minutos}:${segundos}Z`;
  }

}
