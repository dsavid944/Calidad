import { Component, OnInit } from '@angular/core';
import { RollService } from 'src/app/service/roll.service';
import { SignalRService } from 'src/app/service/signal-r.service';
import { SwalService } from 'src/app/service/swal.service';

@Component({
  selector: 'app-general-chronometer',
  templateUrl: './general-chronometer.component.html',
  styleUrls: ['./general-chronometer.component.css']
})
export class GeneralChronometerComponent implements OnInit{

  interval: any;
  teamOptopus:string="";
  day:number=0
  hour:number=0
  minute:number=0
  second:number=0
  idMounting:any;

  constructor(private alert: SwalService,
              private signalRService:SignalRService,
              private rollService: RollService) { }

  ngOnInit(): void
  {
    this.signalRService.startConnection();

    this.signalRService.isClose.subscribe(data=>{
      this.warningClose();
    })
    this.startCountTime();
  }


  warningClose(){
    localStorage.clear();
    this.alert.ShowSwalBasicWarning("Advertecia","Turno finalizado");
    //location.reload();
  }

  startCountTime()
  {

    this.interval = setInterval(() => {

      var now = new Date();
      var currentHour = now.getHours();
      var currentMinute = now.getMinutes();
      var currentSecond = now.getSeconds();

      // Check if the current hour is 7, 8, or 9
      if (currentHour === 6 && currentMinute === 0 && currentSecond === 0  ||
          currentHour === 14 && currentMinute === 0 && currentSecond === 0 ||
          currentHour === 22 && currentMinute === 0 && currentSecond === 0)
      {
        this.closeTurn();
      }

      this.hour=currentHour;
      this.minute=currentMinute;
      this.second=currentSecond;


    }, 1000);

  }

  closeTurn()
  {
    this.rollService.postEndTurn().subscribe(response=>{
      localStorage.clear();
    })

  }


}
