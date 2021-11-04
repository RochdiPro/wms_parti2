import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

 import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { ChildComponent } from './child/child.component';
import { SubChildComponent } from './sub-child/sub-child.component';
import { HttpClientModule } from '@angular/common/http';
  
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
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    WmsModule,
    
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
