import { environment } from './../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { JwtHelperService } from '@auth0/angular-jwt';
import { CompanyFilter } from '../../shared/model/companyFilter';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  url = environment.baseUrl + '/company';

  constructor(
    private http: HttpClient) {
  }

  registerCompanie(name: string, document: string): Promise<Object>{
    const headers = new HttpHeaders()
        .append('Content-Type', 'application/json');

    const body = {
        name: name,
        document: document
      }

    return this.http.post(this.url, body, {headers}).toPromise();
  }

  getCompanies(filter: CompanyFilter): Promise<Object> {
    if(filter == null){
      filter = new CompanyFilter();
      filter.itensByPage = 1000;
      filter.page = 0;
    }

    let params = new HttpParams()
      .set('page', filter.page)
      .set('size', filter.itensByPage);

    return this.http.get(this.url, { params })
      .toPromise()
      .then((response: any) => {
        const companies = response['content'];

        const result = {
          companies,
          total: response['totalElements']
        };
        return result;
      });
  }


}
