import { Component, OnInit } from '@angular/core';
import { ExcelService } from 'src/app/service/excel.service';
import { RollService } from 'src/app/service/roll.service';
import { GetSummary } from 'src/model/interfaces';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
})
export class SummaryComponent implements OnInit {
  datos!: GetSummary[];
  roll:number=0;

  constructor(private rollService: RollService,
    private excelService: ExcelService) {}

  ngOnInit() {
    this.rollService.getSummary().subscribe(
      (data) => {
        this.datos = data;
      },
      (error) => {
        console.error('Error fetching data: ', error);
      }
    );
  }
  getSeverity(state: string): 'warning' | 'success' | 'danger' | 'default' {
    switch (state) {
      case 'Aprobado con Observacion':
        return 'warning';
      case 'Aprobado':
        return 'success';
      case 'Rechazado':
        return 'danger';
      default:
        return 'default';
    }
  }

  selected(data:any)
  {
    this.roll=data;
  }
  exportExcel() {
    let body:any = [];
    this.datos.forEach(
      element => {
        body.push({
          Fecha: element.dateCreate,
          Proveedor: element.nameProvider,
          Rollo: element.roll,
          Lote: element.lot,
          Tel: element.codeCloth,
          Descripción: element.nameCloth,
          Color: element.codeColor,
          Kilos: element.kiloRoll,
          Pedido: element.request,
          Referencia: element.reference,
          Remision: element.remision,
          Metros_proveedor: element.mtsProvider,
          Ancho_Util_Proveedor: element.widthProvider,
          Metros_Reales: element.mtsReal,
          Ancho_Util_Real: element.widthReal,
          Estado_Revisión: element.stateRev,
          UsuarioRoll: element.usuarioRoll,
          Peso: element.weight,
          RTO: element.rto,
          EA: element.ea,
          EL: element.el,
          VIRO: element.viro,
          Ancho_Elongación: element.widthElongation,
          Largo_Elongación: element.longElongation,
          Estado_Check: element.stateCheck,
          UsuarioCheck: element.usuarioCheck,
        })
      }
    )
    this.excelService.exportAsExcelFile(body, 'Auditoria_Telas_Calidad');

  }
}
