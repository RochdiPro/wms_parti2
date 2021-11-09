import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
 import { EntreeBonReceptionComponent } from './entree/entree-bon-reception/entree-bon-reception.component';
import { FamilleLogistiqueComponent } from './famille-logistique/famille-logistique.component';
import { TableauComponent } from './tableau/tableau.component';
  const routes: Routes =

  [
       
          { path: 'Entree', component: EntreeBonReceptionComponent },
          { path: 'Cartographie',loadChildren:()=>import('./cartographie/cartographie.module').then(m=>m.CartoghraphieModule)},
           { path: 'Famille-Logistique', component: FamilleLogistiqueComponent },
           { path: 'Tab', component: TableauComponent },
    
   
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockageRoutingModule { }
