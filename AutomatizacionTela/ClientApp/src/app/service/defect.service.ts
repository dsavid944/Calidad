import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Defect, Provider } from 'src/model/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DefectService {

  constructor(private http: HttpClient) { }

  getDefects(): Observable<Defect[]> {
    const url = `${environment.url}RollCntlr/GetDefects`;
    return this.http.get<Defect[]>(url);
  }

  getProviders(): Observable<Provider[]> {
    const url = `${environment.url}RollCntlr/GetProviders`;
    return this.http.get<Provider[]>(url);
  }

  getStates(): Observable<Defect[]> {
    const url = `${environment.url}RollCntlr/GetStates`;
    return this.http.get<Defect[]>(url);
  }
}
