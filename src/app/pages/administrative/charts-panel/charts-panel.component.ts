import { Component, OnDestroy, ViewChild } from '@angular/core';
import { takeWhile } from 'rxjs/operators';

import { OrdersChartComponent } from './charts/orders-chart.component';
import { ProfitChartComponent } from './charts/profit-chart.component';
import { OrdersChart } from '../../../@core/data/orders-chart';
import { ProfitChart } from '../../../@core/data/profit-chart';
import { OrderProfitChartSummary, OrdersProfitChartData } from '../../../@core/data/orders-profit-chart';
import { AttendenceService } from '../../attendence/attendence-call/attendence.service';
import { AnalyticsService } from '../../../@core/utils';
import { AnalyticalService } from '../analytical.service';
import { NbComponentStatus } from '@nebular/theme';
import { ToastService } from '../../toast.service';
import { AttendenceChartSummary } from '../../../shared/model/attendenceChartSummary';
import { AnalyticsGroupAttendenceByDate } from '../../../shared/model/analyticsGroupAttendenceByDate';
import { AttendenceQueueChart } from '../../../shared/model/attendenceQueueChart';

@Component({
  selector: 'ngx-administrative-charts',
  styleUrls: ['./charts-panel.component.scss'],
  templateUrl: './charts-panel.component.html',
})
export class AdministrativeChartsPanelComponent implements OnDestroy {

  private alive = true;

  chartPanelSummary: OrderProfitChartSummary[];
  period: string = 'week';
  ordersChartData: OrdersChart;
  profitChartData: ProfitChart;

  summarizedData: AttendenceChartSummary[];
  groupAttendence: AnalyticsGroupAttendenceByDate[];

  queuesAttendence: AttendenceQueueChart[];

  @ViewChild('ordersChart', { static: true }) ordersChart: OrdersChartComponent;
  @ViewChild('profitChart', { static: true }) profitChart: ProfitChartComponent;

  constructor(private ordersProfitChartService: OrdersProfitChartData,
              private analyticsService: AnalyticalService,
              private toast: ToastService
      ) {

    this.ordersProfitChartService.getOrderProfitChartSummary()
      .pipe(takeWhile(() => this.alive))
      .subscribe((summary) => {
        this.chartPanelSummary = summary;
      });

   //this.getOrdersChartData(this.period);
   //this.getProfitChartData(this.period);

    this.getSummarizedData();
    this.getGroupAttendenceByDate();
    //this.getGroupAttendenceTitle();

  }

  getSummarizedData() {
    this.analyticsService.getSimmarizedData()
    .then((response) => {
      this.summarizedData = response;
    })
    .catch((response) => {
      let status: NbComponentStatus = 'danger';
      let title = "Erro";
      this.toast.showToast(status, title, response.error['0'].mensagemUsuario);
    });
  }

  /*
  getGroupAttendenceByDate() {
    this.analyticsService.getGroupAttendenceByDate()
    .then((response) => {
      this.groupAttendence = response;

      let listaCharLabel = [];
      let listaLinesData= [];
      let listaLinesData2= [];
      let listaLinesData3= [];
      this.groupAttendence.forEach( group => {
        if(group.description === 'ATENDIMENTO'){
          listaCharLabel.push(group.hour.toString().substring(11, 16));
          listaLinesData3.push(group.count);
        }
        if(group.description === 'FONOAUDIOLOGO'){
          listaLinesData2.push(group.count);
        }

        if(group.description === 'MEDICO'){
          listaLinesData.push(group.count);
        }
      });

      let listaDefinitiva = [];
      listaDefinitiva.push(listaLinesData);
      listaDefinitiva.push(listaLinesData2);
      listaDefinitiva.push(listaLinesData3);

      let obj = {
        chartLabel: listaCharLabel,
        linesData: listaDefinitiva
      };

      console.log(obj);
      console.log(JSON.stringify(obj));


      this.ordersChartData = obj;
      console.log(this.ordersChartData);
      console.log(JSON.stringify(this.ordersChartData));
    })
    .catch((response) => {
      let status: NbComponentStatus = 'danger';
      let title = "Erro";
      this.toast.showToast(status, title, response.error['0'].mensagemUsuario);
    });
  } */

  getGroupAttendenceByDate() {
    this.analyticsService.getGroupAttendenceByDate()
    .then((response) => {
      this.groupAttendence = response;
      if (this.groupAttendence.length === 0) {
        // Se não houver dados, sair da função ou realizar algum tratamento apropriado
        return;
      }

      const descriptionIndexMap = {};
      const chartData = {
        chartLabel: [],
        linesData: []
      };

      this.groupAttendence.forEach((item) => {
        const { description, count, hour } = item;

        if (!descriptionIndexMap.hasOwnProperty(description)) {
          descriptionIndexMap[description] = chartData.linesData.length;
          chartData.linesData.push(Array(chartData.chartLabel.length).fill(0));
        }

        const index = descriptionIndexMap[description];
        // Obter as horas do atributo 'hour' usando o objeto Date
        const dateObj = new Date(hour);
        const formattedHour = dateObj.getHours().toString().padStart(2, '0') + ":00";
        let hourIndex = chartData.chartLabel.indexOf(formattedHour); // Obtemos o índice do rótulo formatado

        if (hourIndex === -1) {
          // Caso o rótulo ainda não exista, adicionamos ele ao chartLabel e preenchemos todas as listas em linesData com 0
          chartData.chartLabel.push(formattedHour);
          chartData.linesData.forEach((line) => line.push(0));
          hourIndex = chartData.chartLabel.length - 1; // Atualizamos o hourIndex com o novo índice
        }

        chartData.linesData[index][hourIndex] = count; // Armazenamos o valor na posição correta da submatriz
      });

      console.log("novo chartData" + JSON.stringify(chartData));
      this.ordersChartData = chartData;
    })
    .catch((response) => {
      let status: NbComponentStatus = 'danger';
      let title = "Erro";
      this.toast.showToast(status, title, response.error['0'].mensagemUsuario);
    });
  }

  setPeriodAndGetChartData(value: string): void {
    if (this.period !== value) {
      this.period = value;
    }

    //this.getOrdersChartData(value);
    //this.getProfitChartData(value);
  }

  changeTab(selectedTab) {
    if (selectedTab.tabTitle === 'Profit') {
      this.profitChart.resizeChart();
    } else {
      this.ordersChart.resizeChart();
    }
  }

  getOrdersChartData(period: string) {
    this.ordersProfitChartService.getOrdersChartData(period)
      .pipe(takeWhile(() => this.alive))
      .subscribe(ordersChartData => {
        this.ordersChartData = ordersChartData;
      });

      console.log(this.ordersChartData);
      console.log(JSON.stringify(this.ordersChartData));
  }

  getProfitChartData(period: string) {
    this.ordersProfitChartService.getProfitChartData(period)
      .pipe(takeWhile(() => this.alive))
      .subscribe(profitChartData => {
        this.profitChartData = profitChartData;
      });
  }

  getGroupAttendenceTitle() {
    this.analyticsService.getGroupAttendenceByDate()
    .then((response) => {
      let queues = [];
      response.forEach(attendence => {
        queues.push(attendence.description);
      });

      console.log('queues:'+queues);
      this.queuesAttendence = [...new Set(queues)];
      console.log('queues:'+this.queuesAttendence);
    })
    .catch((response) => {
      console.log("response: "+ response);
      let status: NbComponentStatus = 'danger';
      let title = "Erro";
      this.toast.showToast(status, title, response.error['0'].mensagemUsuario);
    });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
