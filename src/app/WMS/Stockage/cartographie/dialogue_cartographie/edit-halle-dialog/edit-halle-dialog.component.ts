import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Hall } from 'src/app/WMS/Classe/Stockage/Hall';
import { StockageService } from '../../../services/stockage.service';
import { AddZoneInvalideHalleComponent } from '../add-zone-invalide-halle/add-zone-invalide-halle.component';
 
@Component({
  selector: 'app-edit-halle-dialog',
  templateUrl: './edit-halle-dialog.component.html',
  styleUrls: ['./edit-halle-dialog.component.scss']
})
export class EditHalleDialogComponent implements OnInit {


   dataTab: any
  hall: Hall = new Hall()
  Famille_Logistique: any = [];
  zones_invalide: any = []
  emp_reserver: any = []
  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<EditHalleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _formBuilder: FormBuilder, private service: StockageService, private router: Router, private http: HttpClient) {
    this.dataTab = data
    this.hall = data.hall
    this.service.ListeFamilleLogistique().subscribe((data: any) => {
      this.Famille_Logistique = data;
    });

    this.service.ZoneInvalideParHall(this.hall.id).subscribe((data: any) => {
      this.zones_invalide = data;
    });
    this.service.getEmplacmentReserveParHall(this.hall.id).subscribe((data: any) => {
      this.emp_reserver = data;
    });
  }



  OpenZoneInvalide(hall: any, id: any) {
    const dialogRef = this.dialog.open(AddZoneInvalideHalleComponent, {
      width: 'auto',
      data: { idHalle: id, hall: hall }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.service.getHallById(hall.id).subscribe(data => {
        this.hall = data;

      }, error => console.log(error));
    });
  }

  onSubmit() {
    console.log(this.dataTab.idRayon)
    this.service.editHall(this.dataTab.idHalle, this.hall).subscribe(data => {
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
