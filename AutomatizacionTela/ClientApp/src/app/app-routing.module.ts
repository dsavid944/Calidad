import { NgModule } from "@angular/core";

import { RollComponent } from "./component/roll/roll.component";
import { CheckComponent } from "./component/check/check.component";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [{path:'Rollo',component:RollComponent},
                        {path:'Check',component:CheckComponent}
                      ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  //provider, es para obtener mediante @input la data de la url
  //providers:[provideRouter(routes,withComponentInputBinding())]
})

export class AppRoutingModule { }
