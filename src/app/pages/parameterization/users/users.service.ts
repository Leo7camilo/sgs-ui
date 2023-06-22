
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { JwtHelperService } from '@auth0/angular-jwt';
import { QueueFilter } from '../../../shared/model/queueFilter';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  url = environment.baseUrl + '/auth' + '/afa137be-774f-420b-9bf2-404a02e6af9b';;

  constructor(
    private http: HttpClient) {
  }

  registerUser(user: NgForm): Promise<Object>{
    const headers = new HttpHeaders()
        .append('Content-Type', 'application/json');

    return this.http.post(this.url+'/signup', user, {headers}).toPromise();
  }

  getUsers(filter: QueueFilter): Promise<Object> {

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
        const users = response['content'];

        const result = {
          users,
          total: response['totalElements']
        };
        return result;
      });
  }


}
