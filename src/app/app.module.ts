import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

 import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
 import { HttpClientModule } from '@angular/common/http';
  
 import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
   
@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
   ],
  exports: [
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
     
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
