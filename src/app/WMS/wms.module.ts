 import { NgModule } from '@angular/core';
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
