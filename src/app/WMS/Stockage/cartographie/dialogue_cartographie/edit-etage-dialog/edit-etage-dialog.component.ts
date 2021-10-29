import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { StockageService } from '../../../services/stockage.service';

@Component({
  selector: 'app-edit-etage-dialog',
  templateUrl: './edit-etage-dialog.component.html',
  styleUrls: ['./edit-etage-dialog.component.scss']
})
export class EditEtageDialogComponent implements OnInit {

///////////***************************************dialog edit etage******************************************/////////////
 
  dataTab: any
  etage: any
  Sous_Famille: any = [];
  constructor(public dialogRef: MatDialogRef<EditEtageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _formBuilder: FormBuilder, private service: StockageService, private router: Router, private http: HttpClient) {

    this.dataTab = data
    this.etage = data.etage

    this.service.ListeSouFamilleLogistique().subscribe((data: any) => {
      this.Sous_Famille = data;
      // console.log(data)
    });
  }
  onSubmit() {
    console.log(this.dataTab.idEtage)
    this.service.editEtage(this.dataTab.idEtage, this.etage).subscribe(data => {
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
