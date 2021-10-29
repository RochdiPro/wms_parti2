import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Couloir } from 'src/app/WMS/Classe/Stockage/Couloir';
import { Rayon } from 'src/app/WMS/Classe/Stockage/Rayon';
import { Zone } from 'src/app/WMS/Classe/Stockage/Zone';
import Swal from 'sweetalert2';
import { StockageService } from '../../../services/stockage.service';

@Component({
  selector: 'app-ajouter-rayon-dialog',
  templateUrl: './ajouter-rayon-dialog.component.html',
  styleUrls: ['./ajouter-rayon-dialog.component.scss']
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
  zones: any = []
  zone: Zone = new Zone()
  addColoirShow: boolean = false
  couloir: Couloir = new Couloir()
  hall: any
  local: any
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
            this.zone.hall = this.hall
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
              this.zone = new Zone()
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
          console.log("rayon",data);
          this.rayon = data
              this.couloirDroite = this.rayon.coloirDroite
             this.couloirGauche = this.rayon.coloirGauche
             this.couloirGauche.rayonDroite = this.rayon
             this.couloirDroite.rayonGauche = this.rayon
         //  console.log(this.couloirGauche, this.couloirsDroite)
             this.service.editCouloirRayon(this.couloirGauche.id, this.couloirDroite.id,this.rayon.id).subscribe(data => {
               console.log("rayon", data)
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
    },
      error => console.log(error));

  }
  //fermer dialogue
  close() {
    console.log(this.rayon)
    for (var i = 0; i < this.zones.length; i++) {
      console.log("zone[i]", this.zones[i])
      this.service.editRayonZone(this.zones[i].id, this.rayon.id).subscribe(data => {
        console.log("zone modif", data)
      }
        , error => console.log(error));

    }
    this.dialogRef.close();
  }
  ngOnInit(): void {
  }

}
