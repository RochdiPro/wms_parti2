import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChildComponent } from './child/child.component';
 import { MenuComponent } from './menu/menu.component';
import { CartographieComponent } from './Stockage/cartographie/cartographie.component';
import { LocalsComponent } from './Stockage/locals/locals.component';
import { MenuStockageComponent } from './Stockage/menu-stockage/menu-stockage.component';
import { NouveauFicheStockComponent } from './Stockage/nouveau-fiche-stock/nouveau-fiche-stock.component';
import { ReservationComponent } from './Stockage/reservation/reservation.component';
import { SubChildComponent } from './sub-child/sub-child.component';
 
 
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
        {
          path: 'stockage', component: MenuStockageComponent, children: [
          
            { path: 'Cartographie', component: CartographieComponent},
            { path: 'Fiche Stock', component: NouveauFicheStockComponent},
            { path: 'Reservation', component: ReservationComponent},
            { path: 'Locals', component: LocalsComponent},
             { path: 'Famille Logistique', component: ReservationComponent},
            { path: 'TransfertEntreDepot', component: ReservationComponent},
            { path: 'TransfertInterDepot', component: ReservationComponent},

           ]
        } 
    ]}]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
