import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
 

@Injectable({
    providedIn: 'root'
})
export class PersonaService {
 
    endpoint  = "";   
    constructor(private http: HttpClient) {} 
 
    getPersona(): Observable<any> {
        const endpoint = 'http://localhost:3333/persona/getPersonas';
        return this.get(endpoint, {}).pipe(catchError(this.handleError));
    }

    getPersonasByProdutor(id_produtor: any): Observable<any> {

        const body = { id_produtor };
        const endpoint = 'http://localhost:3333/persona/getPersonasByProdutor';
      
        return this.http.post<any>(
          `${this.endpoint.trim()}${endpoint}`,
          body
        ).pipe(
          catchError(this.handleError),   
        );
    } 

    /* update */
    updatePersona(item: any): Observable<any> {

        const body = item;
        const endpoint = 'http://localhost:3333/persona/updatePersona';
      
        return this.http.put<any>(
          `${this.endpoint.trim()}${endpoint}`,
          body
        ).pipe(
          catchError(this.handleError),   
        );
    } 

    /* update capa persona */
    updateCapaImage(item: any): Observable<any> {

        const body = item;
        const endpoint = 'http://localhost:3333/capas/updateCapaImage';
        
        return this.http.put<any>(
            `${this.endpoint.trim()}${endpoint}`,
            body
        ).pipe(
            catchError(this.handleError),   
        );
    } 
    removeCapa(item: any): Observable<any> {

        const body = item;
        const endpoint = 'http://localhost:3333/capas/removeCapa';
        
        return this.http.put<any>(
            `${this.endpoint.trim()}${endpoint}`,
            body
        ).pipe(
            catchError(this.handleError),   
        );
    } 

    updateCapa(item: any): Observable<any> {

        const body = item;
        const endpoint = 'http://localhost:3333/capas/updateCapa';
        
        return this.http.put<any>(
            `${this.endpoint.trim()}${endpoint}`,
            body
        ).pipe(
            catchError(this.handleError),   
        );
    } 

    insertCapa(item: any): Observable<any> {

        const body = item;
        const endpoint = 'http://localhost:3333/capas/insertCapa';
        
        return this.http.post<any>(
            `${this.endpoint.trim()}${endpoint}`,
            body
        ).pipe(
            catchError(this.handleError),   
        );
    } 

    /* actions */
    get(path: string, params: { [param: string]: any }): Observable<any> {

        const queryParams = new HttpParams({ fromObject: params });
        return this.http.get<any>(
            `${this.endpoint.trim()}${path}`,
            { params: queryParams }

        ).pipe(

            catchError(this.handleError),

        );

    } 

    private handleError(error: any): Observable<never> {
        console.error('Ocorreu um erro:', error);
        return throwError('Erro na solicitação. Por favor, tente novamente mais tarde.');
    }
 
}
