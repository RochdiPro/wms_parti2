import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Hall } from 'src/app/WMS/Classe/Stockage/Hall';
import { Zone } from 'src/app/WMS/Classe/Stockage/Zone';
import Swal from 'sweetalert2';
import { StockageService } from '../../../services/stockage.service';

@Component({
  selector: 'app-add-zone-invalide-halle',
  templateUrl: './add-zone-invalide-halle.component.html',
  styleUrls: ['./add-zone-invalide-halle.component.scss']
})
export class AddZoneInvalideHalleComponent implements OnInit {


/////****************************************dialog ajouter un rayon dans un local*******************************************/////
   dataTab: any
  hall: Hall = new Hall()
  zone: Zone = new Zone()
  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<AddZoneInvalideHalleComponent>,
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


  ngOnInit(): void {
  }

}
