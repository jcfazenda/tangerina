import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {   throwError } from 'rxjs';
 
import { from, Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';



@Injectable({
    providedIn: 'root'
})
export class ProjectService {
 
    endpoint  = "";   
    constructor(private http: HttpClient) {} _
 
    getProjects(): Observable<any> {
        const endpoint = 'http://localhost:3333/projects/getPersonas';
        return this.get(endpoint, {}).pipe(catchError(this.handleError));
    }

    getProjectsByPersonaProdutor(id_persona: number , id_produtor: string): Observable<any> {

        const body = { 
            id_persona, 
            id_produtor 
        };
        const endpoint = 'http://localhost:3333/projects/getProjectsByPersonaProdutor';
      
        return this.http.post<any>(
          `${this.endpoint.trim()}${endpoint}`,
          body
        ).pipe(
          catchError(this.handleError),   
        );
    } 

    /* update */
    updatePersona(id: any): Observable<any> {

        const body = { id };
        const endpoint = 'http://localhost:3333/projects/updateProject';
      
        return this.http.post<any>(
          `${this.endpoint.trim()}${endpoint}`,
          body
        ).pipe(
          catchError(this.handleError),   
        );
    } 

    updateProject(item: any): Observable<any> { 
       
      const headers  = new HttpHeaders({ 'Content-Type': 'application/json' }); 
      const endpoint = 'http://localhost:3333/projects/update';
      
      return this.http.post<any>(endpoint, item, { headers }).pipe(
          catchError(this.handleError),
          switchMap(response => {
            //console.log('Server response:', response);
              return of(response);
          })
      );
  }
  

    insertProject(item: any): Observable<any> {

        const body     = item; 
        const headers  = new HttpHeaders({ 'Content-Type': 'application/json' });
        const endpoint = 'http://localhost:3333/projects/insert';
        
        return this.http.post<any>(endpoint, body, { headers }).pipe(
          catchError(this.handleError)
        );

    }  
    removeProject(id: string): Observable<any> {

        const body = { _id: id };
        const endpoint = 'http://localhost:3333/projects/remove';
      
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
