import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { ChildComponent } from './child/child.component';
import { SubChildComponent } from './sub-child/sub-child.component';
import { HttpClientModule } from '@angular/common/http';

 import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 import { MatStepperModule } from '@angular/material/stepper';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';

 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
   
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
    
     FormsModule, ReactiveFormsModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
