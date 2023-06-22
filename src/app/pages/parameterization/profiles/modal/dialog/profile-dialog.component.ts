import { QueueService } from './../../../queues/queues.service';

import { Component, Input } from '@angular/core';
import { NbComponentStatus, NbDialogRef } from '@nebular/theme';
import { Profile } from '../../../../../shared/model/profile';
import { PermissionFilter } from '../../../../../shared/model/permissionFilter';
import { PermissionService } from '../../../permissions/permissions.service';
import { ToastService } from '../../../../toast.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EventEmitterService } from '../../../../../shared/services/event-emitter.service';

@Component({
  selector: 'ngx-profile-dialog',
  templateUrl: 'profile-dialog.component.html',
  styleUrls: ['profile-dialog.component.scss'],
})
export class ProfileDialogComponent {

  @Input() profile: Profile;
  roles = [];
  queues = [];

  constructor(
    protected ref: NbDialogRef<ProfileDialogComponent>,
    private permissionService: PermissionService,
    private queueService: QueueService,
    private toast: ToastService,
    private router: Router)
    {
      this.getQueues(null);
    }

  dismiss() {
    this.ref.close();
  }

  onSubmit() {
    this.permissionService.grantPermission(this.profile).then(() => {
      let status: NbComponentStatus = 'success';
      let title = "Sucesso";
      this.toast.showToast(status, title, "Cadastro alterado com Sucesso!");
      EventEmitterService.get('profileUpdated').emit();
      this.ref.close();
    }).catch((response) => {
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

  getQueues(filter: PermissionFilter){
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


  /*
   onSubmit(form: FormGroup) {
    this.terminalsService.updateTerminal(form)
    .then(() => {
      let status: NbComponentStatus = 'success';
      let title = "Sucesso";
      this.toast.showToast(status, title, "Cadastro alterado com Sucesso!");
      this.ref.close();
     // this.terminalChange.emit();
      this.router.navigate(['/pages/parameterization/terminalsdasdasd']).then(() =>
        {
          this.router.navigate(['/pages/parameterization/terminals']);
        }
      );

    })
    .catch((response) => {
      let status: NbComponentStatus = 'danger';
      let title = "Erro";
      console.log(response)
      this.toast.showToast(status, title, response.error['0'].mensagemUsuario);
    });
  }
  */
}
