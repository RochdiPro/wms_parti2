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
import { MenuComponent } from '../menu/menu.component';
import { AppComponent } from '../app.component';
import { ChildComponent } from '../child/child.component';
import { SubChildComponent } from '../sub-child/sub-child.component';
import { MenuWmsComponent } from './menu-wms/menu-wms.component';
import { SortPipe } from './Stockage/cartographie/sort';
import { EditStockageComponent } from './Stockage/entree/edit-stockage/edit-stockage.component';
import { EntreeBonReceptionComponent } from './Stockage/entree/entree-bon-reception/entree-bon-reception.component';
import { FamilleLogistiqueComponent } from './Stockage/famille-logistique/famille-logistique.component';
import { CartographieComponent } from './Stockage/cartographie/cartographie.component';
import { EspaceTravailCartographieComponent } from './Stockage/cartographie/espace-travail-cartographie/espace-travail-cartographie.component';
import { AjouterRayonDialogComponent } from './Stockage/cartographie/dialogue_cartographie/ajouter-rayon-dialog/ajouter-rayon-dialog.component';
import { AjouterLocalDialogComponent } from './Stockage/cartographie/dialogue_cartographie/ajouter-local-dialog/ajouter-local-dialog.component';
import { AjouterHalleDialogComponent } from './Stockage/cartographie/dialogue_cartographie/ajouter-halle-dialog/ajouter-halle-dialog.component';
import { AjouterEmplacmentDialogComponent } from './Stockage/cartographie/dialogue_cartographie/ajouter-emplacment-dialog/ajouter-emplacment-dialog.component';
import { AddZoneInvalideHalleComponent } from './Stockage/cartographie/dialogue_cartographie/add-zone-invalide-halle/add-zone-invalide-halle.component';
import { EditHalleDialogComponent } from './Stockage/cartographie/dialogue_cartographie/edit-halle-dialog/edit-halle-dialog.component';
import { EditRayonDialogComponent } from './Stockage/cartographie/dialogue_cartographie/edit-rayon-dialog/edit-rayon-dialog.component';
import { EditEtageDialogComponent } from './Stockage/cartographie/dialogue_cartographie/edit-etage-dialog/edit-etage-dialog.component';
import { EditEmplacementDialogComponent } from './Stockage/cartographie/dialogue_cartographie/edit-emplacement-dialog/edit-emplacement-dialog.component';
import { OpenZoneInvalideComponent } from './Stockage/cartographie/dialogue_cartographie/open-zone-invalide/open-zone-invalide.component';
import { OpenInfoLocalComponent } from './Stockage/cartographie/dialogue_cartographie/open-info-local/open-info-local.component';
import { OpenCartographieV2Component } from './Stockage/cartographie/dialogue_cartographie/open-cartographie-v2/open-cartographie-v2.component';
import { OpenCartographieComponent } from './Stockage/cartographie/dialogue_cartographie/open-cartographie/open-cartographie.component';
import { OpenEmplacmentLoueeComponent } from './Stockage/cartographie/dialogue_cartographie/open-emplacment-louee/open-emplacment-louee.component';
import { OpenClientReserveComponent } from './Stockage/cartographie/dialogue_cartographie/open-client-reserve/open-client-reserve.component';
import { EditOrdreRayonComponent } from './Stockage/cartographie/dialogue_cartographie/edit-ordre-rayon/edit-ordre-rayon.component';
import { TableauComponent } from './Stockage/tableau/tableau.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../app-routing.module';
 
@NgModule({
  declarations: [
    MenuWmsComponent,
    SortPipe,
    //stockage
    EditStockageComponent,
    EntreeBonReceptionComponent,
    FamilleLogistiqueComponent,
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
    FamilleLogistiqueComponent,
    CartographieComponent,
    EspaceTravailCartographieComponent,

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
    MatSlideToggleModule,
         
   ],
  providers: [],
  bootstrap: [AppComponent]
})
export class WmsModule { }
