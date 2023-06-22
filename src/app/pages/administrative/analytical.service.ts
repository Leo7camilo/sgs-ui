import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AttendenceChartSummary } from '../../shared/model/attendenceChartSummary';
import { AnalyticsGroupAttendenceByDate } from '../../shared/model/analyticsGroupAttendenceByDate';

@Injectable({
  providedIn: 'root'
})
export class AnalyticalService {

  url = environment.baseUrl + '/analytics' + '/afa137be-774f-420b-9bf2-404a02e6af9b';

  constructor(
    private http: HttpClient) {
  }

  getSimmarizedData(): Promise<AttendenceChartSummary[]> {
    const headers = new HttpHeaders()
        .append('Content-Type', 'application/json');

    return this.http.get(this.url + '/summarized-data', { headers })
      .toPromise()
      .then((response: any) => {
        return response;
      });
  }

  getGroupAttendenceByDate(): Promise<AnalyticsGroupAttendenceByDate[]> {
    const headers = new HttpHeaders()
        .append('Content-Type', 'application/json');

    return this.http.get(this.url + '/group-attendence-by-date', { headers })
      .toPromise()
      .then((response: any) => {
        return response;
      });
  }


}
