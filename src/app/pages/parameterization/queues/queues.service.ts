import { Queue } from './../../../shared/model/queue';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { JwtHelperService } from '@auth0/angular-jwt';
import { QueueFilter } from '../../../shared/model/queueFilter';

@Injectable({
  providedIn: 'root'
})
export class QueueService {

  url = environment.baseUrl + '/queue' + '/afa137be-774f-420b-9bf2-404a02e6af9b';;

  constructor(
    private http: HttpClient) {
  }

  registerQueue(description: string, priority: number, idRoles: []): Promise<Object>{
    const headers = new HttpHeaders()
        .append('Content-Type', 'application/json');


    let queue = new Queue();
      queue.description = description;
      queue.priority = priority;
      queue.idRoles = idRoles;

    return this.http.post(this.url, queue, {headers}).toPromise();
  }

  getQueues(filter: QueueFilter): Promise<Object> {

    if(filter == null){
      filter = new QueueFilter();
      filter.itensByPage = 1000;
      filter.page = 0;
    }

    let params = new HttpParams()
      .set('page', filter.page)
      .set('size', filter.itensByPage);

    return this.http.get(this.url, { params })
      .toPromise()
      .then((response: any) => {
        const queues = response['content'];

        const result = {
          queues,
          total: response['totalElements']
        };
        return result;
      });
  }


}
