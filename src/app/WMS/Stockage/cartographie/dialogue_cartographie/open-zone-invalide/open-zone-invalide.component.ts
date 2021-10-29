import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Hall } from 'src/app/WMS/Classe/Stockage/Hall';
import { Zone } from 'src/app/WMS/Classe/Stockage/Zone';
import { StockageService } from '../../../services/stockage.service';

@Component({
  selector: 'app-open-zone-invalide',
  templateUrl: './open-zone-invalide.component.html',
  styleUrls: ['./open-zone-invalide.component.scss']
})
export class OpenZoneInvalideComponent implements OnInit {


/////**********************************************dialog open zone invalides************************************************/////

 
  dataTab: any
  zone: Zone = new Zone()
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
