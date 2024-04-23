import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IGetDatosDefecto, IGetDatosNivelCalidad, IGetDatosPrimeraGrafica, IGetPlanta } from 'src/model/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ReporteAuditoriaCalidadService {

  constructor(private httpClient: HttpClient) { }

  getDatosDefecto(body: any) {
    return this.httpClient.post<IGetDatosDefecto[]>(environment.url + 'ReporteAuditoriaCalidad/GetDatosDefecto', body);
  }

  getDatosPrimeraGrafica(body: any) {
    return this.httpClient.post<IGetDatosPrimeraGrafica[]>(environment.url + 'ReporteAuditoriaCalidad/GetDatosPrimeraGrafica', body);
  }

  getDatosNivelCalidad() {
    return this.httpClient.get<IGetDatosNivelCalidad[]>(environment.url + 'ReporteAuditoriaCalidad/GetDatosNivelCalidad/');
  }

  getDatosPlanta() {
    return this.httpClient.get<IGetPlanta[]>(environment.url + 'ReporteAuditoriaCalidad/GetDatosPlanta/');
  }
}
