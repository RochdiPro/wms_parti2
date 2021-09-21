import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { StockageService } from '../stockage.service';

@Component({
  selector: 'app-cartographie',
  templateUrl: './cartographie.component.html',
  styleUrls: ['./cartographie.component.scss']
})
export class CartographieComponent implements OnInit {
  @ViewChild('stepper') private myStepper: MatStepper;

  //declaration formGroup
  localFormGroup: FormGroup;
  rayonFormGroup: FormGroup;
  etageFormGroup: FormGroup;
  positionFormGroup: FormGroup;
  disableSelect = new FormControl(false);
  isLinear = false;

  //Declaration du tableau 
  locals: any = [];
  rayons: any = [];
  etages: any = [];
  positions: any = [];

  libelleLocal: any;
  libelleRayon: any;

  localselect: any;
  rayonselect: any


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
    const dialogRef = this.dialog.open(DialogOpenCartographie, {
      width: 'auto',
      data: { local: this.localselect }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.service.getLocalById(this.localselect.id).subscribe(data => {
        this.localselect = data;
        console.log("newww", data)
        console.log("newww2", this.localselect)
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
      this.service.getLocalById(this.localselect.id).subscribe(data => {
        this.localselect = data;
        console.log("Local", this.localselect)
        this.rayons = this.localselect.rayons
      }, error => console.log(error));

    });
  }

  //ouvrir la boite dialogue DialogAjouterRayon 
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
          this.rayons = this.localselect.rayons

        })

      }
    })
  }



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

  modifierEtage(id: any) { }

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
        })

      }
    })
  }



  openDialogAjoutEmplacment() {
    const dialogRef = this.dialog.open(DialogAjouterEmplacment, {
      width: 'auto',
      data: { rayon: this.rayonselect }
    });
    dialogRef.afterClosed().subscribe(result => {
 
    });
  }



  //aller au step precedente 
  goBack() {
    this.myStepper.previous();
  }

  //aller au step suivante 
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
  rayon: any
  Famille_Logistique: any = [];
  constructor(public dialogRef: MatDialogRef<DialogAjouterRayon>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _formBuilder: FormBuilder, private service: StockageService, private router: Router, private http: HttpClient) {

    //recuperer liste de famille logistique
    this.service.ListeFamilleLogistique().subscribe((data: any) => {
      this.Famille_Logistique = data;
    });
    console.log(data.local)
 //   this.rayon.local = data.local;

  }

  //valider l'ajout du rayon
  onSubmit() {
    console.log(this.rayon)
    this.service.ajoutRayon(this.rayon).subscribe(data => {
      console.log(data);
      Swal.fire(
        'Ajout Effecté',
        'Rayon Ajouté Avec Sucées',
        'success'
      )
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
  rayon: any
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
  etage: any 
  Sous_Famille_Logistique: any = [];
  constructor(public dialogRef: MatDialogRef<DialogAjouterEtage>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _formBuilder: FormBuilder, private service: StockageService, private router: Router, private http: HttpClient) {
    /* this.service.SouFamilleLogistiqueParFamille(this.data.rayon.familleLogistique.id).subscribe((data: any) => {
      console.log("Sous Famille", data)
      this.Sous_Famille_Logistique = data
    }); */
    //his.etage.rayon = data.rayon

  }
  onSubmit() {
 
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
    this.service.editRayon(this.dataTab.idEtage, this.etage).subscribe(data => {
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
  emplacement: any 
   constructor(public dialogRef: MatDialogRef<DialogAjouterEmplacment>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _formBuilder: FormBuilder, private service: StockageService, private router: Router, private http: HttpClient) {
    

  }
  onSubmit() {
 
  }
 
  //fermer dialogue
  close() {
    this.dialogRef.close();
  }

}

