import { Component, OnInit } from '@angular/core';
import { Rayon } from '../../Classe/Stockage/Rayon';
import { StockageService } from '../stockage.service';

@Component({
  selector: 'app-tableau',
  templateUrl: './tableau.html',
  styleUrls: ['./tableau.component.scss']
})
export class TableauComponent implements OnInit {

  constructor(private service: StockageService) { }
  x: number
  y: number
  arr: any[]=[];
  rayons: Rayon[] = []
  ngOnInit(): void {
    this.arr=[]

    this.service.getHalleById(1).subscribe(data => {
      this.rayons = data.rayons
      console.log(this.rayons)
      this.service.MaxOrdreX(1).subscribe(data => {
        this.x = data;
        this.service.MaxOrdreY(1).subscribe(data => {
          this.y = data;
          console.log("y", this.y)
          console.log("x", this.x)
          this.generertableayrayon()
        }, error => console.log(error));
      }, error => console.log(error));
    }, error => console.log(error));
  }


  counter(i: number) {
    return new Array(i);
}
  generertableayrayon() {
var i=0
var j=0

    for (let i=0 ; i < this.x; i++) {
      // Creates an empty line
      this.arr.push([]);
      // Adds cols to the empty line:
      this.arr[i].push(new Array(this.y));
      for ( let j =0 ; j < this.y; j++) {
        
        this.service.OrdreRayonExiste(1, i+1,j+1).subscribe(data => {
          console.log(" eee", data)
          if (data != null) {
            this.arr[i][j] = data;
          }
          else
           {
            this.arr[i][j] = null;
           }
        } , error => console.log(error));
    
 
      }
   
      }
      setTimeout(() => {
        console.log("array", this.arr);
      }, 2000);
    
    }


  generertableayrayonV0() {


    for (var i = 0; i < this.x; i++) {
      // Creates an empty line
      this.arr.push([]);
      // Adds cols to the empty line:
      this.arr[i].push(new Array(this.y));

      for (var j = 0; j < this.y; j++) {
        for (var z = 0; z < this.rayons.length; z++) {
          console.log("z:", this.rayons[z])
          console.log("x:", this.rayons[z].ordreX, "Y", this.rayons[z].ordreY)
          console.log("i:",i+1 ," ",j+1)

          if ((this.rayons[z].ordreX === i+1) && (this.rayons[z].ordreY === j+1)) {
            // Initializes:
            this.arr[i][j] = this.rayons[z].libelle;
          }
          else {
            // Initializes:
            this.arr[i][j] = '--';

          }
        }
      }
    }
    console.log("fff", this.arr);
  }

}





