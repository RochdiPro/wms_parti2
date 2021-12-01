import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 
import { CartographieComponent } from './cartographie.component';
import { EspaceTravailCartographieComponent } from '../espace-travail-cartographie/espace-travail-cartographie.component';
const routes: Routes =

  [
    {path: '', component: CartographieComponent},

    { path: 'Espace-Travail/:id', component: EspaceTravailCartographieComponent},

  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartoRoutingModule { }
