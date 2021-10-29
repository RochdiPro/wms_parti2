import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Emplacement } from 'src/app/WMS/Classe/Stockage/Emplacement';
import { StockageService } from '../../../services/stockage.service';

@Component({
  selector: 'app-open-client-reserve',
  templateUrl: './open-client-reserve.component.html',
  styleUrls: ['./open-client-reserve.component.scss']
})
export class OpenClientReserveComponent implements OnInit {

/////////////////////////////////////////////*************DialogZoneResever*********************///////////////////////////////

   dataTab: any
  emp_reserver: Emplacement[]
  local: any
  filters = {
    keyword: ''
  }
  selectedOption: any;
  selected = '';

  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<OpenClientReserveComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _formBuilder: FormBuilder, private service: StockageService, private router: Router, private http: HttpClient) {
    this.local = data.local
    console.log(this.local)
    this.generer()
  }
  //generer la liste de zine reservée par local
  generer() {
    this.service.EmplacmentsReserveParLocal(this.local.id_Local).subscribe(data => {
      this.emp_reserver = data
    },
      error => console.log(error));
  }
  //filtre par hall
  filterByHall(emp_reserver: Emplacement[]) {
    return emp_reserver.filter((b) => {
      return b.halle.libelle.toString().toLowerCase().includes(this.filters.keyword.toLowerCase());
    })
  }
  //filtre par client
  filterByClient(emp_reserver: Emplacement[]) {
    return emp_reserver.filter((b) => {
      return b.client.nom.toString().toLowerCase().includes(this.filters.keyword.toLowerCase());
    })
  }

  //filtrer la liste de zone 
  ListZoneFilter() {
    console.log(this.selectedOption)
    if (this.selectedOption == "client")
      this.service.EmplacmentsReserveParLocal(this.local.id_Local).subscribe(
        data => this.emp_reserver = this.filterByClient(data)
      )
    else if (this.selectedOption == "hall")
      this.service.EmplacmentsReserveParLocal(this.local.id_Local).subscribe(
        data => this.emp_reserver = this.filterByHall(data)
      )
  }

  //fermer dialogue
  close() {
    this.dialogRef.close();
  }


  ngOnInit(): void {
  }

}
