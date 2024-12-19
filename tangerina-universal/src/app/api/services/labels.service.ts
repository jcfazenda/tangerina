import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
 

@Injectable({
    providedIn: 'root'
})
export class LabelsService {
 
    endpoint  = "";   
    constructor(private http: HttpClient) {} 
  
    getByCard(type: string,id: any): Observable<any> {

      const body = { id_card: id };
      const endpoint = `http://localhost:3333/${type}/getByCard`;
    
      return this.http.post<any>(
        `${this.endpoint.trim()}${endpoint}`,
        body
      ).pipe(
        catchError(this.handleError),   
      );
  }  

    update(type: string, item: any): Observable<any> {

      const body = item;
      const endpoint = `http://localhost:3333/${type}/update`;
    
      return this.http.post<any>(
        `${this.endpoint.trim()}${endpoint}`,
        body
      ).pipe(
        catchError(this.handleError),   
      );
    } 
 
    insert(type: string, item: any): Observable<any> {
 
      const body = item;
      const endpoint = `http://localhost:3333/${type}/insert`;
    
      return this.http.post<any>(
        `${this.endpoint.trim()}${endpoint}`,
        body
      ).pipe(
        catchError(this.handleError),   
      );
    }

    remove(type: string, id: string): Observable<any> {

      const body = {_id: id};
      const endpoint = `http://localhost:3333/${type}/remove`;
    
      return this.http.post<any>(
        `${this.endpoint.trim()}${endpoint}`,
        body
      ).pipe(
        catchError(this.handleError),   
      );
    } 

    private handleError(error: any): Observable<never> {
        console.error('Ocorreu um erro:', error);
        return throwError('Erro na solicitação. Por favor, tente novamente mais tarde.');
    }
 
}
