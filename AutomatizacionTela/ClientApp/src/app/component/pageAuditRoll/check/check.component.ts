

import { Component, OnInit } from '@angular/core';
import { DefectService } from 'src/app/service/defect.service';
import { RollService } from 'src/app/service/roll.service';
import { SwalService } from 'src/app/service/swal.service';
import { Defect, IGetCheck, IUIRollCheck, State } from '../../../../model/interfaces';

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.css'],
})
export class CheckComponent implements OnInit
{

  dataFromDB: IGetCheck[] = [];
  userInputs: IUIRollCheck[] = [];
  searchRoll?: number;
  searchLot: string = '';
  defectosProveedores: Defect[] = [];
  estados: State[] = [];
  selectedRow: number | null = null;
  selectedItem: any = {};
  dataAllCheck:any[] = [];
  dataSelectedRoll:any[]=[];

  constructor(
    private rollService: RollService,
    private defectService: DefectService,
    private alert: SwalService
  ) {}

  ngOnInit(): void {
    this.loadDefects();
    this.loadStates();
  }

  //Leer la tabla de defectos
  loadDefects(): void {
    this.defectService.getDefects().subscribe({
      next: (data) => {
        this.defectosProveedores = data;
      },
      error: (error) => {
        console.error('Error al recuperar defectos:', error);
        this.alert.showErrorMessage('Error al recuperar defectos.');
      },
    });
  }

  loadStates(): void {
    this.defectService.getStates().subscribe({
      next: (data) => {
        this.estados = data;
      },
      error: (error) => {
        console.error('Error al recuperar defectos:', error);
        this.alert.showErrorMessage('Error al recuperar defectos.');
      },
    });
  }
  //Buscar informacion por rollo o lote
  searchCheck(): void {
    if (!this.searchRoll && !this.searchLot) {
      this.alert.ShowSwalBasicWarning(
        'Advertencia',
        'Debe proporcionar al menos un criterio de búsqueda.'
      );
      return;
    }

    this.rollService.getCheck(this.searchRoll, this.searchLot).subscribe({
      next: (dataFromDB) => {
        this.dataFromDB = dataFromDB;
        //this.updateUserInputs();
        //console.log(this.dataFromDB);
      },
      error: (error) => {
        console.error('Error al buscar:', error);
        this.alert.showErrorMessage('Error al buscar.');
      },
    });
  }

  updateUserInputs(item: any) {
    this.rollService.getDetailCheck(item.lot).subscribe({
      next: (response) => {
        const storedRollIds = response.map(stored => stored.idRowRevision);
        console.log(response.map(stored => stored.idRowRevision));
        // Filtrar los rollos que aún no están almacenados
        const newRolls = this.dataFromDB.filter(roll => !storedRollIds.includes(roll.idRowRevision));
        //console.log(newRolls);
        // Preparar los nuevos rollos para ser añadidos, inicializando los campos necesarios
        const newRollsPrepared = newRolls.map(roll => ({
          ...roll,
          idRowEstado: null,
          peso: null,
          rto: null,
          ea: null,
          el: null,
          viro: null,
          elongacionAncho: null,
          elongacionLargo: null,
          observacion: null,
          isStored: false,
        }));
        // Marcar los rollos ya almacenados con isStored para identificarlos en la UI
        const storedRollsPrepared = response.map((storedRoll) => ({
          ...storedRoll,
          isStored: true,
        }));

        // Combinar los rollos almacenados y los nuevos
        this.userInputs = [...storedRollsPrepared, ...newRollsPrepared];
        this.selectedItem = item;
        this.selectedRow = null;


        let roll = this.userInputs;
        let hash2={}
        roll=roll.filter(e=>hash2[e.roll]?false:hash2[e.roll]=true);
        this.dataAllCheck=roll

        this.dataSelectedRoll=this.userInputs;
        //console.log(this.dataAllCheck);

      },
      error: (error) => {
        console.error('Error al obtener detalles del documento:', error);
        this.alert.showErrorMessage('Error al cargar datos para el modal.');
      },
    });
  }

  //se utiliza para editar en la tabla
  selectRowForEdit(rollNumber: number): void {
    this.selectedRow = this.selectedRow === rollNumber ? null : rollNumber;
    console.log(this.selectedRow);

  }

  selectedRollAudit(roll:number)
  {
    this.dataSelectedRoll =  this.userInputs.filter(e=>e.roll == roll)

    this.selectedRow=roll;
  }
  resetModalData() {
    // Limpia o reinicia las propiedades como necesites
    this.selectedItem = {};
    this.userInputs = [];
    this.dataFromDB = [];
  }

  //procede a guardar
  onSaveChanges(data:any): void {

    let saveData:any
    // Verifica que todos los campos estén completos.
    if(data.peso==null || data.rto == null || data.ea ==null || data.el == null || data.viro == null || data.elongacionAncho == null || data.elongacionLargo == null || data.idRowEstado == null){
      this.alert.ShowSwalBasicWarning(
        'Advertencia',
        'Todos los campos deben ser completados.'
      );
      return;
    }else
    {
    // Preparar los datos para ser enviados
    saveData={
        idRowRevision: data.idRowRevision,
        idRowUsuario: parseInt(localStorage.getItem('IdUser')),
        idRowEstado: data.idRowEstado,
        peso: data.peso,
        rto: data.rto,
        ea: data.ea,
        el: data.el,
        viro: data.viro,
        elongacionAncho: data.elongacionAncho,
        elongacionLargo: data.elongacionLargo,
        observacion: data.observacion ? data.observacion : null
      }
    }console.log(saveData)

    // Enviar los datos al backend a través del servicio
    this.rollService.saveUpdateCheck(saveData).subscribe({
      next: (response) => {
        console.log('Datos guardados correctamente', response);
        this.resetModalData();
        this.alert.ShowSwalBasicSuccess(
          'Operación Exitosa',
          'Datos guardados correctamente.'
        );
        this.updateUserInputs(data)
      },
      error: (error) => {
        console.error('Error al guardar los datos', error);
        this.alert.ShowSwalBasicWarning('Error', 'Error al guardar los datos.');
      },
    });
  }
}
