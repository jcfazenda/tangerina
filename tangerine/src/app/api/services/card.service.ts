import { Injectable } from '@angular/core';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { from, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  endpoint = ''; // Defina seu endpoint base aqui

  constructor() {}

  getCardByProject(id: any): Observable<any> {
    const body = { id_project: id };
    const endpoint = 'http://localhost:3333/card/getCardByProject';

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

  insertCard(item: any): Observable<any> {
    const body = item;
    const endpoint = 'http://localhost:3333/card/insert';

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

  updateCard(item: any): Observable<any> {
    const body = item;
    const endpoint = 'http://localhost:3333/card/updateCard';

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

  removeCardByProject(id: any): Observable<any> {
    const body = { _id: id };
    const endpoint = 'http://localhost:3333/card/removeCardByProject';

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

  // Update Price
  updatePrice(type: string, item: any): Observable<any> {
    const body = item;
    const endpoint = `http://localhost:3333/${type}/updatePrice`;

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

  updateThumbnail(type: string, item: any): Observable<any> {
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

  insertThumbnail(type: string, item: any): Observable<any> {
    const newThumb = {
      id_card: item.id_card,
      id_project_group: item.id_project_group,
      isVideo: false,
      like: false,
      likes: 2001,
      views: 1021,
      data_transmission: null,

      data_create: new Date()
        .toLocaleString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
        .replace(/\//g, '')
        .replace(/,/g, ''),

      icon: 'new-paper',
      icon_image: 'assets/images/logo/tangerina.png',
      thumbnail: 'assets/images/produtos/no-thumbnail.jpg',
      link_video: 'https://www.youtube.com/watch?v=SfFWLq5qhr0&t=2s',
      name: 'Name of Thumbnail',
      title: 'Title Thumbnail',
      subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmo',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmo',

      /* prices */
      id_type_card: item.CardMode,
      price: {
        price: '9,90',
        price_installment: 'a vista',
        price_link_payment: '',
        card_price_num: 3,
        card_max_installments: 12,
        sold: 211,
        discount_percentage: 25,
        discount_percentage_exist: true,
        price_installment_mode: [],
        price_atual: '22,90',
        price_promotional: '19,90',
      },
    };

    const body = newThumb;
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
 
  removeThumbnail(type: string, id: any): Observable<any> {
      const body = { _id: id };
      const endpoint = `http://localhost:3333/${type}/remove`;

      console.log('endpoint: ', endpoint);
      console.log('body: ', body);

      return from(this.post(endpoint, body)).pipe(
        catchError(this.handleError)
      );
  }

   /* POST */
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

  handleError(error: any): string {
    console.error('Erro no Axios:', error);
    if (error.response) {
      console.error('Resposta do servidor:', error.response.data);
      console.error('Código de status:', error.response.status);
    } else if (error.request) {
      console.error('Nenhuma resposta recebida:', error.request);
    } else {
      console.error('Erro ao configurar a solicitação:', error.message);
    }
    return error.message || 'Erro desconhecido';
  }

}
