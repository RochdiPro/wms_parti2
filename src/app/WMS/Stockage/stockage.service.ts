import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

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
//recuperer local by id
getLocalById(id: number): Observable<any>{
  return this.httpClient.get<any>(`${wms+"/WMS/Local"}/${id}`);
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
}
