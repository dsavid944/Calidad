import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IArtes, ICalidadReposicionMes, ICalidadReposicionSemana, IDefectos, IDetalleReposiciones, IGeneralReposiciones, IModulos, IOperario, IOrdenCorte, IPlantas, IPrendas, IReposiciones, IReposicionMetrosSemana, ITelas, ITipoDefectos, ITipoPrendas } from 'src/model/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuditoriaCalidadService {

  constructor(private httpCliente: HttpClient) { }

  getPlantas() {
    return this.httpCliente.get<IPlantas[]>(environment.url + 'AuditoriaCalidad/GetPlantas');
  }

  getModulos(plantaId: number) {
    return this.httpCliente.get<IModulos[]>(environment.url + 'AuditoriaCalidad/GetModulos/' + plantaId);
  }

  getTipoPrendas() {
    return this.httpCliente.get<ITipoPrendas[]>(environment.url + 'AuditoriaCalidad/GetTipoPrendas');
  }

  getPrendas(prendaId: number) {
    return this.httpCliente.get<IPrendas[]>(environment.url + 'AuditoriaCalidad/GetPrendas/' + prendaId);
  }

  getTipoDefectos() {
    return this.httpCliente.get<ITipoDefectos[]>(environment.url + 'AuditoriaCalidad/GetTipoDefectos');
  }

  getDefectos(defectoId: number) {
    return this.httpCliente.get<IDefectos[]>(environment.url + 'AuditoriaCalidad/GetDefectos/' + defectoId);
  }

  postDatos(body: any) {
    return this.httpCliente.post<number>(environment.url + 'AuditoriaCalidad/PostDatos', body);
  }

  getOrdenCorte(orden: number) {
    return this.httpCliente.get<IOrdenCorte[]>(environment.url + 'AuditoriaCalidad/GetOrdenCorte/' + orden);
  }

  getTelas() {
    return this.httpCliente.get<ITelas[]>(environment.url + 'AuditoriaCalidad/GetTelas');
  }

  SetReposiciones(body: any) {
    return this.httpCliente.post<number>(environment.url + 'AuditoriaCalidad/SetReposicionesTela', body)
  }

  sendEmail(body: any) {
    return this.httpCliente.post<boolean>(environment.url + 'AuditoriaCalidad/SendMail', body)
  }

  getReposicionTelas() {
    return this.httpCliente.get<IReposiciones[]>(environment.url + 'AuditoriaCalidad/GetReposicionTelas');
  }

  getDetalleReposiciones() {
    return this.httpCliente.get<IDetalleReposiciones[]>(environment.url + 'AuditoriaCalidad/GetDetallesReposicion');
  }

  getArtes(ordenCorte: string) {
    return this.httpCliente.get<IArtes[]>(environment.url + 'AuditoriaCalidad/GetArtes/' + ordenCorte);
  }

  updateEstadoReposicion(data: any) {
    return this.httpCliente.post<boolean>(environment.url + 'AuditoriaCalidad/UpdateEstadoReposicion', data);
  }

  getOperarios1() {
    return this.httpCliente.get<IOperario[]>(environment.url + 'AuditoriaCalidad/GetOperarios');
  }

  getListadoReposicionesGeneral() {
    return this.httpCliente.get<IGeneralReposiciones[]>(environment.url + 'AuditoriaCalidad/GetListadoReposicionesGeneral');
  }

  getCalidadReposicionSemana() {
    return this.httpCliente.get<ICalidadReposicionSemana[]>(environment.url + 'AuditoriaCalidad/GetCalidadReposicionSemana');
  }
  getCalidadReposicionMes() {
    return this.httpCliente.get<ICalidadReposicionMes[]>(environment.url + 'AuditoriaCalidad/GetCalidadReposicionMes');
  }

  getReposicionMetrosSemana() {
    return this.httpCliente.get<IReposicionMetrosSemana[]>(environment.url + 'AuditoriaCalidad/GetReposicionMetrosSemana');
  }
  

}
