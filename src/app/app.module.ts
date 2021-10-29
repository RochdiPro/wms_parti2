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
import { CartographieComponent, DialogAddLocal, DialogAddZoneInvalideHalle, DialogAjouterEmplacment, DialogAjouterEtage, DialogAjouterHalle, DialogAjouterRayon, DialogEditEmplacement, DialogEditEtage, DialogEditHalle, DialogEditOrdreRayon, DialogEditRayon, DialogInfoLocal, DialogOpenAllZoneReserve, DialogOpenCartographie, DialogOpenCartographie2, DialogOpenZoneInvalideHalle, DialogZoneResever } from './WMS/Stockage/cartographie/cartographie.component';
import { PortalModule } from '@angular/cdk/portal';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { NgxBarcodeModule } from 'ngx-barcode';
import { QRCodeModule } from 'angularx-qrcode';
import { FamilleLogistiqueComponent } from './WMS/Stockage/famille-logistique/famille-logistique.component';
import { SortPipe } from './WMS/Stockage/cartographie/sort';
import { TableauComponent } from './WMS/Stockage/tableau/tableau.component';
import { EspaceTravailCartographieComponent } from './WMS/Stockage/cartographie/espace-travail-cartographie/espace-travail-cartographie.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { FabricjsEditorModule } from 'src/projects/angular-editor-fabric-js/src/public-api';
import {MatTabsModule} from '@angular/material/tabs';
import {MatRadioModule} from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ChildComponent,
    SubChildComponent,
    MenuWmsComponent,
     
    SortPipe,
    //stockage
    EditStockageComponent,
    EntreeBonReceptionComponent,
    DialogEditEmplacement,
    FamilleLogistiqueComponent,
    CartographieComponent,
    EspaceTravailCartographieComponent,

    DialogOpenCartographie,
    DialogOpenCartographie2,
    DialogAjouterHalle,
    DialogEditHalle,
    DialogAjouterRayon,
    DialogEditRayon,
    DialogEditOrdreRayon,
    DialogAjouterEtage,
    DialogEditEtage,
    DialogAjouterEmplacment,
    DialogAddZoneInvalideHalle,
    DialogOpenZoneInvalideHalle,
    TableauComponent,
    DialogInfoLocal,
    DialogZoneResever,
    DialogOpenAllZoneReserve,
    DialogAddLocal,
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
    ColorPickerModule,
    FabricjsEditorModule,
     MatTabsModule, 
     MatRadioModule,
     MatSlideToggleModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
