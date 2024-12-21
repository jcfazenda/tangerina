import { Injectable } from '@angular/core';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { from, Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ProjectGroupService {

    endpoint = ''; // Defina seu endpoint base, se necessário

    constructor() {}

    getProjects(): Observable<any> {
        const endpoint = 'http://localhost:3333/projects-group/getProjectGroup';
        return from(this.get(endpoint, {})).pipe(catchError(this.handleError));
    }

    getProjectsGroupByProdutorPersona(id_persona: number, id_produtor: string): Observable<any> {
        const body = { id_persona, id_produtor };
        const endpoint = 'http://localhost:3333/projects-group/getProjectsGroupByProdutorPersona';

        return from(this.post(endpoint, body)).pipe(
            catchError(this.handleError)
        );
    }

    updatePersona(id: any): Observable<any> {
        const body = { id };
        const endpoint = 'http://localhost:3333/projects-group/updateProjectGroup';

        return from(this.post(endpoint, body)).pipe(
            catchError(this.handleError)
        );
    }

    updateProjectGroup(item: any): Observable<any> {
        const body = item;
        const endpoint = 'http://localhost:3333/projects-group/updateProjectGroup';

        return from(this.post(endpoint, body)).pipe(
            catchError(this.handleError)
        );
    }

    insertProjectGroup(item: any): Observable<any> {
        const body = item;
        const endpoint = 'http://localhost:3333/projects-group/insertProjectGroup';

        return from(this.post(endpoint, body)).pipe(
            catchError(this.handleError)
        );
    }

    removeProjectGroup(id: string): Observable<any> {
        const body = { _id: id };
        const endpoint = 'http://localhost:3333/projects-group/removeProjectGroup';

        return from(this.post(endpoint, body)).pipe(
            catchError(this.handleError)
        );
    }

    /* actions */
    get(path: string, params: { [param: string]: any }): Promise<any> {
        const config: AxiosRequestConfig = {
            params,
        };
        return axios.get(`${this.endpoint.trim()}${path}`, config)
            .then((response: AxiosResponse) => response.data)
            .catch((error: AxiosError) => this.handleError(error));
    }

    private async handleError(error: AxiosError): Promise<never> {
        console.error('Ocorreu um erro:', error);
        return Promise.reject('Erro na solicitação. Por favor, tente novamente mais tarde.');
    }

    /* POST helper */
    private post(endpoint: string, body: any): Promise<any> {
        const config: AxiosRequestConfig = {
            headers: {
                'Content-Type': 'application/json',
            }
        };
        return axios.post(`${this.endpoint.trim()}${endpoint}`, body, config)
            .then((response: AxiosResponse) => response.data)
            .catch((error: AxiosError) => this.handleError(error));
    }
}
