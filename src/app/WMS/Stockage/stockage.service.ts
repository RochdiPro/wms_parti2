import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Etage } from '../Classe/Stockage/Etage';
import { Hall} from '../Classe/Stockage/Hall';
import { Emplacement } from '../Classe/Stockage/Emplacement';
import { Rayon } from '../Classe/Stockage/Rayon';
import { ZoneInvalideHall } from '../Classe/Stockage/ZoneInvalideHall';
import { Couloir } from '../Classe/Stockage/Couloir';

const infonet = '/ERP/';
const wms = '/WMS/';
@Injectable({
  providedIn: 'root'
})
export class StockageService {

  constructor(private httpClient: HttpClient) { }


//Service liste du locals
Locals(): Observable<any> {  
  return this.httpClient.get(wms+"WMS/Locals").pipe(
    catchError(this.handleError)

 );
}
//service  récupérer local by id
getLocalById(Id_Local: any): Observable<any>{
  return this.httpClient.get<any>(wms+"WMS/Local",{params:{ Id_Local: Id_Local}}).pipe(
    catchError(this.handleError)
  );
 
}

//service verifer l'exsitance du libelle du rayon dans un local
LibelleRayonExiste(local: any,lib: any): Observable<any>{
  return this.httpClient.get<any>(wms+"WMS/LibelleRayonExiste",{params:{ local: local,lib:lib}}).pipe(
    catchError(this.handleError)
  );
 
}
//service verifer l'exsitance du libelle du hall dans un local
LibelleHallExiste(local: any,lib: any): Observable<any>{
  return this.httpClient.get<any>(wms+"WMS/LibelleHallExiste",{params:{ local: local,lib:lib}}).pipe(
    catchError(this.handleError)
  );
 
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

//////CRUD hall

//service recuperer halle par id
getHallById(Id_Hall: any): Observable<any>{
    return this.httpClient.get<Hall>(wms+"WMS/Hall",{params:{ Id_Hall: Id_Hall}}).pipe(
      catchError(this.handleError)
    );
}

//service ajouter hall
ajoutHall(hall:Hall): Observable<any> {  
  return this.httpClient.post(wms+"WMS/Ajout_Hall",hall).pipe(
    catchError(this.handleError)
 );
}

//service ajouter zone invalide
ajoutZoneInvalide(zone:ZoneInvalideHall): Observable<any> {  
  return this.httpClient.post(wms+"WMS/AddZone",zone).pipe(
    catchError(this.handleError)
 );
}
//service modifier halle
editHall(id: number, hall: Hall): Observable<Object>{
  return this.httpClient.put(`${wms+"/WMS/Modifier_Hall"}/${id}`, hall);
}

//service supprimer  halle
supprimerHall(id: number): Observable<any> {  
  return this.httpClient.delete(`${wms+"/WMS/Supprimer_Hall"}/${id}`);
}
//service ZonneExiste
ZoneInvalideExiste(hall: any,ordre_x:any,ordre_y:any): Observable<any>{
  return this.httpClient.get<ZoneInvalideHall>(wms+"WMS/ZoneInvalideExiste",{params:{ hall: hall,ordre_x:ordre_x,ordre_y:ordre_y}}).pipe(
    catchError(this.handleError)
  );
}

//service recuperer zone by halle,x,y
getZoneByHallX_Y(hall: any,ordre_x:any,ordre_y:any): Observable<any>{
  return this.httpClient.get<ZoneInvalideHall>(wms+"WMS/Zone",{params:{ hall: hall,ordre_x:ordre_x,ordre_y:ordre_y}}).pipe(
    catchError(this.handleError)
  );
}
///////CRUD rayon



//service recuperer rayon par id
getRayonById(id: number): Observable<any>{
  return this.httpClient.get<Rayon>(`${wms+"/WMS/Rayon"}/${id}`);
}
//service ajouter rayon
ajoutRayon(rayon:Rayon): Observable<any> {  
  return this.httpClient.post(wms+"WMS/Ajout_Rayon",rayon).pipe(
    catchError(this.handleError)
 );
}

//service modifier rayon
editRayon(id: number, rayon: Rayon): Observable<Object>{
  return this.httpClient.put(`${wms+"/WMS/Modifier_Rayon"}/${id}`, rayon);
}
//service spprimer rayon
supprimerRayon(id: number): Observable<any> {  
  return this.httpClient.delete(`${wms+"/WMS/Supprimer_Rayon"}/${id}`);
}

//service verifer l'exsitance d'ordre du rayon dans un local
OrdreRayonExiste(halle: any,ordre_x: any,ordre_y:any): Observable<any>{
  return this.httpClient.get<any>(wms+"WMS/OrdreRayonExiste",{params:{ halle: halle,ordre_x:ordre_x,ordre_y:ordre_y}}).pipe(
    catchError(this.handleError)
  );
}
//service verifer l'exsitance d'ordre d'etage dans un rayon
OrdreEtageExiste(rayon: any,ordre:any): Observable<any>{
  return this.httpClient.get<any>(wms+"WMS/OrdreEtageExiste",{params:{ rayon: rayon,ordre:ordre}}).pipe(
    catchError(this.handleError)
  );
}
///////CRUD etage

//service recuperer etage par id
getEtageById(id: number): Observable<any>{
  return this.httpClient.get<Etage>(`${wms+"/WMS/Etage"}/${id}`);
}
//service ajouter etage
ajoutEtageToRayon(etage:Etage): Observable<any> {  
  return this.httpClient.post(wms+"WMS/Ajout_Etage", etage).pipe(
    catchError(this.handleError)
 );
}

//service modifier etage
editEtage(id: number, etage: Etage): Observable<Object>{
  return this.httpClient.put(`${wms+"/WMS/Modifier_Etage"}/${id}`, etage);
}
//service spprimer etage
supprimerEtage(id: number): Observable<any> {  
  return this.httpClient.delete(`${wms+"/WMS/Supprimer_Etage"}/${id}`);
}

//service verifer l'exsitance du libelle d'etage dans un local
LibelleEtageExiste(rayon: any,lib: any): Observable<any>{
  return this.httpClient.get<any>(wms+"WMS/LibelleEtageExiste",{params:{ rayon: rayon,lib:lib}}).pipe(
    catchError(this.handleError)
  );
}

///////CRUD emplacment

//service recuperer position par id
GetEmplacmentById(id: number): Observable<Emplacement>{
  return this.httpClient.get<Emplacement>(`${wms+"/WMS/Emplacment"}/${id}`);
}
//service ajouter emplacment
ajoutEmplacment(pos:Emplacement): Observable<any> {  
  return this.httpClient.post(wms+"WMS/Ajout_Emplacment",pos).pipe(
    catchError(this.handleError)
 );
}
editEmplacment(id: number,file:any): Observable<Object>{
  
  return this.httpClient.put(`${wms+"/WMS/Modifier_Emplacment"}/${id}`,{ observe: 'response' }
  )  ;
}
supprimerEmplacment(id: number): Observable<any> {  
  return this.httpClient.delete(`${wms+"/WMS/Supprimer_Emplacment"}/${id}`);
}

//recupere ID dernier position ajoutéé
LastIDPos(): Observable<any> {  
  return this.httpClient.get(wms+"WMS/LastIDPos").pipe(
    catchError(this.handleError)

 );
}

 //CRUD Couloir
getCouloirParHall(hall: any): Observable<any> {  
  return this.httpClient.get(wms+"WMS/CouloirParHall",{params:{ hall: hall}}).pipe(
    catchError(this.handleError)

 );
}

//service ajouter couloir
ajoutCouloir(couloir:Couloir): Observable<any> {  
  return this.httpClient.post(wms+"WMS/Ajout_Couloir",couloir).pipe(
    catchError(this.handleError)
 );
}


//max ordre x rayon 
MaxOrdreX(hall: any): Observable<any>{
  return this.httpClient.get<Hall>(wms+"WMS/maxOrdreX",{params:{ halle: hall}}).pipe(
    catchError(this.handleError)
  );
}
//max ordre y rayon 
MaxOrdreY(hall: any): Observable<any>{
  return this.httpClient.get<Hall>(wms+"WMS/maxOrdreY",{params:{ halle: hall}}).pipe(
    catchError(this.handleError)
  );
}









//afficher Message erreur
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

}
