import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AttendenceFilter } from '../../shared/model/attendenceFilter';
import { FormGroup } from '@angular/forms';
import { Queue } from '../../shared/model/queue';

@Injectable({
  providedIn: 'root'
})
export class AttendenceService {


  url = environment.baseUrl + '/attendence' + '/afa137be-774f-420b-9bf2-404a02e6af9b';

  constructor(
    private http: HttpClient) {
  }

  /*
  registerAttendenceByPassword(description: string, priority: number, idRoles: []): Promise<Object>{
    const headers = new HttpHeaders()
        .append('Content-Type', 'application/json');


    let queue = new Queue();
      queue.description = description;
      queue.priority = priority;
      queue.idRoles = idRoles;

    return this.http.post(this.url, queue, {headers}).toPromise();
  }*/


  registerAttendences(clientId: string, queues: Queue[], password: number){
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    let url = this.url + '/client/' + clientId;

    let body = {
      idQueueList: queues,
      password: password
    }
    return this.http.post(url, body, { headers })
      .toPromise()
      .then((response: any) => {
        return response;
    });
  }


  makeAttendence(queueId: string, terminalId: string, idUser: string, attendenceId: string){
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');
    let url = this.url + '/calls/' + queueId + '/by-terminal/' + terminalId;

    let body = {
      idUser: idUser,
      attendenceId: attendenceId
    }
    return this.http.put(url, body, { headers })
      .toPromise()
      .then((response: any) => {
        return response;
    });
  }

  finalizaAttendece(queueId: string, clientId: string, attendenceId: string) {
    let url = this.url + '/calls/' + attendenceId + '/' +queueId;
    if(clientId != null){
      url = this.url + '/calls/' + attendenceId + '/' +queueId + '/' + clientId;
    }
    return this.http.delete(url)
      .toPromise()
      .then((response: any) => {
        return response;
    });
  }

  getAttendence(filter: AttendenceFilter): Promise<Object> {
    let params = new HttpParams();

    if(filter != null){
      params = params.set('status', filter.status);
    }else{
      filter = new AttendenceFilter();
      filter.itensByPage = 1000;
      filter.page = 0;
    }

    let url = this.url + '/by-queue/' + filter.queueId;
    //set('queueId', filter.queueId)

    params = params.set('page', filter.page)
          .set('size', filter.itensByPage)

    return this.http.get(url, { params })
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
