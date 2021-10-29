import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StockageService } from '../../../services/stockage.service';

@Component({
  selector: 'app-open-cartographie',
  templateUrl: './open-cartographie.component.html',
  styleUrls: ['./open-cartographie.component.scss']
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

