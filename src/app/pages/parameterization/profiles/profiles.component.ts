import { ProfilesService } from './profiles.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbComponentStatus, NbDialogService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { ToastService } from '../../toast.service';
import { ProfileDialogComponent } from './modal/dialog/profile-dialog.component';
import { EventEmitterService } from '../../../shared/services/event-emitter.service';

@Component({
  selector: 'ngx-profiles',
  templateUrl: 'profiles.component.html',
  styleUrls: ['profiles.component.scss'],
})
export class ProfilesComponent implements OnInit {

  firstForm: FormGroup;
  secondForm: FormGroup;
  thirdForm: FormGroup;

  totalItens = 0;

  source: LocalDataSource = new LocalDataSource();
  private sub: any = null;

  constructor(
    private fb: FormBuilder,
    private toast: ToastService,
    private profileService: ProfilesService,
    private dialogService: NbDialogService
    ) {
      this.getProfiles(null);
  }

  ngOnInit() {
    this.firstForm = this.fb.group({
      firstCtrl: ['', Validators.required],
    });

    this.secondForm = this.fb.group({
      secondCtrl: ['', Validators.required],
    });

    this.sub = EventEmitterService.get('profileUpdated').subscribe(() => {
      this.getProfiles(null);
    });
  }

  onFirstSubmit() {
    this.firstForm.markAsDirty();
  }

  onSecondSubmit() {
    this.secondForm.markAsDirty();
    this.profileService.registerProfile(this.firstForm.value.firstCtrl)
      .then(() => {
        let status: NbComponentStatus = 'success';
        let title = "Sucesso";
        this.toast.showToast(status, title, "Cadastro realizado com Sucesso!");
        this.getProfiles(null);
      })
      .catch((response) => {
        let status: NbComponentStatus = 'danger';
        let title = "Erro";
        console.log(response)
        this.toast.showToast(status, title, response.error['0'].mensagemUsuario);
      });
  }

  getProfiles(filter: null) {
    this.profileService.getProfiles(filter)
      .then((profiles) => {
        this.source.load(profiles['profiles']);
        this.totalItens = profiles['total'];
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
    noDataMessage: "Nenhum perfil encontrado",
    columns: {
      profileId: {
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
      dtChange: {
        title: 'Data de Alteração',
        type: 'string',
      },
      queues: {
        title: 'Filas c/ permissão',
        type: 'string',
        valuePrepareFunction: (data) => {
          console.log(data);
          if(data){
            let formatedQueues = "";
            data.forEach(element => {
              formatedQueues += element.description + '| ';
            });
            formatedQueues = formatedQueues.substring(0, formatedQueues.length-2);
            return formatedQueues;
          }else{
            return "";
          }
        }
      }
    },
  };

  transform(){

  }

  onSelectElement(event): void{
    console.log(event.data);

    this.dialogService.open(ProfileDialogComponent, {
      context: {
        profile: event.data,
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







