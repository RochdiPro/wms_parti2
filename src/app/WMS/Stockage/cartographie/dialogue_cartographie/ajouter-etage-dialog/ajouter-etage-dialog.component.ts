import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Etage } from 'src/app/WMS/Classe/Stockage/Etage';
import Swal from 'sweetalert2';
import { StockageService } from '../../../services/stockage.service';

@Component({
  selector: 'app-ajouter-etage-dialog',
  templateUrl: './ajouter-etage-dialog.component.html',
  styleUrls: ['./ajouter-etage-dialog.component.scss']
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


  ngOnInit(): void {
  }

}
