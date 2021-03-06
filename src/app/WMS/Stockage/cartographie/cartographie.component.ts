import { HttpClient } from '@angular/common/http';
import { Component,  OnInit, ViewChild,HostBinding,
  HostListener,
  AfterContentInit,
  ElementRef, } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { QRCodeComponent } from 'angularx-qrcode';
import { NgxBarcodeComponent } from 'ngx-barcode';
 import Swal from 'sweetalert2';
 import { Couloir } from '../../Classe/Stockage/Couloir';
 
import { StockageService } from '../services/stockage.service';
import { AjouterEmplacmentDialogComponent, AjouterEtageDialogComponent, AjouterHalleDialogComponent, AjouterLocalDialogComponent, AjouterRayonDialogComponent, EditEmplacementDialogComponent, EditEtageDialogComponent, EditHalleDialogComponent, EditRayonDialogComponent, OpenCartographieV2Component, OpenEmplacmentLoueeComponent, OpenInfoLocalComponent, OpenZoneInvalideComponent } from './dialogue-cartographie/dialogue-cartographie.component';
import {trigger,state,style,transition,animate,} from '@angular/animations';
function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}
@Component({
  selector: 'app-cartographie',
  templateUrl: './cartographie.component.html',
  styleUrls: ['./cartographie.component.scss'],
  animations: [
    trigger('transformAnimation', [
      state('*', style({ transform: '{{transform}}' }), {
        params: { transform: 'scale(1)', duration: '0s' },
      }),
      transition('* => *', animate('{{duration}} ease')),
    ]),
  ],
})

export class CartographieComponent implements OnInit {
  private scale = 1;
  private translate: [number, number] = [0, 0];
  private translateOnPanStart: [number, number] = [0, 0];

  transformAnimationState = {
    value:0,
    params: {
      transform: 'scale(1)',
      duration: '0s',
    },
  };

  @ViewChild('stepper') private myStepper: MatStepper;
  @ViewChild("qrcode", { static: true }) qrcode: QRCodeComponent
  @ViewChild(NgxBarcodeComponent) barcode: NgxBarcodeComponent

  //declaration formGroup
  localFormGroup: FormGroup;
  halleFormGroup: FormGroup;
  rayonFormGroup: FormGroup;
  etageFormGroup: FormGroup;
  emplacmentFormGroup: FormGroup;
  disableSelect = new FormControl(false);

  isLinear = false;

  //definition de la code a bare 
  elementType: any = "img";
  value = 'L0 H0 R0 E0 P0';
  format: any = 'CODE128';
  lineColor = '#000000';
  width = 2;
  height = 100;
  displayValue = true;
  fontOptions = '';
  font = 'monospace';
  textAlign = 'center';
  textPosition = 'bottom';
  textMargin = 2;
  fontSize = 20;
  background = '#ffffff';
  margin = 10;
  marginTop = 10;
  marginBottom = 10;
  marginLeft = 10;
  marginRight = 10;
  showTableauHall = false;
  showTableauRayon = false;

  get values(): string[] {
    return this.value.split('\n');
  }
  codeList: string[] = [
    'CODE128',
    'CODE128A', 'CODE128B',
    'CODE39',

  ];


  //Declaration du tableaux de (locals/halls/rayons/etages/emplacement)
  locals: any = [];
  halles: any = [];
  rayons: any = [];
  etages: any = [];
  emplacements: any = [];
  emplacementCouloir1: any = [];
  emplacementCouloir2: any = [];
 
  //declaration objet(local/hall/rayon/etage/emplacement) selectionn??
  localselect: any;
  halleselect: any;
  rayonselect: any
  etageselect: any
  emplacmentselect: any


  //coloir selctionner
  couloirGauche: Couloir = new Couloir()
  couloirDroite: Couloir = new Couloir()
 

  //declaration du libelle d'objet(local/hall/rayon/etage/emplacement) selectinn??
  libelleLocal: any;
  libelleRayon: any;
  libelleHalle: any;
  libelleEtage: any;
  libelleEmplacement: any;
  libelleCouloir: any

  x: number
  y: number

  x_Local: number
  y_Local: number
   arrRayon: any[][] = [];
  arrHall: any[][] = [];
   scaleRatio = 1.0;

  getScale() {
    return `scale(${this.scaleRatio})`;
  }


  //Zoom plus
  zoomIn() {
    if (this.scaleRatio > 2.5) {
      return;
    }
     this.scaleRatio += 0.1;
  }

    //Zoom moins
  zoomOut() {
    if (this.scaleRatio < 0.5) {
      return;
    }
    this.scaleRatio -= 0.1;
  }
  //format d'origine
  reset0() {
    this.scaleRatio = 1.0;
  }
  constructor(public dialog: MatDialog, private _formBuilder: FormBuilder, private service: StockageService, 
    private elementRef: ElementRef,private router: Router, private http: HttpClient, private sanitizer: DomSanitizer) {

  }

  ngOnInit() {
    this.ListLocals();

    this.localFormGroup = this._formBuilder.group({
      localFormGroup: ['', Validators.required]
    });
    this.halleFormGroup = this._formBuilder.group({
      halleFormGroup: ['', Validators.required],
      halle: ['', Validators.required],
    });
    this.rayonFormGroup = this._formBuilder.group({
      rayonFormGroup: ['', Validators.required],
      rayon: ['', Validators.required],
    });
    this.etageFormGroup = this._formBuilder.group({
      etageFormGroup: ['', Validators.required],
      etage: ['', Validators.required],
    });
    this.emplacmentFormGroup = this._formBuilder.group({
      emplacmentFormGroup: ['', Validators.required],
      positiony: ['', Validators.required],
      positionx: ['', Validators.required],
      nbEmp: ['', Validators.required],
    });
  }

  //g??nerer la liste des locals
  ListLocals() {
    this.service.Locals().subscribe(data => {
      console.log("liste locals", data)
      this.locals = data;
    });
  }

  //selectionner un local
  SelectLocal(local: any, id: any) {
    console.log("Local selctionner", local)
    this.localselect = local;
    this.libelleLocal = this.localselect.nom_Local
    this.generertablehall(local);
    this.halles = this.localselect.halles
    this.goForward();
  }
  //ajouter local
  OpenDialogAddLocal() {
    const dialogRef = this.dialog.open(AjouterLocalDialogComponent, {
      width: '1200px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.service.Locals().subscribe(data => {
        this.locals = data;
      }, error => console.log(error));
    });

  }
  /*ouvrir boite DialogOpenAllZoneReserve 
  pour consulter tous les zones reserv?? pour touts les local*/
  OpenDialogZoneReserver() {

    const dialogRef = this.dialog.open(OpenEmplacmentLoueeComponent, {
      width: '1200px',
      data: { local: this.localselect }
    });
    dialogRef.afterClosed().subscribe(result => {

    });

  }
  //ouvrir la boite dialogue DialogOpenCartographie 
  OpenCartographie(local: any, id: any) {
    console.log("Local selctionner", local)
    this.localselect = local;
    this.libelleLocal = this.localselect.libelle
    this.rayons = this.localselect.rayons
    const dialogRef = this.dialog.open(OpenCartographieV2Component, {
      width: '1200px',
      data: { local: this.localselect }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.service.getLocalById(this.localselect.id).subscribe(data => {
        this.localselect = data;
        this.rayons = this.localselect.rayons
      }, error => console.log(error));
    });
  }

  //ouvrir l'espace de travail pour modiliser le plan du local
  OpenEspaceTravail(id: any) {
    console.log(id)
    this.router.navigate(['/Menu/WMS/WMS-Stockage/Cartographie/Espace-Travail/', id]);
  }

  //selectionner un halle et passer a la sttep du rayons
  SelectHalle(halle: any) {
    this.halleselect = halle
    this.generertableayrayon(halle);
    this.libelleHalle = this.halleselect.libelle
    this.rayons = this.halleselect.rayons
    this.goForward();
  }

  //bouton plus pour plus d'inormation sur le local selectionn??
  openDialogInformationLocal(local: any) {
    //ouvrir la boite dialogue DialogInfoLocal
    const dialogRef = this.dialog.open(OpenInfoLocalComponent, {
      width: 'auto',
      data: { local: local }
    });
  }

  //bouton ajout hall
  openDialogAjouterHalle() {
    //ouvrir la boite dialogue DialogAjouterHalle
    const dialogRef = this.dialog.open(AjouterHalleDialogComponent, {
      width: 'auto',
      data: { local: this.localselect }
    });
    dialogRef.afterClosed().subscribe(result => {
       this.showTableauHall = false;
      this.generertablehall(this.localselect);
    });
  }

  //bouton edit hall
  openDialogEditHalle(numero: any, hall: any) {
    //ouvrir la boite dialogue DialogEditRayon 
    const dialogRef = this.dialog.open(EditHalleDialogComponent, {
      width: 'auto',
      data: { idHall: numero, hall: hall }
    });
    dialogRef.afterClosed().subscribe(result => {
    });

  }

  //supprimer un halle
  supprimerHalle(id: number) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
      title: 'Tu est sure?',
      text: "Vous voulez vraimeent retirer cette Hall de local !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, Supprimer!',
      cancelButtonText: 'Non, Annuler!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.supprimerHall(id).subscribe(data => {
          console.log(data);
          swalWithBootstrapButtons.fire(
            'Suppresion Effect??!',
            'Hall Supprim?? Avec Suc??es.',
            'success'
          )
          this.service.getLocalById(this.localselect.id_Local).subscribe(data => {
            this.localselect = data;
            this.halles = this.localselect.halles
          }, error => console.log(error));

        })
      }
    })
  }

  //selectionner un rayon 
  SelectRayon(rayon: any) {
    this.rayonselect = rayon
    this.libelleRayon = this.rayonselect.libelle
    this.etages = this.rayonselect.etages
    if (rayon.coloirGauche != null) { this.couloirGauche = rayon.coloirGauche }
    if (rayon.coloirDroite != null) { this.couloirDroite = rayon.coloirDroite }
 
    console.log(rayon)
    console.log(this.couloirGauche)
    console.log(this.couloirDroite)
    this.goForward();
  }

  //bouton ajouter rayon
  openDialogAjouterRayon() {
    //ouvrir la boite dialogue DialogAjouterRayon 
    const dialogRef = this.dialog.open(AjouterRayonDialogComponent, {
      width: 'auto',
      data: { local: this.localselect, hall: this.halleselect }
    });
    dialogRef.afterClosed().subscribe(result => {
        this.showTableauRayon = false;
        this.generertableayrayon(this.halleselect);
    });
  }

  //boutin edit rayon
  openDialogEditRayon(numero: any, rayon: any) {
    //ouvrir la boite dialogue DialogEditRayon 
    const dialogRef = this.dialog.open(EditRayonDialogComponent, {
      width: 'auto',
      data: { idRayon: numero, rayon: rayon,local:this.localselect,hall:this.halleselect }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.service.getHallById(this.halleselect.id).subscribe(data => {
        this.halleselect = data;
        this.rayons = this.halleselect.rayons
        this.generertableayrayon(this.halleselect);
      }, error => console.log(error));
    });


  }
  //supprimer un rayon
  supprimerRayon(id: number) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Tu est sure?',
      text: "Vous voulez vraimeent retirer cette rayon de local !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, Supprimer!',
      cancelButtonText: 'Non, Annuler!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.supprimerRayon(id).subscribe(data => {
          console.log(data);
          swalWithBootstrapButtons.fire(
            'Suppresion Effect??!',
            'Rayon Supprim?? Avec Suc??es.',
            'success'
          )
          this.showTableauRayon=false
            this.generertableayrayon(this.halleselect)
   

        })
      }
    })
  }


  //g??nerer la matrice du rayon pour un hall
  async generertableayrayon(halle: any) {
    var data: any
    var verif: any
    this.arrRayon = []
    this.x = await this.service.MaxOrdreX(halle.id).toPromise();
    this.y = await this.service.MaxOrdreY(halle.id).toPromise();
    console.log("y", this.y)
    console.log("x", this.x)
    console.log("eeee", halle)
    for (let i = 0; i < this.x; i++) {
      // Creates an empty line
      this.arrRayon.push([]);
      // Adds cols to the empty line:
      this.arrRayon[i].push(new Array(this.y));
      for (let j = 0; j < this.y; j++) {
        data = await this.service.OrdreRayonExiste(halle.id, i + 1, j + 1).toPromise()
        if (data != null) {
          this.arrRayon[i][j] = data;
          this.arrRayon[i][j].etat = "Rayon";
        }
        else {
          data = await this.service.OrdreCouloirExiste(halle.id, i + 1, j + 1).toPromise()
            if (data != null) {
            this.arrRayon[i][j] = data;
            this.arrRayon[i][j].etat = "Couloir";
          }
          else{

               //ordre n'exsite pas
          verif = await this.service.ZoneInvalideHallExiste(halle.id, i + 1, j + 1).toPromise()
          if (verif == true) {
            this.arrRayon[i][j] = {};
            this.arrRayon[i][j].id = -1;
            this.arrRayon[i][j].etat = "Invalide";
            this.arrRayon[i][j].espace =1;

          }
          else {
            this.arrRayon[i][j] = {};
            this.arrRayon[i][j].id = 0;
            this.arrRayon[i][j].etat = "Vide";
            this.arrRayon[i][j].espace =1;

          }
          }


       
        }
      }
    }
    console.log("matrice", this.arrRayon)
    this.showTableauRayon = true;
  }


  //g??nerer la matrice du rayon pour un hall
  async generertablehall(local: any) {
    var data: any
    var pos:any
    var verif: any
    this.arrHall = []
    console.log(local)
    this.x_Local = await this.service.MaxOrdreHallX(local.id_Local).toPromise();
    this.y_Local = await this.service.MaxOrdreHallY(local.id_Local).toPromise();
    console.log("y", this.x_Local)
    console.log("x", this.x_Local)
     for (let i = 0; i < this.x_Local; i++) {
      // Creates an empty line
      this.arrHall.push([]);
      // Adds cols to the empty line:
      this.arrHall[i].push(new Array(this.y_Local));
      for (let j = 0; j < this.y_Local; j++) {
        data = await this.service.OrdreHallExiste(local.id_Local, i + 1, j + 1).toPromise()
        if (data != null) {
          pos = await this.service.Position_Hall(local.id_Local, i + 1, j + 1).toPromise()

          this.arrHall[i][j] = data;
          this.arrHall[i][j].etat = "Hall";
          this.arrHall[i][j].pos = pos.pos;

        }
        else {
          //ordre n'exsite pas
          verif = await this.service.ZoneInvalideLocalExiste(local.id_Local, i + 1, j + 1).toPromise()
          if (verif == true) {
            this.arrHall[i][j] = {};
            this.arrHall[i][j].id = -1;
            this.arrHall[i][j].etat = "Invalide";
            this.arrHall[i][j].espace =1;
            this.arrHall[i][j].pos =1;

          }
          else {
            this.arrHall[i][j] = {};
            this.arrHall[i][j].id = 0;
            this.arrHall[i][j].etat = "Vide";
            this.arrHall[i][j].espace =1;
            this.arrHall[i][j].pos =1;

          }
        }
      }
    }
    console.log("matrice", this.arrHall)
    this.showTableauHall = true;
  }

  SelectZoneInvalide(zone: any, i: any, j: any) {
    console.log("zone", i + 1, " ", j + 1)

    const dialogRef = this.dialog.open(OpenZoneInvalideComponent,{
      width: 'auto',
      data: { hall: this.halleselect, zone: zone, x: i + 1, y: j + 1 }
    });
    dialogRef.afterClosed().subscribe(result => {

    });
  }
  //selectionner et acced?? un etage
  SelectEtage(etage: any) {
    this.etageselect = etage
    console.log(etage)
    this.libelleEtage = this.etageselect.libelle
    this.emplacements = this.etageselect.emplacments
    this.actualiserListeEmplacement()
     this.goForward();
  }

  genererEmplacementParCouloir() { }

  //ouvrir la boite dialogue DialogAjouterEtage
  openDialogAjoutEtage() {
    const dialogRef = this.dialog.open(AjouterEtageDialogComponent, {
      width: 'auto',
      data: { rayon: this.rayonselect }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.service.getRayonById(this.rayonselect.id).subscribe(data => {
        this.rayonselect = data;
        console.log("newww2", this.rayonselect)
        this.etages = this.rayonselect.etages
      }, error => console.log(error));
    });
  }

  //ouvrir la boite dialogue DialogEditEtage
  openDialoEditEtage(numero: any, Etage: any) {

    const dialogRef = this.dialog.open(EditEtageDialogComponent, {
      width: 'auto',
      data: { idEtage: numero, etage: Etage }
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  //supprimer un etage
  supprimerEtage(id: number) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
      title: 'Tu est sure?',
      text: "Vous voulez vraimeent retirer cette etage de rayon !!!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, Supprimer!',
      cancelButtonText: 'Non, Annuler!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.supprimerEtage(id).subscribe(data => {
          console.log(data);
          swalWithBootstrapButtons.fire(
            'Suppresion Effect??!',
            'Etage Supprim?? Avec Suc??es.',
            'success'
          )
          this.service.getRayonById(this.rayonselect.id).subscribe(data => {
            this.rayonselect = data;
            this.etages = this.rayonselect.etages
          }, error => console.log(error));
        })

      }
    })
  }


  //selcetionner emplacment/position
  selectEmplacment(emp: any) {
    this.emplacmentselect = emp
    console.log(emp)
    this.libelleEmplacement = this.emplacmentselect.libelle
    this.libelleCouloir = this.emplacmentselect.couloir.libelle
    this.value = "L0" + this.localselect.id_Local + "H0" + this.halleselect.id + "R" + this.rayonselect.libelle + "E0" + this.etageselect.id + "C" + this.libelleCouloir + "P0" + this.emplacmentselect.id
    console.log("value ", this.value)
    this.goForward();
  }
  //ouvrir la boite dialogue DialogEditEmplacement
  openDialoEditEmplacment(emp: any) {

    const dialogRef = this.dialog.open(EditEmplacementDialogComponent, {
      width: 'auto',
      data: { emplacement: emp }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.service.getEmplacementParEtageCouloir(this.couloirGauche.id, this.etageselect.id).subscribe(data => {
        this.emplacementCouloir1 = data;
      }, error => console.log(error));
      this.service.getEmplacementParEtageCouloir(this.couloirDroite.id, this.etageselect.id).subscribe(data => {
        this.emplacementCouloir2 = data;
      }, error => console.log(error));

    });

  }
  //ouvrir la boite dialogue DialogAjouterEmplacment
  openDialogAjoutEmplacment() {
    const dialogRef = this.dialog.open(AjouterEmplacmentDialogComponent, {
      width: 'auto',
      data: {
        rayon: this.rayonselect,
        etageselect: this.etageselect,
        localselect: this.localselect,
        rayonselect: this.rayonselect,
        halleselect: this.halleselect,
        couloirDroite: this.couloirDroite,
        couloirGauche: this.couloirGauche,
       }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log("id etage seelect", this.etageselect.id)
         this.actualiserListeEmplacement()
     
    });
  }
actualiserListeEmplacement(){
    //recuperer les emplacement accesible via couloir gauche
    this.service.getEmplacementParEtageCouloir(this.couloirGauche.id, this.etageselect.id).subscribe(data => {
      this.emplacementCouloir1 = data;
    }, error => console.log(error));
          //recuperer les emplacement accesible via couloir droite
    this.service.getEmplacementParEtageCouloir(this.couloirDroite.id, this.etageselect.id).subscribe(data => {
      this.emplacementCouloir2 = data;
    }, error => console.log(error));
                //recuperer les emplacement accesible via couloir haut
  }


  //supprimer un emplacement
  supprimerEmplacment(id: number) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
      title: 'Tu est sure?',
      text: "Vous voulez vraiment supprimer cette Emplacement!!!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, Supprimer!',
      cancelButtonText: 'Non, Annuler!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.supprimerEmplacment(id).subscribe(data => {
          console.log(data);
          //        this.ListePosition(this.etageselect.id);
          swalWithBootstrapButtons.fire(
            'Suppresion Effect??!',
            'Emplacement Supprim?? Avec Suc??es.',
            'success'
          )
        })
        this.service.getEtageById(this.etageselect.id).subscribe(data => {
          this.etageselect = data;
          this.emplacements = this.etageselect.emplacments
        }, error => console.log(error));
      }
    })
  }

  //enregistrer code a bare comme une image 
  saveBRAsImage() {
    // fetches base 64 date from image
    console.log((<HTMLInputElement>document.getElementById('barcode')));
    console.log(this.barcode)
    const parentElement = this.barcode.bcElement.nativeElement.firstChild.src;

    let blobData = this.convertBase64ToBlob(parentElement);

    // saves as image
    if (window.navigator && window.navigator.msSaveOrOpenBlob) { //IE
      window.navigator.msSaveOrOpenBlob(blobData, 'BRcode');
    } else { // chrome
      const blob = new Blob([blobData], { type: "image/png" });
      const url = window.URL.createObjectURL(blob);
      // window.open(url);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'BRcode';
      link.click();
    }

    if (window.navigator.msSaveOrOpenBlob) // IE10+
      window.navigator.msSaveOrOpenBlob(blobData, 'BRcode');
    else {
      const blob = new Blob([blobData], { type: "image/png" });
      var url = window.URL.createObjectURL(blob);
      window.open(url);
    }

  }

  //enregistrer QR code comme une image 
  saveQRAsImage() {
    // fetches base 64 date from image
    console.log(this.qrcode)
    const parentElement = this.qrcode.qrcElement.nativeElement.firstChild.src;
    let blobData = this.convertBase64ToBlob(parentElement);
    console.log("blobData", blobData)

    // saves as image
    if (window.navigator && window.navigator.msSaveOrOpenBlob) { //IE
      window.navigator.msSaveOrOpenBlob(blobData, 'Qrcode');
    } else { // chrome
      const blob = new Blob([blobData], { type: "image/png" });
      console.log("blob", blob)

      const url = window.URL.createObjectURL(blob);
      console.log("url", url)
      // window.open(url);
      const link = document.createElement('a');
      console.log("link", link)

      link.href = url;
      link.download = 'Qrcode';
      link.click();
    }

    if (window.navigator.msSaveOrOpenBlob) // IE10+
      window.navigator.msSaveOrOpenBlob(blobData, 'Qrcode');
    else {
      const blob = new Blob([blobData], { type: "image/png" });
      var url = window.URL.createObjectURL(blob);
      window.open(url);
    }
  }

  //convertir image de la Base64 en Blob
  private convertBase64ToBlob(Base64Image: any) {
    // decouper en deux partie
    const parts = Base64Image.split(';base64,');
    //MAINTENIR LE TYPE DE CONTENU
    const imageType = parts[0].split(':')[1];
    // DECODE BASE64 STRING
    const decodedData = window.atob(parts[1]);
    // CR??ER UNIT8ARRAY DE TAILLE M??ME QUE LA LONGUEUR DES DONN??ES DE LIGNE
    const uInt8Array = new Uint8Array(decodedData.length);
    // ININS??RER TOUS LES CODES DE CARACT??RES DANS UINT8ARRAY
    for (let i = 0; i < decodedData.length; ++i) {
      uInt8Array[i] = decodedData.charCodeAt(i);
    }
    //RETOURNER L'IMAGE BLOB APR??S LA CONVERSION
    return new Blob([uInt8Array], { type: imageType });
  }

  //aller ?? la step precedente 
  goBack() {
    this.myStepper.previous();
  }

  //aller ?? la step suivante 
  goForward() {
    this.myStepper.next();
  }
  //compteuur
  counter(i: number) {
    return new Array(i);
  }

  
  @HostListener('mousewheel', ['$event'])
  onMouseWheel(e: any) {
    const currentScale = this.scale;
    const newScale = clamp(this.scale + Math.sign(e.wheelDelta) / 10.0, 1, 3.0);
    if (currentScale !== newScale) {
      this.translate = this.calculateTranslationToZoomPoint(
        currentScale,
        newScale,
        this.translate,
        e
      );
      this.scale = newScale;

      this.updateTransformAnimationState();
    }

    e.preventDefault();
  }

  private calculateTranslationToZoomPoint(
    currentScale: number,
    newScale: number,
    currentTranslation: [number, number],
    e: { clientX: number; clientY: number }
  ): [number, number] {
    // kudos to this awesome answer on stackoverflow:
    // https://stackoverflow.com/a/27611642/1814576
    const [eventLayerX, eventLayerY] = this.projectToLayer(e);

    const xAtCurrentScale =
      (eventLayerX - currentTranslation[0]) / currentScale;
    const yAtCurrentScale =
      (eventLayerY - currentTranslation[1]) / currentScale;

    const xAtNewScale = xAtCurrentScale * newScale;
    const yAtNewScale = yAtCurrentScale * newScale;

    return [eventLayerX - xAtNewScale, eventLayerY - yAtNewScale];
  }

  private projectToLayer(eventClientXY: {
    clientX: number;
    clientY: number;
  }): [number, number] {
    const layerX = Math.round(eventClientXY.clientX - this.clientX);
    const layerY = Math.round(eventClientXY.clientY - this.clientY);
    return [layerX, layerY];
  }

  private get clientX() {
    return (
      this.elementRef.nativeElement as HTMLElement
    ).getBoundingClientRect().left;
  }

  private get clientY() {
    return (
      this.elementRef.nativeElement as HTMLElement
    ).getBoundingClientRect().top;
  }

  private updateTransformAnimationState(duration = '.5s') {
    this.transformAnimationState = {
      value: this.scale + this.translate[0] + this.translate[1],
      params: {
        transform: `translate3d(${this.translate[0]}px, ${this.translate[1]}px, 0px) scale(${this.scale})`,
        duration,
      },
    };
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
  onPan(e: Event & { deltaX: number; deltaY: number }) {
    this.translate = [
      this.translateOnPanStart[0] + e.deltaX,
      this.translateOnPanStart[1] + e.deltaY,
    ];
    this.updateTransformAnimationState('0s');
    e.preventDefault();
  }
}












