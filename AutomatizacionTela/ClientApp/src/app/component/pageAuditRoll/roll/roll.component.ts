import { Component } from '@angular/core';
import { DefectService } from 'src/app/service/defect.service';
import { RollService } from 'src/app/service/roll.service';
import { SwalService } from 'src/app/service/swal.service';
import { Defect, IGetRoll, IRollData } from 'src/model/interfaces';

@Component({
  selector: 'app-roll',
  templateUrl: './roll.component.html',
  styleUrls: ['./roll.component.css']
})
export class RollComponent {
  dataRoll: IGetRoll[] = [];
  dataRevision: IRollData[] = [];
  searchRoll?: number;
  searchLot: string = '';
  defectosProveedores: Defect[] = [];
  selectedRow: number | null = null;
  selectedItem: any = {};
  percentaje: number = 0;

  constructor(
    private rollService: RollService,
    private defectService: DefectService,
    private alert: SwalService
  ) {}

  ngOnInit(): void {
    this.loadDefects();
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

  //Buscar informacion por rollo o lote
  search(): void {
    if (!this.searchRoll && !this.searchLot) {
      this.alert.ShowSwalBasicWarning(
        'Advertencia',
        'Debe proporcionar al menos un criterio de búsqueda.'
      );
      return;
    }

    this.rollService.getRoll(this.searchRoll, this.searchLot).subscribe({
      next: (dataRoll) => {
        this.dataRoll = dataRoll.map((roll) => ({
          ...roll,
          checked: roll.state,
          pending: roll.state ? 0 : roll.quantityRoll,
        }));
        this.updatePercentage();
      },
      error: (error) => console.error('Error al buscar el rollo:', error),
    });
  }
  changeState(rollNumber: number): void {
    const roll = this.dataRoll.find((e) => e.roll === rollNumber);
    if (!roll) return;

    roll.checked = !roll.checked;
    this.updatePercentage();

    // Si se cambia a revisado y no estaba previamente guardado, reducir pending
    if (roll.checked) {
      roll.pending = Math.max(0, roll.pending - 1);
    } else {
      // Si se desmarca como revisado, sumar a pending si no está en estado guardado
      if (roll.pending === 0) roll.pending = roll.quantityRoll;
      else roll.pending += 1;
    }
  }

  updatePercentage(): void {
    const checkedCount = this.dataRoll.filter((roll) => roll.checked).length;
    this.percentaje = (checkedCount / this.dataRoll.length) * 100;
    this.dataRoll.forEach((roll) => {
      roll.percentaje = this.percentaje >= 50;
      roll.state = roll.checked; // Actualizar el estado de revisión
    });
  }


  prepareDataForModal(item: any) {
    this.rollService.getDatailDocument(item.idRowCloth, item.idRowColor, item.lot).subscribe({
      next: (response) => {
        // Filtrar rollos que están marcados pero no están en la respuesta de la base de datos
        const pendingRolls = this.dataRoll
          .filter(dr => dr.checked && !response.some(r => r.roll === dr.roll))
          .map(roll => ({
            ...roll,
            mtsFicha: null,
            mtsProvider: null,
            widthProvider: null,
            mtsReal: null,
            widthReal: null,
            mtsdeficient: null,
            idRowDefect: null,
            observation: null,
            isStored: false  // Rollos que no están guardados aún
          }));

        // Agregar a isStored a los rollos ya almacenados
        const storedRolls = response.map(roll => ({
          ...roll,
          isStored: true
        }));

        // Combinar y actualizar dataRevision
        this.dataRevision = [...storedRolls, ...pendingRolls];
        this.selectedItem = item;
        this.selectedRow = null;
      },
      error: (error) => {
        console.error('Error al obtener detalles del documento:', error);
        this.alert.showErrorMessage('Error al cargar datos para el modal.');
      }
    });
  }

  //se utiliza para editar en el modal
  selectRowForEdit(rollNumber: number): void {
    this.selectedRow = this.selectedRow === rollNumber ? null : rollNumber;
  }

  resetModalData() {
    // Limpia o reinicia las propiedades como necesites
    this.selectedItem = {};
    this.dataRevision = [];
  }

  //procede a guardar
  onSaveChanges(): void {
    // Validar si están llenos los campos requeridos
    const isEveryFieldComplete = this.dataRevision.every(
      (revision) =>
        revision.mtsFicha != null &&
        revision.mtsProvider != null &&
        revision.widthProvider != null &&
        revision.mtsReal != null &&
        revision.widthReal != null &&
        revision.mtsdeficient != null &&
        revision.idRowDefect != null &&
        revision.observation != null
    );

    if (!isEveryFieldComplete) {
      this.alert.ShowSwalBasicWarning(
        'Advertencia',
        'Todos los campos deben ser completados.'
      );
      return;
    }

    // Preparar los datos para ser enviados
    const userId = 2;
    const dataToSave = this.dataRevision.map((revision) => ({
      roll: revision.roll,
      idRowProvider: revision.idRowProvider,
      idRowCloth: revision.idRowCloth,
      idRowColor: revision.idRowColor,
      idRowUsuario: userId,
      idRowDefect: revision.idRowDefect,
      lot: revision.lot,
      kiloRoll : revision.kiloRoll,
      request : revision.request,
      reference : revision.reference,
      remision : revision.remision,
      mtsFicha: revision.mtsFicha,
      mtsProvider: revision.mtsProvider,
      widthProvider: revision.widthProvider,
      mtsReal: revision.mtsReal,
      widthReal: revision.widthReal,
      mtsdeficient: revision.mtsdeficient,
      observation: revision.observation,
    }));

    // Enviar los datos al backend a través del servicio
    this.rollService.saveUpdateRoll(dataToSave).subscribe({
      next: (response) => {
        console.log('Datos guardados correctamente', response);
        this.resetModalData();
        this.alert.ShowSwalBasicSuccess(
          'Operación Exitosa',
          'Datos guardados correctamente.'
        );
      },
      error: (error) => {
        console.error('Error al guardar los datos', error);
        this.alert.ShowSwalBasicWarning('Error', 'Error al guardar los datos.');
      },
    });
  }
}
