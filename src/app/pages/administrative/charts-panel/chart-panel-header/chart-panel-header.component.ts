import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { NbComponentStatus, NbMediaBreakpoint, NbMediaBreakpointsService, NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';
import { ToastService } from '../../../toast.service';
import { AnalyticalService } from '../../analytical.service';
import { AnalyticsGroupAttendenceByDate } from '../../../../shared/model/analyticsGroupAttendenceByDate';


@Component({
  selector: 'ngx-chart-panel-header',
  styleUrls: ['./chart-panel-header.component.scss'],
  templateUrl: './chart-panel-header.component.html',
})
export class ChartPanelHeaderComponent implements OnDestroy {

  private alive = true;

  @Output() periodChange = new EventEmitter<string>();

  @Input() type: string = 'week';
  queuesAttendence = [];

  types: string[] = ['week', 'month', 'year'];
  chartLegend: {iconColor: string; title: string}[] = [];
  breakpoint: NbMediaBreakpoint = { name: '', width: 0 };
  breakpoints: any;
  currentTheme: string;

  colorOptions = [
    'rgb(0, 214, 143)', 'rgb(51, 102, 255)', 'rgb(237, 241, 247)',
    'rgb(255, 130, 71)', 'rgb(70, 130, 180)', 'rgb(165, 42, 42)'
  ]
  constructor(private themeService: NbThemeService,
              private breakpointService: NbMediaBreakpointsService,
              private analyticsService: AnalyticalService,
              private toast: ToastService) {
    let orderProfitLegend = null
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        orderProfitLegend = theme.variables.orderProfitLegend;
        this.currentTheme = theme.name;
      });

      this.breakpoints = this.breakpointService.getBreakpointsMap();
      this.themeService.onMediaQueryChange()
        .pipe(takeWhile(() => this.alive))
        .subscribe(([oldValue, newValue]) => {
          this.breakpoint = newValue;
        });

      this.getGroupAttendenceTitle();
      this.setLegendItems();
  }

  getGroupAttendenceTitle() {
    this.analyticsService.getGroupAttendenceByDate()
    .then((response) => {
      console.log(response);

      response.forEach(attendence => {
        this.queuesAttendence.push(attendence.description);
      });
      this.queuesAttendence = [...new Set(this.queuesAttendence)];
      this.setLegendItems();
    })
    .catch((response) => {
      console.log("response: "+ response);
      let status: NbComponentStatus = 'danger';
      let title = "Erro";
      this.toast.showToast(status, title, response.error['0'].mensagemUsuario);
    });
  }

  setLegendItems() {
    for(let i = 0; i < this.queuesAttendence.length; i++){
      let legend = {
        iconColor: this.colorOptions[i],
        title: this.queuesAttendence[i]
      }
      this.chartLegend.push(legend);
    }
  }

  changePeriod(period: string): void {
    this.type = period;
    this.periodChange.emit(period);
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
