import { QueueService } from './queues.service';
import { Queue } from './../../../shared/model/queue';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { NbComponentStatus, NbDialogService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { ToastService } from '../../toast.service';
import { PermissionService } from '../permissions/permissions.service';
import { PermissionFilter } from '../../../shared/model/permissionFilter';
import { QueueDialogComponent } from './model/dialog/queue-dialog.component';
import { QueueFilter } from '../../../shared/model/queueFilter';

@Component({
  selector: 'ngx-queues',
  templateUrl: 'queues.component.html',
  styleUrls: ['queues.component.scss'],
})
export class QueuesComponent implements OnInit {

  queue: Queue = new Queue();

  roles = [];
  filter: PermissionFilter;
  totalItens = 0;

  firstForm: FormGroup;
  secondForm: FormGroup;
  thirdForm: FormGroup;

  source: LocalDataSource = new LocalDataSource();

  constructor(
    private fb: FormBuilder,
    private toast: ToastService,
    private queueService: QueueService,
    private permissionService: PermissionService,
    private dialogService: NbDialogService
    ) {
      this.getRoles(null);
      this.getQueues(null);
  }

  ngOnInit() {
      console.log("ngOnInit");
  }

  salvar(queueForm: NgForm){
    this.queueService.registerQueue(queueForm.form.controls.description.value,
                                    queueForm.form.controls.priority.value, queueForm.form.controls.role.value)
    .then(() => {
      let status: NbComponentStatus = 'success';
      let title = "Sucesso";
      this.toast.showToast(status, title, "Cadastro realizado com Sucesso!");
      this.getQueues(null);
    })
    .catch((response) => {
      let status: NbComponentStatus = 'danger';
      let title = "Erro";
      console.log(response)
      this.toast.showToast(status, title, response.error['0'].mensagemUsuario);
    });
  }

  getRoles(filter: PermissionFilter){
    this.permissionService.getRoles(filter)
      .then((roles) => {
        this.roles = roles['roles'];
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
        this.source.load(queues['queues']);
        this.totalItens = queues['total'];
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
      delete: false    //  if you want to remove delete button
    },
    noDataMessage: "Nenhuma fila encontrada",
    columns: {
      queueId: {
        title: 'ID',
        type: 'string',
      },
      description: {
        title: 'Descrição',
        type: 'string',
      },
      status: {
        title: 'Status',
        type: 'string',
      },
      priority: {
        title: 'Prioridade',
        type: 'number',
      }
    },
  };

  onSelectElement(event): void{
    this.dialogService.open(QueueDialogComponent, {
      context: {
        queue: event.data,
      },
    });

  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}







