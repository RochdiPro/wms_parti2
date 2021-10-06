import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
 import { Local } from 'src/app/WMS/Classe/Stockage/Local';
import { FabricjsEditorComponent } from 'src/projects/angular-editor-fabric-js/src/public-api';
import { StockageService } from '../../stockage.service';

@Component({
  selector: 'app-espace-travail-cartographie',
  templateUrl: './espace-travail-cartographie.component.html',
  styleUrls: ['./espace-travail-cartographie.component.scss']
})
export class EspaceTravailCartographieComponent implements OnInit {
idLocal:any
 local: Local = new Local()
@ViewChild('canvas', {static: false}) canvas: FabricjsEditorComponent;
title = 'angular-editor-fabric-js';

  constructor(private service: StockageService,
    private route: ActivatedRoute,private router: Router) { }
  ngOnInit(): void {
    this.idLocal = this.route.snapshot.params['id'];

    this.service.getLocalById(this.idLocal).subscribe(data => {
      this.local = data
      console.log(this.local)
     }, error => console.log(error));
   
  }
 
  public rasterize() {
    this.canvas.rasterize();
  }

  public rasterizeSVG() {
    this.canvas.rasterizeSVG();
  }

  public saveCanvasToJSON() {
    this.canvas.saveCanvasToJSON();
  }

  public loadCanvasFromJSON() {
    this.canvas.loadCanvasFromJSON();
  }

  public confirmClear() {
    this.canvas.confirmClear();
  }

  public changeSize() {
    this.canvas.changeSize();
  }

  public addText() {
    this.canvas.addText();
  }

  public getImgPolaroid(event:any) {
    this.canvas.getImgPolaroid(event);
  }

  public addImageOnCanvas(url:any) {
    this.canvas.addImageOnCanvas(url);
  }

  public readUrl(event:any) {
    this.canvas.readUrl(event);
  }

  public removeWhite(url:any) {
    this.canvas.removeWhite(url);
  }

  public addFigure(figure:any) {
    this.canvas.addFigure(figure);
  }

  public removeSelected() {
    this.canvas.removeSelected();
  }

  public sendToBack() {
    this.canvas.sendToBack();
  }

  public bringToFront() {
    this.canvas.bringToFront();
  }

  public clone() {
    this.canvas.clone();
  }

  public cleanSelect() {
    this.canvas.cleanSelect();
  }

  public setCanvasFill() {
    this.canvas.setCanvasFill();
  }

  public setCanvasImage() {
    this.canvas.setCanvasImage();
  }

  public setId() {
    this.canvas.setId();
  }

  public setOpacity() {
    this.canvas.setOpacity();
  }

  public setFill() {
    this.canvas.setFill();
  }

  public setFontFamily() {
    this.canvas.setFontFamily();
  }

  public setTextAlign(value:any) {
    this.canvas.setTextAlign(value);
  }

  public setBold() {
    this.canvas.setBold();
  }

  public setFontStyle() {
    this.canvas.setFontStyle();
  }

  public hasTextDecoration(value:any) {
    this.canvas.hasTextDecoration(value);
  }

  public setTextDecoration(value:any) {
    this.canvas.setTextDecoration(value);
  }

  public setFontSize() {
    this.canvas.setFontSize();
  }

  public setLineHeight() {
    this.canvas.setLineHeight();
  }

  public setCharSpacing() {
    this.canvas.setCharSpacing();
  }

  public rasterizeJSON() {
    this.canvas.rasterizeJSON();
  }
}
