import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  private endpoint = 'http://localhost:3333/persona/';  // Substitua pela URL de sua API

  constructor() { }

  getPersona() {
    return axios.get('http://localhost:3333/persona/getPersonas', {
      params: { id_produtor:111 }
    })
    .then(response => response.data)
    .catch(error => {
      console.error('Erro na requisição:', error);
      return Promise.reject('Erro ao obter personas');
    });
  }

  // Exemplo de requisição POST
  getPersonasByProdutor(id_produtor: any) {
    const body = { id_produtor };

    return axios.post(`${this.endpoint}getPersonasByProdutor`, body)
      .then(response => response.data)
      .catch(error => {
        console.error('Erro na requisição:', error.message);
        console.error('Configuração da requisição:', error.config);
        if (error.response) {
          console.error('Resposta do servidor:', error.response);
        }
        return Promise.reject('Erro ao obter personas por produtor');
      });
  }

  // Exemplo de requisição PUT
  updatePersona(item: any) {
    const body = item;

    return axios.put(`${this.endpoint}updatePersona`, body)
      .then(response => response.data)
      .catch(error => {
        console.error('Erro na requisição:', error.message);
        console.error('Configuração da requisição:', error.config);
        if (error.response) {
          console.error('Resposta do servidor:', error.response);
        }
        return Promise.reject('Erro ao atualizar persona');
      });
  } 
}
