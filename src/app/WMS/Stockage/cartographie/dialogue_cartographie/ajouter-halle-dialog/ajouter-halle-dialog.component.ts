import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Hall } from 'src/app/WMS/Classe/Stockage/Hall';
import Swal from 'sweetalert2';
import { StockageService } from '../../../services/stockage.service';

@Component({
  selector: 'app-ajouter-halle-dialog',
  templateUrl: './ajouter-halle-dialog.component.html',
  styleUrls: ['./ajouter-halle-dialog.component.scss']
})
export class AjouterHalleDialogComponent implements OnInit {
   ngOnInit(): void {
  }
   hall: Hall = new Hall()
  Famille_Logistique: any = [];
  local: any
  constructor(public dialogRef: MatDialogRef<AjouterHalleDialogComponent>,
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

