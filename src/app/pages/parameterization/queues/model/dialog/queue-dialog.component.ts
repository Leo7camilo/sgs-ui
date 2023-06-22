import { Queue } from './../../../../../shared/model/queue';

import { Component, Input } from '@angular/core';
import { NbComponentStatus, NbDialogRef } from '@nebular/theme';
import { PermissionFilter } from '../../../../../shared/model/permissionFilter';
import { PermissionService } from '../../../permissions/permissions.service';
import { ToastService } from '../../../../toast.service';
import { Router } from '@angular/router';
import { EventEmitterService } from '../../../../../shared/services/event-emitter.service';

@Component({
  selector: 'ngx-queue-dialog',
  templateUrl: 'queue-dialog.component.html',
  styleUrls: ['queue-dialog.component.scss'],
})
export class QueueDialogComponent {

  @Input() queue: Queue;
  roles = [];

  constructor(
    protected ref: NbDialogRef<QueueDialogComponent>,
    private permissionService: PermissionService,
    private toast: ToastService,
    private router: Router)
    {
      this.getRoles(null);

    }

  dismiss() {
    this.ref.close();
  }

  onSubmit() {




    //EventEmitterService.get('queueUpdated').emit();

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

}
