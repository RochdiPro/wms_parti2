import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Hall } from 'src/app/WMS/Classe/Stockage/Hall';
import Swal from 'sweetalert2';
import { StockageService } from '../../services/stockage.service';
import { Etage } from 'src/app/WMS/Classe/Stockage/Etage';
import { Emplacement } from 'src/app/WMS/Classe/Stockage/Emplacement';
import { Fiche_Local } from 'src/app/WMS/Classe/Stockage/Fiche_Local';
import { Couloir } from 'src/app/WMS/Classe/Stockage/Couloir';
import { Rayon } from 'src/app/WMS/Classe/Stockage/Rayon';
import { Client } from 'src/app/WMS/Classe/Stockage/Client';
import { ZoneRayon } from 'src/app/WMS/Classe/Stockage/ZoneRayon';
import { ZoneHall } from 'src/app/WMS/Classe/Stockage/ZoneHall';
 @Component({
  selector: 'app-dialogue-cartographie',
  templateUrl: './dialogue-cartographie.component.html',
  styleUrls: ['./dialogue-cartographie.component.scss']
})
export class DialogueCartographieComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

@Component({
  selector: 'app-ajouter-local-dialog',
  templateUrl: './ajouter-local-dialog.component.html',
})
export class AjouterLocalDialogComponent implements OnInit {


  ngOnInit(): void {
  }


  dataTab: any
  local: Fiche_Local = new Fiche_Local()

  constructor(public dialogRef: MatDialogRef<AjouterLocalDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _formBuilder: FormBuilder, private service: StockageService, private router: Router, private http: HttpClient) {
  }

  //valider l'ajout d' halle
  onSubmit() {
    /*  var formData: any = new FormData();
     var datestr = (new Date(formData)).toUTCString();
     formData.append('Nom_Local', this.local.Nom_Local);
     formData.append('Categorie_Local', this.local.Categorie_Local);
     formData.append('Description_Local', this.local.Description_Local);
     formData.append('Largeur',  this.local.Largeur);
     formData.append('Hauteur', this.local.Hauteur);
     formData.append('Profondeur', this.local.Profondeur);
     formData.append('Adresse', this.local.Adresse);
     formData.append('Tel', this.local.Tel);
     formData.append('Fax', this.local.Fax);
     formData.append('Responsable',  this.local.Responsable);
      formData.append('Email',  this.local.Email);
     formData.append('Nature_Contrat',  this.local.Nature_Contrat);
     formData.append('Date_Fin', datestr);
     formData.append('Date_Debut', datestr);
     formData.append('Frais',  this.local.Frais);
     formData.append('Nature_Frais', this.local.Nature_Frais);
     formData.append('Latitude',  this.local.Latitude);
     formData.append('Longitude',  this.local.Longitude);
     formData.append('Surface',  this.local.Surface);
     formData.append('Detail_Type', ""); */
    this.service.Ajout_local(this.local).subscribe(data => {
      console.log(data);
      Swal.fire(
        'Ajout Effecté',
        'Local Ajouté Avec Sucées',
        'success'
      )
      this.close()
    },
      error => console.log(error));

  }

  //fermer dialogue
  close() {
    this.dialogRef.close();
  }
}


@Component({
  selector: 'app-open-info-local',
  templateUrl: './open-info-local.component.html',
})
export class OpenInfoLocalComponent implements OnInit {

  /////////////////////////*****************************open-Info-Local*******************************************//////////////////////// */

  dataTab: any
  zones_invalide: any = []
  emp_reserver: any = []

  local: any
  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<OpenInfoLocalComponent>,
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
    this.service.EmplacmentsReserveParLocal(this.local.id_Local).subscribe(data => {
      this.emp_reserver = data
    },
      error => console.log(error));
  }
  openDialogReservation(local: any) {
    const dialogRef = this.dialog.open(OpenClientReserveComponent, {
      width: 'auto',
      data: { local: local }
    });
  }
  //fermer dialogue
  close() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}


@Component({
  selector: 'app-ajouter-rayon-dialog',
  templateUrl: './ajouter-rayon-dialog.component.html',
})
export class AjouterRayonDialogComponent implements OnInit {

  dataTab: any
  rayon: Rayon = new Rayon()
  Famille_Logistique: any = [];
  couloirs: any = []
  couloirsGauche: any = []
  couloirsDroite: any = []

  couloirGauche: Couloir = new Couloir()
  couloirDroite: Couloir = new Couloir()

  zones: ZoneRayon[] = []
  zonesNew: ZoneRayon[] = []
  zone: ZoneRayon = new ZoneRayon()
  addColoirShow: boolean = false
  couloir: Couloir = new Couloir()
  manuel = false
  murGauche = false
  selectColoirGauche = true
  selectColoirDroite = true
  hall: any
  local: any
  disableGauche = false
  disableDroit = false
  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<AjouterRayonDialogComponent>,
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

  //ajout zone
  addZone() {
    this.service.OrdreRayonExiste(this.rayon.hall.id, this.zone.ordreX, this.zone.ordreY).subscribe(data => {
      console.log("odre existe", data)
      if (data != null) {
        Swal.fire(
          'Erreur',
          'Rayon avec ce ordre déja existe',
          'error'
        )
      }
      if (data == null) {
        this.service.ZoneInvalideHallExiste(this.rayon.hall.id, this.zone.ordreX, this.zone.ordreY).subscribe(data => {
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
            this.zone.hall = this.hall
            this.zones.push(this.zone)
            console.log("zones", this.zones)
            Swal.fire(
              'Success',
              'Cette zone ajouté',
              'success'
            )
            if (this.zone.ordreY == 1) {
              console.log("couloir gauche mur")
              this.service.getCouloirByLibelle(this.local.id_Local, "M1").subscribe(data => {
                console.log("Mur gauche", data);
                this.couloirGauche = data
                this.rayon.coloirGauche = data
                this.disableGauche = true
                this.selectColoirGauche = false
              },
                error => console.log(error));
            }
            if (this.zone.ordreX == 1) {

            }
            if (this.zone.ordreY != 1) {


              this.service.CouloirByZone(this.rayon.hall.id, this.zone.ordreX, this.zone.ordreY + 1).subscribe(data => {
                console.log("Couloir Droite", data);
                if (data != null) {
                  this.rayon.coloirDroite = data
                  this.disableDroit = true
                  this.selectColoirDroite = false
                }
              },
                error => console.log(error));
              this.service.CouloirByZone(this.rayon.hall.id, this.zone.ordreX, this.zone.ordreY - 1).subscribe(data => {
                console.log("Couloir Gauche", data);
                if (data != null) {
                  this.rayon.coloirGauche = data
                  this.disableGauche = true
                  this.selectColoirGauche = false
                }
              },
                error => console.log(error));
            }
            this.zone = new ZoneRayon()
            this.rayon.espace = this.zones.length
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
  async onSubmit() {
    console.log("liste zone", this.zones)
    for (var i = 0; i < this.zones.length; i++) {
      console.log(this.zones[i])
      var data = await this.service.ajoutZoneRayon(this.zones[i]).toPromise();
      console.log(data, "  ", i)
      this.zonesNew.push(data)
    }

    this.service.LibelleRayonExiste(this.rayon.local.id_Local, this.rayon.libelle).subscribe(data => {
      if (data == true) {
        Swal.fire(
          'Erreur',
          'Rayon avec ce libelle deja existe',
          'error'
        )
      }
      if (data == false) {
        if ((this.rayon.hauteur >= this.hall.hauteur) || (this.rayon.largeur >= this.hall.largeur) || (this.rayon.longeur >= this.hall.longeur)) {
          Swal.fire(
            'Erreur',
            'Verifer les dimension saisies',
            'error'
          )
        }
        else {
          this.service.ajoutRayon(this.rayon).subscribe(data => {
            console.log("rayon", data);
            this.rayon = data
            this.couloirDroite = this.rayon.coloirDroite
            this.couloirGauche = this.rayon.coloirGauche

            this.couloirGauche.rayonDroite = this.rayon
            this.couloirDroite.rayonGauche = this.rayon


            this.service.editCouloirRayon(this.couloirGauche.id, this.couloirDroite.id,
              this.rayon.id).subscribe(data => {
                console.log("edit couloir rayon ", data)
              }
                , error => console.log(error));

            Swal.fire(
              'Ajout Effecté',
              'Rayon Ajouté Avec Sucées',
              'success'
            )
            this.close()


          },
            error => console.log(error));
        }
      }
    },
      error => console.log(error));

  }
  //fermer dialogue
  close() {
    console.log(this.rayon)
    for (var i = 0; i < this.zonesNew.length; i++) {
      console.log("zone[i]", this.zonesNew[i])
      this.service.editRayonZone(this.zonesNew[i].id, this.rayon.id).subscribe(data => {
        console.log("zone modif", data)
      }
        , error => console.log(error));

    }


    this.dialogRef.close();
  }



  changedToggle() {
    if (this.manuel == true) {
      console.log("manuel")
    }
  }

  //changer valeur l'une des dimension (longeur/largeur/hauteur)
  valuechange(newValue: any) {
    console.log(newValue)
    //surface= hauteur* largeur* longeur
    this.rayon.surface = this.rayon.hauteur * this.rayon.longeur * this.rayon.hauteur


  }
  ngOnInit(): void {
  }

}

@Component({
  selector: 'app-edit-rayon-dialog',
  templateUrl: './edit-rayon-dialog.component.html',
})
export class EditRayonDialogComponent implements OnInit {

  ////*************************************************dialog edit rayon*********************************************////

  dataTab: any
  rayon: Rayon
  Famille_Logistique: any = [];
  hall: any
  local: any

  couloirs: any = []
  couloirsGauche: any = []
  couloirsDroite: any = []
  couloirGauche: Couloir = new Couloir()
  couloirDroite: Couloir = new Couloir()
  zones: any = []
  zone: ZoneRayon = new ZoneRayon()
  addColoirShow: boolean = false
  couloir: Couloir = new Couloir()
  manuel = false

  constructor(public dialogRef: MatDialogRef<EditRayonDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _formBuilder: FormBuilder, private service: StockageService, private router: Router, private http: HttpClient) {

    this.dataTab = data
    this.rayon = data.rayon
    this.hall = data.hall
    this.service.ListeFamilleLogistique().subscribe((data: any) => {
      this.Famille_Logistique = data;
      // console.log(data)
    });


  }
  retirerZone(zone: any) {
    console.log(zone)
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
        this.service.ZoneInvalideHallExiste(this.rayon.hall.id, this.zone.ordreX, this.zone.ordreY).subscribe(data => {
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
            this.zone.hall = this.hall
            this.service.ajoutZoneRayon(this.zone).subscribe(data => {
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
              this.zone = new ZoneRayon()
              this.rayon.espace = this.zones.length

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
  ngOnInit(): void {
  }
  changedToggle() {
    if (this.manuel == true) {
      console.log("manuel")
    }
  }
  valuechange(newValue: any) {
    console.log(newValue)
    //surface= hauteur* largeur* longeur
    this.rayon.surface = this.rayon.hauteur * this.rayon.longeur * this.rayon.hauteur


  }

}

@Component({
  selector: 'app-edit-ordre-rayon',
  templateUrl: './edit-ordre-rayon.component.html',
})
export class EditOrdreRayonComponent implements OnInit {


  //////////*****************************************dialog edit rayon***********************************************////////////

  dataTab: any
  rayon: Rayon
  constructor(public dialogRef: MatDialogRef<EditOrdreRayonComponent>,
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


  ngOnInit(): void {
  }

}


@Component({
  selector: 'app-ajouter-halle-dialog',
  templateUrl: './ajouter-halle-dialog.component.html',
})
export class AjouterHalleDialogComponent implements OnInit {
  ngOnInit(): void {
  }
  hall: Hall = new Hall()
  Famille_Logistique: any = [];
  local: any
  manuel = false
  zones: ZoneHall[] = []
  zonesNew: ZoneHall[] = []
  zone: ZoneHall = new ZoneHall()

  constructor(public dialogRef: MatDialogRef<AjouterHalleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _formBuilder: FormBuilder, private service: StockageService, private router: Router, private http: HttpClient) {
    this.hall.local = data.local;
    this.local = data.local;
  }

  //valider l'ajout d' halle
  async onSubmit() {
    console.log("liste zone", this.zones)
    console.log(this.zones.length)
    for (var i = 0; i < this.zones.length; i++) {
      console.log(this.zones[i])
       var data = await this.service.ajoutZoneHall(this.zones[i]).toPromise();
      console.log(data, "Zone[", i)
      this.zonesNew.push(data)
 
    }
 
    this.service.LibelleHallExiste(this.local.id_Local, this.hall.libelle).subscribe(data => {
      if (data == true) {
        Swal.fire(
          'Erreur',
          'Hall avec ce libelle deja existe',
          'error'
        )
      }
      if (data == false) {
        if ((this.hall.hauteur >= this.local.hauteur) || (this.hall.largeur >= this.local.largeur) || (this.hall.longeur >= this.local.longeur)) {
          Swal.fire(
            'Erreur',
            'Verifer les dimension saisies',
            'error'
          )
        }
        else {
          this.service.ajoutHall(this.hall).subscribe(data => {
            console.log("new hall", data);
            this.hall = data
            Swal.fire(
              'Ajout Effecté',
              'Halle Ajouté Avec Sucées',
              'success'
            )
            this.close()

          },
            error => console.log(error));
        }
      }
    },
      error => console.log(error));
  }
  changedToggle() {
    console.log("change")
    this.manuel = !this.manuel
  }
  valuechange(newValue: any) {
    //surface= hauteur* largeur* longeur
    this.hall.surface = this.hall.hauteur * this.hall.longeur * this.hall.hauteur
  }

  addZone() {
    console.log(this.hall)
    this.service.OrdreHallExiste(this.hall.local.id_Local, this.zone.ordreX, this.zone.ordreY).subscribe(data => {
      console.log("odre existe", data)
      if (data != null) {
        Swal.fire(
          'Erreur',
          'Hall avec ce ordre déja existe',
          'error'
        )
      }
      if (data == null) {
        this.service.ZoneInvalideLocalExiste(this.hall.local.id_Local, this.zone.ordreX, this.zone.ordreY).subscribe(data => {
          console.log(data)
          if (data == true) {
            Swal.fire(
              'Erreur',
              'Cette zone est invalide',
              'error'
            )
          }
          if (data == false) {
            if( this.zones.length==0)
            this.zone.pos=1
          if( this.zones.length>0)
            this.zone.pos=this.zones.length+1
        

            this.zone.etat = "Hall"
         


            this.zones.push(this.zone)
            
        
            console.log("zones", this.zones)
            Swal.fire(
              'Success',
              'Cette zone ajouté',
              'success'
            )
            if(this.zones.length>1){
 
              if (this.zone.ordreX == this.zones[this.zones.length-2].ordreX)
                 {                
                    this.hall.espace_x = this.hall.espace_x + 1}
               if (this.zone.ordreY == this.zones[this.zones.length - 2].ordreY)
                  {  
                     this.hall.espace_y = this.hall.espace_y + 1}
             }
         
            this.zone = new ZoneHall()




          }
        },
          error => console.log(error));
      }
    },
      error => console.log(error));


  }

  //fermer dialogue
  close() {
    console.log(this.hall)
    for (var i = 0; i < this.zonesNew.length; i++) {
       this.service.editHallZone(this.zonesNew[i].id, this.hall.id).subscribe(data => {
        console.log("zone modif", data)
      }
        , error => console.log(error));

    }

    this.dialogRef.close();
  }
}

@Component({
  selector: 'app-edit-halle-dialog',
  templateUrl: './edit-halle-dialog.component.html',
})
export class EditHalleDialogComponent implements OnInit {


  dataTab: any
  hall: Hall = new Hall()
  Famille_Logistique: any = [];
  zones_invalide: any = []
  emp_reserver: any = []
  manuel = false
  addColoirShow: boolean = false
  couloir: Couloir = new Couloir()

  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<EditHalleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _formBuilder: FormBuilder, private service: StockageService, private router: Router, private http: HttpClient) {
    this.dataTab = data
 
    this.hall = data.hall
    this.service.ListeFamilleLogistique().subscribe((data: any) => {
      this.Famille_Logistique = data;
    });

    this.service.ZoneInvalideParHall(this.hall.id).subscribe((data: any) => {
      this.zones_invalide = data;
    });
    this.service.getEmplacmentReserveParHall(this.hall.id).subscribe((data: any) => {
      this.emp_reserver = data;
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
  zone: ZoneRayon = new ZoneRayon()
  
  ajouterCouloir() {




    this.zone.etat = "Couloir"
    this.zone.hall=this.hall
    this.couloir.hall = this.hall
     this.couloir.zone = this.zone
    console.log(this.couloir)
    this.service.libelleCouloirexiste(this.hall.local.id_Local, this.couloir.libelle).subscribe(data => {
      if (data == true) {
        Swal.fire(
          'Erreur',
          'Couloir avec ce libelle deja existe',
          'error'
        )
      }
      if (data == false) {
          this.service.ajoutZoneRayon(this.zone).subscribe(data => {
            this.zone=data
            console.log("zone",data)
            this.couloir.zone = this.zone

          
        this.service.ajoutCouloir(this.couloir).subscribe(data => {
          
          console.log("couloir", data);
          Swal.fire(
            'Ajout Effecté',
            'Couloir Ajouté Avec Sucées',
            'success'
          )
          this.couloir = new Couloir()

        },
          error => console.log(error));
        },
        error => console.log(error));

      }
    },
      error => console.log(error));
  }



  OpenZoneInvalide(hall: any, id: any) {
    const dialogRef = this.dialog.open(AddZoneInvalideHalleComponent, {
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
    console.log(this.dataTab.hall.id)
    console.log(this.hall.id)

    this.service.editHall(this.hall.id, this.hall).subscribe(data => {
      this.close();
    }
      , error => console.log(error));
  }
  //fermer dialogue
  close() {
    this.dialogRef.close();
  }

  changedToggle() {
    if (this.manuel == true) {
     }
  }

  //changer valeur l'une des dimension (longeur/largeur/hauteur)
  valuechange(newValue: any) {
     //surface= hauteur* largeur* longeur
    this.hall.surface = this.hall.hauteur * this.hall.longeur * this.hall.hauteur


  }
  ngOnInit(): void {
  }

}


@Component({
  selector: 'app-edit-emplacement-dialog',
  templateUrl: './edit-emplacement-dialog.component.html',
})
export class EditEmplacementDialogComponent implements OnInit {


  /////**************************************/dialog modifier emplacment****************************************************//////
  dataTab: any
  emplacement: Emplacement = new Emplacement()
  clientLouer = false
  client: Client = new Client()
  louer = false
  clients: any = []
  DejaExiste = false
  nouveauClt = false
  showbtn = true
  constructor(public dialogRef: MatDialogRef<EditEmplacementDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _formBuilder: FormBuilder, private service: StockageService, private router: Router, private http: HttpClient) {
    this.emplacement = data.emplacement
    if (this.emplacement.client != null) {
      this.clientLouer = true
    }


  }
  onSubmit() {
     this.service.editEmplacment(this.data.emplacement.id, this.emplacement).subscribe(data => {
      this.close();
    }
      , error => console.log(error));
  }
  //fermer dialogue
  close() {
    this.dialogRef.close();
  }
  Louer() {
    this.showbtn = false
    this.louer = true
    this.service.listeClient().subscribe(data => {
      this.clients = data
    }
      , error => console.log(error));
  }

  ValiderLouer() {
    console.log(this.client)
    if (!this.nouveauClt) {
      this.service.LouerEmplacment(this.client, this.emplacement.id).subscribe(data => {
        console.log("location", data)
        this.service.GetEmplacmentById(this.emplacement.id).subscribe(data => {
          this.emplacement = data
          this.louer = false
          this.clientLouer = true

        }
          , error => console.log(error));
      }
        , error => console.log(error));
    }
    else if (this.nouveauClt == true) {
      this.service.Ajout_Client(this.client).subscribe(data => {
        console.log("nouveau clt", data)
        this.service.LouerEmplacment(this.client, this.emplacement.id).subscribe(data => {
          console.log("location", data)
          this.service.GetEmplacmentById(this.emplacement.id).subscribe(data => {
            this.emplacement = data
            this.louer = false
            this.clientLouer = true

          }
            , error => console.log(error));
        }
          , error => console.log(error));

      }
        , error => console.log(error));

    }


  }


  AnnulerLocation() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Vous etes sur?',
      text: "Vous voulez librer cette emlacement et annuler la location",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, Annuler',
      cancelButtonText: 'Non',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(this.emplacement.id)
        this.service.annulerLocationEmp(this.emplacement.id).subscribe(data => {
          this.emplacement = data
          this.clientLouer = false
          this.showbtn = true
          swalWithBootstrapButtons.fire(
            'Location Annuler!',
            'La Location De Cette Emplacement Est Annuler.',
            'success'
          )
        }
          , error => console.log(error));



      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Annuler',
          "L'anulation de location est annulé",
          'error'
        )
      }
    })


  }

  changedToggle() {
    if (this.nouveauClt == true) {
      this.client = new Client()
    }
  }


  ngOnInit(): void {
  }

}

@Component({
  selector: 'app-ajouter-emplacment-dialog',
  templateUrl: './ajouter-emplacment-dialog.component.html',
})
export class AjouterEmplacmentDialogComponent implements OnInit {

  ///////////************************************dialog ajouter emplacment************************************************////////
  dataTab: any
  emplacement: Emplacement = new Emplacement()
  value: any
  couloirDroite: any
  couloirGauche: any

  emplacements: any = [];
  manuel = false
  constructor(public dialogRef: MatDialogRef<AjouterEmplacmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _formBuilder: FormBuilder, private service: StockageService, private router: Router, private http: HttpClient) {
    this.emplacement.local = data.localselect
    this.emplacement.rayon = data.rayonselect
    this.emplacement.etage = data.etageselect
    this.emplacement.halle = data.halleselect
    this.couloirGauche = data.couloirGauche
    this.couloirDroite = data.couloirDroite

    console.log(this.emplacement)
  }
  changedToggle() {
    if (this.manuel == true) {
      console.log("manuel")
    }
  }
  valuechange(newValue: any) {
    console.log(newValue)
    //surface= hauteur* largeur* longeur
    this.emplacement.surface = this.emplacement.hauteur * this.emplacement.longeur * this.emplacement.hauteur
  }

  onSubmit() {
    if ((this.emplacement.hauteur >= this.emplacement.etage.hauteur) || (this.emplacement.largeur >= this.emplacement.etage.largeur)) {
      Swal.fire(
        'Erreur',
        'Verifer les dimension saisies',
        'error'
      )
    }
    else {

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
  }
  //fermer dialogue
  close() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}

@Component({
  selector: 'app-ajouter-etage-dialog',
  templateUrl: './ajouter-etage-dialog.component.html',
})
export class AjouterEtageDialogComponent implements OnInit {

  //////********************************************dialog add etage**********************************************////////

  dataTab: any
  etage: Etage = new Etage()
  Sous_Famille_Logistique: any = [];
  constructor(public dialogRef: MatDialogRef<AjouterEtageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _formBuilder: FormBuilder, private service: StockageService, private router: Router, private http: HttpClient) {
    this.service.SouFamilleLogistiqueParFamille(this.data.rayon.familleLogistique.id).subscribe((data: any) => {
      console.log("Sous Famille", data)
      this.Sous_Famille_Logistique = data
    });
    this.etage.rayon = data.rayon
    this.etage.largeur = data.rayon.largeur
  }
  onSubmit() {
    console.log("etage", this.etage)
    this.service.LibelleEtageExiste(this.etage.rayon.id, this.etage.libelle).subscribe(data => {
      if (data == true) {
        Swal.fire(
          'Erreur',
          'Etage avec ce libelle deja existe',
          'error'
        )
      }
      if (data == false) {
        if ((this.etage.hauteur >= this.etage.rayon.hauteur) || (this.etage.largeur >= this.etage.rayon.largeur)) {
          Swal.fire(
            'Erreur',
            'Verifer les dimension saisies',
            'error'
          )
        }
        else {
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
      }
    },
      error => console.log(error));
  }

  //fermer dialogue
  close() {
    this.dialogRef.close();
  }


  ngOnInit(): void {
  }

}

@Component({
  selector: 'app-edit-etage-dialog',
  templateUrl: './edit-etage-dialog.component.html',
})
export class EditEtageDialogComponent implements OnInit {

  ///////////***************************************dialog edit etage******************************************/////////////

  dataTab: any
  etage: any
  Sous_Famille: any = [];
  constructor(public dialogRef: MatDialogRef<EditEtageDialogComponent>,
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



  ngOnInit(): void {
  }

}

@Component({
  selector: 'app-add-zone-invalide-halle',
  templateUrl: './add-zone-invalide-halle.component.html',
})
export class AddZoneInvalideHalleComponent implements OnInit {


  /////****************************************dialog ajouter un rayon dans un local*******************************************/////
  dataTab: any
  hall: Hall = new Hall()
  zone: ZoneRayon = new ZoneRayon()
  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<AddZoneInvalideHalleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _formBuilder: FormBuilder, private service: StockageService, private router: Router, private http: HttpClient) {
    console.log(data)
      this.hall = data.hall;
    this.zone.hall = this.hall
    this.zone.etat = 'Invalide'
  }

  //valider l'ajout du zone invalide
  onSubmit() {
    console.log(this.zone)
    this.service.ZoneInvalideHallExiste(this.hall.id, this.zone.ordreX, this.zone.ordreY).subscribe(data => {
      console.log(data)
      if (data == true) {
        Swal.fire(
          'Erreur',
          'Zone Deja existe',
          'error'
        )
      }
      if (data == false) {
        this.service.ajoutZoneRayon(this.zone).subscribe(data => {
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


  ngOnInit(): void {
  }

}

@Component({
  selector: 'app-open-zone-invalide',
  templateUrl: './open-zone-invalide.component.html',
})
export class OpenZoneInvalideComponent implements OnInit {


  /////**********************************************dialog open zone invalides************************************************/////


  dataTab: any
  zone: ZoneRayon = new ZoneRayon()
  hall: Hall = new Hall()
  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<OpenZoneInvalideComponent>,
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


  ngOnInit(): void {
  }

}

@Component({
  selector: 'app-open-emplacment-louee',
  templateUrl: './open-emplacment-louee.component.html',
})
export class OpenEmplacmentLoueeComponent implements OnInit {

  ///////////////////////////////////////////*************DialogOpenAllZoneReserve*********************////////////////////////////// */

  dataTab: any
  emp_reserver: Emplacement[]
  local: any
  filters = {
    keyword: ''
  }
  selectedOption: any;
  selected = '';

  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<OpenEmplacmentLoueeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _formBuilder: FormBuilder, private service: StockageService, private router: Router, private http: HttpClient) {
    this.generer()
  }

  //recuperer la liste des zone reservé
  generer() {
    this.service.getAllEmplacmentReserve().subscribe(data => {
      this.emp_reserver = data
      console.log(data)
    },
      error => console.log(error));
  }
  //filtre des zone par hall
  filterByHall(emp_reserver: Emplacement[]) {
    return emp_reserver.filter((b) => {
      return b.halle.libelle.toString().toLowerCase().includes(this.filters.keyword.toLowerCase());
    })
  }
  //filtre des zone par client
  filterByClient(emp_reserver: Emplacement[]) {
    return emp_reserver.filter((b) => {
      return b.client.nom.toString().toLowerCase().includes(this.filters.keyword.toLowerCase());
    })
  }
  //filtre des zone par local
  filterByLocal(emp_reserver: Emplacement[]) {
    return emp_reserver.filter((b) => {
      return b.halle.local.nom_Local.toString().toLowerCase().includes(this.filters.keyword.toLowerCase());
    })
  }
  //filtrer la liste de zone 
  ListZoneFilter() {
    console.log(this.filters.keyword)
    console.log(this.selectedOption)

    if (this.selectedOption == "client")
      this.service.getAllEmplacmentReserve().subscribe(
        data => this.emp_reserver = this.filterByClient(data)
      )
    else if (this.selectedOption == "hall")

      this.service.getAllEmplacmentReserve().subscribe(
        data => this.emp_reserver = this.filterByHall(data)
      )
    else if (this.selectedOption == "local")

      this.service.getAllEmplacmentReserve().subscribe(
        data => this.emp_reserver = this.filterByLocal(data)
      )

  }

  //fermer dialogue
  close() {
    this.dialogRef.close();
  }


  ngOnInit(): void {
  }

}

@Component({
  selector: 'app-open-client-reserve',
  templateUrl: './open-client-reserve.component.html',
})
export class OpenClientReserveComponent implements OnInit {

  /////////////////////////////////////////////*************DialogZoneResever*********************///////////////////////////////

  dataTab: any
  emp_reserver: Emplacement[]
  local: any
  filters = {
    keyword: ''
  }
  selectedOption: any;
  selected = '';

  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<OpenClientReserveComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _formBuilder: FormBuilder, private service: StockageService, private router: Router, private http: HttpClient) {
    this.local = data.local
    console.log(this.local)
    this.generer()
  }
  //generer la liste de zine reservée par local
  generer() {
    this.service.EmplacmentsReserveParLocal(this.local.id_Local).subscribe(data => {
      this.emp_reserver = data
    },
      error => console.log(error));
  }
  //filtre par hall
  filterByHall(emp_reserver: Emplacement[]) {
    return emp_reserver.filter((b) => {
      return b.halle.libelle.toString().toLowerCase().includes(this.filters.keyword.toLowerCase());
    })
  }
  //filtre par client
  filterByClient(emp_reserver: Emplacement[]) {
    return emp_reserver.filter((b) => {
      return b.client.nom.toString().toLowerCase().includes(this.filters.keyword.toLowerCase());
    })
  }

  //filtrer la liste de zone 
  ListZoneFilter() {
    console.log(this.selectedOption)
    if (this.selectedOption == "client")
      this.service.EmplacmentsReserveParLocal(this.local.id_Local).subscribe(
        data => this.emp_reserver = this.filterByClient(data)
      )
    else if (this.selectedOption == "hall")
      this.service.EmplacmentsReserveParLocal(this.local.id_Local).subscribe(
        data => this.emp_reserver = this.filterByHall(data)
      )
  }

  //fermer dialogue
  close() {
    this.dialogRef.close();
  }


  ngOnInit(): void {
  }

}

@Component({
  selector: 'app-open-cartographie',
  templateUrl: './open-cartographie.component.html',
})
export class OpenCartographieComponent implements OnInit {


  ngOnInit(): void {
  }

  rayons: any = [];
  etages: any = [];
  emplacements: any = [];
  emplacmentselect: any
  libelleLocal: any
  local: any
  constructor(public dialogRef: MatDialogRef<OpenCartographieComponent>,
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


@Component({
  selector: 'app-open-cartographie-v2',
  templateUrl: './open-cartographie-v2.component.html',
})
export class OpenCartographieV2Component implements OnInit {

  ///////******************************************dialog open cartographie*************************************************/////
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
  arrRayon: any[][] = [];
  arrHall: any[][] = [];

  constructor(public dialogRef: MatDialogRef<OpenCartographieV2Component>,
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
    this.arrRayon = []
    console.log("eeee", halle)
    for (let i = 0; i < this.x; i++) {
      // Creates an empty line
      this.arrRayon.push([]);
      // Adds cols to the empty line:
      this.arrRayon[i].push(new Array(this.y));
      for (let j = 0; j < this.y; j++) {
        this.service.OrdreRayonExiste(halle.id, i + 1, j + 1).subscribe(data => {
          console.log(" eee", data)
          if (data != null) {
            this.arrRayon[i][j] = data;
          }
          else {
            //ordre n'exsite pas
            this.service.ZoneInvalideHallExiste(halle.id, i + 1, j + 1).subscribe(data => {
              console.log(" eee", data)
              if (data == true) {
                this.arrRayon[i][j] = "invalide";
              }
              else {
                this.arrRayon[i][j] = null;
              }
            }, error => console.log(error));
          }
        }, error => console.log(error));
      }
    }
    setTimeout(() => {
      console.log("rayons", this.arrRayon);
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


  ngOnInit(): void {
  }

}
