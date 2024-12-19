import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
 

@Injectable({
    providedIn: 'root'
})
export class CardService {
 
    endpoint  = "";   
    constructor(private http: HttpClient) {} 
 
    getCardByProject(id: any): Observable<any> {

        const body = { id_project: id };
        const endpoint = 'http://localhost:3333/card/getCardByProject';
      
        return this.http.post<any>(
          `${this.endpoint.trim()}${endpoint}`,
          body
        ).pipe(
          catchError(this.handleError),   
        );
    }  
     
    insertCard(item: any): Observable<any> {

      const body = item;
      const endpoint = 'http://localhost:3333/card/insert';
    
      return this.http.post<any>(
        `${this.endpoint.trim()}${endpoint}`,
        body
      ).pipe(
        catchError(this.handleError),   
      );
    } 
    updateCard(item: any): Observable<any> {

      const body = item;
      const endpoint = 'http://localhost:3333/card/updateCard';
    
      return this.http.post<any>(
        `${this.endpoint.trim()}${endpoint}`,
        body
      ).pipe(
        catchError(this.handleError),   
      );
    } 
    removeCardByProject(id: any): Observable<any> {

      const body = {_id: id};
      const endpoint = `http://localhost:3333/card/removeCardByProject`;
    
      return this.http.post<any>(
        `${this.endpoint.trim()}${endpoint}`,
        body
      ).pipe(
        catchError(this.handleError),   
      );
    } 

    /* ******** */
    updatePrice(type: string, item: any): Observable<any> {

      const body = item; 
      const endpoint = `http://localhost:3333/${type}/updatePrice`;
    
      return this.http.post<any>(
        `${this.endpoint.trim()}${endpoint}`,
        body
      ).pipe(
        catchError(this.handleError),   
      );
    } 

    updateThumbnail(type: string, item: any): Observable<any> {

      const body = item;
      const endpoint =  `http://localhost:3333/${type}/update`;
    
      return this.http.post<any>(
        `${this.endpoint.trim()}${endpoint}`,
        body
      ).pipe(
        catchError(this.handleError),   
      );
    }  

    insertThumbnail(type: string, item: any): Observable<any> {

      const newThumb = {
 
          id_card:            item.id_card, 
          id_project_group:   item.id_project_group, 
          isVideo:            false,  
          like: false,
          likes: 2001,
          views: 1021,  
          data_transmission: null,

          data_create: new Date().toLocaleString('pt-BR', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit'
          }).replace(/\//g, '').replace(/,/g, '') ,

          icon: 'new-paper',
          icon_image: 'assets/images/logo/tangerina.png',
          thumbnail:          'assets/images/produtos/no-thumbnail.jpg',
          link_video:         'https://www.youtube.com/watch?v=SfFWLq5qhr0&t=2s',
          name:               'Name of Thumbnail',
          title:              'Title Thumbnail',
          subtitle:           'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmo',
          description:        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmo',

          /* prices */
          id_type_card:               item.CardMode,
          price: {
              price:                      '9,90',
              price_installment:          'a vista',
              price_link_payment:         '',
              card_price_num: 3,
              card_max_installments:      12,
              sold:                       211,
              discount_percentage:        25,
              discount_percentage_exist:  true,
              price_installment_mode:     [], 
              price_atual:                '22,90',
              price_promotional:          '19,90',
          } 

      };   

      const body = newThumb;
      const endpoint = `http://localhost:3333/${type}/insert`;
    
      return this.http.post<any>(
        `${this.endpoint.trim()}${endpoint}`,
        body
      ).pipe(
        catchError(this.handleError),   
      );
    }
    removeThumbnail(type: string, id: any): Observable<any> {

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
