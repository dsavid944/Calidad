import { Component } from '@angular/core';
import { AuditoriaCalidadService } from 'src/app/service/auditoria-calidad.service';
import { MessageService } from 'src/app/service/message.service';
import { ICalidadReposicionMes, ICalidadReposicionSemana, IGeneralReposiciones, IReposicionMetrosSemana } from 'src/model/interfaces';

@Component({
  selector: 'app-reposiciones-informes',
  templateUrl: './reposiciones-informes.component.html',
  styleUrls: ['./reposiciones-informes.component.css']
})
export class ReposicionesInformesComponent {

  constructor(private auditoriaCalidad: AuditoriaCalidadService, private messageService: MessageService,) { }

  lstGeneral:       IGeneralReposiciones []= [];
  lstCalidadSemana: ICalidadReposicionSemana []= [];
  lstCalidadMes:    ICalidadReposicionMes []= [];
  lstReposicionMetrosSemana: IReposicionMetrosSemana []= [];

  ngOnInit() {
    this.getLstGeneral();
    this.getCalidadSemana();
    this.getCalidadMes();
    this.getReposicionMetrosSemanas();
  }


  getLstGeneral() {
    this.auditoriaCalidad.getListadoReposicionesGeneral().subscribe(
      response => {
        this.lstGeneral = response;
      }
    )
  }

  getCalidadSemana() {
    this.auditoriaCalidad.getCalidadReposicionSemana().subscribe(
      response => {
        this.lstCalidadSemana = response;
      }
    )
  }

  getCalidadMes() {
    this.auditoriaCalidad.getCalidadReposicionMes().subscribe(
      response => {
        this.lstCalidadMes = response;
      }
    )
  }
  getReposicionMetrosSemanas() {
    this.auditoriaCalidad.getReposicionMetrosSemana().subscribe(
      response => {
        this.lstReposicionMetrosSemana = response;
      }
    )
  }

}
