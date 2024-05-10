import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuditoriaCalidadService } from 'src/app/service/auditoria-calidad.service';
import { PermissionsService } from 'src/app/service/permissions.service';
import { IPlantas, IModulos, ITipoPrendas, IPrendas, ITipoDefectos, IDefectos, IArtes } from 'src/model/interfaces';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-auditoria-calidad',
  templateUrl: './auditoria-calidad.component.html',
  styleUrls: ['./auditoria-calidad.component.css']
})
export class AuditoriaCalidadComponent {


  formAuditoriaCalidad: any;
  plantas: IPlantas[] = [];
  modulos: IModulos[] = [];
  tipoPrendas: ITipoPrendas[] = [];
  prendas: IPrendas[] = [];
  tipoDefectos: ITipoDefectos[] = [];
  defectos: IDefectos[] = [];
  artes: IArtes[] = [];
  enabledModulo: boolean = true;
  patternInteger: string = '^[0-9]+$';


  constructor(private fb: FormBuilder, private auditoriaCalidadService: AuditoriaCalidadService, private permissionsService: PermissionsService) {
    this.formAuditoriaCalidad = this.fb.group({
      planta: new FormControl({ value: 0, disabled: false }, Validators.required),
      modulo: new FormControl({ value: 0, disabled: true }, Validators.required),
      ordenCorte: new FormControl({ value: '', disabled: true }, Validators.required),
      numeroArte: new FormControl({ value: 0, disabled: true }),
      referencia: new FormControl({ value: '', disabled: true }, Validators.required),
      tipoPrenda: new FormControl({ value: 0, disabled: true }, Validators.required),
      prenda: new FormControl({ value: 0, disabled: true }, Validators.required),
      tipoDefecto: new FormControl({ value: 0, disabled: true }),
      defecto: new FormControl({ value: 0, disabled: true }),
      unidadesRevisadas: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.pattern(this.patternInteger)]),
      unidadesDefectuosas: new FormControl({ value: '', disabled: true }, Validators.required),
    });
  }

  ngOnInit(): void {


    this.getPlantas();
    this.getTipoPrendas();
    this.getTipoDefectos();
  }

  getPlantas() {
    this.auditoriaCalidadService.getPlantas().subscribe(
      response => {
        this.plantas = response;
      }
    )
  }

  getModulos(plantaId: number) {
    this.cleanForm();
    if (plantaId != 0) {
      this.formAuditoriaCalidad.get('ordenCorte').enable();
      this.formAuditoriaCalidad.get('tipoPrenda').enable();
      this.formAuditoriaCalidad.get('tipoDefecto').enable();
      this.formAuditoriaCalidad.get('unidadesRevisadas').enable();
      this.formAuditoriaCalidad.get('modulo').enable();
      this.auditoriaCalidadService.getModulos(plantaId).subscribe(
        response => {
          this.modulos = response;
          if (this.modulos.length == 0) {
            this.formAuditoriaCalidad.controls.modulo.disable()
          } else {
            this.formAuditoriaCalidad.controls.modulo.enable()
          }
        }
      )
    } else {
      this.cleanForm();
    }

  }

  getTipoPrendas() {
    this.auditoriaCalidadService.getTipoPrendas().subscribe(
      response => {
        this.tipoPrendas = response;
      }
    )
  }

  getPrendas(prendaId: number) {
    if (prendaId != 0) {
      this.formAuditoriaCalidad.get('prenda').enable();
      this.auditoriaCalidadService.getPrendas(prendaId).subscribe(
        response => {
          this.prendas = response;
          if (this.prendas.length == 0) {
            this.formAuditoriaCalidad.get('prenda').disable();
          } else {
            this.formAuditoriaCalidad.get('prenda').enable();
          }
        }
      )
    } else {
      this.formAuditoriaCalidad.get('prenda').setValue(0);
      this.formAuditoriaCalidad.get('prenda').disable();
    }

  }

  getTipoDefectos() {
    this.auditoriaCalidadService.getTipoDefectos().subscribe(
      response => {
        this.tipoDefectos = response;
      }
    )
  }

  getDefectos(defectoId: number) {
    if (defectoId != 0) {
      this.auditoriaCalidadService.getDefectos(defectoId).subscribe(
        response => {
          this.defectos = response;
          if (this.defectos.length == 0) {
            this.formAuditoriaCalidad.get('defecto').disable();
          } else {
            this.formAuditoriaCalidad.get('defecto').enable();
          }
        }
      )
    } else {
      this.formAuditoriaCalidad.get('defecto').setValue(0);
      this.formAuditoriaCalidad.get('defecto').disable();
    }
  }

  getArtes(ordenCorte: string) {
    if ((ordenCorte != '' && ordenCorte != null)) {
      this.auditoriaCalidadService.getArtes(ordenCorte).subscribe(
        response => {
          this.artes = response;
          if (this.artes.length == 0) {
            this.formAuditoriaCalidad.get('numeroArte').disable();
            this.formAuditoriaCalidad.get('referencia').setValue('');
          } else {
            this.formAuditoriaCalidad.get('referencia').setValue(this.artes[0].referencia);

            let arteNull = 0;

            this.artes.forEach(element => {
              if (element.arte == null) {
                arteNull++;
              }
            });

            if (arteNull == 0 && (this.formAuditoriaCalidad.get('planta').value == 9 || this.formAuditoriaCalidad.get('planta').value == 3)) {
              this.formAuditoriaCalidad.get('numeroArte').enable();
            }

            // console.log(arteNull)
            // console.log(this.formAuditoriaCalidad.get('planta').value)
          }
        }
      );
    } else {
      this.formAuditoriaCalidad.get('referencia').setValue('');
      this.formAuditoriaCalidad.get('numeroArte').setValue(0);
      this.formAuditoriaCalidad.get('numeroArte').disable();
    }
  }

  postDatos() {
    const element = document.getElementById('floatingSelectNumeroArte') as HTMLSelectElement;

    if (
      this.formAuditoriaCalidad.get('planta').value != 0 &&
      this.formAuditoriaCalidad.get('modulo').value != 0 &&
      this.formAuditoriaCalidad.get('ordenCorte').value != '' &&
      (this.formAuditoriaCalidad.get('referencia').value != '' && this.formAuditoriaCalidad.get('referencia').value != null) &&
      this.formAuditoriaCalidad.get('tipoPrenda').value != 0 &&
      this.formAuditoriaCalidad.get('prenda').value != 0 &&
      this.formAuditoriaCalidad.get('unidadesRevisadas').value != '' && this.formAuditoriaCalidad.get('unidadesRevisadas').value != null &&
      this.formAuditoriaCalidad.get('unidadesDefectuosas').value != '' && this.formAuditoriaCalidad.get('unidadesDefectuosas').value != null
    ) {
      if ((this.formAuditoriaCalidad.get('unidadesDefectuosas').value != 0) &&
        this.formAuditoriaCalidad.get('tipoDefecto').value != 0 && this.formAuditoriaCalidad.get('defecto').value != 0) {
        if (this.formAuditoriaCalidad.get('tipoDefecto').value != 0 && this.formAuditoriaCalidad.get('defecto').value != 0) {
          if (
            (this.formAuditoriaCalidad.get('planta').value == 3 || this.formAuditoriaCalidad.get('planta').value == 9) &&
            (element.disabled == false && this.formAuditoriaCalidad.get('numeroArte').value != 0)) {
            this.enviarDatosServices();
          } else if ((this.formAuditoriaCalidad.get('planta').value != 3 && this.formAuditoriaCalidad.get('planta').value != 9) &&
            (element.disabled == true && this.formAuditoriaCalidad.get('numeroArte').value == 0)) {
            this.enviarDatosServices();
          } else if ((this.formAuditoriaCalidad.get('planta').value == 3 || this.formAuditoriaCalidad.get('planta').value == 9) &&
            (element.disabled == true && this.formAuditoriaCalidad.get('numeroArte').value == 0)) {
            this.enviarDatosServices();
          } else {
            Swal.fire({
              title: 'Error!',
              text: 'Se debe seleccionar un número de arte',
              icon: 'error',
              confirmButtonText: 'Ok',
            })
          }
        } else {
          Swal.fire({
            title: 'Error!',
            text: 'No se han ingresado los defectos',
            icon: 'error',
            confirmButtonText: 'Ok',
          })
        }
      } else if ((this.formAuditoriaCalidad.get('unidadesDefectuosas').value == 0) &&
        this.formAuditoriaCalidad.get('tipoDefecto').value == 0 && this.formAuditoriaCalidad.get('defecto').value == 0) {
        if (
          (this.formAuditoriaCalidad.get('planta').value == 3 || this.formAuditoriaCalidad.get('planta').value == 9) &&
          (element.disabled == false && this.formAuditoriaCalidad.get('numeroArte').value != 0)) {
          this.enviarDatosServices();
        } else if ((this.formAuditoriaCalidad.get('planta').value != 3 && this.formAuditoriaCalidad.get('planta').value != 9) &&
          (element.disabled == true && this.formAuditoriaCalidad.get('numeroArte').value == 0)) {
          this.enviarDatosServices();
        } else if ((this.formAuditoriaCalidad.get('planta').value == 3 || this.formAuditoriaCalidad.get('planta').value == 9) &&
          (element.disabled == true && this.formAuditoriaCalidad.get('numeroArte').value == 0)) {
          this.enviarDatosServices();
        } else {
          Swal.fire({
            title: 'Error!',
            text: 'Se debe seleccionar un número de arte',
            icon: 'error',
            confirmButtonText: 'Ok',
          })
        }
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'No se han ingresado los defectos',
          icon: 'error',
          confirmButtonText: 'Ok',
        })
      }
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Uno o varios valores no han sido ingresados',
        icon: 'error',
        confirmButtonText: 'Ok',
      })
    }
  }

  cleanForm() {
    this.formAuditoriaCalidad.get('modulo').setValue(0);
    this.formAuditoriaCalidad.get('ordenCorte').setValue('');
    this.formAuditoriaCalidad.get('numeroArte').setValue(0);
    this.formAuditoriaCalidad.get('referencia').setValue('');
    this.formAuditoriaCalidad.get('tipoPrenda').setValue(0);
    this.formAuditoriaCalidad.get('prenda').setValue(0);
    this.formAuditoriaCalidad.get('tipoDefecto').setValue(0);
    this.formAuditoriaCalidad.get('defecto').setValue(0);
    this.formAuditoriaCalidad.get('unidadesDefectuosas').setValue('');
    this.formAuditoriaCalidad.get('unidadesRevisadas').setValue('');
    this.formAuditoriaCalidad.get('modulo').disable();
    this.formAuditoriaCalidad.get('numeroArte').disable();
    this.formAuditoriaCalidad.get('prenda').disable();
    this.formAuditoriaCalidad.get('tipoPrenda').disable();
    this.formAuditoriaCalidad.get('tipoDefecto').disable();
    this.formAuditoriaCalidad.get('defecto').disable();
    this.formAuditoriaCalidad.get('unidadesDefectuosas').disable();
    this.formAuditoriaCalidad.get('unidadesRevisadas').disable();
    this.formAuditoriaCalidad.get('ordenCorte').disable();
    this.modulos = [];
    this.prendas = [];
    this.defectos = [];
  }

  validateIntegerNumber(select: string) {
    if (this.formAuditoriaCalidad.get('unidadesRevisadas').value != '' && this.formAuditoriaCalidad.get('unidadesRevisadas').value != null) {
      let valor = '';
      if (select == 'revisadas') {
        valor = this.formAuditoriaCalidad.get('unidadesRevisadas').value.toString();
      } else if (select == 'defectuosas') {
        valor = this.formAuditoriaCalidad.get('unidadesDefectuosas').value.toString();
      }

      if (valor.includes('-') || valor.includes(',') || valor.includes('.')) {
        if (select == 'revisadas') {
          this.formAuditoriaCalidad.get('unidadesRevisadas').reset();
        } else if (select == 'defectuosas') {
          this.formAuditoriaCalidad.get('unidadesDefectuosas').reset();
        }
      }
    }
  }

  validateZeroNumber() {
    if (String(this.formAuditoriaCalidad.get('unidadesDefectuosas').value) == '0') {
      this.formAuditoriaCalidad.get('tipoDefecto').disable();
      this.formAuditoriaCalidad.get('defecto').disable();
      this.formAuditoriaCalidad.get('tipoDefecto').setValue(0);
      this.formAuditoriaCalidad.get('defecto').setValue(0);
    } else if (String(this.formAuditoriaCalidad.get('unidadesDefectuosas').value) == '') {
      this.formAuditoriaCalidad.get('tipoDefecto').enable();
    }
  }

  cleanAll() {
    this.cleanForm();
    this.formAuditoriaCalidad.get('planta').setValue(0);
  }

  validateLargerNumber() {
    if (this.formAuditoriaCalidad.get('unidadesDefectuosas').value > this.formAuditoriaCalidad.get('unidadesRevisadas').value) {
      this.formAuditoriaCalidad.get('unidadesDefectuosas').reset();
    }
  }

  enableDefectiveUnits() {
    if (this.formAuditoriaCalidad.get('unidadesRevisadas').value != '' && this.formAuditoriaCalidad.get('unidadesRevisadas').value != null) {
      this.formAuditoriaCalidad.get('unidadesDefectuosas').enable();
    } else if (this.formAuditoriaCalidad.get('unidadesRevisadas').value == '' || this.formAuditoriaCalidad.get('unidadesRevisadas').value == null) {
      this.formAuditoriaCalidad.get('unidadesDefectuosas').disable();
      this.formAuditoriaCalidad.get('unidadesDefectuosas').reset();
    }
  }

  enviarDatosServices() {
    let body = {
      plantaId: this.formAuditoriaCalidad.get('planta').value,
      modulo: this.formAuditoriaCalidad.get('modulo').value,
      ordenCorte: this.formAuditoriaCalidad.get('ordenCorte').value,
      numeroArte: this.formAuditoriaCalidad.get('numeroArte').value == '' ? null : this.formAuditoriaCalidad.get('numeroArte').value,
      referencia: this.formAuditoriaCalidad.get('referencia').value,
      prendaId: this.formAuditoriaCalidad.get('tipoPrenda').value,
      prendasDetalleId: this.formAuditoriaCalidad.get('prenda').value,
      tipoDefectoId: this.formAuditoriaCalidad.get('tipoDefecto').value == 0 ? null : this.formAuditoriaCalidad.get('tipoDefecto').value,
      defectoId: this.formAuditoriaCalidad.get('defecto').value == 0 ? null : this.formAuditoriaCalidad.get('defecto').value,
      cantidad: this.formAuditoriaCalidad.get('unidadesDefectuosas').value,
      undRevisadas: this.formAuditoriaCalidad.get('unidadesRevisadas').value,
      auditoraId: localStorage.getItem('EmailUser'),
    }

    this.auditoriaCalidadService.postDatos(body).subscribe(
      response => {
        if (response == 1) {
          this.formAuditoriaCalidad.get('tipoDefecto').enable();
          this.formAuditoriaCalidad.get('tipoDefecto').setValue(0);
          this.formAuditoriaCalidad.get('defecto').setValue(0);
          this.formAuditoriaCalidad.get('defecto').disable();
          this.formAuditoriaCalidad.get('unidadesDefectuosas').reset();
          this.formAuditoriaCalidad.get('unidadesRevisadas').reset();

          Swal.fire({
            title: 'Agregado!',
            text: 'Se agregó con éxito',
            icon: 'success',
            confirmButtonText: 'Ok',
          })
        } else if (response == 0) {
          Swal.fire({
            title: 'Error!',
            text: 'No se pudo agregar. Referencia no existe',
            icon: 'error',
            confirmButtonText: 'Ok',
          })
        }
      }
    )
  }
}
