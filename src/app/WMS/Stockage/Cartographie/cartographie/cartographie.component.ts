import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { StockageService } from '../../stockage.service';

@Component({
  selector: 'app-cartographie',
  templateUrl: './cartographie.component.html',
  styleUrls: ['./cartographie.component.scss']
})
export class CartographieComponent implements OnInit {
  @ViewChild('stepper') private myStepper: MatStepper;

  //declaration formGroup
  localFormGroup: FormGroup;
  rayonFormGroup: FormGroup;
  etageFormGroup: FormGroup;
  positionFormGroup: FormGroup;
  disableSelect = new FormControl(false);
  isLinear = false;

  //Declaration du tableau 
  locals: any = [];
  rayons: any = [];
  etages: any = [];
  positions: any = [];

  localselect: any;
  libelleLocal:any;

  constructor(public dialog: MatDialog, private _formBuilder: FormBuilder, private service: StockageService, private router: Router, private http: HttpClient, private sanitizer: DomSanitizer) {

  }
  ngOnInit() {

    this.ListLocals();

    this.localFormGroup = this._formBuilder.group({
      localFormGroup: ['', Validators.required]
    });
    this.rayonFormGroup = this._formBuilder.group({
      rayonFormGroup: ['', Validators.required],
      rayon: ['', Validators.required],
    });
    this.etageFormGroup = this._formBuilder.group({
      etageFormGroup: ['', Validators.required],
      etage: ['', Validators.required],
    });
    this.positionFormGroup = this._formBuilder.group({
      positionFormGroup: ['', Validators.required],
      positiony: ['', Validators.required],
      positionx: ['', Validators.required],
      nbEmp: ['', Validators.required],
    });
  }

  //génerer la liste des locals
  ListLocals() {
    this.service.Locals().subscribe(data => {
      console.log("liste locals", data)
      this.locals = data;
    });
  }
  //selectionner un local
  SelectLocal(local: any, id: any) {
    console.log("Local selctionner", local)
     this.localselect = local;
     this.libelleLocal = this.localselect.libelle
     this.rayons = this.localselect.rayons
    
    this.goForward();
  }

  //ouvrir la boite dialogue DialogOpenCartographie 
  OpenCartographie(local: any, id: any) {
    console.log("Local selctionner", local)
     this.localselect = local;
     this.libelleLocal = this.localselect.libelle
     this.rayons = this.localselect.rayons
     const dialogRef = this.dialog.open(DialogOpenCartographie, {
      width: 'auto',
      data: { local: this.localselect }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.service.getLocalById(this.localselect.id).subscribe(data => {
        this.localselect = data;
        console.log("newww", data)
        console.log("newww2", this.localselect)
        this.rayons = this.localselect.rayons

      }, error => console.log(error));

    });

   }






















  //aller au step precedente 
  goBack() {
    this.myStepper.previous();
  }

  //aller au step suivante 
  goForward() {
    this.myStepper.next();
  }
}





//dialog open cartographie 
@Component({
  selector: 'open-cartographie',
  templateUrl: 'open-cartographie.html',
})
export class DialogOpenCartographie {
   rayons: any = [];
  etages: any = [];
  positions: any = [];
  positionselect:any
  libelleLocal:any
  local:any
  constructor(public dialogRef: MatDialogRef<DialogOpenCartographie>,
    @Inject(MAT_DIALOG_DATA) public data: any, private service: StockageService, private http: HttpClient) {
      this.local=data.local

      this.libelleLocal=data.local.libelle
  }

  
 
selectPosition(position:any){

  this.positionselect=position
   console.log("position:",position)
 

  } 
 
  onSubmit() {
 
  }


  //fermer dialogue
  close() {
    this.dialogRef.close();
  }

}