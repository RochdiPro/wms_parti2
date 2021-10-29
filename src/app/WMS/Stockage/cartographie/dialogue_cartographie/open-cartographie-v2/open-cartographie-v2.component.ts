import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Hall } from 'src/app/WMS/Classe/Stockage/Hall';
import { StockageService } from '../../../services/stockage.service';

@Component({
  selector: 'app-open-cartographie-v2',
  templateUrl: './open-cartographie-v2.component.html',
  styleUrls: ['./open-cartographie-v2.component.scss']
})
export class OpenCartographieV2Component implements OnInit {

///////******************************************dialog open cartographie*************************************************/////
   halles: any = [];
  rayons: any = [];
  emplacmentselect: any
  libelleLocal: any
  local: any
  rayonShow: boolean = false
  hallShow: boolean = true
  x: any
  y: any
  libelleHalle: any
  hall: Hall = new Hall()
  arr: any[][] = [];
  constructor(public dialogRef: MatDialogRef<OpenCartographieV2Component>,
    @Inject(MAT_DIALOG_DATA) public data: any, private service: StockageService, private http: HttpClient) {
    this.local = data.local
    console.log(this.local)
    this.libelleLocal = this.local.nom_Local
    this.halles = data.local.halles

    console.log(this.halles)
  }
  SelectHall(hall: any) {
    this.rayonShow = true
    this.hallShow = false
    this.libelleHalle = hall.libelle
    this.hall = hall
    this.rayons = hall.rayons
    this.service.MaxOrdreX(hall.id).subscribe(data => {
      this.x = data;
      this.service.MaxOrdreY(hall.id).subscribe(data => {
        this.y = data;
        console.log("y", this.y)
        console.log("x", this.x)
        this.generertableayrayon(hall)
      }, error => console.log(error));
    }, error => console.log(error));
  }

  //génerer la matrice du rayon pour un hall
  generertableayrayon(halle: any) {
    this.arr = []
    console.log("eeee", halle)
    for (let i = 0; i < this.x; i++) {
      // Creates an empty line
      this.arr.push([]);
      // Adds cols to the empty line:
      this.arr[i].push(new Array(this.y));
      for (let j = 0; j < this.y; j++) {
        this.service.OrdreRayonExiste(halle.id, i + 1, j + 1).subscribe(data => {
          console.log(" eee", data)
          if (data != null) {
            this.arr[i][j] = data;
          }
          else {
            //ordre n'exsite pas
            this.service.ZoneInvalideExiste(halle.id, i + 1, j + 1).subscribe(data => {
              console.log(" eee", data)
              if (data == true) {
                this.arr[i][j] = "invalide";
              }
              else {
                this.arr[i][j] = null;
              }
            }, error => console.log(error));
          }
        }, error => console.log(error));
      }
    }
    setTimeout(() => {
      console.log("array", this.arr);
    }, 2000);

  }
  //selectionner une position
  selectPosition(position: any) {
    this.emplacmentselect = position
    console.log("position:", position)
  }
  //compteuur
  counter(i: number) {
    return new Array(i);
  }
  //fermer dialogue
  close() {
    this.dialogRef.close();
  }


  ngOnInit(): void {
  }

}
