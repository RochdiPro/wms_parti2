import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { ChildComponent } from './child/child.component';
import { SubChildComponent } from './sub-child/sub-child.component';
import { HttpClientModule } from '@angular/common/http';

import { MenuWmsComponent } from './WMS/menu-wms/menu-wms.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';

import { EditStockageComponent } from './WMS/Stockage/entree/edit-stockage/edit-stockage.component';
import { EntreeBonReceptionComponent } from './WMS/Stockage/entree/entree-bon-reception/entree-bon-reception.component';
 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CartographieComponent, DialogAjouterEmplacment, DialogAjouterEtage, DialogAjouterRayon, DialogEditEmplacement, DialogEditEtage, DialogEditRayon, DialogOpenCartographie } from './WMS/Stockage/cartographie/cartographie.component';
import { PortalModule } from '@angular/cdk/portal';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { NgxBarcodeModule } from 'ngx-barcode';
import { QRCodeModule } from 'angularx-qrcode';
import { FamilleLogistiqueComponent } from './WMS/Stockage/famille-logistique/famille-logistique.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ChildComponent,
    SubChildComponent,
    MenuWmsComponent,
  

    //stockage
    EditStockageComponent,
    EntreeBonReceptionComponent,
    DialogEditEmplacement,
    FamilleLogistiqueComponent,
    CartographieComponent,
    DialogOpenCartographie,
    DialogAjouterRayon,
    DialogEditRayon,
    DialogAjouterEtage,
    DialogEditEtage,
    DialogAjouterEmplacment,


  ],
  exports: [



  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule, ReactiveFormsModule,
    MatIconModule,
    MatStepperModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDialogModule,
    MatNativeDateModule,
    MatButtonModule,
    FormsModule, ReactiveFormsModule,
    PortalModule,
    NgxBarcodeModule, QRCodeModule,
 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
