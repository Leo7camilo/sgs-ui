import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbComponentStatus, NbDialogService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { PermissionFilter } from '../../../shared/model/permissionFilter';
import { ToastService } from '../../toast.service';
import { PermissionDialogComponent } from './modal/dialog/permission-dialog.component';
import { PermissionService } from './permissions.service';
import { EventEmitterService } from '../../../shared/services/event-emitter.service';

@Component({
  selector: 'ngx-permissions',
  templateUrl: 'permissions.component.html',
  styleUrls: ['permissions.component.scss'],
})
export class PermissionsComponent implements OnInit {

  firstForm: FormGroup;
  secondForm: FormGroup;
  thirdForm: FormGroup;

  totalItens = 0;

  source: LocalDataSource = new LocalDataSource();
  private sub: any = null;

  constructor(
    private fb: FormBuilder,
    private toast: ToastService,
    private permissionService: PermissionService,
    private dialogService: NbDialogService
    ) {
      this.getPermissions(null);
  }


  ngOnInit() {
    this.firstForm = this.fb.group({
      firstCtrl: ['', Validators.required],
    });

    this.secondForm = this.fb.group({
      secondCtrl: ['', Validators.required],
    });

    this.thirdForm = this.fb.group({
      thirdCtrl: ['', Validators.required],
    });

    this.sub = EventEmitterService.get('roleUpdated').subscribe(() => {
      this.getPermissions(null);
    });
  }

  onFirstSubmit() {
    this.firstForm.markAsDirty();
  }

  onSecondSubmit() {
    this.secondForm.markAsDirty();

    this.permissionService.registerRole(this.firstForm.value.firstCtrl)
      .then(() => {
        let status: NbComponentStatus = 'success';
        let title = "Sucesso";
        this.toast.showToast(status, title, "Cadastro realizado com Sucesso!");
        this.getPermissions(null);
      })
      .catch((response) => {
        let status: NbComponentStatus = 'danger';
        let title = "Erro";
        console.log(response)
        this.toast.showToast(status, title, response.error['0'].mensagemUsuario);
      });

  }

  getPermissions(filter: PermissionFilter) {
    this.permissionService.getRoles(filter)
      .then((roles) => {
        this.source.load(roles['roles']);
        this.totalItens = roles['total'];
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
    noDataMessage: "Nenhuma permissão encontrada",
    columns: {
      roleId: {
        title: 'ID',
        type: 'string',
      },
      description: {
        title: 'Descrição',
        type: 'string',
      },
      dtUpdate: {
        title: 'Data de Atualização',
        type: 'string',
      }
    },
  };

  onSelectElement(event): void{
    this.dialogService.open(PermissionDialogComponent, {
      context: {
        permission: event.data,
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







