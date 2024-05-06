import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IArtes, ICalidadReposicionMes, ICalidadReposicionSemana, IDefectos, IDefectoUnidades, IDetalleReposiciones, IGeneralReposiciones, IModulos, INumeroSolicitudes, IOperario, IOperario_Unidades_Metros, IOrdenCorte, IPlantas, IPrendas, IReferencia_Unidades_Metros, IReposiciones, IReposicionMetrosMes, IReposicionMetrosSemana, ITelas, ITiempoOperario, ITipoDefectos, ITipoPrendas } from 'src/model/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ReposicionesInformesService {

  constructor(private httpCliente: HttpClient) { }

  getListadoReposicionesGeneral() {
    return this.httpCliente.get<IGeneralReposiciones[]>(environment.url + 'InformesReposiciones/GetListadoReposicionesGeneral');
  }
  
  getCalidadReposicionSemana() {
    return this.httpCliente.get<ICalidadReposicionSemana[]>(environment.url + 'InformesReposiciones/GetCalidadReposicionSemana');
  }
  getCalidadReposicionMes() {
    return this.httpCliente.get<ICalidadReposicionMes[]>(environment.url + 'InformesReposiciones/GetCalidadReposicionMes');
  }

  getReposicionMetrosSemana() {
    return this.httpCliente.get<IReposicionMetrosSemana[]>(environment.url + 'InformesReposiciones/GetReposicionMetrosSemana');
  }

  getReposicionMetrosMes() {
    return this.httpCliente.get<IReposicionMetrosMes[]>(environment.url + 'InformesReposiciones/GetReposicionMetrosMes');
  }
  getReferencia_Unidades_Metros() {
    return this.httpCliente.get<IReferencia_Unidades_Metros[]>(environment.url + 'InformesReposiciones/GetReferencia_Unidades_Metros');
  }

  getOperario_Unidades_Metros(){
    return this.httpCliente.get<IOperario_Unidades_Metros[]>(environment.url + 'InformesReposiciones/GetOperario_Unidades_Metros');
  }
  getTiempoOperario(){
    return this.httpCliente.get<ITiempoOperario[]>(environment.url + 'InformesReposiciones/GetTiempoOperario');
  }
  getDefectoUnidades(){
    return this.httpCliente.get<IDefectoUnidades[]>(environment.url + 'InformesReposiciones/GetDefectoUnidades');
  }
  getReposicionesOperarioNumeroSolicitudes() {
    return this.httpCliente.get<INumeroSolicitudes[]>(environment.url + 'InformesReposiciones/GetReposicionesOperarioNumeroSolicitudes');
  }
  

  

}
