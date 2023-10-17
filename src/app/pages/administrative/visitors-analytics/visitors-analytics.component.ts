import { AnalyticsService } from './../../../@core/utils/analytics.service';
import { Component, OnDestroy } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { NbThemeService } from '@nebular/theme';
import { OutlineData, VisitorsAnalyticsData } from '../../../@core/data/visitors-analytics';
import { forkJoin } from 'rxjs';
import { AnalyticalService } from '../analytical.service';
import { ToastService } from '../../toast.service';
import { NbComponentStatus, NbDialogService } from '@nebular/theme';

@Component({
  selector: 'ngx-administrative-visitors-analytics',
  styleUrls: ['./visitors-analytics.component.scss'],
  templateUrl: './visitors-analytics.component.html',
})
export class AdministrativeVisitorsAnalyticsComponent implements OnDestroy {
  private alive = true;


  new: number = 0;
  know: number = 0;
  pieChartValue: number = 0;
  percentNew: number = 0;
  percentKnow: number = 0;

  showVisitorsStatistics: boolean = false;

  monthLabels = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];


  chartLegend: {iconColor: string; title: string}[];
  visitorsAnalyticsData: { innerLine: number[]; outerLine: OutlineData[]; } = {
    innerLine: [],
    outerLine: [],
  };

  constructor(private themeService: NbThemeService,
              private visitorsAnalyticsChartService: VisitorsAnalyticsData,
              private analyticalService: AnalyticalService,
              private toast: ToastService) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.setLegendItems(theme.variables.visitorsLegend);
      });

    this.getEngagementClient();


    /*
    forkJoin(
      this.visitorsAnalyticsChartService.getInnerLineChartData(),
      this.visitorsAnalyticsChartService.getOutlineLineChartData(),
      this.visitorsAnalyticsChartService.getPieChartData(),
    )
      .pipe(takeWhile(() => this.alive))
      .subscribe(([innerLine, outerLine, pieChartValue]: [number[], OutlineData[], number]) => {
        this.visitorsAnalyticsData = {
          innerLine: innerLine,
          outerLine: outerLine,
        };

        console.log('visitorsAnalyticsData: ' +JSON.stringify(this.visitorsAnalyticsData));
      });*/

  }

  getEngagementClient() {
    this.analyticalService.getEngagementClient()
      .then(response => {
        response.listEngagementClientSumarized.forEach(element => {
          if(element.status === 'NEW'){
            this.new += element.count;
          }else{
            this.know += element.count;
          }
        });

        this.pieChartValue = this.new + this.know;
        this.percentNew = (this.new * 100) / this.pieChartValue;
        this.percentKnow = (this.know * 100)/this.pieChartValue;
        this.showVisitorsStatistics = true;


        console.log('Passei por aqui');
        for (const month of this.monthLabels) {
          this.visitorsAnalyticsData.innerLine.push(0);
          this.visitorsAnalyticsData.outerLine.push({
            label: month,
            value: 0,
          });
        }

        console.log('Passei por aqui 1');
        for (const item of response.listEngagementClientDetailed) {
          const date = new Date(item.date);
          const monthIndex = date.getMonth();

          if (item.status === "KNOWN") {
            this.visitorsAnalyticsData.innerLine[monthIndex] = item.count;
          } else if (item.status === "NEW") {
            this.visitorsAnalyticsData.outerLine[monthIndex].value = item.count;
          }
        }

        console.log('visitorsAnalyticsData: ' +JSON.stringify(this.visitorsAnalyticsData));
      })
      .catch((response) => {
        console.log(response);

        let status: NbComponentStatus = 'danger';
        let title = "Erro";
        this.toast.showToast(status, title, response.error['0'].mensagemUsuario);
      });
  }

  setLegendItems(visitorsLegend): void {
    this.chartLegend = [
      {
        iconColor: visitorsLegend.firstIcon,
        title: 'Novos Pacientes',
      },
      {
        iconColor: visitorsLegend.secondIcon,
        title: 'Pacientes Retornados',
      },
    ];
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
