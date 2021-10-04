import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, Pipe, PipeTransform, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { QRCodeComponent } from 'angularx-qrcode';
import { NgxBarcodeComponent } from 'ngx-barcode';
import Swal from 'sweetalert2';
import { Emplacement } from '../../Classe/Stockage/Emplacement';
import { Etage } from '../../Classe/Stockage/Etage';
import { Halle } from '../../Classe/Stockage/Halle';
import { Rayon } from '../../Classe/Stockage/Rayon';
import { ZoneInvalideHall } from '../../Classe/Stockage/ZoneInvalideHall';
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

  //declaration du libelle d'objet(local/hall/rayon/etage/emplacement) selectinné
  libelleLocal: any;
  libelleRayon: any;
  libelleHalle: any;
  libelleEtage: any;
  libelleEmplacement: any;

  x: number
  y: number
  arr: any[][]=[];

  constructor(public dialog: MatDialog, private _formBuilder: FormBuilder, private service: StockageService, private router: Router, private http: HttpClient, private sanitizer: DomSanitizer) {
    for (let i=0 ; i < 2; i++) {
      // Creates an empty line
      this.arr.push([]);
      // Adds cols to the empty line:
      this.arr[i].push(new Array(this.y));
      for ( let j =0 ; j < 2; j++) {
            this.arr[i][j] = "";
      }
   
      }
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

  //selectionner un halle 
  SelectHalle(halle: any) {
    this.halleselect = halle
    this.libelleHalle = this.halleselect.libelle
    this.rayons = this.halleselect.rayons
    this.service.MaxOrdreX(this.halleselect.id).subscribe(data => {
      this.x = 3;
      this.service.MaxOrdreY(this.halleselect.id).subscribe(data => {
        this.y = 2;
        console.log("y", this.y)
        console.log("x", this.x)
        this.generertableayrayon()
      }, error => console.log(error));
    }, error => console.log(error));
    this.goForward();
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
  openDialogEditHalle(numero: any, halle: any) {
    //ouvrir la boite dialogue DialogEditRayon 
    const dialogRef = this.dialog.open(DialogEditHalle, {
      width: 'auto',
      data: { idHalle: numero, halle: halle }
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
          this.service.getLocalById(this.localselect.id_Local).subscribe(data => {
            this.localselect = data;
            this.rayons = this.localselect.rayons
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
    this.goForward();
  }

  //bouton ajouter rayon
  openDialogAjouterRayon() {
    //ouvrir la boite dialogue DialogAjouterRayon 
    const dialogRef = this.dialog.open(DialogAjouterRayon, {
      width: 'auto',
      data: { local: this.localselect, halle: this.halleselect }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.service.getHalleById(this.halleselect.id).subscribe(data => {
        this.halleselect = data;
        this.libelleHalle = this.halleselect.libelle
        console.log("Local", this.localselect)
        this.rayons = this.halleselect.rayons
   
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
          this.service.getLocalById(this.localselect.id_Local).subscribe(data => {
            this.localselect = data;
            this.rayons = this.localselect.rayons
          }, error => console.log(error));

        })
      }
    })
  }

  generertableayrayon() {
    this.arr=[]
        for (let i=0 ; i <3; i++) {
          // Creates an empty line
          this.arr.push([]);
          // Adds cols to the empty line:
          this.arr[i].push(new Array(this.y));
          for ( let j =0 ; j < 3; j++) {
            this.service.OrdreRayonExiste(1, i+1,j+1).subscribe(data => {
              console.log(" eee", data)
              if (data != null) {
                this.arr[i][j] = data;
              }
              else
               {
                 //ordre n'exsite pas
                this.service.ZonneExiste(1, i+1,j+1).subscribe(data => {
                  console.log(" eee", data)
                  if (data ==true) {
                    this.arr[i][j] = "invalide";
                  } 
                  else
                   {
                    this.arr[i][j] = null;
                   }
                } , error => console.log(error));



               }
            } , error => console.log(error));
        
          }
       
          }
          setTimeout(() => {
            console.log("array", this.arr);
          }, 2000);
        
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
    // = this.emplacmentselect
    console.log(emp)
    this.libelleEmplacement = this.emplacmentselect.libelle
    this.value = "L0" + this.localselect.id_Local + "H0" + this.halleselect.id + "R" + this.rayonselect.libelle + "E0" + this.etageselect.id + "P0" + this.emplacmentselect.id
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
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log("id etage seelect", this.etageselect.id)
      this.service.getEtageById(this.etageselect.id).subscribe(data => {
        this.etageselect = data;
        this.emplacements = this.etageselect.emplacments
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

////////****************************************************************************************************************/////////

//dialog open cartographie 
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
///////*********************************************************************************************************************/////
//dialog open cartographie 
@Component({
  selector: 'open-cartographieV2',
  templateUrl: 'dialogue_cartographie/open-cartographieV2.html',
  styleUrls: ['./cartographie.component.scss']
})
export class DialogOpenCartographie2 {
  rayons: any = [];
  etages: any = [];
  positions: any = [];
  emplacmentselect: any
  libelleLocal: any
  local: any
  constructor(public dialogRef: MatDialogRef<DialogOpenCartographie2>,
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
/////////////****************************************************************************************************/////////////

//dialog ajouter un halle dans un local
@Component({
  selector: 'ajouter-halle-dialog',
  templateUrl: 'dialogue_cartographie/ajouter-halle-dialog.html',
})
export class DialogAjouterHalle {
  dataTab: any
  halle: Halle = new Halle()
  Famille_Logistique: any = [];
  local: any
  constructor(public dialogRef: MatDialogRef<DialogAjouterHalle>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _formBuilder: FormBuilder, private service: StockageService, private router: Router, private http: HttpClient) {
    this.halle.local = data.local;
    this.local = data.local;
  }

  //valider l'ajout d' halle
  onSubmit() {
    console.log(this.halle)
    this.service.LibelleHalleExiste(this.local.id_Local, this.halle.libelle).subscribe(data => {
      if (data == true) {
        Swal.fire(
          'Erreur',
          'Halle avec ce libelle deja existe',
          'error'
        )
      }
      if (data == false) {
        this.service.ajoutHalle(this.halle).subscribe(data => {
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

////**********************************************************************************************************************///////

//dialog edit rayon
@Component({
  selector: 'edit-halle-dialog',
  templateUrl: 'dialogue_cartographie/edit-halle-dialog.html',
})
export class DialogEditHalle {
  dataTab: any
  halle: Halle
  Famille_Logistique: any = [];
  constructor(public dialog: MatDialog,public dialogRef: MatDialogRef<DialogEditHalle>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _formBuilder: FormBuilder, private service: StockageService, private router: Router, private http: HttpClient) {
    this.dataTab = data
    this.halle = data.halle
    this.service.ListeFamilleLogistique().subscribe((data: any) => {
      this.Famille_Logistique = data;
    });
  }
  OpenZoneInvalide(halle:any,id:any)
  {
    const dialogRef = this.dialog.open(DialogAddZoneInvalideHalle, {
      width: 'auto',
      data: { idHalle: id, halle: halle }
    });
    dialogRef.afterClosed().subscribe(result => {

    });


  }
  onSubmit() {
    console.log(this.dataTab.idRayon)
    this.service.editHalle(this.dataTab.idHalle, this.halle).subscribe(data => {
      this.close();
    }
      , error => console.log(error));
  }
  //fermer dialogue
  close() {
    this.dialogRef.close();
  }

}
/////**********************************************************************************************************************/////
//dialog ajouter un rayon dans un local
@Component({
  selector: 'ajouter-rayon-dialog',
  templateUrl: 'dialogue_cartographie/ajouter-rayon-dialog.html',
})
export class DialogAjouterRayon {
  dataTab: any
  rayon: Rayon = new Rayon()
  Famille_Logistique: any = [];
  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<DialogAjouterRayon>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _formBuilder: FormBuilder, private service: StockageService, private router: Router, private http: HttpClient) {

    //recuperer liste de famille logistique
    this.service.ListeFamilleLogistique().subscribe((data: any) => {
      this.Famille_Logistique = data;
    });
    console.log(data.local)
    this.rayon.local = data.local;
    this.rayon.halle = data.halle;

  }

  //valider l'ajout du rayon
  onSubmit() {
    console.log(this.rayon)
    this.service.LibelleRayonExiste(this.rayon.local.id_Local, this.rayon.libelle).subscribe(data => {
      if (data == true) {
        Swal.fire(
          'Erreur',
          'Rayon avec ce libelle deja existe',
          'error'
        )
      }
      if (data == false) {
        this.service.OrdreRayonExiste(this.rayon.local.id_Local, this.rayon.ordreX, this.rayon.ordreY).subscribe(data => {
          console.log("odre eee", data)
          if (data != null) {
            const swalWithBootstrapButtons = Swal.mixin({
              customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
              },
              buttonsStyling: false
            })

            swalWithBootstrapButtons.fire({
              title: 'Rayon avec ce ordre déja existe ',
              text: "Vous voulez modifer l'odre cette rayon !",
              icon: 'error',
              showCancelButton: true,
              confirmButtonText: 'Oui',
              cancelButtonText: 'Non, Annuler',
              reverseButtons: true
            }).then((result) => {
              if (result.isConfirmed) {
                //modifer ordre rayon
                const dialogRef = this.dialog.open(DialogEditOrdreRayon, {
                  width: 'auto',
                  data: { idRayon: data.id, rayon: data }
                });
                dialogRef.afterClosed().subscribe(result => {

                });

              }
            })

          }
          if (data == null) {

            this.service.ajoutRayon(this.rayon).subscribe(data => {
              console.log(data);
              Swal.fire(
                'Ajout Effecté',
                'Rayon Ajouté Avec Sucées',
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

////************************************************************************************************************************////

//dialog edit rayon
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

//////////***********************************************************************************************************////////////



//dialog edit rayon
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
    this.service.OrdreRayonExiste(this.rayon.local.id_Local, this.rayon.ordreX, this.rayon.ordreY).subscribe(data => {
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
      error => console.log(error));
  }


  //fermer dialogue
  close() {
    this.dialogRef.close();
  }

}

//////******************************************************************************************************************////////
//dialog add etage
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

///////////********************************************************************************************************/////////////

//dialog edit etage
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

///////////**************************************************************************************************//////////////////

//dialog ajouter emplacment
@Component({
  selector: 'ajouter-emplacment-dialog',
  templateUrl: 'dialogue_cartographie/ajouter-emplacment-dialog.html',
})
export class DialogAjouterEmplacment {
  dataTab: any
  emplacement: Emplacement = new Emplacement()
  value: any
  emplacements: any = [];
  constructor(public dialogRef: MatDialogRef<DialogAjouterEmplacment>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _formBuilder: FormBuilder, private service: StockageService, private router: Router, private http: HttpClient) {
    this.emplacement.local = data.localselect
    this.emplacement.rayon = data.rayonselect
    this.emplacement.etage = data.etageselect
    this.emplacement.halle = data.halleselect
    console.log(this.emplacement)
  }

  onSubmit() {
    this.service.LastIDPos().subscribe(data => {
      this.emplacement.id = data;
      this.value = "L0" + this.emplacement.local.id_Local + "H0" + this.emplacement.halle.id + "R" + this.emplacement.rayon.libelle + "E0" + this.emplacement.etage.id + "P0" + this.emplacement.id
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

/////********************************************************************************************************************//////
//dialog modifier emplacment
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


/////**********************************************************************************************************************/////
//dialog ajouter un rayon dans un local
@Component({
  selector: 'add-zone_invalide_halle',
  templateUrl: 'dialogue_cartographie/add-zone_invalide_halle.html',
})
export class DialogAddZoneInvalideHalle {
  dataTab: any
  halle: Halle = new Halle()
  zone:ZoneInvalideHall=new ZoneInvalideHall()
   constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<DialogAjouterRayon>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _formBuilder: FormBuilder, private service: StockageService, private router: Router, private http: HttpClient) {
    this.halle = data.halle;
       this.zone.halle=this.halle
  }

  //valider l'ajout du rayon
  onSubmit() {
    console.log(this.zone)
    this.service.ZonneExiste(this.halle.id, this.zone.ordreX, this.zone.ordreY).subscribe(data => {
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
          console.log("new zone ",data);
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
