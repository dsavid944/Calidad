import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { RollComponent } from './component/pageAuditRoll/roll/roll.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { CheckComponent } from './component/pageAuditRoll/check/check.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { AuditoriaCalidadComponent } from './component/auditoria-calidad/auditoria-calidad.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxSpinnerModule } from 'ngx-spinner';
import { ReporteAuditoriaCalidadComponent } from './component/reporte-auditoria-calidad/reporte-auditoria-calidad.component';
import { ButtonModule } from 'primeng/button';
import { AccordionModule } from 'primeng/accordion';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { SidebarModule } from 'primeng/sidebar';
import { CalendarModule } from 'primeng/calendar';
import { MultiSelectModule } from 'primeng/multiselect';
import { AutoCompleteModule } from 'primeng/autocomplete';

import { FileUploadModule } from 'primeng/fileupload';
import { TagModule } from 'primeng/tag';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { MenuModule } from 'primeng/menu';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { InputNumberModule } from 'primeng/inputnumber';
import { CommonModule, DatePipe } from '@angular/common';
import { SolicitudReposicionesComponent } from './component/solicitud-reposiciones/solicitud-reposiciones.component';
import { ReposicionesPendientesComponent } from './component/reposiciones-pendientes/reposiciones-pendientes.component';
import { ReposicionesInformesComponent } from './component/reposiciones-informes/reposiciones-informes.component';
import { HomeComponent } from './component/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    RollComponent,
    NavbarComponent,
    CheckComponent,
    AuditoriaCalidadComponent,
    ReporteAuditoriaCalidadComponent,
    SolicitudReposicionesComponent,
    ReposicionesPendientesComponent,
    ReposicionesInformesComponent,
    HomeComponent
  ],
  imports: [    
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    ButtonModule,
    AccordionModule,
    TableModule,
    CardModule,
    DialogModule,
    DropdownModule,
    InputTextModule,
    ToastModule,
    SidebarModule,
    CalendarModule,
    MultiSelectModule,
    AutoCompleteModule,
    FileUploadModule,
    TagModule,
    TieredMenuModule,
    ConfirmPopupModule,
    MenuModule,
    OverlayPanelModule,
    InputNumberModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
