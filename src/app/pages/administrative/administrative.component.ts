import { StatusComponent } from './../../shared/status.component';
import { AttendenceFilter } from './../../shared/model/attendenceFilter';
import { TerminalsService } from './../parameterization/terminals/terminals.service';
import {Component, OnDestroy} from '@angular/core';
import { NbComponentStatus, NbDialogService } from '@nebular/theme';
import { TerminalFilter } from '../../shared/model/terminalFilter';
import { ToastService } from '../toast.service';
import { QueueFilter } from '../../shared/model/queueFilter';
import { QueueService } from '../parameterization/queues/queues.service';
import { LocalDataSource } from 'ng2-smart-table';
import { Queue } from '../../shared/model/queue';
import { Terminal } from '../../shared/model/terminal';
import { AttendenceService } from '../attendence/attendence.service';

@Component({
  selector: 'ngx-administrative',
  styleUrls: ['./administrative.component.scss'],
  templateUrl: './administrative.component.html',
})
export class AdministrativeComponent implements OnDestroy {

  terminals = [];
  terminal: Terminal;
  queues = [];
  queue: Queue;
  isSelected = false;

  amountAttendence: number = 0;

  source: LocalDataSource = new LocalDataSource();


  constructor(private terminalService: TerminalsService,
              private queueService: QueueService,
              private attendenceService: AttendenceService,
              private toast: ToastService,
              private dialogService: NbDialogService) {
    this.getTerminals(null);
    this.getQueues(null);
    this.countAttendenceInTheMoment();
  }

  countAttendenceInTheMoment() {
    this.attendenceService.countAttendenceInTheCompany()
      .then((amountAttendence) => {
        console.log(amountAttendence);
        this.amountAttendence = amountAttendence['value'];
      })
      .catch((response) => {
        let status: NbComponentStatus = 'danger';
        let title = "Erro";
        this.toast.showToast(status, title, response.error['0'].mensagemUsuario);
      })
  }

  ngOnDestroy() {

  }

  onChangeQueue(queueId : string){
    let attendenceFilter = new AttendenceFilter();
      attendenceFilter.queueId = queueId;
      attendenceFilter.status = 'WAITING';

   /* this.attendenceService.getAttendence(attendenceFilter)
      .then((attendences) => {
        this.source.load(attendences['attendence']);
        this.isSelected = true;
    })
    .catch((response) => {
      let status: NbComponentStatus = 'danger';
      let title = "Erro";
      this.toast.showToast(status, title, response.error['0'].mensagemUsuario);
    }); */
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
    columns: {
      attendenceId: {
        title: 'ID',
        type: 'string',
      },
      password: {
        title: 'Senha',
        type: 'number',
      },
      queueId: {
        title: 'ID da fila',
        type: 'string',
      },
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
        renderComponent: StatusComponent
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
    /*this.dialogService.open(AttendenceDialogComponent, {
      context: {
        attendence: event.data,
        queue: this.queue.toString(),
        terminal: this.terminal.toString()
      },
    });*/
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
