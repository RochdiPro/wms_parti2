import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Emplacement } from 'src/app/WMS/Classe/Stockage/Emplacement';
import { StockageService } from '../../../services/stockage.service';

@Component({
  selector: 'app-open-emplacment-louee',
  templateUrl: './open-emplacment-louee.component.html',
  styleUrls: ['./open-emplacment-louee.component.scss']
})
export class OpenEmplacmentLoueeComponent implements OnInit {

///////////////////////////////////////////*************DialogOpenAllZoneReserve*********************////////////////////////////// */

   dataTab: any
  emp_reserver: Emplacement[]
  local: any
  filters = {
    keyword: ''
  }
  selectedOption: any;
  selected = '';

  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<OpenEmplacmentLoueeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _formBuilder: FormBuilder, private service: StockageService, private router: Router, private http: HttpClient) {
    this.generer()
  }

  //recuperer la liste des zone reservé
  generer() {
    this.service.getAllEmplacmentReserve().subscribe(data => {
      this.emp_reserver = data
      console.log(data)
    },
      error => console.log(error));
  }
  //filtre des zone par hall
  filterByHall(emp_reserver: Emplacement[]) {
    return emp_reserver.filter((b) => {
      return b.halle.libelle.toString().toLowerCase().includes(this.filters.keyword.toLowerCase());
    })
  }
  //filtre des zone par client
  filterByClient(emp_reserver: Emplacement[]) {
    return emp_reserver.filter((b) => {
      return b.client.nom.toString().toLowerCase().includes(this.filters.keyword.toLowerCase());
    })
  }
  //filtre des zone par local
  filterByLocal(emp_reserver: Emplacement[]) {
    return emp_reserver.filter((b) => {
      return b.halle.local.nom_Local.toString().toLowerCase().includes(this.filters.keyword.toLowerCase());
    })
  }
  //filtrer la liste de zone 
  ListZoneFilter() {
    console.log(this.filters.keyword)
    console.log(this.selectedOption)

    if (this.selectedOption == "client")
      this.service.getAllEmplacmentReserve().subscribe(
        data => this.emp_reserver = this.filterByClient(data)
      )
    else if (this.selectedOption == "hall")

      this.service.getAllEmplacmentReserve().subscribe(
        data => this.emp_reserver = this.filterByHall(data)
      )
    else if (this.selectedOption == "local")

      this.service.getAllEmplacmentReserve().subscribe(
        data => this.emp_reserver = this.filterByLocal(data)
      )

  }

  //fermer dialogue
  close() {
    this.dialogRef.close();
  }


  ngOnInit(): void {
  }

}
