import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, Pipe, PipeTransform, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { QRCodeComponent } from 'angularx-qrcode';
import { Console } from 'console';
import { NgxBarcodeComponent } from 'ngx-barcode';
import { Local } from 'protractor/built/driverProviders';
import Swal from 'sweetalert2';
import { Couloir } from '../../Classe/Stockage/Couloir';
import { Emplacement } from '../../Classe/Stockage/Emplacement';
import { Etage } from '../../Classe/Stockage/Etage';
import { Hall } from '../../Classe/Stockage/Hall';
import { Rayon } from '../../Classe/Stockage/Rayon';
import { Zone } from '../../Classe/Stockage/Zone';

import { StockageService } from '../stockage.service';

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

  /*ouvrir boite DialogOpenAllZoneReserve 
  pour consulter tous les zones reservé pour touts les local*/
  OpenDialogZoneReserver() {

    const dialogRef = this.dialog.open(DialogOpenAllZoneReserve, {
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
    const dialogRef = this.dialog.open(DialogOpenCartographie2, {
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
    const dialogRef = this.dialog.open(DialogInfoLocal, {
      width: 'auto',
      data: { local: local }
    });
  }

  //bouton ajout hall
  openDialogAjouterHalle() {
    //ouvrir la boite dialogue DialogAjouterHalle
    const dialogRef = this.dialog.open(DialogAjouterHalle, {
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
    const dialogRef = this.dialog.open(DialogEditHalle, {
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
    const dialogRef = this.dialog.open(DialogAjouterRayon, {
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
    const dialogRef = this.dialog.open(DialogEditRayon, {
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

    const dialogRef = this.dialog.open(DialogOpenZoneInvalideHalle, {
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
    this.goForward();
  }

  //ouvrir la boite dialogue DialogAjouterEtage
  openDialogAjoutEtage() {
    const dialogRef = this.dialog.open(DialogAjouterEtage, {
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

    const dialogRef = this.dialog.open(DialogEditEtage, {
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

    const dialogRef = this.dialog.open(DialogEditEmplacement, {
      width: 'auto',
      data: { emplacement: emp }
    });
    dialogRef.afterClosed().subscribe(result => {
    });

  }
  //ouvrir la boite dialogue DialogAjouterEmplacment
  openDialogAjoutEmplacment() {
    const dialogRef = this.dialog.open(DialogAjouterEmplacment, {
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
        console.log("rayon",this.rayonselect)
        this.couloirDroite = this.rayonselect.coloirDroite
        this.couloirGauche = this.rayonselect.coloirGauche
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

////////*******************************************dialog open cartographie **********************************************/////////
@Component({
  selector: 'open-cartographie',
  templateUrl: 'dialogue_cartographie/open-cartographie.html',
  styleUrls: ['./cartographie.component.scss']
})
export class DialogOpenCartographie {
  rayons: any = [];
  etages: any = [];
  emplacements: any = [];
  emplacmentselect: any
  libelleLocal: any
  local: any
  constructor(public dialogRef: MatDialogRef<DialogOpenCartographie>,
    @Inject(MAT_DIALOG_DATA) public data: any, private service: StockageService, private http: HttpClient) {
    this.local = data.local
    this.libelleLocal = data.local.libelle
    this.rayons = data.local.rayons

  }

  selectPosition(position: any) {
    this.emplacmentselect = position
    console.log("position:", position)
  }
  //fermer dialogue
  close() {
    this.dialogRef.close();
  }

}
///////******************************************dialog open cartographie*************************************************/////
@Component({
  selector: 'open-cartographieV2',
  templateUrl: 'dialogue_cartographie/open-cartographieV2.html',
  styleUrls: ['./cartographie.component.scss']
})
export class DialogOpenCartographie2 {
  halles: any = [];
  rayons: any = [];
  emplacmentselect: any
  libelleLocal: any
  local: any
  rayonShow: boolean = false
  hallShow: boolean = true
  x: any
  y: any
  libelleHalle: any
  hall: Hall = new Hall()
  arr: any[][] = [];
  constructor(public dialogRef: MatDialogRef<DialogOpenCartographie2>,
    @Inject(MAT_DIALOG_DATA) public data: any, private service: StockageService, private http: HttpClient) {
    this.local = data.local
    console.log(this.local)
    this.libelleLocal = this.local.nom_Local
    this.halles = data.local.halles

    console.log(this.halles)
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

  //génerer la matrice du rayon pour un hall
  generertableayrayon(halle: any) {
    this.arr = []
    console.log("eeee", halle)
    for (let i = 0; i < this.x; i++) {
      // Creates an empty line
      this.arr.push([]);
      // Adds cols to the empty line:
      this.arr[i].push(new Array(this.y));
      for (let j = 0; j < this.y; j++) {
        this.service.OrdreRayonExiste(halle.id, i + 1, j + 1).subscribe(data => {
          console.log(" eee", data)
          if (data != null) {
            this.arr[i][j] = data;
          }
          else {
            //ordre n'exsite pas
            this.service.ZoneInvalideExiste(halle.id, i + 1, j + 1).subscribe(data => {
              console.log(" eee", data)
              if (data == true) {
                this.arr[i][j] = "invalide";
              }
              else {
                this.arr[i][j] = null;
              }
            }, error => console.log(error));
          }
        }, error => console.log(error));
      }
    }
    setTimeout(() => {
      console.log("array", this.arr);
    }, 2000);

  }
  //selectionner une position
  selectPosition(position: any) {
    this.emplacmentselect = position
    console.log("position:", position)
  }
  //compteuur
  counter(i: number) {
    return new Array(i);
  }
  //fermer dialogue
  close() {
    this.dialogRef.close();
  }

}
//////**********************************dialog ajouter un halle dans un local*************************************///////
@Component({
  selector: 'ajouter-halle-dialog',
  templateUrl: 'dialogue_cartographie/ajouter-halle-dialog.html',
})
export class DialogAjouterHalle {
  dataTab: any
  hall: Hall = new Hall()
  Famille_Logistique: any = [];
  local: any
  constructor(public dialogRef: MatDialogRef<DialogAjouterHalle>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _formBuilder: FormBuilder, private service: StockageService, private router: Router, private http: HttpClient) {
    this.hall.local = data.local;
    this.local = data.local;
  }

  //valider l'ajout d' halle
  onSubmit() {
    console.log(this.hall)
    this.service.LibelleHallExiste(this.local.id_Local, this.hall.libelle).subscribe(data => {
      if (data == true) {
        Swal.fire(
          'Erreur',
          'Hall avec ce libelle deja existe',
          'error'
        )
      }
      if (data == false) {
        this.service.ajoutHall(this.hall).subscribe(data => {
          console.log(data);
          Swal.fire(
            'Ajout Effecté',
            'Halle Ajouté Avec Sucées',
            'success'
          )
          this.close()
        },
          error => console.log(error));
      }
    },
      error => console.log(error));
  }

  //fermer dialogue
  close() {
    this.dialogRef.close();
  }
}

////*************************************************dialog edit rayon*************************************************///////
@Component({
  selector: 'edit-halle-dialog',
  templateUrl: 'dialogue_cartographie/edit-halle-dialog.html',
})
export class DialogEditHalle {
  dataTab: any
  hall: Hall = new Hall()
  Famille_Logistique: any = [];
  zones_invalide: any = []
  zones_reserver: any = []
  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<DialogEditHalle>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _formBuilder: FormBuilder, private service: StockageService, private router: Router, private http: HttpClient) {
    this.dataTab = data
    this.hall = data.hall
    this.service.ListeFamilleLogistique().subscribe((data: any) => {
      this.Famille_Logistique = data;
    });

    this.service.ZoneInvalideParHall(this.hall.id).subscribe((data: any) => {
      this.zones_invalide = data;
    });
    this.service.ZoneReserveParHall(this.hall.id).subscribe((data: any) => {
      this.zones_reserver = data;
    });
  }



  OpenZoneInvalide(hall: any, id: any) {
    const dialogRef = this.dialog.open(DialogAddZoneInvalideHalle, {
      width: 'auto',
      data: { idHalle: id, hall: hall }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.service.getHallById(hall.id).subscribe(data => {
        this.hall = data;

      }, error => console.log(error));
    });
  }

  onSubmit() {
    console.log(this.dataTab.idRayon)
    this.service.editHall(this.dataTab.idHalle, this.hall).subscribe(data => {
      this.close();
    }
      , error => console.log(error));
  }
  //fermer dialogue
  close() {
    this.dialogRef.close();
  }

}
/////************************************dialog ajouter un rayon dans un local*****************************************/////
@Component({
  selector: 'ajouter-rayon-dialog',
  templateUrl: 'dialogue_cartographie/ajouter-rayon-dialog.html',
})
export class DialogAjouterRayon {
  dataTab: any
  rayon: Rayon = new Rayon()
  Famille_Logistique: any = [];
  couloirs: any = []
  couloirsGauche: any = []
  couloirsDroite: any = []
  couloirGauche: Couloir = new Couloir()
  couloirDroite: Couloir = new Couloir()
  zones: any = []
  zone: Zone = new Zone()
  addColoirShow: boolean = false
  couloir: Couloir = new Couloir()
  hall: any
  local: any
  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<DialogAjouterRayon>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _formBuilder: FormBuilder, private service: StockageService, private router: Router, private http: HttpClient) {

    //recuperer liste de famille logistique
    this.service.ListeFamilleLogistique().subscribe((data: any) => {
      this.Famille_Logistique = data;
    });
    console.log(data.local)
    this.rayon.local = data.local;
    this.rayon.hall = data.hall;
    this.hall = data.hall
    this.local = data.local
    this.actualiserListCouloirs()


  }
  addZone() {
    console.log("add zone")
 
    this.service.OrdreRayonExiste(this.rayon.local.id_Local, this.zone.ordreX, this.zone.ordreY).subscribe(data => {
      console.log("odre eee", data)
      if (data != null) {
        Swal.fire(
          'Erreur',
          'Rayon avec ce ordre déja existe',
          'error'
        )
      }
      if (data == null) {
        this.service.ZoneInvalideExiste(this.rayon.hall.id, this.zone.ordreX, this.zone.ordreY).subscribe(data => {
          console.log(data)
          if (data == true) {
            Swal.fire(
              'Erreur',
              'Cette zone est invalide',
              'error'
            )
          }
          if (data == false) {
            this.zone.etat = "Disponible"
            this.zone.hall=this.hall
            this.service.ajoutZone(this.zone).subscribe(data => {
              console.log(data);
              /* console.log("zones", this.zones)
              this.rayon.zones = this.zones */
              console.log(this.rayon)
              this.zones.push(data)

              Swal.fire(
                'Erreur',
                'Cette zone ajouté',
                'success'
              )
              this.zone=new Zone()
              this.rayon.espace=this.zones.length

            },
              error => console.log(error));


          }
        },
          error => console.log(error));
      }
    },
      error => console.log(error));


  }
//recuperer la liste des couloirs
  actualiserListCouloirs() {
    this.service.getCouloirParHall(this.hall.id).subscribe((data: any) => {
      this.couloirs = data;
    });
    this.service.CouloirRayonDroiteNull(this.hall.id).subscribe((data: any) => {
      this.couloirsGauche = data;
    });
    this.service.CouloirRayonGaucheNull(this.hall.id).subscribe((data: any) => {
      this.couloirsDroite = data;
    });
  }
//affiher formulaire ajout couloir
  addColoirToggle() {
    console.log(this.addColoirShow)
    if (this.addColoirShow == true) {
      this.addColoirShow = false
    }
    else {
      this.addColoirShow = true

    }

  }

  //valider l'ajout du couloir
  ajouterCouloir() {
    this.couloir.hall = this.hall
    console.log(this.couloir)

    this.service.libelleCouloirexiste(this.local.id_Local, this.couloir.libelle).subscribe(data => {
      if (data == true) {
        Swal.fire(
          'Erreur',
          'Couloir avec ce libelle deja existe',
          'error'
        )
      }
      if (data == false) {

        this.service.ajoutCouloir(this.couloir).subscribe(data => {
          console.log("couloir", data);
          Swal.fire(
            'Ajout Effecté',
            'Couloir Ajouté Avec Sucées',
            'success'
          )
          this.couloir.libelle = ''
          this.actualiserListCouloirs()


        },
          error => console.log(error));

      }
    },
      error => console.log(error));
  }
  //valider l'ajout du rayon
  onSubmit() {
    this.service.LibelleRayonExiste(this.rayon.local.id_Local, this.rayon.libelle).subscribe(data => {
      if (data == true) {
        Swal.fire(
          'Erreur',
          'Rayon avec ce libelle deja existe',
          'error'
        )
      }
      if (data == false) {
    
          

          this.service.ajoutRayon(this.rayon).subscribe(data => {
            console.log(data);
            this.rayon=data
            Swal.fire(
              'Ajout Effecté',
              'Rayon Ajouté Avec Sucées',
              'success'
            )
             this.close()
           /*  this.couloirDroite = this.rayon.coloirDroite
            this.couloirGauche = this.rayon.coloirGauche
            this.couloirGauche.rayonDroite = this.rayon
            this.couloirDroite.rayonGauche = this.rayon
            console.log(this.couloirGauche, this.couloirsDroite)
            this.service.editCouloir(this.couloirDroite.id, this.couloirDroite).subscribe(data => {
              console.log("couloir droite", data)
            }
              , error => console.log(error));
            this.service.editCouloir(this.couloirGauche.id, this.couloirGauche).subscribe(data => {
              console.log("couloir gauche", data)
            }
              , error => console.log(error)); */
          
          },
            error => console.log(error));    
      }
    },
      error => console.log(error));
  
  }
  //fermer dialogue
  close() {
    console.log(this.rayon)
    for (var i = 0; i < this.zones.length; i++) {
       console.log("zone[i]",this.zones[i])
      this.service.editRayonZone(this.zones[i].id, this.rayon.id).subscribe(data => {
        console.log("zone modif",data)
      }
        , error => console.log(error));

    }
    this.dialogRef.close();
  }
}

////*************************************************dialog edit rayon*********************************************////
@Component({
  selector: 'edit-rayon-dialog',
  templateUrl: 'dialogue_cartographie/edit-rayon-dialog.html',
})
export class DialogEditRayon {
  dataTab: any
  rayon: Rayon
  Famille_Logistique: any = [];
  constructor(public dialogRef: MatDialogRef<DialogEditRayon>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _formBuilder: FormBuilder, private service: StockageService, private router: Router, private http: HttpClient) {

    this.dataTab = data
    this.rayon = data.rayon

    this.service.ListeFamilleLogistique().subscribe((data: any) => {
      this.Famille_Logistique = data;
      // console.log(data)
    });


  }
  onSubmit() {
    console.log(this.dataTab.idRayon)
    this.service.editRayon(this.dataTab.idRayon, this.rayon).subscribe(data => {
      this.close();
    }
      , error => console.log(error));


  }


  //fermer dialogue
  close() {
    this.dialogRef.close();
  }

}

//////////*****************************************dialog edit rayon***********************************************////////////
@Component({
  selector: 'edit-ordre-rayon',
  templateUrl: 'dialogue_cartographie/edit-ordre-rayon.html',
})
export class DialogEditOrdreRayon {
  dataTab: any
  rayon: Rayon
  constructor(public dialogRef: MatDialogRef<DialogEditRayon>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _formBuilder: FormBuilder, private service: StockageService, private router: Router, private http: HttpClient) {

    this.dataTab = data
    this.rayon = data.rayon
  }
  onSubmit() {
    console.log(this.dataTab.idRayon)
    /*     this.service.OrdreRayonExiste(this.rayon.local.id_Local, this.rayon.ordreX, this.rayon.ordreY).subscribe(data => {
          console.log("odre eee", data)
          if (data != null) {
            Swal.fire(
              'Erreur',
              'Rayon ' + data.id + ' à deja cette ordre!',
              'error'
            )
          }
          if (data == null) {
            this.service.editRayon(this.dataTab.idRayon, this.rayon).subscribe(data => {
              this.close();
            }
              , error => console.log(error));
          }
        },
          error => console.log(error)); */
  }


  //fermer dialogue
  close() {
    this.dialogRef.close();
  }

}

//////********************************************dialog add etage**********************************************////////
@Component({
  selector: 'ajouter-etage-dialog',
  templateUrl: 'dialogue_cartographie/ajouter-etage-dialog.html',
})
export class DialogAjouterEtage {
  dataTab: any
  etage: Etage = new Etage()
  Sous_Famille_Logistique: any = [];
  constructor(public dialogRef: MatDialogRef<DialogAjouterEtage>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _formBuilder: FormBuilder, private service: StockageService, private router: Router, private http: HttpClient) {
    this.service.SouFamilleLogistiqueParFamille(this.data.rayon.familleLogistique.id).subscribe((data: any) => {
      console.log("Sous Famille", data)
      this.Sous_Famille_Logistique = data
    });
    this.etage.rayon = data.rayon

  }
  onSubmit() {
    console.log("eee", this.etage)
    this.service.LibelleEtageExiste(this.etage.rayon.id, this.etage.libelle).subscribe(data => {
      console.log("ddd", data)
      if (data == true) {
        Swal.fire(
          'Erreur',
          'Etage avec ce libelle deja existe',
          'error'
        )
      }
      if (data == false) {
        this.service.OrdreEtageExiste(this.etage.rayon.id, this.etage.ordre).subscribe(data => {
          console.log("odre eee", data)
          if (data != null) {
            Swal.fire(
              'Erreur',
              'Etage avec ce ordre déja existe',
              'error'
            )
          }
          if (data == null) {
            this.service.ajoutEtageToRayon(this.etage).subscribe(data => {
              console.log(data);
              Swal.fire(
                'Ajout Effecté',
                'Etage Ajouté Avec Sucées',
                'success'
              )
              this.close()
            },
              error => console.log(error));
          }
        },
          error => console.log(error));
      }
    },
      error => console.log(error));
  }

  //fermer dialogue
  close() {
    this.dialogRef.close();
  }

}

///////////***************************************dialog edit etage******************************************/////////////
@Component({
  selector: 'edit-Etage-dialog',
  templateUrl: 'dialogue_cartographie/edit-Etage-dialog.html',
})
export class DialogEditEtage {
  dataTab: any
  etage: any
  Sous_Famille: any = [];
  constructor(public dialogRef: MatDialogRef<DialogEditRayon>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _formBuilder: FormBuilder, private service: StockageService, private router: Router, private http: HttpClient) {

    this.dataTab = data
    this.etage = data.etage

    this.service.ListeSouFamilleLogistique().subscribe((data: any) => {
      this.Sous_Famille = data;
      // console.log(data)
    });
  }
  onSubmit() {
    console.log(this.dataTab.idEtage)
    this.service.editEtage(this.dataTab.idEtage, this.etage).subscribe(data => {
      this.close();
    }
      , error => console.log(error));
  }
  //fermer dialogue
  close() {
    this.dialogRef.close();
  }

}

///////////************************************dialog ajouter emplacment************************************************////////
@Component({
  selector: 'ajouter-emplacment-dialog',
  templateUrl: 'dialogue_cartographie/ajouter-emplacment-dialog.html',
  styleUrls: ['./cartographie.component.scss'],

})
export class DialogAjouterEmplacment {
  dataTab: any
  emplacement: Emplacement = new Emplacement()
  value: any
  couloirDroite: any
  couloirGauche: any
  emplacements: any = [];
  constructor(public dialogRef: MatDialogRef<DialogAjouterEmplacment>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _formBuilder: FormBuilder, private service: StockageService, private router: Router, private http: HttpClient) {
    this.emplacement.local = data.localselect
    this.emplacement.rayon = data.rayonselect
    this.emplacement.etage = data.etageselect
    this.emplacement.halle = data.halleselect
    this.couloirGauche = data.couloirGauche
    this.couloirDroite = data.couloirDroite
    console.log(this.emplacement)
  }

  onSubmit() {
    this.service.LastIDPos().subscribe(data => {
      this.emplacement.id = data;
      this.value = "L0" + this.emplacement.local.id_Local + "H0" + this.emplacement.halle.id + "R" + this.emplacement.rayon.libelle + "E0" + this.emplacement.etage.id + "C" + this.emplacement.couloir.id + "P0" + this.emplacement.id
      console.log("value ", this.value)
      this.emplacement.reference = this.value
      console.log(this.emplacement)
      this.service.ajoutEmplacment(this.emplacement).subscribe(data => {
        console.log("ajouuuut", data);
        Swal.fire(
          'Ajout Effecté',
          'Emplacement Ajouté Avec Sucées',
          'success'
        )
        this.close()
      },
        error => console.log(error));
    })
  }
  //fermer dialogue
  close() {
    this.dialogRef.close();
  }
}

/////**************************************/dialog modifier emplacment****************************************************//////

@Component({
  selector: 'edit-emplacement-dialog',
  templateUrl: 'dialogue_cartographie/edit-emplacement-dialog.html',
})
export class DialogEditEmplacement {
  dataTab: any
  emplacement: any
  constructor(public dialogRef: MatDialogRef<DialogEditEmplacement>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _formBuilder: FormBuilder, private service: StockageService, private router: Router, private http: HttpClient) {
    this.emplacement = data.emplacement
  }
  onSubmit() {
    console.log(this.dataTab.idRayon)
    this.service.editEmplacment(this.data.emplacement.id, this.emplacement).subscribe(data => {
      this.close();
    }
      , error => console.log(error));
  }
  //fermer dialogue
  close() {
    this.dialogRef.close();
  }

}

/*********************************************************************************************************************** */


/////****************************************dialog ajouter un rayon dans un local*******************************************/////
//
@Component({
  selector: 'add-zone_invalide_halle',
  templateUrl: 'dialogue_cartographie/add-zone_invalide_halle.html',
})
export class DialogAddZoneInvalideHalle {
  dataTab: any
  hall: Hall = new Hall()
  zone: Zone = new Zone()
  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<DialogAjouterRayon>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _formBuilder: FormBuilder, private service: StockageService, private router: Router, private http: HttpClient) {
    this.hall = data.hall;
    this.zone.hall = this.hall
    this.zone.etat = 'Invalide'
  }

  //valider l'ajout du zone invalide
  onSubmit() {
    console.log(this.zone)
    this.service.ZoneInvalideExiste(this.hall.id, this.zone.ordreX, this.zone.ordreY).subscribe(data => {
      console.log(data)
      if (data == true) {
        Swal.fire(
          'Erreur',
          'Zone Deja existe',
          'error'
        )
      }
      if (data == false) {
        this.service.ajoutZoneInvalide(this.zone).subscribe(data => {
          console.log("new zone ", data);
          Swal.fire(
            'Ajout Effecté',
            'Zone Ajouté Avec Sucées',
            'success'
          )
          this.close()
        },
          error => console.log(error));
      }
    },
      error => console.log(error));

  }

  //fermer dialogue
  close() {
    this.dialogRef.close();
  }

}

/////**********************************************dialog open zone invalides************************************************/////

@Component({
  selector: 'open-zone_invalide.html',
  templateUrl: 'dialogue_cartographie/open-zone_invalide.html',
})
export class DialogOpenZoneInvalideHalle {
  dataTab: any
  zone: Zone = new Zone()
  hall: Hall = new Hall()
  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<DialogAjouterRayon>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _formBuilder: FormBuilder, private service: StockageService, private router: Router, private http: HttpClient) {
    console.log(this.zone)
    this.hall = data.hall
    this.service.getZoneInvalideByHallX_Y(data.hall.id, data.x, data.y).subscribe(data => {
      this.zone = data
    },
      error => console.log(error));
  }

  //valider l'ajout du rayon
  onSubmit() {

  }

  //fermer dialogue
  close() {
    this.dialogRef.close();
  }

}
/////////////////////////*****************************open-Info-Local*******************************************//////////////////////// */
@Component({
  selector: 'open-Info-Local.html',
  templateUrl: 'dialogue_cartographie/open-Info-Local.html',
})
export class DialogInfoLocal {
  dataTab: any
  zones_invalide: any = []
  zones_reserver: any = []

  local: any
  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<DialogAjouterRayon>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _formBuilder: FormBuilder, private service: StockageService, private router: Router, private http: HttpClient) {
    this.local = data.local
    console.log(this.local)
    this.generer()
  }
  //generer la liste de zine reservée par local
  generer() {
    this.service.ZoneInvalideParLocal(this.local.id_Local).subscribe(data => {
      console.log(data)
      this.zones_invalide = data
    },
      error => console.log(error));
    this.service.ZoneReserveParLocal(this.local.id_Local).subscribe(data => {
      this.zones_reserver = data
    },
      error => console.log(error));
  }
  openDialogReservation(local: any) {
    const dialogRef = this.dialog.open(DialogZoneResever, {
      width: 'auto',
      data: { local: local }
    });
  }
  //fermer dialogue
  close() {
    this.dialogRef.close();
  }
}

/////////////////////////////////////////////*************DialogZoneResever*********************///////////////////////////////

@Component({
  selector: 'open-client-reserve.html',
  templateUrl: 'dialogue_cartographie/open-client-reserve.html',
})
export class DialogZoneResever {
  dataTab: any
  zones_reserver: Zone[]
  local: any
  filters = {
    keyword: ''
  }
  selectedOption: any;
  selected = '';

  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<DialogZoneResever>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _formBuilder: FormBuilder, private service: StockageService, private router: Router, private http: HttpClient) {
    this.local = data.local
    console.log(this.local)
    this.generer()
  }
  //generer la liste de zine reservée par local
  generer() {
    this.service.ZoneReserveParLocal(this.local.id_Local).subscribe(data => {
      this.zones_reserver = data
    },
      error => console.log(error));
  }
  //filtre par hall
  filterByHall(zones_reserver: Zone[]) {
    return zones_reserver.filter((b) => {
      return b.hall.libelle.toString().toLowerCase().includes(this.filters.keyword.toLowerCase());
    })
  }
  //filtre par client
  filterByClient(zones_reserver: Zone[]) {
    return zones_reserver.filter((b) => {
      return b.client.nom.toString().toLowerCase().includes(this.filters.keyword.toLowerCase());
    })
  }

  //filtrer la liste de zone 
  ListZoneFilter() {
    console.log(this.selectedOption)
    if (this.selectedOption == "client")
      this.service.ZoneReserveParLocal(this.local.id_Local).subscribe(
        data => this.zones_reserver = this.filterByClient(data)
      )
    else if (this.selectedOption == "hall")
      this.service.ZoneReserveParLocal(this.local.id_Local).subscribe(
        data => this.zones_reserver = this.filterByHall(data)
      )
  }

  //fermer dialogue
  close() {
    this.dialogRef.close();
  }

}



///////////////////////////////////////////*************DialogOpenAllZoneReserve*********************////////////////////////////// */

@Component({
  selector: 'open-zone-louee.html',
  templateUrl: 'dialogue_cartographie/open-zone-louee.html',
})
export class DialogOpenAllZoneReserve {
  dataTab: any
  zones_reserver: Zone[]
  local: any
  filters = {
    keyword: ''
  }
  selectedOption: any;
  selected = '';

  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<DialogOpenAllZoneReserve>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _formBuilder: FormBuilder, private service: StockageService, private router: Router, private http: HttpClient) {
    this.generer()
  }

  //recuperer la liste des zone reservé
  generer() {
    this.service.getAllZoneReserve().subscribe(data => {
      this.zones_reserver = data
      console.log(data)
    },
      error => console.log(error));
  }
  //filtre des zone par hall
  filterByHall(zones_reserver: Zone[]) {
    return zones_reserver.filter((b) => {
      return b.hall.libelle.toString().toLowerCase().includes(this.filters.keyword.toLowerCase());
    })
  }
  //filtre des zone par client
  filterByClient(zones_reserver: Zone[]) {
    return zones_reserver.filter((b) => {
      return b.client.nom.toString().toLowerCase().includes(this.filters.keyword.toLowerCase());
    })
  }
  //filtre des zone par local
  filterByLocal(zones_reserver: Zone[]) {
    return zones_reserver.filter((b) => {
      return b.hall.local.toString().toLowerCase().includes(this.filters.keyword.toLowerCase());
    })
  }
  //filtrer la liste de zone 
  ListZoneFilter() {
    console.log(this.filters.keyword)
    console.log(this.selectedOption)

    if (this.selectedOption == "client")
      this.service.getAllZoneReserve().subscribe(
        data => this.zones_reserver = this.filterByClient(data)
      )
    else if (this.selectedOption == "hall")

      this.service.getAllZoneReserve().subscribe(
        data => this.zones_reserver = this.filterByHall(data)
      )
    else if (this.selectedOption == "local")

      this.service.getAllZoneReserve().subscribe(
        data => this.zones_reserver = this.filterByLocal(data)
      )

  }

  //fermer dialogue
  close() {
    this.dialogRef.close();
  }

}