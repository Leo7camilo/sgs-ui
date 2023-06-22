import { ClientFilter } from './../model/clientFilter';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { JwtHelperService } from '@auth0/angular-jwt';
import { CompanyFilter } from '../model/companyFilter';
import { Client } from '../model/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  url = environment.baseUrl + '/client' + '/afa137be-774f-420b-9bf2-404a02e6af9b';
  urlByCompanie = environment.baseUrl + '/client/by-company' + '/afa137be-774f-420b-9bf2-404a02e6af9b';

  constructor(
    private http: HttpClient) {
  }

  registerClient(client: Client): Promise<Object>{
    const headers = new HttpHeaders()
        .append('Content-Type', 'application/json');

    const body = {
        name: client.name,
        document: client.document,
        organization: client.organization
      }

    return this.http.post(this.url, body, {headers}).toPromise();
  }

  getClients(filter: ClientFilter): Promise<Object> {
    if(filter == null){
      filter = new ClientFilter();
      filter.itensByPage = 1000;
      filter.page = 0;
    }

    let params = new HttpParams()
      .set('page', filter.page)
      .set('size', filter.itensByPage);

    return this.http.get(this.urlByCompanie, { params })
      .toPromise()
      .then((response: any) => {
        const clients = response['content'];

        const result = {
          clients,
          total: response['totalElements']
        };
        return result;
      });
  }

}
