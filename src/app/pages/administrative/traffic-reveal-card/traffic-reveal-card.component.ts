import { AttendenceService } from '../../attendence/attendence-call/attendence.service';
import { Component, OnDestroy } from '@angular/core';
import { TrafficList, TrafficListData } from '../../../@core/data/traffic-list';
import { TrafficBarData, TrafficBar } from '../../../@core/data/traffic-bar';
import { takeWhile } from 'rxjs/operators';
import { Attendence } from '../../../shared/model/attendence';
import { ToastService } from '../../toast.service';
import { NbComponentStatus } from '@nebular/theme';

@Component({
  selector: 'ngx-traffic-reveal-card',
  styleUrls: ['./traffic-reveal-card.component.scss'],
  templateUrl: './traffic-reveal-card.component.html',
})
export class TrafficRevealCardComponent implements OnDestroy {

  private alive = true;

  trafficBarData: TrafficBar;
  trafficListData: TrafficList;

  attendences: Attendence[];

  revealed = false;
  period: string = 'diário';

  constructor(private trafficListService: TrafficListData,
              private trafficBarService: TrafficBarData,
              private attendenceService: AttendenceService,
              private toast: ToastService) {
    //this.getTrafficFrontCardData(this.period);
    //this.getTrafficBackCardData(this.period);
    this.getAttendenceFrontCard();
  }

  toggleView() {
    this.revealed = !this.revealed;
  }

  setPeriodAngGetData(value: string): void {
    this.period = value;

    //this.getTrafficFrontCardData(value);
    //this.getTrafficBackCardData(value);
    this.getAttendenceFrontCard();
  }

  getTrafficBackCardData(period: string) {
    this.trafficBarService.getTrafficBarData(period)
      .pipe(takeWhile(() => this.alive ))
      .subscribe(trafficBarData => {
        this.trafficBarData = trafficBarData;
      });
  }

  getTrafficFrontCardData(period: string) {
    this.trafficListService.getTrafficListData(period)
      .pipe(takeWhile(() => this.alive))
      .subscribe(trafficListData => {
        this.trafficListData = trafficListData;
      });
  }

  getAttendenceFrontCard(){
    this.attendenceService.getAttendenceOrderByDtCreatedAsc()
      .then((attendences) => {
        this.attendences = attendences['attendence'];
      }).catch((response) => {
        let status: NbComponentStatus = 'danger';
        let title = "Erro";
        this.toast.showToast(status, title, response.error['0'].mensagemUsuario);
      })
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
