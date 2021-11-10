import { Component, OnInit } from '@angular/core';
import { Hall } from '../../Classe/Stockage/Hall';
import { Rayon } from '../../Classe/Stockage/Rayon';
import { StockageService } from '../services/stockage.service';
import { HostBinding, HostListener, AfterContentInit, ElementRef } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}
@Component({
  selector: 'app-tableau',
  templateUrl: './tableau.html',
  styleUrls: ['./tableau.component.scss'],
  animations: [
    trigger('transformAnimation', [state(
      '*',
      style({ transform: '{{transform}}' }),
      { params: { transform: 'scale(1)', duration: '0s' } }), 
      transition('* => *', animate('{{duration}} ease'))])]
})
export class TableauComponent implements OnInit {

  constructor(private service: StockageService,private elementRef: ElementRef) { }
  
   hall: Hall = new Hall()

  x: number
  y: number
  arr: any[] = [];
  halles: any = [];
  rayons: any = [];
  emplacmentselect: any
  libelleLocal: any
  local: any
  rayonShow: boolean = false
  hallShow: boolean = true
  libelleHalle: any
  show=false
  ngOnInit(): void {
    this.arr = []
    this.generertableayrayon(1)
  }

  counter(i: number) {
    return new Array(i);
  }
  async generertableayrayon(halle: any) {
    var data: any
    var verif: any
    this.arr = []
    this.x = await this.service.MaxOrdreX(halle).toPromise();
    this.y = await this.service.MaxOrdreY(halle).toPromise();
    console.log("y", this.y)
    console.log("x", this.x)
     for (let i = 0; i < this.x; i++) {
      // Creates an empty line
      this.arr.push([]);
      // Adds cols to the empty line:
      this.arr[i].push(new Array(this.y));
      for (let j = 0; j < this.y; j++) {
        data = await this.service.OrdreRayonExiste(halle, i + 1, j + 1).toPromise()
        if (data != null) {
          this.arr[i][j] = data;
          this.arr[i][j].etat = "Rayon";
        }
        else {
          //ordre n'exsite pas
          verif = await this.service.ZoneInvalideExiste(halle, i + 1, j + 1).toPromise()
          if (verif == true) {
            this.arr[i][j] = {};
            this.arr[i][j].id = -1;
            this.arr[i][j].etat = "Invalide";
            this.arr[i][j].espace =1;

          }
          else {
            this.arr[i][j] = {};
            this.arr[i][j].id = 0;
            this.arr[i][j].etat = "Vide";
            this.arr[i][j].espace =1;

          }
        }
      }
    }
    console.log("matrice", this.arr)
    this.show=true
   }


  generertableayrayonV0() {


    for (var i = 0; i < this.x; i++) {
      // Creates an empty line
      this.arr.push([]);
      // Adds cols to the empty line:
      this.arr[i].push(new Array(this.y));

      for (var j = 0; j < this.y; j++) {
        for (var z = 0; z < this.rayons.length; z++) {
          console.log("z:", this.rayons[z])
          console.log("x:", this.rayons[z].ordreX, "Y", this.rayons[z].ordreY)
          console.log("i:", i + 1, " ", j + 1)

          if ((this.rayons[z].ordreX === i + 1) && (this.rayons[z].ordreY === j + 1)) {
            // Initializes:
            this.arr[i][j] = this.rayons[z].libelle;
          }
          else {
            // Initializes:
            this.arr[i][j] = '--';

          }
        }
      }
    }
    console.log("fff", this.arr);
  }
  SelectHall(hall: any) {
    this.rayonShow = true
    this.hallShow = false
    this.libelleHalle = hall.libelle
    this.hall = hall
    this.rayons = hall.rayons
    this.service.MaxOrdreX(hall.id).subscribe(data => {
      this.x = data;
      this.service.MaxOrdreY(hall.id).subscribe(data => {
        this.y = data;
        console.log("y", this.y)
        console.log("x", this.x)
        this.generertableayrayon(hall)
      }, error => console.log(error));
    }, error => console.log(error));
  }
  scaleRatio = 1.0;

  getScale() {
    return `scale(${this.scaleRatio})`;
  }

  zoomIn() {
    if (this.scaleRatio > 2.5) {
      return;
    }
    console.log(this.scaleRatio);
    this.scaleRatio += 0.1;
  }
  zoomOut() {
    if (this.scaleRatio < 0.5) {
      return;
    }
    this.scaleRatio -= 0.1;
  }
  reset1() {
    this.scaleRatio = 1.0;
  }

  private scale = 1;
  private translate: [number, number] = [0, 0];
  private translateOnPanStart: [number, number] = [0, 0];

  transformAnimationState = {
    value: 0,
    params: {
      transform: 'scale(1)',
      duration: '0s'
    }
  };

 
  @HostListener('mousewheel', ['$event'])
  onMouseWheel(e: any) {

    const currentScale = this.scale;
    const newScale = clamp(this.scale + Math.sign(e.wheelDelta) / 10.0, 1, 3.0);
    if (currentScale !== newScale) {


      this.translate = this.calculateTranslationToZoomPoint(currentScale, newScale, this.translate, e);
      this.scale = newScale;

      this.updateTransformAnimationState();
    }
   
    e.preventDefault();
  }

  private calculateTranslationToZoomPoint(currentScale: number, newScale: number, currentTranslation: [number, number],  e: {clientX: number, clientY: number}, ): [number, number] {
      // kudos to this awesome answer on stackoverflow:
      // https://stackoverflow.com/a/27611642/1814576
    const [eventLayerX, eventLayerY] = this.projectToLayer(e);

    const xAtCurrentScale = (eventLayerX - currentTranslation[0]) / currentScale;
    const yAtCurrentScale = (eventLayerY - currentTranslation[1]) / currentScale;

    const xAtNewScale = xAtCurrentScale * newScale;
    const yAtNewScale  = yAtCurrentScale * newScale;

    return [eventLayerX - xAtNewScale, eventLayerY - yAtNewScale];
  }

  private projectToLayer(eventClientXY: {clientX: number, clientY: number}): [number, number] {
    const layerX = Math.round(eventClientXY.clientX - this.clientX);
    const layerY = Math.round(eventClientXY.clientY - this.clientY);
    return [layerX, layerY];
  }

  private get clientX() {
    return (this.elementRef.nativeElement as HTMLElement).getBoundingClientRect().left;
  }

  private get clientY() {
    return (this.elementRef.nativeElement as HTMLElement).getBoundingClientRect().top;
  }

  private updateTransformAnimationState(duration = '.5s') {
    this.transformAnimationState = {
      value: this.scale + this.translate[0] + this.translate[1],
      params: {
        transform: `translate3d(${this.translate[0]}px, ${this.translate[1]}px, 0px) scale(${this.scale})`,
        duration
      }
    }
  }

  reset() {
    this.scale = 1;
    this.translate = [0, 0];
    this.updateTransformAnimationState();
  }

  @HostListener('panstart', ['$event'])
  onPanStart(e: Event) {
    this.translateOnPanStart = [...this.translate] as [number, number];
    e.preventDefault();
  }

  @HostListener('pan', ['$event'])
  onPan(e: Event & {deltaX: number, deltaY: number}) {
    this.translate = [this.translateOnPanStart[0] + e.deltaX, this.translateOnPanStart[1] + e.deltaY];
    this.updateTransformAnimationState('0s');
    e.preventDefault();
  }

}





