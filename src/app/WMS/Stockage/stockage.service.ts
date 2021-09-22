import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Etage } from '../Classe/Stockage/Etage';
import { Position } from '../Classe/Stockage/Position';

const infonet = '/ERP/';
const wms = '/WMS/';
@Injectable({
  providedIn: 'root'
})
export class StockageService {

  constructor(private httpClient: HttpClient) { }


//Service liste du locals
Locals(): Observable<any> {  
  return this.httpClient.get(wms+"WMS/Touts_Locals").pipe(
    catchError(this.handleError)

 );
}
//service  récupérer local by id
getLocalById(id: number): Observable<any>{
  return this.httpClient.get<any>(`${wms+"/WMS/Local"}/${id}`);
}


//CRUD famille logistique
//service récupérer la liste des famille
ListeFamilleLogistique(): Observable<any> {  
  return this.httpClient.get(wms+"WMS/Touts_FamilleLogistiques").pipe(
    catchError(this.handleError)

 );
}
//service  récupérer la liste des sous famille
ListeSouFamilleLogistique(): Observable<any> {  
  return this.httpClient.get(wms+"WMS/Touts_SousFamilleLogistiques").pipe(
    catchError(this.handleError)

 );
}

//service récupérer la liste des sous famille par famille
SouFamilleLogistiqueParFamille(famille:any): Observable<any> {  
  return this.httpClient.get(wms+"WMS/SousFamille_Famille",{params:{ keyword: famille}}).pipe(
    catchError(this.handleError)

 );
}


///////CRUD rayon
//service ajouter rayon

getRayonById(id: number): Observable<any>{
  return this.httpClient.get<any>(`${wms+"/WMS/Rayon"}/${id}`);
}

ajoutRayon(rayon:any): Observable<any> {  
  return this.httpClient.post(wms+"WMS/Ajout_Rayon",rayon).pipe(
    catchError(this.handleError)
 );
}

//service modifier rayon
editRayon(id: number, rayon: any): Observable<Object>{
  return this.httpClient.put(`${wms+"/WMS/Modifier_Rayon"}/${id}`, rayon);
}

supprimerRayon(id: number): Observable<any> {  
  return this.httpClient.delete(`${wms+"/WMS/Supprimer_Rayon"}/${id}`);
}


///////CRUD etage
getEtageById(id: number): Observable<any>{
  return this.httpClient.get<any>(`${wms+"/WMS/Etage"}/${id}`);
}

ajoutEtageToRayon(etage:Etage): Observable<any> {  
  return this.httpClient.post(wms+"WMS/Ajout_Etage", etage).pipe(
    catchError(this.handleError)

 );
}
editEtage(id: number, etage: Etage): Observable<Object>{
  return this.httpClient.put(`${wms+"/WMS/Modifier_Etage"}/${id}`, etage);
}
supprimerEtage(id: number): Observable<any> {  
  return this.httpClient.delete(`${wms+"/WMS/Supprimer_Etage"}/${id}`);
}

///////CRUD emplacment

GetPositionById(id: number): Observable<Position>{
  return this.httpClient.get<Position>(`${wms+"/WMS/Position"}/${id}`);
}
ajoutPosition(pos:Position): Observable<any> {  
  return this.httpClient.post(wms+"WMS/Ajout_Position",pos).pipe(
    catchError(this.handleError)
 );
}
editPosition(id: number,file:any): Observable<Object>{
  
  return this.httpClient.put(`${wms+"/WMS/Modifier_Position"}/${id}`,{ observe: 'response' }
  )  ;
}
supprimerPosition(id: number): Observable<any> {  
  return this.httpClient.delete(`${wms+"/WMS/Supprimer_Position"}/${id}`);
}

//afficher erreur
private handleError(error:any) {
  let errorMessage = '';
  if (error.error instanceof ErrorEvent) {
    // client-side error
    errorMessage = `Error: ${error.error.message}`;
  } else {
    // server-side error
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  }
  return throwError(errorMessage);
}

//recupere ID dernier position ajoutéé
LastIDPos(): Observable<any> {  
  return this.httpClient.get(wms+"WMS/LastIDPos").pipe(
    catchError(this.handleError)

 );
}
}
