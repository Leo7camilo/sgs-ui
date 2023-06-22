import { Permission } from './../../../shared/model/permission';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { JwtHelperService } from '@auth0/angular-jwt';
import { PermissionFilter } from '../../../shared/model/permissionFilter';
import { Profile } from '../../../shared/model/profile';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  url = environment.baseUrl + '/role' + '/afa137be-774f-420b-9bf2-404a02e6af9b';
  urlPermission = environment.baseUrl + '/permission' + '/afa137be-774f-420b-9bf2-404a02e6af9b';

  constructor(
    private http: HttpClient) {
  }

  registerRole(description: string): Promise<Object>{
    const headers = new HttpHeaders()
        .append('Content-Type', 'application/json');

    const body = {
        description: description,
        value: description.toUpperCase()
      }

    return this.http.post(this.url, body, {headers}).toPromise();
  }

  getRoles(filter: PermissionFilter): Promise<Object> {
    if(filter == null){
      filter = new PermissionFilter();
      filter.itensByPage = 1000;
      filter.page = 0;
    }

    let params = new HttpParams()
      .set('page', 0)
      .set('size', 5);

    return this.http.get(this.url, { params })
      .toPromise()
      .then((response: any) => {
        const roles = response['content'];

        const result = {
          roles,
          total: response['totalElements']
        };
        return result;
      });
  }

  grantPermission(profile: Profile): Promise<Object>{
    const headers = new HttpHeaders()
        .append('Content-Type', 'application/json');

    const body = {
        queues: profile.queues
      }
    return this.http.put(this.urlPermission + '/grant-permission/' +profile.profileId , body, {headers}).toPromise();
  }

  updateRole(permission: Permission ): Promise<Object>{
    const headers = new HttpHeaders()
        .append('Content-Type', 'application/json');

    const body = {
      description: permission.description,
      value: permission.description
    }
    return this.http.put(this.url + '/' +permission.roleId , body, {headers}).toPromise();
  }

}
