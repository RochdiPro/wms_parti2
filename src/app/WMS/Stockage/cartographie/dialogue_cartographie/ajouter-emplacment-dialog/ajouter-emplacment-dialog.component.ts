import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Emplacement } from 'src/app/WMS/Classe/Stockage/Emplacement';
import Swal from 'sweetalert2';
import { StockageService } from '../../../services/stockage.service';

@Component({
  selector: 'app-ajouter-emplacment-dialog',
  templateUrl: './ajouter-emplacment-dialog.component.html',
  styleUrls: ['./ajouter-emplacment-dialog.component.scss']
})
export class AjouterEmplacmentDialogComponent implements OnInit {

///////////************************************dialog ajouter emplacment************************************************////////
   dataTab: any
  emplacement: Emplacement = new Emplacement()
  value: any
  couloirDroite: any
  couloirGauche: any
  emplacements: any = [];
  manuel=false
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
  valuechange(newValue:any) {
     console.log(newValue)
     
      this.emplacement.surface=
      (2*this.emplacement.hauteur*this.emplacement.longeur)+(2*this.emplacement.hauteur*this.emplacement.largeur)+(2*this.emplacement.largeur*this.emplacement.longeur)
    

  }
  
  onSubmit() {

    //hauteur h, longueur L , largeur l.
    //surface =  2hL + 2hl + 2Ll

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

  ngOnInit(): void {
  }

}
