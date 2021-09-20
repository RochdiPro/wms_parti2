import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { ChildComponent } from './child/child.component';
import { SubChildComponent } from './sub-child/sub-child.component';
import { HttpClientModule } from '@angular/common/http';
import { EditBonReceptionComponent } from './WMS/Bon-Reception/edit-bon-reception/edit-bon-reception.component';
import { Ajouter_Bon_Rejet, AjouterBonReceptionComponent } from './WMS/Bon-Reception/ajouter-bon-reception/ajouter-bon-reception.component';
import { ListerBonReceptionComponent } from './WMS/Bon-Reception/lister-bon-reception/lister-bon-reception.component';
import { MenuWmsComponent } from './WMS/menu-wms/menu-wms.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { ModifierBonReceptionComponent } from './WMS/Bon-Reception/modifier-bon-reception/modifier-bon-reception.component';
import { BonRejetComponent } from './WMS/Bon-Reception/bon-rejet/bon-rejet.component';
import { EditStockageComponent } from './WMS/Stockage/entree/edit-stockage/edit-stockage.component';
import { EntreeBonReceptionComponent } from './WMS/Stockage/entree/entree-bon-reception/entree-bon-reception.component';
import { CartographieComponent, DialogOpenCartographie } from './WMS/Stockage/Cartographie/cartographie/cartographie.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ChildComponent,
    SubChildComponent,
    EditBonReceptionComponent,
    AjouterBonReceptionComponent,
    ListerBonReceptionComponent,
    MenuWmsComponent,
    Ajouter_Bon_Rejet,
    ModifierBonReceptionComponent,
    BonRejetComponent,


    //stockage
    EditStockageComponent,
    EntreeBonReceptionComponent,
    CartographieComponent,
    DialogOpenCartographie
  ],
  exports: [



  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatStepperModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule, ReactiveFormsModule,
    MatSelectModule,
    MatDialogModule,




  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
