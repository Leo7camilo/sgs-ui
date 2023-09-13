import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AttendenceFilter } from '../../../shared/model/attendenceFilter';
import { FormGroup } from '@angular/forms';
import { Queue } from '../../../shared/model/queue';

@Injectable({
  providedIn: 'root'
})
export class AttendenceConsultService {

  url = environment.baseUrl + '/attendence' + '/afa137be-774f-420b-9bf2-404a02e6af9b';

  constructor(
    private http: HttpClient) {
  }

  getAttendenceHistByDocumentClient(document: string): Promise<Object> {
    let url = this.url + '/hist/by-document-client/' + document;
    return this.http.get(url).toPromise();
  }

  getAttendenceOrderByDtCreatedAsc(): Promise<Object> {
    let filter: AttendenceFilter = new AttendenceFilter();
    filter.status = 'WAITING';
    filter.sort   = 'dtCreated';

    let params = new HttpParams();
    params = params.set('status', filter.status)
            .set('sort', filter.sort);

    return this.http.get(this.url, { params })
      .toPromise()
      .then((response: any) => {
        const attendence = response['content'];

        const result = {
          attendence,
          total: response['totalElements']
        };
        return result;
      });
  }

  countAttendenceInTheCompany(): Promise<Object> {
    const headers = new HttpHeaders()
    .append('Content-Type', 'application/json');

    let url = environment.baseUrl + '/attendence' + '/count-by-company/' + 'afa137be-774f-420b-9bf2-404a02e6af9b';

    return this.http.get(url, { headers }).toPromise();
  }

}
