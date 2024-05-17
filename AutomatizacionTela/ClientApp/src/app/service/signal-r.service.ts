import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  private hubConnection: signalR.HubConnection | undefined;
  public isClose = new Subject<any>();

  constructor() { }

  public startConnection = () => {

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(environment.urlSignal+'notificationHub')
      .build();

      this.hubConnection.start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err));

    this.hubConnection.on('SendNotification', (data: any[]) => {
        this.isClose.next(data);
    });
  }
}
