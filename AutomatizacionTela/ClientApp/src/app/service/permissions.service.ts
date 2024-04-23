import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {

  constructor(private httpClient: HttpClient) { }

  validatePermissions(component: string, emailUser: string){
    return this.httpClient.get<boolean>(environment.url + 'home/ValidatePermission/'+component+'/'+emailUser)
  }
  
}
