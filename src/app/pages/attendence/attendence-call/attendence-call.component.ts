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

interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
}

@Component({
  selector: 'ngx-attendence',
  styleUrls: ['./attendence-call.component.scss'],
  templateUrl: './attendence-call.component.html',
})
export class AttendenceCallComponent implements OnInit, OnDestroy {

  private sub: any = null;

  terminals = [];
  terminal: Terminal;
  queues = [];
  queue: Queue;
  isSelected = false;

  source: LocalDataSource = new LocalDataSource();

  constructor(private terminalService: TerminalsService,
              private queueService: QueueService,
              private attendenceService: AttendenceService,
              private toast: ToastService,
              private dialogService: NbDialogService) {
    this.getTerminals(null);
    this.getQueues(null);
  }

  ngOnInit(): void {
    this.sub = EventEmitterService.get('attendencePerformed').subscribe((queueId) => {
      this.onChangeQueue(queueId);
    });
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }

  onChangeQueue(queueId : string){
    let attendenceFilter = new AttendenceFilter();
      attendenceFilter.queueId = queueId;
      attendenceFilter.status = 'WAITING';

    this.attendenceService.getAttendence(attendenceFilter)
      .then((attendences) => {
        this.source.load(attendences['attendence']);
        this.isSelected = true;
    })
    .catch((response) => {
      let status: NbComponentStatus = 'danger';
      let title = "Erro";
      this.toast.showToast(status, title, response.error['0'].mensagemUsuario);
    });
  }

  getTerminals(filter: TerminalFilter) {
    this.terminalService.getTerminals(filter)
      .then((terminals) => {
        this.terminals = terminals['terminals'];
    })
    .catch((response) => {
      let status: NbComponentStatus = 'danger';
      let title = "Erro";
      this.toast.showToast(status, title, response.error['0'].mensagemUsuario);
    });
  }

  getQueues(filter: QueueFilter) {
    this.queueService.getQueues(filter)
      .then((queues) => {
        this.queues = queues['queues'];
    })
    .catch((response) => {
      let status: NbComponentStatus = 'danger';
      let title = "Erro";
      this.toast.showToast(status, title, response.error['0'].mensagemUsuario);
    });
  }

  settings = {
    hideSubHeader: true,
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    actions: {
      add: false,      //  if you want to remove add button
      edit: false,     //  if you want to remove edit button
      delete: false,    //  if you want to remove delete button
    },
    noDataMessage: "Nenhum atendimento encontrado",
    columns: {
      /*attendenceId: {
        title: 'ID',
        type: 'string',
      },*/
      password: {
        title: 'Senha',
        type: 'number',
      },
      /*queueId: {
        title: 'ID da fila',
        type: 'string',
      },*/
      client: {
        title: 'Cliente',
        type: 'string',
        valuePrepareFunction: (data) => {
          if(data){
            return data.name;
          }else{
            return "";
          }
        }
      },
      status: {
        title: 'Status',
        type: 'string',

        valuePrepareFunction: (data) => {
          switch(data) {
            case "NOT_FIT": return "INAPTO"
            case "WAITING": return "AGUARDANDO"
            case "IN_ATTENDENCE": return "EM ATENDIMENTO"
            case "ATTENDED": return "ATENDIDO"
            default:  return "";
          }
        }
      },
      dtCreated: {
        title: 'Data de Entrada na Fila',
        type: 'string',
      },
      terminal: {
        title: 'Terminal de Atendimento',
        type: 'string',
        valuePrepareFunction: (data) => {
          if(data){
            return data.name;
          }else{
            return "";
          }
        }
      }
    },
  };

  onSelectElement(event): void{
    console.log(JSON.stringify(this.queue));
    console.log(JSON.stringify(this.terminal));

    if(!this.queue){
      let status: NbComponentStatus = 'warning';
      let title = "Aviso";
      this.toast.showToast(status, title, "Selecione uma Fila");
    }else if(!this.terminal){
      let status: NbComponentStatus = 'warning';
      let title = "Aviso";
      this.toast.showToast(status, title, "Selecione Terminal");
    }else{
      this.dialogService.open(AttendenceDialogComponent, {
        context: {
          attendence: event.data,
          queue: this.queue.toString(),
          terminal: this.terminal.toString()
        },
      });
    }
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
