import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Rayon } from 'src/app/WMS/Classe/Stockage/Rayon';
import { StockageService } from '../../../services/stockage.service';

@Component({
  selector: 'app-edit-rayon-dialog',
  templateUrl: './edit-rayon-dialog.component.html',
  styleUrls: ['./edit-rayon-dialog.component.scss']
})
export class EditRayonDialogComponent implements OnInit {

////*************************************************dialog edit rayon*********************************************////
 
  dataTab: any
  rayon: Rayon
  Famille_Logistique: any = [];
  constructor(public dialogRef: MatDialogRef<EditRayonDialogComponent>,
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


  ngOnInit(): void {
  }

}
