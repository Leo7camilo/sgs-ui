import { Component, Input, OnDestroy } from '@angular/core';
import { ProgressInfo, StatsProgressBarData } from '../../../@core/data/stats-progress-bar';
import { takeWhile } from 'rxjs/operators';
import { AnalyticsMostCompanyClient } from '../../../shared/model/analyticsMostCompanyClient';

@Component({
  selector: 'ngx-progress-section',
  styleUrls: ['./progress-section.component.scss'],
  templateUrl: './progress-section.component.html',
})
export class AdministrativeProgressSectionComponent implements OnDestroy {

  private alive = true;

  @Input() mostCompanyClient: AnalyticsMostCompanyClient;

  progressInfoData: ProgressInfo[];

  constructor(private statsProgressBarService: StatsProgressBarData) {
    this.statsProgressBarService.getProgressInfoData()
      .pipe(takeWhile(() => this.alive))
      .subscribe((data) => {
        this.progressInfoData = data;

        console.log(JSON.stringify(this.progressInfoData));
      });


  }

  ngOnDestroy() {
    this.alive = true;
  }
}
