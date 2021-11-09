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
import { FabricjsEditorModule } from 'src/projects/angular-editor-fabric-js/src/public-api';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
  import { WmsRoutingModule } from './wms-routing.module';
 import { CommonModule } from '@angular/common';
import { MenuWmsComponent } from './menu-wms/menu-wms.component';
   
@NgModule({
  declarations: [  
    MenuWmsComponent,
 
   ],
  exports: [



  ],
  imports: [
     CommonModule,
    WmsRoutingModule,
   ],
  })
export class WmsModule { }
