import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { JwtHelperService } from '@auth0/angular-jwt';
import { ProfileFilter } from '../../../shared/model/profileFilter';

@Injectable({
  providedIn: 'root'
})
export class ProfilesService {

  url = environment.baseUrl + '/profile' + '/afa137be-774f-420b-9bf2-404a02e6af9b';

  constructor(
    private http: HttpClient) {
  }

  registerProfile(description: string): Promise<Object>{
    const headers = new HttpHeaders()
        .append('Content-Type', 'application/json');

    const body = {
        description: description
      }

    return this.http.post(this.url, body, {headers}).toPromise();
  }

  getProfiles(filter: ProfileFilter): Promise<Object> {

    if(filter == null){
      filter = new ProfileFilter();
      filter.itensByPage = 1000;
      filter.page = 0;
    }

    let params = new HttpParams()
      .set('page', filter.page)
      .set('size', filter.itensByPage);

    return this.http.get(this.url, { params })
      .toPromise()
      .then((response: any) => {
        const profiles = response['content'];

        const result = {
          profiles,
          total: response['totalElements']
        };
        return result;
      });
  }


}
