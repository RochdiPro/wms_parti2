import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { QRCodeComponent } from 'angularx-qrcode';
import { NgxBarcodeComponent } from 'ngx-barcode';
import Swal from 'sweetalert2';
import { Etage } from '../../Classe/Stockage/Etage';
import { Position } from '../../Classe/Stockage/Position';
import { Rayon } from '../../Classe/Stockage/Rayon';
import { StockageService } from '../stockage.service';

@Component({
  selector: 'app-cartographie',
  templateUrl: './cartographie.component.html',
  styleUrls: ['./cartographie.component.scss']
})
export class CartographieComponent implements OnInit {

  @ViewChild('stepper') private myStepper: MatStepper;
  @ViewChild("qrcode", { static: true }) qrcode: QRCodeComponent
  @ViewChild(NgxBarcodeComponent) barcode: NgxBarcodeComponent

  //declaration formGroup
  localFormGroup: FormGroup;
  rayonFormGroup: FormGroup;
  etageFormGroup: FormGroup;
  positionFormGroup: FormGroup;
  disableSelect = new FormControl(false);

  isLinear = false;

  //definition de la code a bare 
  elementType: any = "img";
  value = 'L0 R0 E0 X0 Y0';
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


  //Declaration du tableau 
  locals: any = [];
  rayons: any = [];
  etages: any = [];
  positions: any = [];

  libelleLocal: any;
  libelleRayon: any;
  libelleEtage: any;
  libellePosition: any;

  localselect: any;
  rayonselect: any
  etageselect: any
  positionselect: any
  constructor(public dialog: MatDialog, private _formBuilder: FormBuilder, private service: StockageService, private router: Router, private http: HttpClient, private sanitizer: DomSanitizer) {

  }
  ngOnInit() {

    this.ListLocals();

    this.localFormGroup = this._formBuilder.group({
      localFormGroup: ['', Validators.required]
    });
    this.rayonFormGroup = this._formBuilder.group({
      rayonFormGroup: ['', Validators.required],
      rayon: ['', Validators.required],
    });
    this.etageFormGroup = this._formBuilder.group({
      etageFormGroup: ['', Validators.required],
      etage: ['', Validators.required],
    });
    this.positionFormGroup = this._formBuilder.group({
      positionFormGroup: ['', Validators.required],
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
    this.libelleLocal = this.localselect.libelle
    this.rayons = this.localselect.rayons

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

  //selectionner un rayon 
  SelectRayon(rayon: any) {
    this.rayonselect = rayon
    this.libelleRayon = this.rayonselect.libelle
    this.etages = this.rayonselect.etages
    this.goForward();
  }

  //ouvrir la boite dialogue DialogAjouterRayon 
  openDialogAjouterRayon() {
    const dialogRef = this.dialog.open(DialogAjouterRayon, {
      width: 'auto',
      data: { local: this.localselect }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log("ddddddd", this.localselect.id_Local)
      this.service.getLocalById(this.localselect.id_Local).subscribe(data => {
        this.localselect = data;
        console.log("Local", this.localselect)
        this.rayons = this.localselect.rayons
      }, error => console.log(error));

    });
  }

  //ouvrir la boite dialogue DialogEditRayon 
  openDialogEditRayon(numero: any, rayon: any) {

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

  //selectionner et accedé un etage
  SelectEtage(etage: any) {
    this.etageselect = etage
    console.log(etage)
    this.libelleEtage = this.etageselect.libelle
    this.positions = this.etageselect.positions
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
  selectPosition(position: any) {
    this.positionselect = position
    // = this.positionselect
    console.log(position)
    this.libellePosition = this.positionselect.libelle
    this.value = "L0" + this.localselect.id + "R" + this.rayonselect.libelle + "E0" + this.etageselect.id + "P0" + this.positionselect.id
    console.log("value ", this.value)
    this.goForward();
  }
  //ouvrir la boite dialogue DialogEditEmplacement
  openDialoEditEmplacment(position: any) {

    const dialogRef = this.dialog.open(DialogEditEmplacement, {
      width: 'auto',
      data: { emplacement: position }
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
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log("id etage seelect", this.etageselect.id)
      this.service.getEtageById(this.etageselect.id).subscribe(data => {
        this.etageselect = data;
        this.positions = this.etageselect.positions
      }, error => console.log(error));
    });

  }



  //supprimer un emplacement
  supprimerPosition(id: number) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Tu est sure?',
      text: "Vous voulez vraiment supprimer cette position!!!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, Supprimer!',
      cancelButtonText: 'Non, Annuler!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.supprimerEtage(id).subscribe(data => {
          console.log(data);
          //        this.ListePosition(this.etageselect.id);
          swalWithBootstrapButtons.fire(
            'Suppresion Effecté!',
            'Position Supprimé Avec Sucées.',
            'success'
          )
        })

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
}

/////////////////

//dialog open cartographie 
@Component({
  selector: 'open-cartographie',
  templateUrl: 'dialogue_cartographie/open-cartographie.html',
  styleUrls: ['./cartographie.component.scss']
})
export class DialogOpenCartographie {
  rayons: any = [];
  etages: any = [];
  positions: any = [];
  positionselect: any
  libelleLocal: any
  local: any
  constructor(public dialogRef: MatDialogRef<DialogOpenCartographie>,
    @Inject(MAT_DIALOG_DATA) public data: any, private service: StockageService, private http: HttpClient) {
    this.local = data.local
    this.libelleLocal = data.local.libelle
    this.rayons = data.local.rayons

  }

  selectPosition(position: any) {
    this.positionselect = position
    console.log("position:", position)
  }
  //fermer dialogue
  close() {
    this.dialogRef.close();
  }

}

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
  positionselect: any
  libelleLocal: any
  local: any
  constructor(public dialogRef: MatDialogRef<DialogOpenCartographie2>,
    @Inject(MAT_DIALOG_DATA) public data: any, private service: StockageService, private http: HttpClient) {
    this.local = data.local
    this.libelleLocal = data.local.libelle
    this.rayons = data.local.rayons

  }

  selectPosition(position: any) {
    this.positionselect = position
    console.log("position:", position)
  }
  //fermer dialogue
  close() {
    this.dialogRef.close();
  }

}

//////////////////////////

//dialog ajouter un rayon dans un local
@Component({
  selector: 'ajouter-rayon-dialog',
  templateUrl: 'dialogue_cartographie/ajouter-rayon-dialog.html',
})
export class DialogAjouterRayon {
  dataTab: any
  rayon: Rayon = new Rayon()
  Famille_Logistique: any = [];
  constructor(public dialogRef: MatDialogRef<DialogAjouterRayon>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _formBuilder: FormBuilder, private service: StockageService, private router: Router, private http: HttpClient) {

    //recuperer liste de famille logistique
    this.service.ListeFamilleLogistique().subscribe((data: any) => {
      this.Famille_Logistique = data;
    });
    console.log(data.local)
    this.rayon.local = data.local;

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

  //fermer dialogue
  close() {
    this.dialogRef.close();
  }

}



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

//////////////////////

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
    console.log("eee",this.etage)
    this.service.LibelleEtageExiste(this.etage.rayon.id, this.etage.libelle).subscribe(data => {
      console.log("ddd",data)
      if (data == true) {
        Swal.fire(
          'Erreur',
          'Etage avec ce libelle deja existe',
          'error'
        )
      }
      if (data == false) {
        
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

  //fermer dialogue
  close() {
    this.dialogRef.close();
  }

}


////////////////////////


//dialog edit rayon
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


/////////////////////////////

//dialog ajouter emplacment
@Component({
  selector: 'ajouter-emplacment-dialog',
  templateUrl: 'dialogue_cartographie/ajouter-emplacment-dialog.html',
})
export class DialogAjouterEmplacment {
  dataTab: any
  emplacement: Position = new Position()
  value: any
  positions: any = [];


  constructor(public dialogRef: MatDialogRef<DialogAjouterEmplacment>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _formBuilder: FormBuilder, private service: StockageService, private router: Router, private http: HttpClient) {
    this.emplacement.local = data.localselect
    this.emplacement.rayon = data.rayonselect
    this.emplacement.etage = data.etageselect
    console.log(this.emplacement)
  }
  onSubmit() {
    this.service.LastIDPos().subscribe(data => {
      this.emplacement.id = data;
      this.value = "L0" + this.emplacement.local.id + "R" + this.emplacement.rayon.libelle + "E0" + this.emplacement.etage.id + "P0" + this.emplacement.id
      console.log("value ", this.value)
      this.emplacement.reference = data.value
      console.log(this.emplacement)
      this.service.ajoutPosition(this.emplacement).subscribe(data => {
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

///////////
//dialog modifier emplacment
@Component({
  selector: 'edit-rayon-emplacement',
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
    this.service.editPosition(this.data.emplacement.id, this.emplacement).subscribe(data => {
      this.close();
    }
      , error => console.log(error));


  }

  //fermer dialogue
  close() {
    this.dialogRef.close();
  }

}



