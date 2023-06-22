import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { JwtHelperService } from '@auth0/angular-jwt';
import { TerminalFilter } from '../../../shared/model/terminalFilter';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class TerminalsService {

  url = environment.baseUrl + '/terminal' + '/afa137be-774f-420b-9bf2-404a02e6af9b';

  constructor(
    private http: HttpClient) {
  }

  registerTerminal(name: string): Promise<Object>{
    const headers = new HttpHeaders()
        .append('Content-Type', 'application/json');

    const body = {
        name: name
    }
    return this.http.post(this.url, body, {headers}).toPromise();
  }

  updateTerminal(form: FormGroup): Promise<Object>{
    const headers = new HttpHeaders()
        .append('Content-Type', 'application/json');

    const body = {
        name: form.controls.name.value
    }
    return this.http.put(this.url + '/'+ form.controls.terminalId.value, body, {headers}).toPromise();
  }

  getTerminals(filter: TerminalFilter): Promise<Object> {
    if(filter == null){
      filter = new TerminalFilter();
      filter.itensByPage = 1000;
      filter.page = 0;
    }

    let params = new HttpParams()
      .set('page', filter.page)
      .set('size', filter.itensByPage);

    return this.http.get(this.url, { params })
      .toPromise()
      .then((response: any) => {
        const terminals = response['content'];

        const result = {
          terminals,
          total: response['totalElements']
        };
        return result;
      });
  }


}
