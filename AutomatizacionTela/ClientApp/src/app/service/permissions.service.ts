import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { IGetPermission } from 'src/model/interfaces';

@Injectable({
  providedIn: 'root'
})

export class PermissionsService {

  constructor(private httpClient: HttpClient) { }

  getPermission(email:string)
  {
    return this.httpClient.get<IGetPermission[]>(environment.url+`AuditoriaCalidad/GetPermission/${email}`);
  }
  
}
