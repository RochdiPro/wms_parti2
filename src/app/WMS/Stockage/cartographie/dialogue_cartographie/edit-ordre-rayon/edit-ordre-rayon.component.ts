import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Rayon } from 'src/app/WMS/Classe/Stockage/Rayon';
import { StockageService } from '../../../services/stockage.service';

@Component({
  selector: 'app-edit-ordre-rayon',
  templateUrl: './edit-ordre-rayon.component.html',
  styleUrls: ['./edit-ordre-rayon.component.scss']
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
