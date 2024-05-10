export interface IGetRoll{
    idRowCloth :number;
    idRowColor :number;
    idRowProvider :number;
    dateCreate :string;
    nameProvider : string;
    roll :number;
    lot :string;
    codeCloth :string;
    nameCloth :string;
    codeColor :string;
    nameColor :string;
    kiloRoll :number;
    request :string;
    reference :string;
    remision :string;
    quantityRoll : number;
    checked?:boolean;
    pending:number;
    state?:boolean;
  }

  export interface IRollData {
    idRowUsuario?: number;
    idRowProvider: number;
    idRowCloth: number;
    idRowColor: number;
    idDefectProvider:number;
    defect: string | null ;
    idRowEstado: number | null;
    roll: number;
    lot: string;
    kiloRoll :number;
    request :string;
    reference :string;
    remision :string;
    mtsFicha: number | null;
    mtsProvider: number | null;
    widthProvider: number | null;
    mtsReal: number | null;
    widthReal: number | null;
    mtsdeficient: number | null;
    observation: string | null;
    isStored? : boolean;
    nameDefect?:string[]
  }

  export interface IGetCheck{
    idRowRevision :number;
    nameProvider : string;
    roll :number;
    lot :string;
    codeCloth :string;
    nameCloth :string;
    codeColor :string;
    kiloRoll :number;
    request :string;
    reference :string;
    remision :string;
    quantityRoll : number;
  }

  export interface IRollCheck {
    idRowRevision: number;
    idRowUsuario?: number;
    idRowEstado: number | null;
    peso: number | null;
    rto: number | null;
    ea: number | null;
    el: number | null;
    viro: number | null;
    elongacionAncho: Number | null;
    elongacionLargo: number | null;
    observacion: string | null;
  }

  export interface IUIRollCheck extends IRollCheck {
    roll: number;
    lot: string;
    isStored? : boolean;
  }

  export interface Defect {
    idRows: number;
    idRowProveedor: number;
    descripcion: string;

  }

  export interface Provider {
    idRows: number;
    proveedor: string;
  }


  export interface State {
    idRows: number;
    descripcion: string;
  }

  export interface GetSummary {
    dateCreate: Date;
    nameProvider: string;
    roll: number;
    lot: string;
    codeCloth: string;
    nameCloth: string;
    codeColor: string;
    kiloRoll: number;
    request: string;
    reference: string;
    remision: string;
    mtsProvider: number;
    widthProvider: number;
    mtsReal: number;
    widthReal: number;
    stateRev: string;
    idRowUsuarioRoll: number;
    weight: number;
    rto: number;
    ea: number;
    el: number;
    viro: number;
    widthElongation: number;
    longElongation: number;
    stateCheck: string;
    idRowUsuarioCheck: number;
  }


export interface IPlantas {
  plantaId: number;
  descripcion: string;
}

export interface IModulos {
  idModulo: number;
  plantaId: number;
  descripcion: string;
}

export interface ITipoPrendas {
  prendaId: number;
  descripcion: string;
}

export interface IPrendas {
  prendasDetalleId: number;
  descripcion: string;
}

export interface ITipoDefectos {
  tipoDefectoId: number;
  descripcion: string;
}

export interface IDefectos {
  defectoId: number;
  descripcion: string;
}

export interface IInfoCargueAgotados {
  country: string;
  reference: string;
  topStore: string;
  topVolume: string;
  format: string;
  clasification: string;
  modification: string;
}

export interface IFrequencyMeasurement {
  courtOrder: number;
  dateMovement: Date;
  units: number;
  originLocation: number;
  originDescription: string;
  destinationLocation: number;
  destinationDescription: string;
  hours: number;
}

export interface IOrdenCorte {
  idRows: number;
  ordencorte: number;
  referenciaPrenda: string;
  codigoTela: string;
  descripcionTela: string;
  piezas: string;
  codigoColor: string;
  descripcionColor: string;
  metros?: number;
  unidades?: number;
  arte?: string;
}

export interface ITelas {
  id: number;
  codigo: string;
  nombre: string;
}

export interface IReposiciones {
  radicado: number;
  solicitante: string;
  nombrePlanta: string;
  operario: string;
  estadoReposicion: string;
  defecto: string;
  modulo: string;
  tipoDefecto: string;
  fechaSolicitud: Date;
  fechaAprobacion?: Date;
  aprobador?: string;
}

export interface IDetalleReposiciones {
  radicado: number;
  ordencorte: number;
  referenciaPrenda: string;
  codigoTela: string;
  descripcionTela: string;
  piezas: string;
  codigoColor: string;
  descripcionColor: string;
  metros: number;
  unidades: number;
  arte: string;
}

export interface IOperario {
  idRowOperario: number;
  nombreOperario: string
}

export interface IArtes {
  arte: string;
  referencia: string;
}

export interface IGetDatosDefecto {
  mes: string;
  semana: string;
  fecha: Date;
  modulo: string;
  referencia: string;
  prendaId: number;
  descripcion: string;
  tipoDefectoId: number;
  nombre: string;
  prendasDetalleId: number;
  parteDefecto: string;
  defectoId: number;
  nombreDefecto: string;
  cantidad: number;
  porcentajeDef: number;
  undRevisadas: number;
  plantaId: number;
  nombrePlanta: string;
  auditoriaId: number;
  usuario: string;
  numeroArte: string;
  ordenCorte: string;
}

export interface IGetDatosPrimeraGrafica {
  nombreDefecto: string;
  cantidad: number;
  revisadas: number;
  porcentajeDef: number;
}

export interface IGetDatosNivelCalidad {
  año: string;
  mes: string;
  nivelCalidad: number;
  meta: number;
}

export interface IGetSemana {
  numeroSemana: number;
  semana: string;
}

export interface IGetPlanta {
  plantaId: number;
  descripcion: string;
}

export interface IFrequency {
  orderCourt: number;
  reference: string;
  descriptionReference: string;
  unitsOrderCourt: number;
  units: number;
  week: number;
  type: string;
  gender: string;
  dias_Max: number;
  promise_Date: Date;
  location: string;
  order: number;
  minutesUnits: number;
  tambor: string;
  colour: string;
}

export interface IGeneralReposiciones{
      mes: number;
      semana: number;
      fecha: Date;
      referencia: string;
      oc: string;
      unidades: number;
      metros: number
      tiempoPerdido: number;
      operario?: string;
      causas?: string

}
export interface ICalidadReposicionSemana{
  semana: number;
  calidad: number;
  meta: number;
}

export interface ICalidadReposicionMes{
  mes: number;
  calidad: number;
  meta: number;
}
export interface IReposicionMetrosSemana{
  semana: number;
  metros: number;
  valor: number;
}

export interface IGetPermission {
  idRowUser: number;
  nameAplication: string;
  form: string;
}
