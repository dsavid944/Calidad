import { SignalRService } from './../../../service/signal-r.service';
import { Component, OnInit } from '@angular/core';
import { DefectService } from 'src/app/service/defect.service';
import { RollService } from 'src/app/service/roll.service';
import { SwalService } from 'src/app/service/swal.service';
import { Defect, IGetPersonal, IGetRoll, IRollData, Provider, State } from 'src/model/interfaces';

@Component({
  selector: 'app-roll',
  templateUrl: './roll.component.html',
  styleUrls: ['./roll.component.css'],
})
export class RollComponent implements OnInit {
  mtsdeficient: null;
  selectedDefect!: Defect[];
  selectedProvider!: Provider[];
  defectosProveedores: Defect[] = [];
  defectosFilterProveedores: Defect[] = [];
  proveedores: Provider[] = [];
  dataPersonal:IGetPersonal[]=[];
  selectedPersonal: string | undefined;

  dataRoll: IGetRoll[] = [];
  dataRevision: IRollData[] = [];
  searchRoll?: number;
  searchLot: string = '';
  estados: State[] = [];
  selectedRow: number | null = null;
  selectedItem: any = {};
  selectedPercentage: number = 50;
  actualCheckedPercentage: number = 0;
  idUserAuditor:number=0;

  dataSelectedRoll:any[]=[];
  dataAllRoll:any[] = [];

  constructor(
    private rollService: RollService,
    private defectService: DefectService,
    private alert: SwalService
  ) {}

  ngOnInit(): void {
    this.loadDefects();
    this.loadProvider();
    this.loadStates();
    this.getPersonal();

    const openModalButton = document.getElementById('openModalButton');
    if (openModalButton && (localStorage.getItem('IdUserAuditor')==null || localStorage.getItem('IdUserAuditor')=="0"))
    {
      openModalButton.click();
    }
  }

  postAuditorSelected() {
    if(this.idUserAuditor != 0) {
      this.rollService.postAuditorSelected(this.idUserAuditor).subscribe(response => {
        if(response > 0) {
          localStorage.setItem('IdUserAuditor', response.toString());
          this.alert.ShowSwalBasicSuccess("Correcto", "Auditor asignado");
        } else {
          this.alert.ShowSwalBasicError("Error", "No se ha podido registrar el auditor");
          location.reload();
        }
      }, (error) => {
        this.alert.ShowSwalBasicError("Error", "No se ha podido registrar el auditor");
        location.reload();
      });
    } else {
      this.alert.ShowSwalBasicWarning("Advertencia", "Debe seleccionar un auditor");
    }
  }

  logout() {
    localStorage.removeItem('IdUserAuditor');
    location.reload();
  }

  // Leer la tabla de defectos
  loadDefects(): void {
    this.defectService.getDefects().subscribe({
      next: (data) => {
        this.defectosProveedores = data;
        this.defectosFilterProveedores = data;
      },
      error: (error) => {
        console.error('Error al recuperar defectos:', error);
        this.alert.showErrorMessage('Error al recuperar defectos.');
      },
    });
  }

  // Leer la tabla de proveedores
  loadProvider(): void {
    this.defectService.getProviders().subscribe({
      next: (data) => {
        this.proveedores = data;
      },
      error: (error) => {
        console.error('Error al recuperar Proveedor:', error);
        this.alert.showErrorMessage('Error al recuperar Proveedor.');
      },
    });
  }

  // Leer la tabla de estados
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

  // Buscar informacion por rollo o lote
  search(): void {
    if(localStorage.getItem('IdUserAuditor')==null) {
      location.reload();
    } else {
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
        },
        error: (error) => console.error('Error al buscar el rollo:', error),
      });
    }
  }

  // Suma el porcentage de rollos seleccionados
  calculateCheckedPercentage(): void {
    const totalRolls = this.dataRoll.length;
    const checkedRolls = this.dataRoll.filter((roll) => roll.checked).length;
    this.actualCheckedPercentage = (checkedRolls / totalRolls) * 100;
  }

  // Método para llamar cuando el usuario cambia el switch de porcentaje.
  togglePercentage(): void {
    this.selectedPercentage = this.selectedPercentage === 50 ? 100 : 50;
  }

  ToggleRoll(index: number): boolean {
    const allowedCheckedRolls = Math.ceil((this.selectedPercentage / 100) * this.dataRoll.length);
    const checkedRollsCount = this.dataRoll.filter((roll) => roll.checked || roll.state).length;
    const currentRollReviewed = this.dataRoll[index].checked || this.dataRoll[index].state;

    if (currentRollReviewed) {
      return true;
    }
    return checkedRollsCount < allowedCheckedRolls;
  }

  changeState(rollNumber: number): void {
    const roll = this.dataRoll.find((e) => e.roll === rollNumber);
    if (!roll) return;
    roll.checked = !roll.checked;
    this.calculateCheckedPercentage();
    this.ToggleRoll(rollNumber);

    if (roll.checked) {
      roll.pending = Math.max(0, roll.pending - 1);
    } else {
      if (roll.pending === 0) roll.pending = roll.quantityRoll;
      else roll.pending += 1;
    }
  }

  prepareDataForModal(item: any) {
    this.rollService
      .getDatailDocument(item.idRowCloth, item.idRowColor, item.lot)
      .subscribe({
        next: (response) => {
          const pendingRolls = this.dataRoll
            .filter((dr) => dr.checked && !response.some((r) => r.roll === dr.roll))
            .map((roll) => ({
              ...roll,
              mtsFicha: null,
              mtsProvider: null,
              widthProvider: null,
              mtsReal: null,
              widthReal: null,
              mtsdeficient: null,
              defect: null,
              idDefectProvider: null,
              idRowEstado: null,
              observation: null,
              isStored: false,
              nameDefect: null
            }));

          const storedRolls = response.map((roll) => ({
            ...roll,
            isStored: true,
            nameDefect: roll.defect != null ? roll.defect.split('|') : null
          }));

          this.dataRevision = [...storedRolls, ...pendingRolls];
          this.selectedItem = item;
          this.selectedRow = null;

          let roll = this.dataRevision;
          let hash2 = {}
          roll = roll.filter(e => hash2[e.roll] ? false : hash2[e.roll] = true);

          this.dataAllRoll = roll;
          this.dataSelectedRoll = this.dataRevision;
        },
        error: (error) => {
          console.error('Error al obtener detalles del documento:', error);
          this.alert.showErrorMessage('Error al cargar datos para el modal.');
        },
      });
  }

  selectRowForEdit(rollNumber: number): void {
    this.selectedRow = this.selectedRow === rollNumber ? null : rollNumber;
  }

  resetModalData() {
    this.selectedItem = {};
    this.dataRevision = [];
  }

  onSaveChanges(data: any): void {
    let saveData: any;

    if (data.mtsFicha == null || data.mtsProvider == null || data.widthProvider == null || data.mtsReal == null || data.widthReal == null || data.idRowEstado == null) {
      this.alert.ShowSwalBasicWarning('Advertencia', 'Todos los campos deben ser completados.');
      return;
    } else {
      saveData = {
        roll: data.roll,
        idRowProvider: data.idRowProvider,
        idRowCloth: data.idRowCloth,
        idRowColor: data.idRowColor,
        idRowUsuario: parseInt(localStorage.getItem('IdUserAuditor')),
        idRowDefect: this.selectedDefect.length > 0 ? this.selectedDefect.map((e) => e.idRows) : null,
        idRowEstado: data.idRowEstado,
        lot: data.lot,
        kiloRoll: data.kiloRoll,
        request: data.request,
        reference: data.reference,
        remision: data.remision,
        mtsFicha: data.mtsFicha,
        mtsProvider: data.mtsProvider,
        widthProvider: data.widthProvider,
        mtsReal: data.mtsReal,
        widthReal: data.widthReal,
        mtsdeficient: data.mtsdeficient ? data.mtsdeficient : null,
        observation: data.observation ? data.observation : null,
      };
    }

    this.rollService.saveUpdateRoll(saveData).subscribe({
      next: (response) => {
        console.log('Datos guardados correctamente', response);
        this.resetModalData();
        this.alert.ShowSwalBasicSuccess('Operación Exitosa', 'Datos guardados correctamente.');
        this.prepareDataForModal(data);
      },
      error: (error) => {
        console.error('Error al guardar los datos', error);
        this.alert.ShowSwalBasicWarning('Error', 'Error al guardar los datos.');
      },
    });
  }

  selectedProviderDefect(provider: any) {
    this.defectosFilterProveedores = this.defectosProveedores.filter(e => e.idRowProveedor == provider.value)
  }

  selectedRollAudit(roll: number) {
    this.selectedDefect = [];
    this.dataSelectedRoll = this.dataRevision.filter(e => e.roll == roll);
    this.selectedRow = roll;
  }

  getDefect(roll: number) {
    const transformedData = this.dataSelectedRoll.filter(e => e.roll == roll).map(item => item.idRowDefect.split('|'));
    return transformedData;
  }

  getPersonal() {
    this.rollService.getPersonal().subscribe(response => {
      this.dataPersonal = response;
    }, (error) => {});
  }
  getAuditorName(id: number): string {
    const auditor = this.dataPersonal.find(a => a.idPersonal === id);
    return auditor ? auditor.namePersonal : '';
  }


}
