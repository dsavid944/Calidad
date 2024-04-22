export interface IGetRoll{
    idRowCloth :number;
    idRowColor :number;
    idRowProvider :number;
    dateCreate :string;
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
    percentaje?:boolean;
    nameProvider : string;
  }
  
  export interface IRollData {
    idRowUsuario?: number;
    idRowProvider: number;
    idRowCloth: number;
    idRowColor: number;
    idRowDefect: number | null;
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
  }
  
  export interface IGetCheck{
    idRowsRevision :number;
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
    idRowsRevision: number;
    idRowUsuario?: number;
    idRowDefecto: number | null;
    peso: number | null;
    rto: number | null;
    ea: number | null;
    el: number | null;
    viro: number | null;
    elongacionAncho: Number | null;
    elongacionLargo: number | null;
    observacion: string | null;
    estado: boolean;
  }
  
  export interface IUIRollCheck extends IRollCheck {
    roll: number;
  }
  
  export interface Defect {
    idRows: number;
    descripcion: string;
    proveedor: string;
  }
  
  