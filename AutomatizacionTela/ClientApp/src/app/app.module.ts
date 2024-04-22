import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { RollComponent } from './component/roll/roll.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './component/navbar/navbar.component';

import { AppComponent } from './app.component';
import { CheckComponent } from './component/check/check.component';


@NgModule({
  declarations: [
    AppComponent,
    RollComponent,
    NavbarComponent,
    CheckComponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
