

import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { SelectItem } from 'primeng/api';
import { ExcelService } from 'src/app/service/excel.service';
import { ReporteAuditoriaCalidadService } from 'src/app/service/reporte-auditoria-calidad.service';
import { IGetDatosDefecto, IGetSemana, IGetPlanta } from 'src/model/interfaces';

@Component({
  selector: 'app-reporte-auditoria-calidad',
  templateUrl: './reporte-auditoria-calidad.component.html',
  styleUrls: ['./reporte-auditoria-calidad.component.css']
})
export class ReporteAuditoriaCalidadComponent {

  datosDefecto: IGetDatosDefecto[] = [];
  rows = 10;
  first = 0;
  formFilter: any;
  semana: IGetSemana[];
  opcionesDropDownSemana: SelectItem[] = [];
  planta: IGetPlanta[];
  opcionesDropDownPlanta: SelectItem[] = [];

  constructor(private reporteAuditoriaCalidadService: ReporteAuditoriaCalidadService, private formBuilder: FormBuilder, private spinner: NgxSpinnerService,
    private excelService: ExcelService, private datePipe: DatePipe) {
    this.formFilter = formBuilder.group({
      año: new FormControl({ value: '', disabled: false }),
      mes: new FormControl({ value: '', disabled: false }),
      semana: new FormControl({ value: { label: '', value: null }, disabled: false }),
      planta: new FormControl({ value: { label: '', value: null }, disabled: false }),
    });
  }

  ngOnInit() {
    this.getSemanas();
    this.getPlantas();
    this.getDatosDefecto();
    /* this.getDatosPrimeraGrafica();
    this.getDatosNivelCalidad(); */
  }

  getSemanas() {
    this.semana = [];

    for (let i = 1; i <= 53; i++) {
      this.semana.push({
        numeroSemana: i,
        semana: 'Semana ' + i
      });
    }

    this.convertirSemanasADropdown();
  }

  convertirSemanasADropdown() {
    this.opcionesDropDownSemana = this.semana.map(semana => {
      return { label: semana.semana, value: semana.numeroSemana };
    });
  }

  getPlantas() {
    this.planta = [];

    this.reporteAuditoriaCalidadService.getDatosPlanta().subscribe(
      response => {
        this.planta = response;

        this.convertirPlantasADropdown()
      }
    )
  }

  convertirPlantasADropdown() {
    this.opcionesDropDownPlanta = this.planta.map(planta => {
      return { label: planta.descripcion, value: planta.plantaId };
    });
  }

  getDatosDefecto() {
    this.first = 0;
    this.spinner.show();

    let body = {
      ano: this.formFilter.get('año').value == '' ? null : new Date(this.formFilter.get('año').value),
      mes: this.formFilter.get('mes').value == '' ? null : new Date(this.formFilter.get('mes').value),
      semana: this.formFilter.get('semana').value == null ? null : Number(this.formFilter.get('semana').value),
      planta: this.formFilter.get('planta').value == null ? null : Number(this.formFilter.get('planta').value),
    }

    this.reporteAuditoriaCalidadService.getDatosDefecto(body).subscribe(
      response => {
        this.datosDefecto = response;

        this.spinner.hide();
      }
    );
  }

  getDatosPrimeraGrafica() {
    let body = {
      ano: null,
      mes: null,
      semana: null,
      planta: null,
    }

    this.reporteAuditoriaCalidadService.getDatosPrimeraGrafica(body).subscribe(
      response => {
      }
    );
  }

  getDatosNivelCalidad() {
    this.reporteAuditoriaCalidadService.getDatosNivelCalidad().subscribe(
      response => {
      }
    );
  }

  resetFilters() {
    this.formFilter.controls.año.setValue('');
    this.formFilter.controls.mes.setValue('');
    this.formFilter.controls.semana.setValue(null);
    this.formFilter.controls.planta.setValue(null);
    this.getDatosDefecto();
  }

  exportExcel() {
    let body:any = [];
    this.datosDefecto.forEach(
      element => {
        body.push({
          Mes: element.mes,
          Semana: element.semana,
          Fecha: this.datePipe.transform(element.fecha, 'dd/MM/yyyy'),
          Modulo: element.modulo,
          Referencia: element.referencia,
          Prenda: element.descripcion,
          Defecto: element.nombre,
          ParteDefecto: element.parteDefecto,
          Defecto2: element.nombreDefecto,
          OrdenCorte: element.ordenCorte,
          NumeroArte: element.numeroArte,
          Cantidad: element.cantidad,
          Revisadas: element.undRevisadas,
          Porcentaje: element.porcentajeDef,
          NombrePlanta: element.nombrePlanta,
          Auditor: element.usuario
        })
      }
    )

    this.excelService.exportAsExcelFile(body, 'Auditoria Calidad');

  }
}
