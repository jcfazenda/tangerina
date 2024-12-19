import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'; 
import { from, Observable, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
 
import pako from 'pako'; 

@Injectable({
    providedIn: 'root'
})
export class ImagesService {
 
    url: any;
    endpoint  = "";   
    constructor(private http: HttpClient 
    ) {} 

    setUrl(thumbnail: string): Promise<string> {

        return new Promise((resolve, reject) => {

            this.decompressBase64(thumbnail).then((decompressedBase64) => {

                resolve(decompressedBase64);

            }).catch(error => {

                console.error('Erro ao descomprimir a imagem:', error);
                resolve('assets/images/produtos/no-thumbnail.jpg'); // Retorna a imagem padrão em caso de erro
            });

        });

    }  
    getImagesProjectGroup(id_project_group: string): Observable<any> {

        const body = { 
            id_project_group 
        };
        const endpoint = 'http://localhost:3333/images/getByProjectGroup';
      
        return this.http.post<any>(
          `${this.endpoint.trim()}${endpoint}`,
          body
        ).pipe(
          catchError(this.handleError),   
        );
    }  
    getByThumbnail(id: string): Observable<any> {

        const body = { id_thumbnail: id };
        const endpoint = 'http://localhost:3333/images/getByThumbnail';
      
        return this.http.post<any>(
          `${this.endpoint.trim()}${endpoint}`,
          body
        ).pipe(
          catchError(this.handleError),   
        );
    }

    getImages(id_thumbnail: string): Observable<any> {

        const body = { 
            id_thumbnail 
        };
        const endpoint = 'http://localhost:3333/images/getByThumbnail';
      
        return this.http.post<any>(
          `${this.endpoint.trim()}${endpoint}`,
          body
        ).pipe(
          catchError(this.handleError),   
        );
    } 

    insertImage(item: any): Observable<any> {

        return from(this.compressBase64(item.image)).pipe(

            switchMap(compressedBlob => {

                const formData = new FormData();
                formData.append('image', compressedBlob, 'image.bin'); // Nome do arquivo pode ser ajustado conforme necessário
                formData.append('type_image', item.typeUpdate);
                formData.append('id_project_group', item.id_project_group); 
                formData.append('_id', item._id); 
    
                const endpoint = 'http://localhost:3333/images/insertImage';
                return this.http.post<any>(endpoint, formData); // Não defina o cabeçalho Content-Type
            }),

            catchError(this.handleError)
        );

    } 
    
    compressBase64(base64String: string): Promise<Blob> {
        return new Promise((resolve, reject) => {
            try {
                const base64Data = base64String.split(',')[1] || base64String;
                const cleanedBase64Data = base64Data.replace(/[\n\r]/g, '').replace(/\s+/g, '');
                const binaryString = atob(cleanedBase64Data);
                const uint8Array = new Uint8Array(binaryString.length);
    
                for (let i = 0; i < binaryString.length; i++) {
                    uint8Array[i] = binaryString.charCodeAt(i);
                }
    
                const compressedData = pako.deflate(uint8Array);
                const blob = new Blob([compressedData], { type: 'application/octet-stream' });
                resolve(blob);
            } catch (e) {
                console.error('Erro ao processar Base64:', e);
                reject(e);
            }
        });
    }  

    /* descomprime */
    decompressBase64(base64String: string): Promise<string> {

        return new Promise((resolve, reject) => {

            try {

                // Remove o prefixo base64 se existir
                const base64Data = base64String.split(',')[1] || base64String;
                const compressedData = this.base64ToUint8Array(base64Data);
                const decompressedData = pako.inflate(compressedData); 
                
                const blob = new Blob([decompressedData], { type: 'image/jpeg' }); // Converte o Uint8Array para um Blob 
                const url = URL.createObjectURL(blob);  // Cria uma URL para o Blob

                resolve(url);
    
            } catch (error) {
                console.error('Erro ao descompactar a imagem:', error);
                reject(error);
            }
        });
    }
    
    base64ToUint8Array(base64: string): Uint8Array {
        const binaryString = atob(base64);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
    
        for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
    
        return bytes;
    }
    
    uint8ArrayToBase64(uint8Array: Uint8Array): string {
        let binary = '';
        const len = uint8Array.byteLength;
    
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(uint8Array[i]);
        }
    
        return btoa(binary);
    }


    private handleError(error: any): Observable<never> {
        console.error('Ocorreu um erro:', error);
        return throwError('Erro na solicitação. Por favor, tente novamente mais tarde.');
    }

}
