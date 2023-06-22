import { TerminalFilter } from './../../../shared/model/terminalFilter';
import { TerminalsService } from './terminals.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbComponentStatus, NbDialogService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { ToastService } from '../../toast.service';
import { TerminalDialogComponent } from './modal/dialog/terminal-dialog.component';
import { EventEmitterService } from '../../../shared/services/event-emitter.service';

@Component({
  selector: 'ngx-terminals',
  templateUrl: 'terminals.component.html',
  styleUrls: ['terminals.component.scss'],
})
export class TerminalsComponent implements OnInit {

  firstForm: FormGroup;
  secondForm: FormGroup;
  totalItens = 0;

  source: LocalDataSource = new LocalDataSource();

  private sub: any = null;

  constructor(
    private fb: FormBuilder,
    private toast: ToastService,
    private terminalService: TerminalsService,
    private dialogService: NbDialogService
    ) {
      this.getTerminals(null);
  }

  ngOnInit() {
    this.firstForm = this.fb.group({
      firstCtrl: ['', Validators.required],
    });

    this.secondForm = this.fb.group({
      secondCtrl: ['', Validators.required],
    });

    this.sub = EventEmitterService.get('terminalUpdated').subscribe(() => {
      this.getTerminals(null);
    });
  }

  onFirstSubmit() {
    this.firstForm.markAsDirty();
  }

  onSecondSubmit() {
    this.secondForm.markAsDirty();
    this.terminalService.registerTerminal(this.firstForm.value.firstCtrl)
      .then(() => {
        let status: NbComponentStatus = 'success';
        let title = "Sucesso";
        this.toast.showToast(status, title, "Cadastro realizado com Sucesso!");
        this.getTerminals(null);
      })
      .catch((response) => {
        let status: NbComponentStatus = 'danger';
        let title = "Erro";
        console.log(response)
        this.toast.showToast(status, title, response.error['0'].mensagemUsuario);
      });
  }

  getTerminals(filter: TerminalFilter) {
    this.terminalService.getTerminals(filter)
      .then((terminals) => {
        this.source.load(terminals['terminals']);
        this.totalItens = terminals['total'];
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
    noDataMessage: "Nenhum terminal encontrado",
    columns: {
      terminalId: {
        title: 'ID',
        type: 'string',
      },
      name: {
        title: 'Nome',
        type: 'string',
      },
      status: {
        title: 'Status',
        type: 'string',
      },
      dtChange: {
        title: 'Data Atualização',
        type: 'string',
      }
    },
  };

  onSelectElement(event): void{
    this.dialogService.open(TerminalDialogComponent, {
      context: {
        terminal: event.data,
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







