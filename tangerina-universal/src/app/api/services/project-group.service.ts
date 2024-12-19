import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
 

@Injectable({
    providedIn: 'root'
})
export class ProjectGroupService {
 
    endpoint  = "";   
    constructor(private http: HttpClient) {} 
 
    getProjects(): Observable<any> {
        const endpoint = 'http://localhost:3333/projects-group/getProjectGroup';
        return this.get(endpoint, {}).pipe(catchError(this.handleError));
    }

    getProjectsGroupByProdutorPersona(id_persona: number , id_produtor: string): Observable<any> {

        const body = { 
            id_persona, 
            id_produtor 
        };
        const endpoint = 'http://localhost:3333/projects-group/getProjectsGroupByProdutorPersona';
      
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
        const endpoint = 'http://localhost:3333/projects-group/updateProjectGroup';
      
        return this.http.post<any>(
          `${this.endpoint.trim()}${endpoint}`,
          body
        ).pipe(
          catchError(this.handleError),   
        );
    } 

    updateProjectGroup(item: any): Observable<any> {

        const body = item;
        const endpoint = 'http://localhost:3333/projects-group/updateProjectGroup';
        
        return this.http.post<any>(
            `${this.endpoint.trim()}${endpoint}`,
            body
        ).pipe(
            catchError(this.handleError),   
        );
    } 

    insertProjectGroup(item: any): Observable<any> {

        const body = item;
        const endpoint = 'http://localhost:3333/projects-group/insertProjectGroup';
        
        return this.http.post<any>(
            `${this.endpoint.trim()}${endpoint}`,
            body
        ).pipe(
            catchError(this.handleError),   
        );
    } 
    removeProjectGroup(id: string): Observable<any> {

        const body = { _id: id };
        const endpoint = 'http://localhost:3333/projects-group/removeProjectGroup';
      
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
