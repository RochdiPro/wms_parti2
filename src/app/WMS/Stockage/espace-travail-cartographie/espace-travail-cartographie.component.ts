import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PerfectScrollbarComponent, PerfectScrollbarConfigInterface, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
 import { Fiche_Local } from 'src/app/WMS/Classe/Stockage/Fiche_Local';
 import Swal from 'sweetalert2';
import { StockageService } from '../services/stockage.service';
import { FabricjsEditorComponent } from './angular-editor-fabric-js/src/public-api';
 
@Component({
  selector: 'app-espace-travail-cartographie',
  templateUrl: './espace-travail-cartographie.component.html',
  styleUrls: ['./espace-travail-cartographie.component.scss']
})
export class EspaceTravailCartographieComponent implements OnInit {
idLocal:any
 local: Fiche_Local = new Fiche_Local()
@ViewChild('canvas', {static: false}) canvas: FabricjsEditorComponent;
title = 'angular-editor-fabric-js';

  constructor(private service: StockageService,
    private route: ActivatedRoute,private router: Router) {    
    }
  ngOnInit(): void {
    this.idLocal = this.route.snapshot.params['id'];

    this.service.getLocalById(this.idLocal).subscribe(data => {
      this.local = data
      }, error => console.log(error));
   
  }
 
  public rasterize() {
    this.canvas.rasterize();
  }

  public rasterizeSVG() {
    this.canvas.rasterizeSVG();
  }
   public saveCanvasToJSON() {
   Swal.fire({
    title: 'Voulez-vous enregistrer les modifications?',
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: 'Oui',
    denyButtonText: `Non, Annuler`,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
     this.canvas.saveCanvasToJSON(this.idLocal);
    //   this.canvas.saveCanvasToJSON();

      Swal.fire('Modifications Enregistrée!', '', 'success')
    } else if (result.isDenied) {
      Swal.fire('Les modifications ne sont pas enregistrées', '', 'info')
    }
  })
  

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
  public readUrlBack(event:any) {
    this.canvas.readUrlBack(event);
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
  public setCanvasImageBack(url:any) {
    this.canvas.setCanvasImageBack(url);
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
  saveCarto(){
    var formData: any = new FormData();
    formData.append('id', this.idLocal);
    this.service.saveCarto(formData).subscribe( data =>{
      console.log("carto change",data);
      },
   error => console.log(error)); 
  }

  public blobToFile = (theBlob: Blob, fileName: string): File => {
    var b: any = theBlob;
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    b.lastModifiedDate = new Date();
    b.name = fileName;
  
    //Cast to a File() type
    return <File>theBlob;
  }
  
  
  //convertir blob à un fichier  
  convertBlobFichier = (theBlob: Blob, fileName: string): File => {
    var b: any = theBlob;
    b.lastModifiedDate = new Date();
    b.name = fileName;
    return <File>theBlob;
  }



  public locale: string = "en";
  public width = window.innerWidth - 150;
  public height = window.innerHeight - 180;
  public type: string = 'component';

  public disabled: boolean = false;

  public config: PerfectScrollbarConfigInterface = {
    useBothWheelAxes: true, suppressScrollX: false, suppressScrollY: false
  };

  @ViewChild(PerfectScrollbarComponent) componentRef?: PerfectScrollbarComponent;
  @ViewChild(PerfectScrollbarDirective) directiveRef?: PerfectScrollbarDirective;

 
  public toggleType(): void {
    this.type = (this.type === 'component') ? 'directive' : 'component';
  }

  public toggleDisabled(): void {
    this.disabled = !this.disabled;
  }

  public scrollToXY(x: number, y: number): void {
    if (this.type === 'directive' && this.directiveRef) {
      this.directiveRef.scrollTo(x, y, 500);
    } else if (this.type === 'component' && this.componentRef && this.componentRef.directiveRef) {
      this.componentRef.directiveRef.scrollTo(x, y, 500);
    }
  }

  public scrollToTop(): void {
    if (this.type === 'directive' && this.directiveRef) {
      this.directiveRef.scrollToTop();
    } else if (this.type === 'component' && this.componentRef && this.componentRef.directiveRef) {
      this.componentRef.directiveRef.scrollToTop();
    }
  }

  public scrollToLeft(): void {
    if (this.type === 'directive' && this.directiveRef) {
      this.directiveRef.scrollToLeft();
    } else if (this.type === 'component' && this.componentRef && this.componentRef.directiveRef) {
      this.componentRef.directiveRef.scrollToLeft();
    }
  }

  public scrollToRight(): void {
    if (this.type === 'directive' && this.directiveRef) {
      this.directiveRef.scrollToRight();
    } else if (this.type === 'component' && this.componentRef && this.componentRef.directiveRef) {
      this.componentRef.directiveRef.scrollToRight();
    }
  }

  public scrollToBottom(): void {
    if (this.type === 'directive' && this.directiveRef) {
      this.directiveRef.scrollToBottom();
    } else if (this.type === 'component' && this.componentRef && this.componentRef.directiveRef) {
      this.componentRef.directiveRef.scrollToBottom();
    }
  }

  public onScrollEvent(event: any): void {
    console.log(event);
  }

}
