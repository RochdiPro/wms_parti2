import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { ChildComponent } from './child/child.component';
import { SubChildComponent } from './sub-child/sub-child.component';
import { HttpClientModule } from '@angular/common/http';
import { MenuStockageComponent } from './Stockage/menu-stockage/menu-stockage.component';
import { CartographieComponent } from './Stockage/cartographie/cartographie.component';
import { ReservationComponent } from './Stockage/reservation/reservation.component';
import { NouveauFicheStockComponent } from './Stockage/nouveau-fiche-stock/nouveau-fiche-stock.component';
import { FamilleLogistiqueComponent } from './Stockage/famille-logistique/famille-logistique.component';
import { TransfertInterDepotComponent } from './Stockage/transfert-inter-depot/transfert-inter-depot.component';
import { TransfertEntreDepotComponent } from './Stockage/transfert-entre-depot/transfert-entre-depot.component';
import { LocalsComponent } from './Stockage/locals/locals.component';
 
 
@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ChildComponent,
    SubChildComponent,
    MenuStockageComponent,
    CartographieComponent,
    ReservationComponent,
    NouveauFicheStockComponent,
    FamilleLogistiqueComponent,
    TransfertInterDepotComponent,
    TransfertEntreDepotComponent,
    LocalsComponent,
   
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
