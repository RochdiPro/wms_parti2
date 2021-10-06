import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChildComponent } from './child/child.component';
import { MenuComponent } from './menu/menu.component';
import { SubChildComponent } from './sub-child/sub-child.component';

import { MenuWmsComponent } from './WMS/menu-wms/menu-wms.component';
import { CartographieComponent } from './WMS/Stockage/cartographie/cartographie.component';
import { EspaceTravailCartographieComponent } from './WMS/Stockage/cartographie/espace-travail-cartographie/espace-travail-cartographie.component';
  import { EditStockageComponent } from './WMS/Stockage/entree/edit-stockage/edit-stockage.component';
import { EntreeBonReceptionComponent } from './WMS/Stockage/entree/entree-bon-reception/entree-bon-reception.component';
import { FamilleLogistiqueComponent } from './WMS/Stockage/famille-logistique/famille-logistique.component';
import { TableauComponent } from './WMS/Stockage/tableau/tableau.component';
   
 
const routes: Routes =
  [
    { path: '', redirectTo: 'Menu', pathMatch: 'full' },

    {
      path: 'Menu', component: MenuComponent, children: [         
        {
          path: 'child', component: ChildComponent, children: [          
            { path: 'Sub_child', component: SubChildComponent},   
          ]
        } ,

        //       wms routing 

        {path: 'WMS', component: MenuWmsComponent},
        
        {
           path: 'WMS-Stockage', component: EditStockageComponent, children: [
             { path: '', redirectTo: 'WMS-Stockage', pathMatch: 'full' },          
             { path: 'Entree', component: EntreeBonReceptionComponent},   
             { path: 'Cartographie', component: CartographieComponent}, 
                { path: 'Cartographie/Espace-Travail/:id', component: EspaceTravailCartographieComponent} ,
             { path: 'Famille-Logistique', component: FamilleLogistiqueComponent},   
             
             { path: 'Tab', component: TableauComponent},   

          ]
        } 

        //   wms routing 


    ]}]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
