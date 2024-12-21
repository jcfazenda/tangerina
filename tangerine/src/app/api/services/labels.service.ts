import { Injectable } from '@angular/core';
import axios from 'axios'; // Importe o Axios
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LabelsService {
  endpoint = ''; // Defina seu endpoint base aqui

  constructor() {}

  getByCard(type: string, id: any): Observable<any> {
    const body = { id_card: id };
    const endpoint = `http://localhost:3333/${type}/getByCard`;

    return new Observable((observer) => {
      axios
        .post(`${this.endpoint.trim()}${endpoint}`, body)
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(this.handleError(error));
        });
    });
  }

  update(type: string, item: any): Observable<any> {
    const body = item;
    const endpoint = `http://localhost:3333/${type}/update`;

    return new Observable((observer) => {
      axios
        .post(`${this.endpoint.trim()}${endpoint}`, body)
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(this.handleError(error));
        });
    });
  }

  insert(type: string, item: any): Observable<any> {
    const body = item;
    const endpoint = `http://localhost:3333/${type}/insert`;

    return new Observable((observer) => {
      axios
        .post(`${this.endpoint.trim()}${endpoint}`, body)
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(this.handleError(error));
        });
    });
  }

  remove(type: string, id: string): Observable<any> {
    const body = { _id: id };
    const endpoint = `http://localhost:3333/${type}/remove`;

    return new Observable((observer) => {
      axios
        .post(`${this.endpoint.trim()}${endpoint}`, body)
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(this.handleError(error));
        });
    });
  }

  private handleError(error: any): Observable<never> {
    console.error('Ocorreu um erro:', error);
    return throwError('Erro na solicitação. Por favor, tente novamente mais tarde.');
  }
}
