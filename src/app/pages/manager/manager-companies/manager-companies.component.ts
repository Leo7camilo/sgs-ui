import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbComponentStatus } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableData } from '../../../@core/data/smart-table';
import { CompanyFilter } from '../../../shared/model/companyFilter';

import Utils from '../../../shared/utils/utils';
import { ToastService } from '../../toast.service';
import { ManagerService } from '../manager.service';

@Component({
  selector: 'ngx-manager-companies',
  templateUrl: 'manager-companies.component.html',
  styleUrls: ['manager-companies.component.scss'],
})
export class ManagerCompaniesComponent implements OnInit {

  firstForm: FormGroup;
  secondForm: FormGroup;
  thirdForm: FormGroup;
  source: LocalDataSource = new LocalDataSource();

  pageSize = 5;
  totalItens = 0;
  currentPage = 0;

  constructor(
    private fb: FormBuilder,
    private managerService: ManagerService,
    private toast: ToastService) {
      this.getCompanies(null);
    }

  ngOnInit() {
    this.firstForm = this.fb.group({
      firstCtrl: ['', Validators.required],
    });

    this.secondForm = this.fb.group({
      secondCtrl: [null, Utils.validatorsCPF_CNPJ],
    });

    this.thirdForm = this.fb.group({
      thirdCtrl: ['', Validators.required],
    });
  }

  onFirstSubmit() {
    this.firstForm.markAsDirty();
  }

  onSecondSubmit() {
    this.secondForm.markAsDirty();
    this.validateDocument(this.secondForm);
  }


  onThirdSubmit() {
    this.thirdForm.markAsDirty();
    this.managerService.registerCompanie(this.firstForm.value.firstCtrl, this.secondForm.value.secondCtrl)
      .then(() => {
        let status: NbComponentStatus = 'success';
        let title = "Sucesso";
        this.toast.showToast(status, title, "Cadastro realizado com Sucesso!");
      })
      .catch((response) => {
        let status: NbComponentStatus = 'danger';
        let title = "Erro";
        this.toast.showToast(status, title, response.error['0'].mensagemUsuario);
      });
  }

  validateDocument(secondForm: FormGroup) {
    if (!this.secondForm.get('secondCtrl').valid){
      let status: NbComponentStatus = 'warning';
      let title = "Erro";
      this.toast.showToast(status, title, "Documento inválido");
    }
  }

  getCompanies(filter: CompanyFilter){
    this.managerService.getCompanies(filter)
      .then((companies) => {
        this.source.load(companies['companies']);
        this.totalItens = companies['total'];
    })
    .catch((response) => {
      let status: NbComponentStatus = 'danger';
      let title = "Erro";
      this.toast.showToast(status, title, response.message);
    });
  }

  settings = {
    pager: {
      display: true,
      perPage: this.pageSize
    },
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
    columns: {
      companyId: {
        title: 'ID',
        type: 'string',
      },
      name: {
        title: 'Nome',
        type: 'string',
      },
      document: {
        title: 'Documento',
        type: 'string',
      },
      dtCreated: {
        title: 'Data de Criação',
        type: 'string',
      }
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







