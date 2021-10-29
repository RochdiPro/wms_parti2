import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { StockageService } from '../../../services/stockage.service';
 import { OpenClientReserveComponent } from '../open-client-reserve/open-client-reserve.component';

@Component({
  selector: 'app-open-info-local',
  templateUrl: './open-info-local.component.html',
  styleUrls: ['./open-info-local.component.scss']
})
export class OpenInfoLocalComponent implements OnInit {

/////////////////////////*****************************open-Info-Local*******************************************//////////////////////// */
 
  dataTab: any
  zones_invalide: any = []
  emp_reserver: any = []

  local: any
  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<OpenInfoLocalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _formBuilder: FormBuilder, private service: StockageService, private router: Router, private http: HttpClient) {
    this.local = data.local
    console.log(this.local)
    this.generer()
  }
  //generer la liste de zine reservée par local
  generer() {
    this.service.ZoneInvalideParLocal(this.local.id_Local).subscribe(data => {
      console.log(data)
      this.zones_invalide = data
    },
      error => console.log(error));
    this.service.EmplacmentsReserveParLocal(this.local.id_Local).subscribe(data => {
      this.emp_reserver = data
    },
      error => console.log(error));
  }
  openDialogReservation(local: any) {
    const dialogRef = this.dialog.open(OpenClientReserveComponent, {
      width: 'auto',
      data: { local: local }
    });
  }
  //fermer dialogue
  close() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
