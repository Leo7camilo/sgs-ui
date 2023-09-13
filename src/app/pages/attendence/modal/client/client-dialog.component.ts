import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { NbComponentStatus, NbDialogRef, NbDialogService } from '@nebular/theme';

import { ToastService } from '../../../toast.service';
import { Client } from '../../../../shared/model/client';
import { ClientService } from './../../../../shared/services/client.service';
import { EventEmitterService } from '../../../../shared/services/event-emitter.service';

@Component({
  selector: 'ngx-client-dialog',
  templateUrl: 'client-dialog.component.html',
  styleUrls: ['client-dialog.component.scss'],
})
export class ClientDialogComponent {

  client: Client = new Client;

  constructor(
    protected ref: NbDialogRef<ClientDialogComponent>,
    private toast: ToastService,
    private dialogService: NbDialogService,
    private clientService: ClientService,
    private router: Router)
    {}

  dismiss() {
    this.ref.close();
  }

  onSubmit(){
    this.clientService.registerClient(this.client)
      .then(() => {
        let status: NbComponentStatus = 'success';
        let title = "Sucesso";
        this.toast.showToast(status, title, "Cadastro realizado com Sucesso!");
        this.ref.close();
        EventEmitterService.get('clientRegistred').emit();
        console.log("Emitindo evento: clientRegistred");
      }
    )
    .catch((response) => {
      let status: NbComponentStatus = 'danger';
      let title = "Erro";
      this.toast.showToast(status, title, response.error['0'].mensagemUsuario);
    });
  }

}
