import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

 import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { ChildComponent } from './child/child.component';
import { SubChildComponent } from './sub-child/sub-child.component';
import { HttpClientModule } from '@angular/common/http';

 import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 import { MatStepperModule } from '@angular/material/stepper';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';

 import { AppRoutingModule } from './app-routing.module';
import { WmsModule } from './WMS/wms.module';
   
@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ChildComponent,
    SubChildComponent,

  

  ],
  exports: [



  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
     ReactiveFormsModule,
     MatStepperModule,
     
    MatSelectModule,
    MatDialogModule,
    WmsModule,
     FormsModule, ReactiveFormsModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
