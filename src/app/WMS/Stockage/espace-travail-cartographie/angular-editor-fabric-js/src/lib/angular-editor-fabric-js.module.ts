import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ColorPickerModule } from 'ngx-color-picker';

import { FabricjsEditorComponent } from './angular-editor-fabric-js.component';
import { ScrollbarModule } from './scrollbar/scrollbar.module';

@NgModule({
  declarations: [FabricjsEditorComponent],
  imports: [
    ScrollbarModule,
     FormsModule,
    ColorPickerModule
  ],
  exports: [FabricjsEditorComponent]
})
export class FabricjsEditorModule { }
