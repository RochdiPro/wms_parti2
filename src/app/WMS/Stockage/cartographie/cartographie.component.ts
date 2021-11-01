import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, Pipe, PipeTransform, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { QRCodeComponent } from 'angularx-qrcode';
import { NgxBarcodeComponent } from 'ngx-barcode';
import { Fiche_Local } from '../../Classe/Stockage/Fiche_Local';
import Swal from 'sweetalert2';
import { Client } from '../../Classe/Stockage/Client';
import { Couloir } from '../../Classe/Stockage/Couloir';
import { Emplacement } from '../../Classe/Stockage/Emplacement';
import { Etage } from '../../Classe/Stockage/Etage';
import { Hall } from '../../Classe/Stockage/Hall';
import { Rayon } from '../../Classe/Stockage/Rayon';
import { Zone } from '../../Classe/Stockage/Zone';

import { StockageService } from '../services/stockage.service';
import { AjouterLocalDialogComponent } from './dialogue_cartographie/ajouter-local-dialog/ajouter-local-dialog.component';
import { EditHalleDialogComponent } from './dialogue_cartographie/edit-halle-dialog/edit-halle-dialog.component';
import { AjouterHalleDialogComponent } from './dialogue_cartographie/ajouter-halle-dialog/ajouter-halle-dialog.component';
import { EditRayonDialogComponent } from './dialogue_cartographie/edit-rayon-dialog/edit-rayon-dialog.component';
import { AjouterRayonDialogComponent } from './dialogue_cartographie/ajouter-rayon-dialog/ajouter-rayon-dialog.component';
import { AjouterEtageDialogComponent } from './dialogue_cartographie/ajouter-etage-dialog/ajouter-etage-dialog.component';
import { EditEtageDialogComponent } from './dialogue_cartographie/edit-etage-dialog/edit-etage-dialog.component';
import { OpenCartographieV2Component } from './dialogue_cartographie/open-cartographie-v2/open-cartographie-v2.component';
import { OpenInfoLocalComponent } from './dialogue_cartographie/open-info-local/open-info-local.component';
import { EditEmplacementDialogComponent } from './dialogue_cartographie/edit-emplacement-dialog/edit-emplacement-dialog.component';
import { AjouterEmplacmentDialogComponent } from './dialogue_cartographie/ajouter-emplacment-dialog/ajouter-emplacment-dialog.component';
import { OpenEmplacmentLoueeComponent } from './dialogue_cartographie/open-emplacment-louee/open-emplacment-louee.component';
import { OpenZoneInvalideComponent } from './dialogue_cartographie/open-zone-invalide/open-zone-invalide.component';

@Component({
  selector: 'app-cartographie',
  templateUrl: './cartographie.component.html',
  styleUrls: ['./cartographie.component.scss'],

})

export class CartographieComponent implements OnInit {

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
  showTableau = false;
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
  //declaration objet(local/hall/rayon/etage/emplacement) selectionné
  localselect: any;
  halleselect: any;
  rayonselect: any
  etageselect: any
  emplacmentselect: any


  //coloir selctionner
  couloirGauche: Couloir = new Couloir()
  couloirDroite: Couloir = new Couloir()


  //declaration du libelle d'objet(local/hall/rayon/etage/emplacement) selectinné
  libelleLocal: any;
  libelleRayon: any;
  libelleHalle: any;
  libelleEtage: any;
  libelleEmplacement: any;
  libelleCouloir: any

  x: number
  y: number
  arr: any[][] = [];

  constructor(public dialog: MatDialog, private _formBuilder: FormBuilder, private service: StockageService, private router: Router, private http: HttpClient, private sanitizer: DomSanitizer) {

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

  //génerer la liste des locals
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
  pour consulter tous les zones reservé pour touts les local*/
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
    this.router.navigate(['/Menu/WMS-Stockage/Cartographie/Espace-Travail', id]);
  }

  //selectionner un halle et passer a la sttep du rayons
  SelectHalle(halle: any) {
    this.halleselect = halle
    this.generertableayrayon(halle);
    this.libelleHalle = this.halleselect.libelle
    this.rayons = this.halleselect.rayons
    this.goForward();
  }

  //bouton plus pour plus d'inormation sur le local selectionné
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
      this.service.getLocalById(this.localselect.id_Local).subscribe(data => {
        this.localselect = data;
        console.log("Local", this.localselect)
        this.halles = this.localselect.halles
      }, error => console.log(error));

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
            'Suppresion Effecté!',
            'Hall Supprimé Avec Sucées.',
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
      this.service.getHallById(this.halleselect.id).subscribe(data => {
        this.halleselect = data;
        this.rayons = this.halleselect.rayons
        this.generertableayrayon(this.halleselect);
      }, error => console.log(error));
    });
  }

  //boutin edit rayon
  openDialogEditRayon(numero: any, rayon: any) {
    //ouvrir la boite dialogue DialogEditRayon 
    const dialogRef = this.dialog.open(EditRayonDialogComponent, {
      width: 'auto',
      data: { idRayon: numero, rayon: rayon }
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
            'Suppresion Effecté!',
            'Rayon Supprimé Avec Sucées.',
            'success'
          )
          this.service.getHallById(this.halleselect.id).subscribe(data => {
            this.halleselect = data;
            this.rayons = this.halleselect.rayons
            this.generertableayrayon(this.halleselect)
          }, error => console.log(error));

        })
      }
    })
  }


  //génerer la matrice du rayon pour un hall
  async generertableayrayon(halle: any) {
    var data: any
    var verif: any
    this.arr = []
    this.x = await this.service.MaxOrdreX(halle.id).toPromise();
    this.y = await this.service.MaxOrdreY(halle.id).toPromise();
    console.log("y", this.y)
    console.log("x", this.x)
    console.log("eeee", halle)
    for (let i = 0; i < this.x; i++) {
      // Creates an empty line
      this.arr.push([]);
      // Adds cols to the empty line:
      this.arr[i].push(new Array(this.y));
      for (let j = 0; j < this.y; j++) {
        data = await this.service.OrdreRayonExiste(halle.id, i + 1, j + 1).toPromise()
        if (data != null) {
          this.arr[i][j] = data;
        }
        else {
          //ordre n'exsite pas
          verif = await this.service.ZoneInvalideExiste(halle.id, i + 1, j + 1).toPromise()
          console.log(" invalide", verif)
          if (verif == true) {
            this.arr[i][j] = {};
            this.arr[i][j].id = -1;
            this.arr[i][j].etat = "Invalide";
          }
          else {
            this.arr[i][j] = {};
            this.arr[i][j].id = 0;
            this.arr[i][j].etat = "Vide";
          }
        }
      }
    }
    console.log("matrice", this.arr)
    this.showTableau = true;
  }

  SelectZoneInvalide(zone: any, i: any, j: any) {
    console.log("zone", i + 1, " ", j + 1)

    const dialogRef = this.dialog.open(OpenZoneInvalideComponent, {
      width: 'auto',
      data: { hall: this.halleselect, zone: zone, x: i + 1, y: j + 1 }
    });
    dialogRef.afterClosed().subscribe(result => {

    });
  }
  //selectionner et accedé un etage
  SelectEtage(etage: any) {
    this.etageselect = etage
    console.log(etage)
    this.libelleEtage = this.etageselect.libelle
    this.emplacements = this.etageselect.emplacments
    this.service.getEmplacementParEtageCouloir(this.couloirGauche.id, this.etageselect.id).subscribe(data => {
      this.emplacementCouloir1 = data;
    }, error => console.log(error));
    this.service.getEmplacementParEtageCouloir(this.couloirDroite.id, this.etageselect.id).subscribe(data => {
      this.emplacementCouloir2 = data;
    }, error => console.log(error));
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
            'Suppresion Effecté!',
            'Etage Supprimé Avec Sucées.',
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
        couloirGauche: this.couloirGauche

      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log("id etage seelect", this.etageselect.id)
      /*  this.service.getEtageById(this.etageselect.id).subscribe(data => {
         this.etageselect = data;
         this.emplacements = this.etageselect.emplacments
       }, error => console.log(error)); */
      this.service.getRayonById(this.rayonselect.id).subscribe(data => {
        this.rayonselect = data;
        console.log("rayon", this.rayonselect)
        this.couloirDroite = this.rayonselect.coloirDroite
        this.couloirGauche = this.rayonselect.coloirGauche
      }, error => console.log(error));
      this.service.getEmplacementParEtageCouloir(this.couloirGauche.id, this.etageselect.id).subscribe(data => {
        this.emplacementCouloir1 = data;
      }, error => console.log(error));
      this.service.getEmplacementParEtageCouloir(this.couloirDroite.id, this.etageselect.id).subscribe(data => {
        this.emplacementCouloir2 = data;
      }, error => console.log(error));
    });
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
            'Suppresion Effecté!',
            'Emplacement Supprimé Avec Sucées.',
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
    // CRÉER UNIT8ARRAY DE TAILLE MÊME QUE LA LONGUEUR DES DONNÉES DE LIGNE
    const uInt8Array = new Uint8Array(decodedData.length);
    // ININSÉRER TOUS LES CODES DE CARACTÈRES DANS UINT8ARRAY
    for (let i = 0; i < decodedData.length; ++i) {
      uInt8Array[i] = decodedData.charCodeAt(i);
    }
    //RETOURNER L'IMAGE BLOB APRÈS LA CONVERSION
    return new Blob([uInt8Array], { type: imageType });
  }

  //aller à la step precedente 
  goBack() {
    this.myStepper.previous();
  }

  //aller à la step suivante 
  goForward() {
    this.myStepper.next();
  }
  //compteuur
  counter(i: number) {
    return new Array(i);
  }
}












