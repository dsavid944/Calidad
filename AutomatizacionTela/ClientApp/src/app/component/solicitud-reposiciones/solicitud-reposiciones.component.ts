import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { AuditoriaCalidadService } from 'src/app/service/auditoria-calidad.service';
import { MessageService } from 'src/app/service/message.service';
import { IArtes, IPlantas, IModulos, IOrdenCorte, ITipoDefectos, IDefectos, IOperario } from 'src/model/interfaces';

@Component({
  selector: 'app-solicitud-reposiciones',
  templateUrl: './solicitud-reposiciones.component.html',
  styleUrls: ['./solicitud-reposiciones.component.css']
})
export class SolicitudReposicionesComponent {

  
  nuevaLinea: FormGroup;
  formularios: FormGroup[] = [];
  constructor( private auditoriaCalidad: AuditoriaCalidadService, private messageService: MessageService, private fb: FormBuilder) { }


  lstArtes: IArtes[] = [];
  artefilter: IArtes[] = [];
  arteSeleccionado: string;
  lstPlantas: IPlantas[] = [];
  showGenal: boolean = false;
  orden: number;
  unidades: number;
  metros:number;
  referenciaPrenda: string;
  user: string;
  selecciones: string[] = [];
  plantaSeleccionada: number;
  moduloSeleccionado:IModulos;
  comments: string;
  filas: any[] = [];
  radicado: number = 0;
  telasSeleccionadas: string[] = [];
  tela: string = null
  selectedTelas: IOrdenCorte[] = [];
  lstOrdenCortes: IOrdenCorte[] = [];
  lstOrdenCopia: IOrdenCorte[] = [];
  lstOrdenCortesTotal: IOrdenCorte[] = [];
  nuevaLista: IOrdenCorte[] = [];
  modulos: IModulos[] = [];
  tipoDefectos: ITipoDefectos[] = [];
  tipoDefectosFilter:  ITipoDefectos[] = [];
  defectos: IDefectos[] = [];
  defectosFilter: IDefectos[] = [];
  suggestions: IPlantas[] | undefined;
  lstPlantasfilter: IPlantas[] | undefined;
  lstModulosfilter: IModulos[] | undefined; 
  planta: boolean = false;
  modulo: boolean = false;
  operarioSeleccionado: number;
  lstOperarios: IOperario[] = [];
  lstOperariosFilter: IOperario[] = [];
  tipoDefectoSeleccionado: number;
  defectoSeleccionado: number;
  def: IDefectos[] = [];
  art: IArtes[] = [];
  


  ngOnInit(): void {
    this.getPlantas();
    this.user = localStorage.getItem("Name");
  }

  getOrdenCorte(){
    if(this.nuevaLista.length == 0){ 
 
    this.auditoriaCalidad.getOrdenCorte(this.orden).subscribe(response => {
      if(response.length > 0){

        this.auditoriaCalidad.getArtes(this.orden.toString()).subscribe(
          response => {
            for (const elemento of response) {
              if(elemento.arte == null){
                elemento.arte = 'N/A'
              }
            }

            this.lstArtes = response;
            this.artefilter = response
            })

        this.showGenal = true;
        this.lstOrdenCortesTotal=response
        this.lstOrdenCopia= response
        this.referenciaPrenda=response[0].referenciaPrenda
        for (const elemento of this.lstOrdenCortesTotal) {
          if (!elemento.hasOwnProperty("metros")) {
            elemento["metros"] = null;
          }
          if (!elemento.hasOwnProperty("unidades")) {
              elemento["unidades"] = null;
          }
        }
        if(this.plantaSeleccionada != 3 && this.plantaSeleccionada != 9){
           this.lstOrdenCortes=  this.lstOrdenCortesTotal.filter(arte => arte.arte === 'N/A')}
      }else{
        this.showGenal= false;
        this.orden=null
        this.messageService.AlertErrors('Orden de corte no valida').then(response => {
          if(response){
            this.showGenal= true;}
        })
      }

    }, (error)=>{
      this.showGenal= false;
      this.referenciaPrenda=null;
      this.messageService.AlertErrors('Orden de corte no valida').then(response => {
        // if(response){
        //   this.showGenal= true;
        // }
      })
    })
  }
  else{
    this.messageService.AlertQuestions('¿Está seguro de cambiar la orden de corte?').then(response => {
      if(response){
        this.nuevaLista = []
        this.artefilter = []
        this.art = null
        this.getOrdenCorte();
        this.lstOrdenCortes=[]
      }
    })
  }
  }  

  onSubmit() {

    this.messageService.AlertSuccess('Detalles agregados');
    if(this.orden ){
      const cumpleConCondiciones = (elemento: Record<string, any>) =>elemento['unidades'] > 0 && elemento['metros'] > 0;
      if(cumpleConCondiciones.length > 0){
        this.nuevaLista.push(...this.lstOrdenCortes.filter(cumpleConCondiciones));
        this.lstOrdenCortes = this.lstOrdenCortes.filter(item => !cumpleConCondiciones(item));
      this.showGenal = false
      this.messageService.AlertSuccess('Detalles agregados');
      this.getTipoDefectos();
      }else{
        this.showGenal= false;
        this.orden=null
        this.messageService.AlertErrors('Debe ingresar valores de metros y unidades en almenos una tela').then(response => {
          if(response){
            this.showGenal= true;
          }
        })
      }
    }
    else{
      this.showGenal= false;
      this.orden=null
      this.messageService.AlertErrors('Debe ingresar una orden de corte válida').then(response => {
        if(response){
          this.showGenal= true;
        }
      })
    }
  }

  
  DeleteFila(idrows:number){
    
    this.messageService.AlertQuestions('¿Está seguro de eliminar esta solicitud?').then(response => {
      if(response){
        this.nuevaLista=this.nuevaLista.filter(row => row.idRows!=idrows)
        this.lstOrdenCortes.push(this.lstOrdenCopia.find(e=>e.idRows== idrows))
      }
  })
  }

  validateMin(value: any, id: string){
    if(value < 0 || value == '-' || value == '')
    {
      let element = document.getElementById(id) as HTMLInputElement
      element.value = ''
    }
  }

  getModulos(event: any) {
    this.moduloSeleccionado = null
    this.nuevaLista.splice(0, this.nuevaLista.length);
    this.plantaSeleccionada = event.plantaId;
      this.auditoriaCalidad.getModulos(event.plantaId).subscribe(
        response => {
          this.modulos = response;
        }
      )
  }
  
  getOperarios() {
      this.auditoriaCalidad.getOperarios1().subscribe(
        response => {
          this.lstOperarios = response;
        }
      )
  }

  getTipoDefectos() {
    this.auditoriaCalidad.getTipoDefectos().subscribe(
      response => {
        this.tipoDefectos = response;
      }
    )
  }

  getDefectos(defectoId: number) {
    this.auditoriaCalidad.getDefectos(defectoId).subscribe(
      response => {
        this.defectos = response;
      }
    )
  }


  keyUpOc(event: any): void{
    if(event.key == 'Enter'){
      this.getOrdenCorte()
    }
  }

  getPlantas() {
    this.auditoriaCalidad.getPlantas().subscribe(response => {
      this.lstPlantas = response;})
  }

  showGeneral(){
    this.artefilter = [];
    this.showGenal = true;
    //this.referenciaPrenda = null
    for (const elemento of this.lstOrdenCortes) {
        elemento["metros"] = null;
        elemento["unidades"] = null;
    }
    

  }

  


  guardar(){
    if(this.plantaSeleccionada != null && this.nuevaLista.length > 0 && this.operarioSeleccionado != null && this.defectoSeleccionado != null && this.defectoSeleccionado != 0){
    let data={
      planta: this.plantaSeleccionada,
      modulo:this.moduloSeleccionado.idModulo,
      operario: this.operarioSeleccionado,
      datosGenerales: this.nuevaLista,
      tipoDefecto: this.tipoDefectoSeleccionado,
      defecto: this.defectoSeleccionado,
      responsable: localStorage.getItem("IdUser"),
    }
      this.messageService.AlertQuestions('¿Está seguro de Radicar la solicitud?').then(response => {
        if(response){
        this.auditoriaCalidad.SetReposiciones(data).subscribe(response => {
          if(response>0){
            this.radicado=response;
            this.messageService.AlertSuccessResp('Solicitud radicada con exito').then(resp => {
              if(resp>0){
                this.sendEmail()
                window.location.reload();
              }
            });
          }
        })
      }
    })
    }
    else{
      let data={
        planta: this.plantaSeleccionada,
        modulo:this.moduloSeleccionado.idModulo,
        operario: this.operarioSeleccionado,
        datosGenerales: this.nuevaLista,
        tipoDefecto: this.tipoDefectoSeleccionado,
        defecto: this.defectoSeleccionado,
        responsable: localStorage.getItem("IdUser"),
      }
      this.messageService.AlertError('Existen valores obligatorios vacios, todos los campos deben estar llenos. ')
    }
  }

  sendEmail(){
    let destinatarios: string[] = ['dircompras@mic.com.co', 'telas2@mic.com.co'];
    //let destinatarios: string[] = ['analista6@mic.com.co'];
    this.telasSeleccionadas = this.nuevaLista.map(item => item.descripcionTela);
    const NombrestelasSeleccionadas = "- "+this.telasSeleccionadas.join('<br>'+'- ');
    const nombrePlanta = this.lstPlantas.filter(item => item.plantaId == this.plantaSeleccionada)
    for (let i = 0; i < destinatarios.length; i++) {
      let body = {
        emailUsertoSend: destinatarios[i],
        telas: NombrestelasSeleccionadas,
        planta: nombrePlanta[0].descripcion,
        url: `https://miclocal.com.co:9376/reposiciones-pendientes/${destinatarios[i]}`,
        subject: 'Nueva solicitud de Reposición de Telas (Radicado #['+this.radicado.toString()+'])',
        template: "TemplateRreposicionTelas",
      };
      this.auditoriaCalidad.sendEmail(body).subscribe(response => {
      });
    }
  }

  searchPlanta(event: any) {
    const query = event.query.toLowerCase();
    this.lstPlantasfilter = this.lstPlantas.filter(
      planta=>
        planta.descripcion.toLowerCase().includes(query) 
    );
  }
  searchModulo(event: any) {
    const query = event.query.toLowerCase();
    this.lstModulosfilter = this.modulos.filter(
      modulo=>
        modulo.descripcion.toLowerCase().includes(query) 
    );
  }
  searchOperario(event: any) {
    const query = event.query.toLowerCase();
    this.lstOperariosFilter = this.lstOperarios.filter(
      operario=>
        operario.nombreOperario.toLowerCase().includes(query) 
    );
  }
  searchTipoDefecto(event: any) {
    this.defectosFilter= []
    this.def = []
    const query = event.query.toLowerCase();
    this.tipoDefectosFilter = this.tipoDefectos.filter(
      tipo=>
        tipo.descripcion.toLowerCase().includes(query) 
    );
  }
  searchDefecto(event: any) {
    this.defectosFilter= []
    const query = event.query.toLowerCase();
    this.defectosFilter = this.defectos.filter(
      defecto=>
        defecto.descripcion.toLowerCase().includes(query) 
    );
  }
  searchArte(event: any) {
    this.artefilter= []
    const query = event.query.toLowerCase();
    this.artefilter = this.lstArtes.filter(
      arte=>
        arte.referencia.toLowerCase().includes(query) 
    );
  }

  selectModulo(event:any){
  
  }
  
  selectOperario(event:any){
    this.operarioSeleccionado = event.value.idRowOperario
  }

  selectTipoDefecto(event:any){
    this.tipoDefectoSeleccionado = event.tipoDefectoId
    this.getDefectos(this.tipoDefectoSeleccionado)
    this.def = []
  }

  selectDefecto(event:any){
    this.defectoSeleccionado = event.value.defectoId
  }
  selectArte(event:any){
    
    this.arteSeleccionado = event.arte
    this.lstOrdenCortes = this.lstOrdenCortesTotal.filter(arte => arte.arte === this.arteSeleccionado)
  }


}
