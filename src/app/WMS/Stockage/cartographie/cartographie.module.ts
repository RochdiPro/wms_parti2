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
  import { AddZoneInvalideHalleComponent, AjouterEmplacmentDialogComponent, 
    AjouterEtageDialogComponent, AjouterHalleDialogComponent, 
    AjouterLocalDialogComponent, AjouterRayonDialogComponent, DialogueCartographieComponent, 
    EditEmplacementDialogComponent, EditEtageDialogComponent, EditHalleDialogComponent,
     EditOrdreRayonComponent, EditRayonDialogComponent, OpenCartographieComponent,
      OpenCartographieV2Component, OpenClientReserveComponent, OpenEmplacmentLoueeComponent, OpenInfoLocalComponent, OpenZoneInvalideComponent } from './dialogue-cartographie/dialogue-cartographie.component';
import { MenuWmsComponent } from '../../menu-wms/menu-wms.component';
import { SortPipe } from './sort';
 import { CartographieComponent } from './cartographie.component';
import { EspaceTravailCartographieComponent } from './espace-travail-cartographie/espace-travail-cartographie.component';
 import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppComponent } from 'src/app/app.component';
   
@NgModule({
  declarations: [
    MenuWmsComponent,
    SortPipe,
    //stockage
     CartographieComponent,
    EspaceTravailCartographieComponent,
AppComponent,
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
    AddZoneInvalideHalleComponent,

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
  bootstrap: [CartoghraphieModule]
})
export class CartoghraphieModule { }
