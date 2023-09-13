
import { AttendenceConsultService } from './attendence-consult.service';
import {Component, Input} from '@angular/core';
import { NbComponentStatus, NbDialogService, NbSearchService, NbSortDirection, NbSortRequest, NbThemeService, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';

import { AttendenceHistClient } from '../../../shared/model/attendenceHistClient';

interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}

interface FSEntry {
  name: string;
  size: string;
  kind: string;
  items?: number;
}


interface AttendenceHist {
  Cliente?: string;
  Entrada: string;
  Saida: string;
  Fila: string;
  Terminal: string;
  items?: number;
}


@Component({
  selector: 'ngx-attendence-consult',
  styleUrls: ['./attendence-consult.component.scss'],
  templateUrl: './attendence-consult.component.html',
})
export class AttendenceConsultComponent {

  value: string = '';

  attendenceHistClient: any;

  customColumn = 'Cliente';
  defaultColumns = ['Fila', 'Entrada', 'Saida', 'Terminal', 'items' ];
  allColumns = [ this.customColumn, ...this.defaultColumns ];

  data: TreeNode<AttendenceHist>[];

  dataSource: NbTreeGridDataSource<any>;

  sortColumn: string = '';
  sortDirection: NbSortDirection = NbSortDirection.NONE;

  constructor(private dataSourceBuilder: NbTreeGridDataSourceBuilder<AttendenceHist>,
    private searchService: NbSearchService,
    private attendenceConsultService: AttendenceConsultService
    ) {
    this.searchService.onSearchSubmit()
      .subscribe((data: any) => {
        this.value = data.term;
        this.attendenceConsultService.getAttendenceHistByDocumentClient(this.value.replace(/[^0-9]/g, ''))
          .then((response)  => {
            this.attendenceHistClient = response;
            this.processResponse(this.attendenceHistClient);
        });
      })
  }
  processResponse(response: AttendenceHistClient[]) {
    this.data = response.map(item => ({
      data: {
        Cliente: item.parenteAttendence.name,
        Fila: item.parenteAttendence.queueDescription,
        Entrada: item.parenteAttendence.entryTime,
        Saida: item.parenteAttendence.exitTime,
        Terminal: item.parenteAttendence.terminalDescription,
      },
      children: item.childAttendence.map(childItem => ({
        data: {
          Fila: childItem.queueDescription,
          Entrada: childItem.entryTime,
          Saida: childItem.exitTime,
          Terminal: childItem.terminalDescription,
        },
      })),
    }));
    this.dataSource = this.dataSourceBuilder.create(this.data);
  }

  updateSort(sortRequest: NbSortRequest): void {
    this.sortColumn = sortRequest.column;
    this.sortDirection = sortRequest.direction;
  }

  getSortDirection(column: string): NbSortDirection {
    if (this.sortColumn === column) {
      return this.sortDirection;
    }
    return NbSortDirection.NONE;
  }

  //defaultColumns = [ 'Entrada', 'Saida', 'Fila', 'Terminal', 'Items' ];
  /*
  private data: TreeNode<AttendenceHist>[] = [
    {
      data: { Cliente: 'Leonardo', Fila: 'ATENDIMENTO', Entrada: '2023-08-22T21:54:39Z', Saida: '2023-08-22T21:55:56Z', Terminal: 'Guiche 1' },
      children: [
        { data: { Fila: 'ECOCARDIOGRAMA',  Entrada: '2023-08-22T21:54:39Z', Saida: '2023-08-22T21:55:56Z', Terminal: 'Guiche 1' } },
      ],
    },
    {
      data: { Cliente: 'Leonardo', Fila: 'ATENDIMENTO', Entrada: '2023-08-23T15:30:34Z', Saida: '2023-08-23T15:31:05Z', Terminal: 'Guiche 1' },
      children: [
        { data: {  Fila: 'FONOAUDIOLOGO', Entrada: '2023-08-23T15:31:06Z', Saida: '2023-08-23T15:31:11Z', Terminal: 'Guiche 1' } },
      ],
    },
  ];


  private data: TreeNode<FSEntry>[] = [
    {
      data: { name: 'Projects', size: '1.8 MB', items: 5, kind: 'dir' },
      children: [
        { data: { name: 'project-1.doc', kind: 'doc', size: '240 KB' } },
        { data: { name: 'project-2.doc', kind: 'doc', size: '290 KB' } },
        { data: { name: 'project-3', kind: 'txt', size: '466 KB' } },
        { data: { name: 'project-4.docx', kind: 'docx', size: '900 KB' } },
      ],
    },
    {
      data: { name: 'Reports', kind: 'dir', size: '400 KB', items: 2 },
      children: [
        { data: { name: 'Report 1', kind: 'doc', size: '100 KB' } },
        { data: { name: 'Report 2', kind: 'doc', size: '300 KB' } },
      ],
    },
    {
      data: { name: 'Other', kind: 'dir', size: '109 MB', items: 2 },
      children: [
        { data: { name: 'backup.bkp', kind: 'bkp', size: '107 MB' } },
        { data: { name: 'secret-note.txt', kind: 'txt', size: '2 MB' } },
      ],
    },
  ];*/

  getShowOn(index: number) {
    const minWithForMultipleColumns = 400;
    const nextColumnStep = 100;
    return minWithForMultipleColumns + (nextColumnStep * index);
  }


  changeSort(sortRequest: NbSortRequest): void {
    this.dataSource.sort(sortRequest);
    this.sortColumn = sortRequest.column;
    this.sortDirection = sortRequest.direction;
  }

  getDirection(column: string): NbSortDirection {
    if (column === this.sortColumn) {
      return this.sortDirection;
    }
    return NbSortDirection.NONE;
  }
}
