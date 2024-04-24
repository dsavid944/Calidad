import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuditoriaCalidadService } from 'src/app/service/auditoria-calidad.service';
import { MessageService } from 'src/app/service/message.service';
import { IReposiciones, IDetalleReposiciones, IPlantas } from 'src/model/interfaces';

@Component({
  selector: 'app-reposiciones-pendientes',
  templateUrl: './reposiciones-pendientes.component.html',
  styleUrls: ['./reposiciones-pendientes.component.css']
})
export class ReposicionesPendientesComponent {

  
  lstReposiciones: IReposiciones[];
  lstDetalles: IDetalleReposiciones[];
  dataFinaly: any[];
  dataFiltrada: any[];
  lstPlantas: IPlantas[];
  plantasFilter: IPlantas[];
  dataEstados: any[];
  estadoSeleccionado: string;
  plantaSeleccionada:string;
  items: MenuItem[] | undefined;
  destinatarios: string[]; 

  constructor(private auditoriaCalidad: AuditoriaCalidadService, private messageService: MessageService,) { }

  ngOnInit() {
    if(localStorage.getItem("emailUser") == null){
      //location.href = "https://miclocal.com.co:9321/login";
    }
    this.getReposicionTelas();
    this.getDetalleReposiciones();
    this.getPlantas();

    this.dataEstados = [
      {value: 'APROBADA'},
      {value: 'CREADA'},
      {value: 'RECHAZADA'}
    ]
  }


  getPlantas() {
    this.auditoriaCalidad.getPlantas().subscribe(response => {
      this.lstPlantas = response;
      this.plantasFilter = response;})
  }

  getReposicionTelas(){
    this.auditoriaCalidad.getReposicionTelas().subscribe(response => {
      this.lstReposiciones = response;
      this.getDetalleReposiciones();
    })
  }
  getDetalleReposiciones(){
    this.auditoriaCalidad.getDetalleReposiciones().subscribe(response => {
      this.lstDetalles = response;
      this.json();
      if(this.dataFinaly.length > 0 ){
        this.dataFiltrada = this.dataFinaly
      }
    })
  }


  filtrarPorEstado(){
    this.dataFiltrada = this.dataFinaly
    this.plantaSeleccionada = ''
    this.dataFiltrada = this.dataFinaly.filter((e) => e.estadoReposicion == this.estadoSeleccionado)
    if(this.estadoSeleccionado == '')
    {
      this.dataFiltrada = this.dataFinaly
    }
  }

  getSeverity(status: string){
    switch(status){
      case "APROBADA":
        return  "success";
      case "RECHAZADA":
        return "danger";
      case "CREADA":
        return "primary";
      default:
        return "info";
    } 
  }

  json(){
    this.dataFinaly = []
    let detail = this.lstReposiciones;
    let hash = {}
    detail = detail.filter(e => hash[e.radicado] ? false : hash[e.radicado] = true)
    detail.forEach(element => {
      this.dataFinaly.push({
        radicado: element.radicado,
        nombrePlanta: element.nombrePlanta,
        modulo: element.modulo,
        tipoDefecto: element.tipoDefecto,
        defecto: element.defecto,
        estadoReposicion: element.estadoReposicion,
        aprobador: element.aprobador,
        fechaAprobacion: element.fechaAprobacion,
        fechaSolicitud: element.fechaSolicitud,
        operario: element.operario,
        solicitante: element.solicitante,
        detail: this.lstDetalles.filter(e => e.radicado == element.radicado)
      })
    });
  }

  filtrarPorPlanta(){
    this.dataFiltrada = this.dataFinaly
    this.estadoSeleccionado='';
    this.dataFiltrada = this.dataFinaly.filter((e) => e.nombrePlanta == this.plantaSeleccionada)
    if(this.plantaSeleccionada == '')
    {
      this.dataFiltrada = this.dataFinaly
    }
  }

  cambiarEstado(radicado: number, opt: number){
    let tip = {}
    let estado=''
    let est=''
    if(opt ==1){
      tip = {
        idRows: radicado,
        estado: 1,
        aprobador: localStorage.getItem("idUser"),
      };
      //this.destinatarios= ['analista6@mic.com.co'];
      this.destinatarios= ['gestioncalidad1@mic.com.co', 'pqc@mic.com.co', 'mestampacion@mic.com.co','supervisorescorte@mic.com.co', 'mcalidad@mic.com.co' ];
      estado='APROBADA'
      est='APROBAR'
    }
    else{
      //this.destinatarios= ['analista6@mic.com.co'];
      this.destinatarios= ['gestioncalidad1@mic.com.co', 'pqc@mic.com.co', 'mestampacion@mic.com.co','supervisorescorte@mic.com.co', 'mcalidad@mic.com.co' ];
      tip = {
        idRows: radicado,
        estado: 2,
        aprobador: localStorage.getItem("idUser"),
      };
      estado='RECHAZADA'
      est='RECHAZAR'
    }

    this.messageService.AlertQuestions('¿Está seguro que desea '+est+' la reposicion?').then(response => {
      if(response){
        this.auditoriaCalidad.updateEstadoReposicion(tip).subscribe(response => {
          if(response){
            this.messageService.AlertSuccess('Resposicion '+estado+' Con éxito')
            this.getReposicionTelas();
            this.sendEmail(estado,radicado)
         }
        else{
          this.messageService.AlertError('Ocurrio un error, No se puedo actualizar el estado');
          }
        })
      }
      
    })
   
  }

  sendEmail(estado: string, radicado: number){
   
    
    const detalles = this.dataFinaly.filter((e) => e.radicado == radicado)
    const telasRelacionadas = detalles[0].detail.map(item => item.descripcionTela);
    const telasString = '- '+telasRelacionadas.join('<br>'+'- ');
    for (let i = 0; i < this.destinatarios.length; i++) {
     let body={
       emailUsertoSend: this.destinatarios[i],
      telas: telasString,
       planta: detalles[0].nombrePlanta,
       estado: estado,
       subject: 'Solicitud de Reposición de Telas (Radicado #['+radicado.toString()+']) '+ estado,
       template: "TemplateGestionReposicionTelas",
       username: localStorage.getItem("user"),
     }
     this.auditoriaCalidad.sendEmail(body).subscribe(response => {
     })
    }
  }

}
