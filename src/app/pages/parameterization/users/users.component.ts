import { UsersService } from './users.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { NbComponentStatus } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { ToastService } from '../../toast.service';
import { PermissionService } from '../permissions/permissions.service';
import { PermissionFilter } from '../../../shared/model/permissionFilter';
import { User } from '../../../shared/model/user';
import { ProfilesService } from '../profiles/profiles.service';

@Component({
  selector: 'ngx-users',
  templateUrl: 'users.component.html',
  styleUrls: ['users.component.scss'],
})
export class UsersComponent implements OnInit {

  user: User = new User();

  roles = [];
  profiles = [];
  filter: PermissionFilter;
  totalItens = 0;

  firstForm: FormGroup;
  secondForm: FormGroup;
  thirdForm: FormGroup;

  source: LocalDataSource = new LocalDataSource();

  userTypes = ['EMPLOYEE', 'OWNER'];

  constructor(
    private fb: FormBuilder,
    private toast: ToastService,
    private usersService: UsersService,
    private profileService: ProfilesService,
    private permissionService: PermissionService,
    ) {
      this.getProfiles(null);
      this.getRoles(null);
      this.getUsers(null);
  }

  ngOnInit() {
  }

  salvar(userForm: NgForm){

    console.log(userForm.value);

    this.usersService.registerUser(userForm.value)
      .then(() => {
        let status: NbComponentStatus = 'success';
        let title = "Sucesso";
        this.toast.showToast(status, title, "Cadastro realizado com Sucesso!");
        this.getUsers(null);
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

  getUsers(filter: PermissionFilter) {
    this.usersService.getUsers(filter)
      .then((users) => {
        this.source.load(users['users']);
        this.totalItens = users['total'];
    })
    .catch((response) => {
      let status: NbComponentStatus = 'danger';
      let title = "Erro";
      this.toast.showToast(status, title, response.error['0'].mensagemUsuario);
    });
  }

  /*
  getQueues(filter: PermissionFilter) {
    this.usersService.getQueues(filter)
      .then((queues) => {
        this.source.load(queues['queues']);
        this.totalItens = queues['total'];
    })
    .catch((response) => {
      let status: NbComponentStatus = 'danger';
      let title = "Erro";
      this.toast.showToast(status, title, response.error['0'].mensagemUsuario);
    });
  }*/

  getProfiles(filter: PermissionFilter) {
    this.profileService.getProfiles(filter)
      .then((profiles) => {
        this.source.load(profiles['profiles']);
        this.totalItens = profiles['total'];
        this.profiles = profiles['profiles'];
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
    noDataMessage: "Nenhum usuário encontrado",
    columns: {
      userId: {
        title: 'ID',
        type: 'string',
      },
      username: {
        title: 'Nome do Usuário',
        type: 'string',
      },
      fullName: {
        title: 'Nome Completo',
        type: 'string',
      },
      document: {
        title: 'Documento',
        type: 'number',
      },
      email: {
        title: 'Email',
        type: 'string',
      },
      userType: {
        title: 'Tipo de Usuário',
        type: 'string',
      },
      dtCreated: {
        title: 'Data de Criação',
        type: 'string',
      },
      dtUpdated: {
        title: 'Data de Alteração',
        type: 'string',
      },
      userStatus: {
        title: 'Status',
        type: 'string',
      },
    },
  };

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}







