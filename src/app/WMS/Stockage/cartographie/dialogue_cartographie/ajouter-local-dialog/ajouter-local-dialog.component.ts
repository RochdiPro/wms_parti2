import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Fiche_Local } from 'src/app/WMS/Classe/Stockage/Fiche_Local';
import Swal from 'sweetalert2';
import { StockageService } from '../../../services/stockage.service';

@Component({
  selector: 'app-ajouter-local-dialog',
  templateUrl: './ajouter-local-dialog.component.html',
  styleUrls: ['./ajouter-local-dialog.component.scss']
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



