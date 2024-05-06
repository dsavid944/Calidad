import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ExcelService } from 'src/app/service/excel.service';
import { MessageService } from 'src/app/service/message.service';
import { ReposicionesInformesService } from 'src/app/service/reposiciones-informes.service';
import {
  ICalidadReposicionMes,
  ICalidadReposicionSemana,
  IDefectoUnidades,
  IGeneralReposiciones,
  INumeroSolicitudes,
  IOperario_Unidades_Metros,
  IReferencia_Unidades_Metros,
  IReposicionMetrosMes,
  IReposicionMetrosSemana,
  ITiempoOperario,
} from 'src/model/interfaces';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexFill,
  ApexResponsive,
  ApexLegend,
  ApexNonAxisChartSeries,
  ApexStroke,
  ApexTooltip,
  ApexXAxis,
} from 'ng-apexcharts';
import { SwalService } from 'src/app/service/swal.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  title: ApexTitleSubtitle;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  responsive: ApexResponsive[];
  legend: ApexLegend;
};
@Component({
  selector: 'app-reposiciones-informes',
  templateUrl: './reposiciones-informes.component.html',
  styleUrls: ['./reposiciones-informes.component.css'],
})
export class ReposicionesInformesComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public chartOptions2: Partial<ChartOptions>;
  public chartOptions3: Partial<ChartOptions>;
  public chartOptions4: Partial<ChartOptions>;
  public chartOptions5: Partial<ChartOptions>;
  public chartOptions6: Partial<ChartOptions>;
  public chartOptions7: Partial<ChartOptions>;
  public chartOptions8: Partial<ChartOptions>;
  public chartOptions9: Partial<ChartOptions>;
  public chartOptions10: Partial<ChartOptions>;

  formFilter: any;
  lstGeneral: IGeneralReposiciones[] = [];
  lstGeneralTotal: IGeneralReposiciones[] = [];
  lstCalidadSemana: ICalidadReposicionSemana[] = [];
  lstCalidadSemanaTotal: ICalidadReposicionSemana[] = [];
  lstCalidadMes: ICalidadReposicionMes[] = [];
  lstReposicionMetrosSemana: IReposicionMetrosSemana[] = [];
  lstReposicionMetrosSemanaTotal: IReposicionMetrosSemana[] = [];
  lstReposicionMetrosMes: IReposicionMetrosMes[] = [];
  lstReferencia_Unidades_Metros: IReferencia_Unidades_Metros[] = [];
  lstReferencia_Unidades_MetrosTotal: IReferencia_Unidades_Metros[] = [];
  lstgetOperarioUnidadesMetros: IOperario_Unidades_Metros[] = [];
  lstgetOperarioUnidadesMetrosTotal: IOperario_Unidades_Metros[] = [];
  lstTiempoOperario: ITiempoOperario[] = [];
  lstNumeroSolicitudesTotal: INumeroSolicitudes[] = [];
  lstTiempoOperarioTotal: ITiempoOperario[] = [];
  lstNumeroSolicitudes: INumeroSolicitudes[] = [];
  lstDefectoUnidades: IDefectoUnidades[] = [];
  lstDefectoUnidadesTotal: IDefectoUnidades[] = [];
  lstCausasAgrupadasFiltro: any[] = [];
  semanasTotal: number[] = [];
  semanas: any[] = [];
  semanasSeleccionadas: any[] = [];
  referenciasSeleccionadas: any[] = [];
  referenciasTotales: string[] = [];
  referencias: any[] = [];
  showReport: boolean = false;
  operarios: any[] = [];
  operariosTotal: any[] = [];
  operariosSeleccionados: any[] = [];
  causasSeleccionados: any[] = [];
  causasTotal: any[] = [];
  causas: any[] = [];
  dateIni: Date;
  dateFin: Date;

  ///////////////
  showGeneral: boolean = true;
  showCalidad: boolean = false;
  showTelas: boolean = false;
  showReferencias: boolean = false;
  showOperarios: boolean = false;
  showTiempos: boolean = false;
  showCausas: boolean = false;
  showCalidadSemanaChart: boolean = false;

  //Tabla
  loading: boolean = true;

  first = 0;
  rows: number = 12;
  activeIndex: number = 0;

  constructor(
    private informesReposicionesServices: ReposicionesInformesService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private excelService: ExcelService,
    private date: DatePipe,
    private message: SwalService
  ) {}

  ngOnInit() {
    this.iniciarComponente();
  }

  iniciarComponente(): void {
    Promise.all([
      this.getDatosFiltros(),
      this.getCalidadSemana(),
      this.getCalidadMes(),
      this.getReposicionMetrosSemanas(),
      this.getReposicionMetrosMes(),
      this.getReferenciaUnidadesMetros(),
      this.getOperarioUnidadesMetros(),
      this.getOperarioUnidadesMetros(),
      this.getTiempoOperario(),
      this.getDefectosUnidades(),
      this.getNumeroSolicitudes(),
    ]);
  }

  //Datos Generales
  getDatosFiltros() {
    this.dateIni = null;
    this.dateFin = null;
    this.spinner.show();
    this.getLstGeneral();
  }
  getNumeroSolicitudes() {
    this.semanasSeleccionadas = [];
    this.operariosSeleccionados = []
    this.informesReposicionesServices
      .getReposicionesOperarioNumeroSolicitudes()
      .subscribe((response) => {
        this.lstNumeroSolicitudes = response;
        this.lstNumeroSolicitudesTotal = response;
        this. llenarChart_NumeroSolicitudes();
      });
  }

  filtrarFecha() {
    console.log(this.dateIni, this.dateFin);
    if (this.dateIni != null && this.dateFin != null) {
      let dataInit = new Date(this.dateIni);
      let dataFin = new Date(this.dateFin);
      console.log(dataInit, dataFin);

      if (dataFin >= dataInit) {
        this.lstGeneral = this.lstGeneralTotal.filter((item) => {
          let fechaItem = new Date(item.fecha);
          return fechaItem >= dataInit && fechaItem <= dataFin;
        });
      } else {
        this.message.ShowSwalBasicWarning(
          'Fecha inválida',
          'La fecha inicial debe ser anterior a la fecha final'
        );
      }
    } else {
      this.message.ShowSwalBasicWarning(
        'Fecha inválida',
        'Ambas fechas son obligatorias'
      );
    }
  }

  getLstGeneral() {
    this.informesReposicionesServices
      .getListadoReposicionesGeneral()
      .subscribe((response) => {
        this.lstGeneral = response;
        this.lstGeneralTotal = response;
        this.spinner.hide();
        this.loading = false;
        this.getSemanas();
        this.getOperarios();
      });
  }

  getReposicionMetrosSemanas() {
    this.semanasSeleccionadas = [];
    try {
      this.informesReposicionesServices
        .getReposicionMetrosSemana()
        .subscribe((response) => {
          this.lstReposicionMetrosSemana = response;
          this.lstReposicionMetrosSemanaTotal = response;
          this.llenarChart_SemanasMetros();
        });
    } catch (error) {
      console.log(error);
    }
  }

  //Semanas Calidad

  getCalidadSemana() {
    this.semanasSeleccionadas = [];
    try {
      this.informesReposicionesServices
        .getCalidadReposicionSemana()
        .subscribe((response) => {
          this.lstCalidadSemana = response;
          this.lstCalidadSemanaTotal = response;
          this.llenarChart_SemanasCalidad();
        });
    } catch (error) {
      console.log(error);
    }
  }

  getCalidadMes() {
    this.lstCalidadMes = [];
    this.informesReposicionesServices
      .getCalidadReposicionMes()
      .subscribe((response) => {
        this.lstCalidadMes = response;

        this.chartOptions3 = {
          series: [
            {
              //y
              name: 'Calidad',
              data: this.lstCalidadMes.map(
                (e) => parseFloat(e.calidad.toFixed(2)) * 100
              ),
            },
            {
              //y
              name: 'Calidad Esperada',
              data: this.lstCalidadMes.map(
                (e) => parseFloat(e.meta.toFixed(2)) * 100
              ),
            },
          ],
          chart: {
            type: 'line',
            height: 500,
          },

          dataLabels: {
            enabled: true,
          },
          title: {
            text: 'Porcentaje Calidad por Mes',
            align: 'center',
          },
          xaxis: {
            //x
            categories: this.lstCalidadMes.map((e) => e.mes),
            title: {
              text: 'Mes',
            },
          },
          yaxis: {
            title: {
              text: 'Calidad',
            },
            labels: {
              formatter: function (value) {
                return value + ' %';
              },
            },
          },
        };
      });
  }

  getReposicionMetrosMes() {
    this.informesReposicionesServices
      .getReposicionMetrosMes()
      .subscribe((response) => {
        this.lstReposicionMetrosMes = response;
        this.chartOptions4 = {
          series: [
            {
              //y
              name: 'Metros',
              data: this.lstReposicionMetrosMes.map((e) =>
                parseFloat(e.metros.toFixed(2))
              ),
            },
          ],
          chart: {
            type: 'line',
            height: 500,
          },
          dataLabels: {
            enabled: true,
          },
          title: {
            text: 'Reposiciones en metros por Mes',
            align: 'center',
          },
          xaxis: {
            //x
            categories: this.lstReposicionMetrosMes.map((e) => e.mes),
            title: {
              text: 'Mes',
            },
          },
          yaxis: {
            title: {
              text: 'Metros',
            },
          },
        };
      });
  }
  getTiempoOperario() {
    this.semanasSeleccionadas = [];
    this.operariosSeleccionados = [];
    this.informesReposicionesServices
      .getTiempoOperario()
      .subscribe((response) => {
        this.lstTiempoOperario = response;
        this.lstTiempoOperarioTotal = response;
        this.llenarChart_TiempoOperarios();
      });
  }
  getDefectosUnidades() {
    this.semanasSeleccionadas = [];
    this.causasSeleccionados = [];
    this.informesReposicionesServices
      .getDefectoUnidades()
      .subscribe((response) => {
        this.lstDefectoUnidades = response;
        this.lstDefectoUnidadesTotal = response;
        this.lstDefectoUnidadesTotal = response;
        this.getCausas();
        this.agruparYSumarUnidades();
        this.llenarChart_CausasUnidades();
      });
  }

  getReferenciaUnidadesMetros() {
    this.getSemanas();
    this.semanasSeleccionadas = [];
    this.referenciasSeleccionadas = [];
    this.informesReposicionesServices
      .getReferencia_Unidades_Metros()
      .subscribe((response) => {
        this.lstReferencia_Unidades_Metros = response;
        this.lstReferencia_Unidades_MetrosTotal = response;
        this.llenarChart_Unidades_Metros();
      });
  }
  getSemanas() {
    this.semanasTotal = this.lstGeneralTotal.map((e) => e.semana);
    const numerosUnicos = new Set(this.semanasTotal);
    this.semanas = [...numerosUnicos].map((numero) => ({ semana: numero }));

    this.referenciasTotales = this.lstGeneralTotal.map((e) => e.referencia);
    var referenciasUnicas = new Set(this.referenciasTotales);
    this.referencias = [...referenciasUnicas].map((ref) => ({
      referencia: ref,
    }));
  }

  getOperarios() {
    this.operariosTotal = this.lstGeneralTotal.map((e) => e.operario);
    const operariosUnicos = new Set(this.operariosTotal);
    this.operarios = [...operariosUnicos].map((op) => ({ operario: op }));
  }
  getCausas() {
    this.causasTotal = this.lstDefectoUnidadesTotal.map((e) => e.causas);
    const causasUnicas = new Set(this.causasTotal);
    this.causas = [...causasUnicas].map((cau) => ({ causa: cau }));
  }

  llenarChart_Unidades_Metros() {
    this.chartOptions5 = {
      series: [
        {
          //y
          name: 'Metros',
          data: this.lstReferencia_Unidades_Metros.map((e) =>
            parseFloat(e.metros.toFixed(2))
          ),
        },
        {
          //y
          name: 'Unidades',
          data: this.lstReferencia_Unidades_Metros.map((e) =>
            parseFloat(e.unidades.toFixed(2))
          ),
        },
      ],
      chart: {
        type: 'bar',
        height: 500,
      },
      dataLabels: {
        enabled: true,
      },
      title: {
        text: 'Reposiciones en metros y unidades por Referencia',
        align: 'center',
      },
      xaxis: {
        //x
        categories: this.lstReferencia_Unidades_Metros.map((e) => e.referencia),
        title: {
          text: 'Referencia',
        },
      },
      yaxis: {
        title: {
          text: 'Metros - Unidades',
        },
      },
    };
  }

  getOperarioUnidadesMetros() {
    this.semanasSeleccionadas = [];
    this.operariosSeleccionados = [];
    this.informesReposicionesServices
      .getOperario_Unidades_Metros()
      .subscribe((response) => {
        this.lstgetOperarioUnidadesMetros = response;
        this.lstgetOperarioUnidadesMetrosTotal = response;
        this.llenarChart_Operarios_Unidades_Metros();
      });
  }

  viewGenerales() {
    this.causasSeleccionados = [];
    this.showGeneral = true;
    this.showCalidad = false;
    this.showTelas = false;
    this.showOperarios = false;
    this.showReferencias = false;
    this.showTiempos = false;
    this.showCausas = false;
  }
  viewCalidad() {
    this.causasSeleccionados = [];
    this.showGeneral = false;
    this.showCalidad = true;
    this.showTelas = false;
    this.showReferencias = false;
    this.showOperarios = false;
    this.showTiempos = false;
    this.showCausas = false;
    this.getCalidadSemana();
    this.getCalidadMes();
  }
  viewTelas() {
    this.causasSeleccionados = [];
    this.showGeneral = false;
    this.showCalidad = false;
    this.showTelas = true;
    this.showReferencias = false;
    this.showOperarios = false;
    this.showTiempos = false;
    this.showCausas = false;
    this.getReposicionMetrosMes();
    this.getReposicionMetrosSemanas();
  }
  viewReferencias() {
    this.causasSeleccionados = [];
    this.showGeneral = false;
    this.showCalidad = false;
    this.showTelas = false;
    this.showReferencias = true;
    this.showOperarios = false;
    this.showTiempos = false;
    this.showCausas = false;
    this.getReferenciaUnidadesMetros();
  }
  viewOperarios() {
    this.causasSeleccionados = [];
    this.showGeneral = false;
    this.showCalidad = false;
    this.showTelas = false;
    this.showReferencias = false;
    this.showOperarios = true;
    this.showTiempos = false;
    this.showCausas = false;
    this.getOperarioUnidadesMetros();
    this.getNumeroSolicitudes();
  }
  viewTiempos() {
    this.showGeneral = false;
    this.showCalidad = false;
    this.showTelas = false;
    this.showReferencias = false;
    this.showOperarios = false;
    this.showTiempos = true;
    this.showCausas = false;
    this.getTiempoOperario();
  }
  viewCausas() {
    this.showGeneral = false;
    this.showCalidad = false;
    this.showTelas = false;
    this.showReferencias = false;
    this.showOperarios = false;
    this.showTiempos = false;
    this.showCausas = true;
    this.getDefectosUnidades();
  }

  semanasCalidadFiltro() {
    if (this.semanasSeleccionadas.length > 0) {
      console.log(this.lstCalidadSemana);
      let semanas = this.semanasSeleccionadas.map((e) => e.semana);
      this.lstCalidadSemana = this.lstCalidadSemanaTotal.filter((item) =>
        semanas.includes(item.semana)
      );
      this.llenarChart_SemanasCalidad();
    } else {
      this.lstCalidadSemana = this.lstCalidadSemanaTotal;
      this.llenarChart_SemanasCalidad();
    }
  }

  tiempoOperarioFiltro() {
    let semanas = this.semanasSeleccionadas.map((e) => e.semana);
    let operario = this.operariosSeleccionados.map((e) => e.operario);

    if (semanas.length === 0 && operario.length === 0) {
      this.lstTiempoOperario = this.lstTiempoOperarioTotal;
    } else if (semanas.length > 0 && operario.length === 0) {
      this.lstTiempoOperario = this.lstTiempoOperarioTotal.filter((item) =>
        semanas.includes(item.semana)
      );
    } else if (semanas.length === 0 && operario.length > 0) {
      this.lstTiempoOperario = this.lstTiempoOperarioTotal.filter((item) =>
        operario.includes(item.operario)
      );
    } else {
      this.lstTiempoOperario = this.lstTiempoOperarioTotal.filter(
        (item) =>
          operario.includes(item.operario) && semanas.includes(item.semana)
      );
    }
    this.llenarChart_TiempoOperarios();
  }
  llenarChart_SemanasCalidad() {
    this.chartOptions2 = {
      series: [
        {
          //y
          name: 'Calidad Obtenida',
          data: this.lstCalidadSemana.map(
            (e) => parseFloat(e.calidad.toFixed(2)) * 100
          ),
        },
        {
          //y
          name: 'Calidad Esperada',
          data: this.lstCalidadSemana.map(
            (e) => parseFloat(e.meta.toFixed(2)) * 100
          ),
        },
      ],
      chart: {
        type: 'line',
        height: 500,
      },
      dataLabels: {
        enabled: false,
      },
      title: {
        text: 'Porcentaje de Calidad por Semanas',
        align: 'center',
      },
      xaxis: {
        //x
        categories: this.lstCalidadSemana.map((e) => e.semana),
        title: {
          text: 'Semana',
        },
      },
      yaxis: {
        title: {
          text: 'Calidad',
        },
        labels: {
          formatter: function (value) {
            return value + ' %';
          },
        },
      },
    };
  }

  semanasMetrosFiltro() {
    if (this.semanasSeleccionadas.length > 0) {
      let semanas = this.semanasSeleccionadas.map((e) => e.semana);
      this.lstReposicionMetrosSemana =
        this.lstReposicionMetrosSemanaTotal.filter((item) =>
          semanas.includes(item.semana)
        );
      this.llenarChart_SemanasMetros();
    } else {
      this.lstReposicionMetrosSemana = this.lstReposicionMetrosSemanaTotal;
      this.llenarChart_SemanasMetros();
    }
  }

  llenarChart_SemanasMetros() {
    this.chartOptions = {
      series: [
        {
          //y
          name: 'Metros',
          data: this.lstReposicionMetrosSemana.map((e) =>
            parseFloat(e.metros.toFixed(2))
          ),
        },
      ],
      chart: {
        type: 'line',
        height: 500,
      },
      dataLabels: {
        enabled: true,
      },
      title: {
        text: 'Reposiciones en metros por semanas',
        align: 'center',
      },
      xaxis: {
        //x
        categories: this.lstReposicionMetrosSemana.map((e) => e.semana),
        title: {
          text: 'Semana',
        },
      },
      yaxis: {
        title: {
          text: 'Metros',
        },
      },
    };
  }

  referenciaUnidadesMetrosFiltro() {
    let semanas = this.semanasSeleccionadas.map((e) => e.semana);
    let referencias = this.referenciasSeleccionadas.map((e) => e.referencia);

    if (semanas.length === 0 && referencias.length === 0) {
      this.lstReferencia_Unidades_Metros =
        this.lstReferencia_Unidades_MetrosTotal;
    } else if (semanas.length > 0 && referencias.length === 0) {
      this.lstReferencia_Unidades_Metros =
        this.lstReferencia_Unidades_MetrosTotal.filter((item) =>
          semanas.includes(item.semana)
        );
    } else if (semanas.length === 0 && referencias.length > 0) {
      this.lstReferencia_Unidades_Metros =
        this.lstReferencia_Unidades_MetrosTotal.filter((item) =>
          referencias.includes(item.referencia)
        );
    } else {
      this.lstReferencia_Unidades_Metros =
        this.lstReferencia_Unidades_MetrosTotal.filter(
          (item) =>
            referencias.includes(item.referencia) &&
            semanas.includes(item.semana)
        );
    }

    this.llenarChart_Unidades_Metros();
  }
  operariosUnidadesMetrosFiltro() {
    let semanas = this.semanasSeleccionadas.map((e) => e.semana);
    let operario = this.operariosSeleccionados.map((e) => e.operario);

    if (semanas.length === 0 && operario.length === 0) {
      this.lstgetOperarioUnidadesMetros =
        this.lstgetOperarioUnidadesMetrosTotal;
    } else if (semanas.length > 0 && operario.length === 0) {
      this.lstgetOperarioUnidadesMetros =
        this.lstgetOperarioUnidadesMetrosTotal.filter((item) =>
          semanas.includes(item.semana)
        );
    } else if (semanas.length === 0 && operario.length > 0) {
      //console.log(operario)
      this.lstgetOperarioUnidadesMetros =
        this.lstgetOperarioUnidadesMetrosTotal.filter((item) =>
          operario.includes(item.operario)
        );
    } else {
      this.lstgetOperarioUnidadesMetros =
        this.lstgetOperarioUnidadesMetrosTotal.filter(
          (item) =>
            operario.includes(item.operario) && semanas.includes(item.semana)
        );
    }

    this.llenarChart_Operarios_Unidades_Metros();
  }

  llenarChart_Operarios_Unidades_Metros() {
    this.chartOptions6 = {
      series: [
        {
          //y
          name: 'Metros',
          data: this.lstgetOperarioUnidadesMetros.map((e) =>
            parseFloat(e.metros.toFixed(2))
          ),
        },
      ],
      chart: {
        type: 'bar',
        height: 500,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0,
            },
          },
        },
      ],
      dataLabels: {
        enabled: true,
      },
      title: {
        text: 'Reposiciones en metros por Operario',
        align: 'center',
      },
      xaxis: {
        //x
        categories: this.lstgetOperarioUnidadesMetros.map((e) => e.operario),
        title: {
          text: 'Operario',
        },
      },
      yaxis: {
        title: {
          text: 'Metros',
        },
      },
    };
  }
  llenarChart_TiempoOperarios() {
    this.chartOptions7 = {
      series: [
        {
          //y
          name: 'Tiempo',
          data: this.lstTiempoOperario.map(
            (e) => parseFloat(e.tiempo.toFixed(2)) * 100
          ),
        },
      ],
      chart: {
        type: 'bar',
        height: 500,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0,
            },
          },
        },
      ],
      dataLabels: {
        enabled: true,
      },
      title: {
        text: 'Tiempo por Operario',
        align: 'center',
      },
      xaxis: {
        //x
        categories: this.lstTiempoOperario.map((e) => e.operario),
        title: {
          text: 'Operario',
        },
      },
      yaxis: {
        title: {
          text: 'Tiempo',
        },
        labels: {
          formatter: function (value) {
            return value + ' %';
          },
        },
      },
    };
  }
  llenarChart_CausasUnidades() {
    this.chartOptions8 = {
      series: [
        {
          //y
          name: 'Unidades',
          data: this.lstDefectoUnidades.map((e) => e.unidades),
        },
      ],
      chart: {
        type: 'bar',
        height: 500,
        stacked: true,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0,
            },
          },
        },
      ],
      dataLabels: {
        enabled: true,
      },
      title: {
        text: 'Reposicion de unidades por causas',
        align: 'center',
      },
      xaxis: {
        //x
        categories: this.lstDefectoUnidades.map((e) => e.causas),
        title: {
          text: 'Causas',
        },
      },
      yaxis: {
        title: {
          text: 'Unidades',
        },
      },
    };
  }
  CausasFiltro() {
    let semanas = this.semanasSeleccionadas.map((e) => e.semana);
    let causas = this.causasSeleccionados.map((e) => e.causa);

    if (semanas.length === 0 && causas.length === 0) {
      this.lstDefectoUnidades = this.lstDefectoUnidadesTotal;
      this.agruparYSumarUnidades();
    } else if (semanas.length > 0 && causas.length === 0) {
      this.lstDefectoUnidades = this.lstDefectoUnidadesTotal.filter((item) =>
        semanas.includes(item.semana)
      );
      this.agruparYSumarUnidades();
    } else if (semanas.length === 0 && causas.length > 0) {
      this.lstDefectoUnidades = this.lstDefectoUnidadesTotal.filter((item) =>
        causas.includes(item.causas)
      );
      this.agruparYSumarUnidades();
    } else {
      this.lstDefectoUnidades = this.lstDefectoUnidadesTotal.filter(
        (item) => causas.includes(item.causas) && semanas.includes(item.semana)
      );
      this.agruparYSumarUnidades();
    }

    this.llenarChart_CausasUnidades();
  }
  agruparYSumarUnidades() {
    this.lstCausasAgrupadasFiltro = [];
    const resultadoAgrupado = this.lstDefectoUnidades.reduce(
      (acumulador, item) => {
        const causaNormalizada = item.causas.trim().toUpperCase();
        if (acumulador[causaNormalizada]) {
          acumulador[causaNormalizada] += item.unidades;
        } else {
          acumulador[causaNormalizada] = item.unidades;
        }
        return acumulador;
      },
      {}
    );

    this.lstCausasAgrupadasFiltro = Object.keys(resultadoAgrupado).map(
      (causa) => ({
        causas: causa,
        unidades: resultadoAgrupado[causa],
      })
    );

    this.llenarChart_CausasUnidadesAgrupadas();
    console.log(this.lstCausasAgrupadasFiltro);
  }
  llenarChart_CausasUnidadesAgrupadas() {
    this.chartOptions9 = {
      series: [
        {
          //y
          name: 'Unidades',
          data: this.lstCausasAgrupadasFiltro.map((e) => e.unidades),
        },
      ],
      chart: {
        type: 'bar',
        height: 500,
        stacked: true,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0,
            },
          },
        },
      ],
      dataLabels: {
        enabled: true,
      },
      title: {
        text: 'Reposiciones de unidades por Causas',
        align: 'center',
      },
      xaxis: {
        //x
        categories: this.lstCausasAgrupadasFiltro.map((e) => e.causas),
        title: {
          text: 'Causas',
        },
      },
      yaxis: {
        title: {
          text: 'Unidades',
        },
      },
    };
  }

  UnidadesFiltro() {
    let semanas = this.semanasSeleccionadas.map((e) => e.semana);
    let operario = this.operariosSeleccionados.map((e) => e.operario);

    if (semanas.length === 0 && operario.length === 0) {
      this.lstNumeroSolicitudes = this.lstNumeroSolicitudesTotal;
    } else if (semanas.length > 0 && operario.length === 0) {
      this.lstNumeroSolicitudes = this.lstNumeroSolicitudesTotal.filter((item) =>
        semanas.includes(item.semana)
      );
    } else if (semanas.length === 0 && operario.length > 0) {
      this.lstNumeroSolicitudes = this.lstNumeroSolicitudesTotal.filter((item) =>
        operario.includes(item.operario)
      );
    } else {
      this.lstNumeroSolicitudes = this.lstNumeroSolicitudesTotal.filter(
        (item) =>
          operario.includes(item.operario) && semanas.includes(item.semana)
      );
    }
    this.llenarChart_NumeroSolicitudes() 
  }

  llenarChart_NumeroSolicitudes() {
    this.chartOptions10 = {
      series: [
        {
          //y
          name: 'No. Solicitudes',
          data: this.lstNumeroSolicitudes.map((e) => e.numeroDeSolicitudes),
        },
      ],
      chart: {
        type: 'bar',
        height: 500,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0,
            },
          },
        },
      ],
      dataLabels: {
        enabled: true,
      },
      title: {
        text: 'Numero de Solicitud de reposiciones por operario',
        align: 'center',
      },
      xaxis: {
        //x
        categories: this.lstNumeroSolicitudes.map((e) => e.operario),
        title: {
          text: 'Operario',
        },
      },
      yaxis: {
        title: {
          text: 'No. Solicitudes',
        },
      },
    };
  }
}
