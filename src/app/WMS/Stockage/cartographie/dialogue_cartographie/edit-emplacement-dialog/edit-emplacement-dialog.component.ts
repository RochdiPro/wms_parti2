import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Client } from 'src/app/WMS/Classe/Stockage/Client';
import { Emplacement } from 'src/app/WMS/Classe/Stockage/Emplacement';
import Swal from 'sweetalert2';
import { StockageService } from '../../../services/stockage.service';

@Component({
  selector: 'app-edit-emplacement-dialog',
  templateUrl: './edit-emplacement-dialog.component.html',
  styleUrls: ['./edit-emplacement-dialog.component.scss']
})
export class EditEmplacementDialogComponent implements OnInit {


/////**************************************/dialog modifier emplacment****************************************************//////
   dataTab: any
  emplacement: Emplacement = new Emplacement()
  clientLouer = false
  client: Client = new Client()
  louer = false
  clients: any = []
  DejaExiste = false
  nouveauClt = false
  showbtn = true
  constructor(public dialogRef: MatDialogRef<EditEmplacementDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _formBuilder: FormBuilder, private service: StockageService, private router: Router, private http: HttpClient) {
    this.emplacement = data.emplacement
    if (this.emplacement.client != null) {
      this.clientLouer = true
    }


  }
  onSubmit() {
    console.log(this.dataTab.idRayon)
    this.service.editEmplacment(this.data.emplacement.id, this.emplacement).subscribe(data => {
      this.close();
    }
      , error => console.log(error));
  }
  //fermer dialogue
  close() {
    this.dialogRef.close();
  }
  Louer() {
    this.showbtn = false
    this.louer = true
    this.service.listeClient().subscribe(data => {
      this.clients = data
    }
      , error => console.log(error));
  }

  ValiderLouer() {
    console.log(this.client)
    if (!this.nouveauClt) {
      this.service.LouerEmplacment(this.client, this.emplacement.id).subscribe(data => {
         console.log("location", data)
        this.service.GetEmplacmentById(this.emplacement.id).subscribe(data => {
          this.emplacement = data
          this.louer = false
          this.clientLouer = true

        }
          , error => console.log(error));
      }
        , error => console.log(error));
    }
    else if (this.nouveauClt == true) {
      this.service.Ajout_Client(this.client).subscribe(data => {
        console.log("nouveau clt", data)
        this.service.LouerEmplacment(this.client, this.emplacement.id).subscribe(data => {
          console.log("location", data)
          this.service.GetEmplacmentById(this.emplacement.id).subscribe(data => {
            this.emplacement = data
            this.louer = false
            this.clientLouer = true

          }
            , error => console.log(error));
        }
          , error => console.log(error));

      }
        , error => console.log(error));

    }


  }


  AnnulerLocation() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Vous etes sur?',
      text: "Vous voulez librer cette emlacement et annuler la location",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, Annuler',
      cancelButtonText: 'Non',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(this.emplacement.id)
        this.service.annulerLocationEmp(this.emplacement.id).subscribe(data => {
          this.emplacement = data
          this.clientLouer = false
          this.showbtn=true
          swalWithBootstrapButtons.fire(
            'Location Annuler!',
            'La Location De Cette Emplacement Est Annuler.',
            'success'
          )
        }
          , error => console.log(error));



      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Annuler',
          "L'anulation de location est annulé",
          'error'
        )
      }
    })


  }

  changedToggle() {
    if (this.nouveauClt == true) {
      this.client = new Client()
    }
  }


  ngOnInit(): void {
  }

}
