import { NgModule } from "@angular/core";

import { RollComponent } from "./component/pageAuditRoll/roll/roll.component";
import { CheckComponent } from "./component/pageAuditRoll/check/check.component";
import { RouterModule, Routes } from "@angular/router";
import { AuditoriaCalidadComponent } from "./component/auditoria-calidad/auditoria-calidad.component";
import { ReporteAuditoriaCalidadComponent } from "./component/reporte-auditoria-calidad/reporte-auditoria-calidad.component";
import { SolicitudReposicionesComponent } from "./component/solicitud-reposiciones/solicitud-reposiciones.component";
import { ReposicionesPendientesComponent } from "./component/reposiciones-pendientes/reposiciones-pendientes.component";
import { ReposicionesInformesComponent } from "./component/reposiciones-informes/reposiciones-informes.component";
import { HomeComponent } from "./component/home/home.component";
import { SummaryComponent } from "./component/pageAuditRoll/summary/summary.component";

const routes: Routes = [{path:'Rollo',component:RollComponent},
                        {path:'Check',component:CheckComponent},
                        {path:'Summary',component:SummaryComponent},
                        { path: 'auditoria-calidad', component: AuditoriaCalidadComponent },
                        { path: 'reporte-auditoria-calidad', component: ReporteAuditoriaCalidadComponent },
                        { path: 'solicitud-reposicion-telas', component: SolicitudReposicionesComponent },
                        { path: 'reposiciones-pendientes', component: ReposicionesPendientesComponent },
                        { path: 'reposiciones-informes', component: ReposicionesInformesComponent },
                        { path:'home', component: HomeComponent},
                        { path:'home/:EmailUser/:Name', component: HomeComponent},
                      ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  //provider, es para obtener mediante @input la data de la url
  //providers:[provideRouter(routes,withComponentInputBinding())]
})

export class AppRoutingModule { }
