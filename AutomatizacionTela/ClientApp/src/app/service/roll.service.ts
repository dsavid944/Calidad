import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IRollData, IGetRoll, IRollCheck, IGetCheck, IUIRollCheck } from 'src/model/interfaces';

@Injectable({
  providedIn: 'root'
})
export class RollService {
  constructor(private http: HttpClient) { }

  getRoll(roll?: number, lot?: string) {
    let params = new HttpParams();
    if (roll) {
      params = params.set('rollo', roll.toString());
    }
    if (lot) {
      params = params.set('lote', lot);
    }
    return this.http.get<IGetRoll[]>(`${environment.url}RollCntlr/SearchRollLot`, { params });
  }
  //trae la informacion de los rollos guardados
  getDatailDocument(idCloth:number,idRowColor:number, lot:string)
  {
    return this.http.get<IRollData[]>(`${environment.url}RollCntlr/GetDatailDocument/${idCloth}/${idRowColor}/${lot}`);
  }

  saveUpdateRoll(rollData: IRollData[]): Observable<any> {
    console.log("Datos formateados que se enviarán para guardar:", rollData);
     return this.http.post(`${environment.url}RollCntlr/SaveUpdateRoll`, rollData, {
    });
  }
  getCheck(roll?: number, lot?: string) {
    let params = new HttpParams();
    if (roll) {
      params = params.set('rollo', roll.toString());
    }
    if (lot) {
      params = params.set('lote', lot);
    }
    return this.http.get<IGetCheck[]>(`${environment.url}RollCntlr/SearchRollCheck`, { params });
  }

  saveUpdateCheck(userInput: IRollCheck[]): Observable<any> {
    console.log("Datos formateados que se enviarán para guardar:", userInput);
     return this.http.post(`${environment.url}RollCntlr/SaveUpdateCheck`, userInput, {
    });
  }

  //trae la informacion de los rollos guardados
  getDetailCheck(idRowsRevision:number, lot:string)
  {
    return this.http.get<IUIRollCheck[]>(`${environment.url}RollCntlr/GetDetailCheck/${idRowsRevision}/${lot}`);
  }

}


