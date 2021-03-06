 import { NgModule } from '@angular/core';
 import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
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
 import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
  import { AddZoneInvalideHalleComponent, AjouterEmplacmentDialogComponent, 
    AjouterEtageDialogComponent, AjouterHalleDialogComponent, 
    AjouterLocalDialogComponent, AjouterRayonDialogComponent, DialogueCartographieComponent, 
    EditEmplacementDialogComponent, EditEtageDialogComponent, EditHalleDialogComponent,
     EditOrdreRayonComponent, EditRayonDialogComponent, OpenCartographieComponent,
      OpenCartographieV2Component, OpenClientReserveComponent, OpenEmplacmentLoueeComponent, OpenInfoLocalComponent, OpenZoneInvalideComponent } from './dialogue-cartographie/dialogue-cartographie.component';
  import { EspaceTravailCartographieComponent } from '../espace-travail-cartographie/espace-travail-cartographie.component';
  import { CartoRoutingModule } from './cartographie-routing.module';
import { CommonModule } from '@angular/common';
import { FabricjsEditorModule } from '../espace-travail-cartographie/angular-editor-fabric-js/src/public-api';
import { ScrollbarComponent } from '../espace-travail-cartographie/angular-editor-fabric-js/src/lib/scrollbar/scrollbar.component';
import { ScrollbarModule } from '../espace-travail-cartographie/angular-editor-fabric-js/src/lib/scrollbar/scrollbar.module';
import {   CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PerfectScrollbarEvents } from 'ngx-perfect-scrollbar/lib/perfect-scrollbar.interfaces';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

@NgModule({
  declarations: [
     
     //stockage
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
    DialogueCartographieComponent,
 
  ],
  exports: [

    MatInputModule,

  ],
  imports: [
    ScrollbarModule,
      CommonModule,
    CartoRoutingModule,
     PerfectScrollbarModule,
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
  schemas: [
  CUSTOM_ELEMENTS_SCHEMA
],

 })
export class CartoghraphieModule { }
