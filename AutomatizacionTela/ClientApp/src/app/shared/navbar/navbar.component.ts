import { OnInit } from '@angular/core';
import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { PermissionsService } from 'src/app/service/permissions.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {

  isVisible: boolean = false;
  auditQuality:boolean = false;
  reportAudit:boolean = false;
  requestAuditCloth:boolean = false;
  rerunAuditCloth:boolean = false;
  reportReruns:boolean = false;
  ReviewRoll:boolean = false;
  checkRoll:boolean = false;
  summarizeRoll:boolean = false;
  opasity:boolean = true;


  constructor(private elementRef: ElementRef,private permissionService: PermissionsService) { }

  ngOnInit(): void {

    this.GetPermission();

  }

  // Evento que nos ayuda a expandir y contraer el sidebar (cuando está en modo móvil)
  toggle() {

    let sidebar = this.elementRef.nativeElement.querySelector(".sidebar");
    let closeBtn = this.elementRef.nativeElement.querySelector("#btn");

    sidebar.classList.toggle("open");

    if (sidebar.classList.contains("open")) {
      closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");

      setTimeout(() => {
        this.opasity=false;
      }, 250);

    } else {
      closeBtn.classList.replace("bx-menu-alt-right", "bx-menu");
      this.opasity=true;
    }
    this.isVisible = !this.isVisible;
  }


  GetPermission(){

    if (localStorage.getItem('EmailUser') != null || localStorage.getItem('EmailUser') != "null")
    {
      this.permissionService.getPermission(localStorage.getItem('EmailUser')!).subscribe((response) =>
      {
        localStorage.setItem('IdUser', response[0].idRowUser.toString())
        response.forEach(e=>{

          if(e.form=='AuditoriaCalidad')
          {
            this.auditQuality=true;
          }
          else if(e.form=='ReporteAuditoriaCalidad')
          {
            this.reportAudit=true;
          }
          else if(e.form=='SolicitudReposicionTela')
          {
            this.requestAuditCloth=true;
          }
          else if(e.form=='ReposicionPendiente')
          {
            this.rerunAuditCloth=true
          }
          else if(e.form=='reposiciones-informes')
          {
            this.reportReruns=true
          }
          else if(e.form=='RevisionRollo')
          {
            this.ReviewRoll=true
          }
          else if(e.form=='CheckRollo')
          {
            this.checkRoll=true
          }
          else if(e.form=='ResumenRollo')
          {
            this.summarizeRoll=true
          }



        })

      })
    }

  }


  logout() {
    localStorage.clear()
    window.location.href = "https://miclocal.com.co:9321/login";
  }
}
