import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
 import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';

 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
 import { PortalModule } from '@angular/cdk/portal';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { NgxBarcodeModule } from 'ngx-barcode';
import { QRCodeModule } from 'angularx-qrcode';
 import { ColorPickerModule } from 'ngx-color-picker';
import { FabricjsEditorModule } from 'src/projects/angular-editor-fabric-js/src/public-api';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
 import { AppComponent } from '../app.component';
 import { MenuWmsComponent } from './menu-wms/menu-wms.component';
import { SortPipe } from './Stockage/cartographie/sort';
import { EditStockageComponent } from './Stockage/entree/edit-stockage/edit-stockage.component';
import { EntreeBonReceptionComponent } from './Stockage/entree/entree-bon-reception/entree-bon-reception.component';
 import { CartographieComponent } from './Stockage/cartographie/cartographie.component';
import { EspaceTravailCartographieComponent } from './Stockage/cartographie/espace-travail-cartographie/espace-travail-cartographie.component';
 import { TableauComponent } from './Stockage/tableau/tableau.component';
import { HttpClientModule } from '@angular/common/http';
 import { AppRoutingModule } from '../app-routing.module';
import { AddZoneInvalideHalleComponent, AjouterEmplacmentDialogComponent, AjouterEtageDialogComponent, AjouterHalleDialogComponent, AjouterLocalDialogComponent, AjouterRayonDialogComponent, DialogueCartographieComponent, EditEmplacementDialogComponent, EditEtageDialogComponent, EditHalleDialogComponent, EditOrdreRayonComponent, EditRayonDialogComponent, OpenCartographieComponent, OpenCartographieV2Component, OpenClientReserveComponent, OpenEmplacmentLoueeComponent, OpenInfoLocalComponent, OpenZoneInvalideComponent } from './Stockage/cartographie/dialogue-cartographie/dialogue-cartographie.component';
import { WmsRoutingModule } from './wms-routing.module';
  
@NgModule({
  declarations: [
    MenuWmsComponent,
    SortPipe,
    //stockage
    CartographieComponent,
    EspaceTravailCartographieComponent,
    AjouterRayonDialogComponent,
    AjouterLocalDialogComponent,
    AjouterHalleDialogComponent,
    AjouterEmplacmentDialogComponent,
    AddZoneInvalideHalleComponent,
    EditHalleDialogComponent,
    EditRayonDialogComponent,
    EditEtageDialogComponent,
     AjouterEtageDialogComponent,
     EditEmplacementDialogComponent,
    OpenZoneInvalideComponent,
    OpenInfoLocalComponent,
    OpenCartographieV2Component,
    OpenCartographieComponent,
    OpenEmplacmentLoueeComponent,
    OpenClientReserveComponent,
    EditOrdreRayonComponent,
    TableauComponent,
    AddZoneInvalideHalleComponent,

    EditStockageComponent,
    EntreeBonReceptionComponent,
     CartographieComponent,
    EspaceTravailCartographieComponent,
    DialogueCartographieComponent,
 
  ],
  exports: [



  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    WmsRoutingModule,
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
    MatSlideToggleModule,
    ReactiveFormsModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDialogModule,
    BrowserAnimationsModule,
    FormsModule,

   ],
  providers: [],
  bootstrap: [AppComponent]
})
export class WmsModule { }
