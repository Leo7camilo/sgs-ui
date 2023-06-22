import { FormBuilder } from '@angular/forms';

import { Component, Input } from '@angular/core';
import { NbComponentStatus, NbDialogRef } from '@nebular/theme';
import { PermissionService } from '../../../permissions/permissions.service';
import { ToastService } from '../../../../toast.service';
import { Router } from '@angular/router';
import { Permission } from '../../../../../shared/model/permission';
import { EventEmitterService } from '../../../../../shared/services/event-emitter.service';

@Component({
  selector: 'ngx-permission-dialog',
  templateUrl: 'permission-dialog.component.html',
  styleUrls: ['permission-dialog.component.scss'],
})
export class PermissionDialogComponent {

  @Input() permission: Permission;

  constructor(
    protected ref: NbDialogRef<PermissionDialogComponent>,
    private permissionService: PermissionService,
    private toast: ToastService,
    private router: Router)
    {

    }

  dismiss() {
    this.ref.close();
  }

  onSubmit(form: FormBuilder) {
    this.permissionService.updateRole(this.permission)
      .then(() => {
        let status: NbComponentStatus = 'success';
        let title = "Sucesso";
        this.toast.showToast(status, title, "Cadastro realizado com Sucesso!");
        EventEmitterService.get('roleUpdated').emit();
        this.ref.close();
      })
      .catch((response) => {
        let status: NbComponentStatus = 'danger';
        let title = "Erro";
        this.toast.showToast(status, title, response.error['0'].mensagemUsuario);
      });
  }


  /*
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
  */
}
