import { Injectable } from '@angular/core';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { from, Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ProjectService {

    endpoint = ''; // Defina seu endpoint base, se necessário

    constructor() {}

    getProjects(): Observable<any> {
        const endpoint = 'http://localhost:3333/projects/getPersonas';
        return from(this.get(endpoint, {})).pipe(catchError(this.handleError));
    }

    getProjectsByPersonaProdutor(id_persona: number, id_produtor: string): Observable<any> {
        const body = { id_persona, id_produtor };
        const endpoint = 'http://localhost:3333/projects/getProjectsByPersonaProdutor';

        return from(this.post(endpoint, body)).pipe(
            catchError(this.handleError)
        );
    }

    updatePersona(id: any): Observable<any> {
        const body = { id };
        const endpoint = 'http://localhost:3333/projects/updateProject';

        return from(this.post(endpoint, body)).pipe(
            catchError(this.handleError)
        );
    }

    updateProject(item: any): Observable<any> {
        const endpoint = 'http://localhost:3333/projects/update';

        return from(this.post(endpoint, item)).pipe(
            catchError(this.handleError),
            switchMap((response) => {
                return [response];
            })
        );
    }

    insertProject(item: any): Observable<any> {
        const body = item;
        const endpoint = 'http://localhost:3333/projects/insert';

        return from(this.post(endpoint, body)).pipe(
            catchError(this.handleError)
        );
    }

    removeProject(id: string): Observable<any> {
        const body = { _id: id };
        const endpoint = 'http://localhost:3333/projects/remove';

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
