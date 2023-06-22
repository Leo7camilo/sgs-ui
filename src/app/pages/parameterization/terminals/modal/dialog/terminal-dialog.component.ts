import { FormGroup } from '@angular/forms';
import { TerminalsService } from './../../terminals.service';

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NbComponentStatus, NbDialogRef } from '@nebular/theme';
import { ToastService } from '../../../../toast.service';
import { Terminal } from '../../../../../shared/model/terminal';
import { Router } from '@angular/router';
import { EventEmitterService } from '../../../../../shared/services/event-emitter.service';

@Component({
  selector: 'ngx-terminal-dialog',
  templateUrl: 'terminal-dialog.component.html',
  styleUrls: ['terminal-dialog.component.scss'],
})
export class TerminalDialogComponent {

  @Input() terminal: Terminal;

  constructor(
    protected ref: NbDialogRef<TerminalDialogComponent>,
    private terminalsService: TerminalsService,
    private toast: ToastService,
    private router: Router)
    {
    }

  dismiss() {
    this.ref.close();
  }

  onSubmit(form: FormGroup) {
    this.terminalsService.updateTerminal(form)
    .then(() => {
      let status: NbComponentStatus = 'success';
      let title = "Sucesso";
      this.toast.showToast(status, title, "Cadastro alterado com Sucesso!");
      this.ref.close();
      EventEmitterService.get('terminalUpdated').emit();
    })
    .catch((response) => {
      let status: NbComponentStatus = 'danger';
      let title = "Erro";
      console.log(response)
      this.toast.showToast(status, title, response.error['0'].mensagemUsuario);
    });
  }

}
