import { Queue } from './../../../../shared/model/queue';
import { ClientFilter } from './../../../../shared/model/clientFilter';
import { ClientService } from './../../../../shared/services/client.service';
import { Attendence } from '../../../../shared/model/attendence';
import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NbComponentStatus, NbDialogRef, NbDialogService } from '@nebular/theme';

import { ToastService } from '../../../toast.service';
import { Router } from '@angular/router';
import { AttendenceService } from '../../attendence.service';
import { Client } from '../../../../shared/model/client';
import { Observable, of } from 'rxjs';
import { FormControl } from '@angular/forms';
import { map } from 'rxjs/operators';
import { QueueService } from '../../../parameterization/queues/queues.service';
import { QueueFilter } from '../../../../shared/model/queueFilter';
import { AttendenceCreated } from '../../../../shared/model/attendenceCreated';
import { ClientDialogComponent } from '../client/client-dialog.component';
import { EventEmitterService } from '../../../../shared/services/event-emitter.service';

@Component({
  selector: 'ngx-attendence-dialog',
  templateUrl: 'attendence-dialog.component.html',
  styleUrls: ['attendence-dialog.component.scss'],
})
export class AttendenceDialogComponent implements OnInit, OnDestroy {


  @Input() attendence: Attendence;
  @Input() terminal: string;
  @Input() queue: string;
  roles = [];
  clients: Client[];
  queues: Queue[];
  listNameClients: string[];
  value: string;
  options: string[];
  queuesSelect: Queue[];

  client: Client[];

  attendenceCreated: AttendenceCreated;

  @ViewChild('autoInput') input;

  inputFormControl: FormControl = new FormControl();

  filteredControlOptions$: Observable<Client[]>;
  filteredOptions$: Observable<Client[]>;

  callAttendence: boolean = false;
  attended : boolean = false;

  private sub: any = null;

  constructor(
    protected ref: NbDialogRef<AttendenceDialogComponent>,
    private attendenceService: AttendenceService,
    private queueService: QueueService,
    private clientService: ClientService,
    private toast: ToastService,
    private dialogService: NbDialogService)
    {
      this.getClients(null);
      this.getQueues(null);
    }

  ngOnDestroy(): void {
    if(this.sub) this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.sub = EventEmitterService.get('clientRegistred').subscribe(() => {
      this.getClients(null);
    });
  }

  dismiss() {
    this.ref.close();
  }

  onSubmit() {
    if(this.attended){
      if(this.input){
        this.client = this.filter(this.input.nativeElement.value);
        this.attendenceService.registerAttendences(this.client[0].clientId, this.queuesSelect, this.attendence.password)
          .then(() => {
            let status: NbComponentStatus = 'success';
            let title = "Atendimento";
            this.toast.showToast(status, title, "Atendimento encaminhado");
        })
        .catch((response) => {
          let status: NbComponentStatus = 'danger';
          let title = "Erro";
          this.toast.showToast(status, title, response.error['0'].mensagemUsuario);
        });
      }

    }else{
      let status: NbComponentStatus = 'success';
      let title = "Atendimento";
      this.toast.showToast(status, title, "Atendimento encerrado");
    }

    EventEmitterService.get('attendencePerformed').emit(this.queue);
    this.ref.close();
  }

  getClients(filter: ClientFilter){
    this.clientService.getClients(filter)
      .then((clients) => {
        this.clients = clients['clients'];
        this.filteredControlOptions$ = of(this.clients);
        this.filteredControlOptions$ = this.inputFormControl.valueChanges
        .pipe(
          map(filterString => this.filter(filterString)),
        );
    })
    .catch((response) => {
      let status: NbComponentStatus = 'danger';
      let title = "Erro";
      this.toast.showToast(status, title, response.error['0'].mensagemUsuario);
    });
  }

  getQueues(filter: QueueFilter){
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



  private filter(value: string): Client[] {
    const filterValue = value.toLowerCase();

    return this.clients.filter(optionValue => optionValue.name.toLowerCase().includes(filterValue));
  }

  onChange() {
    this.filteredOptions$ = this.getFilteredOptions(this.input.nativeElement.value);
  }

  getFilteredOptions(value: string): Observable<Client[]> {
    return of(value).pipe(
      map(filterString => this.filter(filterString)),
    );
  }

  onSelectionChange($event) {
    this.filteredOptions$ = this.getFilteredOptions($event);
  }

  onAddClient(){
    this.dialogService.open(ClientDialogComponent, {
    });
  }

  onCallAttendence(){
    this.callAttendence = true;
    this.attendenceService.makeAttendence(this.queue, this.terminal, this.attendence.client ? this.attendence.client.clientId : "", this.attendence.attendenceId)
      .then(() => {
        let status: NbComponentStatus = 'info';
        let title = "Atendimento";
        this.toast.showToast(status, title, "Cliente Chamado");
    })
    .catch((response) => {
      let status: NbComponentStatus = 'danger';
      let title = "Erro";
      this.toast.showToast(status, title, response.error['0'].mensagemUsuario);
    });
  }

  onSendToQueuesAndFinalizeAttendence(){

    this.attended = true;
    this.onFinalizeAttendence();

    /*
    console.log(JSON.stringify(this.inputFormControl));
    console

    if(this.attendence.client || this.input.value){

    }else{
      let status: NbComponentStatus = 'warning';
        let title = "Aviso";
        this.toast.showToast(status, title, "Informe o cliente");
    }*/

  }

  onFinalizeAttendence(){
    this.attendenceService.finalizaAttendece(this.queue, this.attendence.client ? this.attendence.client.clientId : null, this.attendence.attendenceId)
      .then(() => {
        let status: NbComponentStatus = 'success';
        let title = "Atendimento";
        this.toast.showToast(status, title, "Atendimento Finalizado");
    })
    .catch((response) => {
      let status: NbComponentStatus = 'danger';
      let title = "Erro";
      this.toast.showToast(status, title, response.error['0'].mensagemUsuario);
    });
  }

  /*
  onModelChange2(value: string) {
    this.filteredNgModelOptions$ = of(this.filter2(value));
  }

  onModelChange(value: Client) {
    this.filteredNgModelOptions$ = of(this.filter(value));
  }

  private filter(value: Client): Client[] {
    console.log(value);
    return this.clients.filter(optionValue => optionValue.name.toLocaleLowerCase().includes(value.name.toLocaleLowerCase()));
  }

  onModelChange(client : Client){
    console.log(client);
    this.filteredNgModelOptions$ = of(this.filter(client));
  }
  */
}
