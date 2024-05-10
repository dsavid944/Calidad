import { Component, OnInit } from '@angular/core';
import { RollService } from 'src/app/service/roll.service';
import { GetSummary } from 'src/model/interfaces';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
})
export class SummaryComponent implements OnInit {
  datos!: GetSummary[];
  roll:number=0;

  constructor(private rollService: RollService) {}

  ngOnInit() {
    this.rollService.getSummary().subscribe(
      (data) => {
        this.datos = data;
      },
      (error) => {
        console.error('Error fetching data: ', error);
      }
    );
  }
  getSeverity(state: string): 'warning' | 'success' | 'danger' | 'default' {
    switch (state) {
      case 'Aprobado con Observacion':
        return 'warning';
      case 'Aprobado':
        return 'success';
      case 'Rechazado':
        return 'danger';
      default:
        return 'default';
    }
  }

  selected(data:any)
  {
    this.roll=data;
  }
}
