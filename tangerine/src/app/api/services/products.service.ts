import { Injectable } from '@angular/core';
import axios from 'axios'; // Importe o Axios
import { cards, certificateHolders } from '../mock/cards-dada';
import { Contents, Vantage } from '../mock/product-content';
import { ProductLabels, ProductDetail } from '../mock/product-label';
import {  createNewProject, createNewContent, createNewCapa } from '../mock/projects';
import { Observable, of } from 'rxjs';

import { v4 as uuidv4 } from 'uuid';
import { Acao } from '../model/acao.model';
import { PersonaService } from './persona.service';  
import { ProjectGroupService } from './project-group.service';
import { ProjectService } from './project.service'; 
import { CardService } from './card.service';
 

@Injectable({
    providedIn: 'root'
})
export class ProductsService {

    private localStorageKey = 'projects';
    private localStoragePersona = 'id_type_persona';  

    private _acao: Acao[] = [
        { nuTipoAcao: 'I', deTipoAcao: 'Inclusao' },
        { nuTipoAcao: 'D', deTipoAcao: 'Delecao' },
        { nuTipoAcao: 'U', deTipoAcao: 'Atualizacao' }
      ];

    constructor( 
        private _persona: PersonaService,
        private _projectGroup: ProjectGroupService,
        private _project: ProjectService,
        private _card: CardService,
    ) {}

    getAcoes(): Observable<Acao[]> { 
        return of(this._acao);
    }  

    /* Projects Storage */
    getPosts(): any[] {
        const projects = localStorage.getItem('posts');
        return projects ? JSON.parse(projects) : [];
    }

    getProjects(): any[] {
        const projects = localStorage.getItem(this.localStorageKey);
        return projects ? JSON.parse(projects) : [];
    }
    setStoreProjects(projects: any[]) {
        localStorage.setItem(this.localStorageKey, JSON.stringify(projects));
    } 

    addCapa() {
        return createNewCapa();
    }
    addNewCapa(idPersona: any, idUsuario: any): any {
        const capa = this.addCapa();   
        capa.id_persona = idPersona;

        capa.data_create = new Date().toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        }).replace(/\//g, '').replace(/,/g, '');

        /*  
        this._persona.insertCapa(capa)
            .then(response => {
                return true;
            })
            .catch(error => {
                console.error('Erro ao adicionar capa:', error);
            });
        */ 

        return true;
    }

    /* personas */ 
    getPersonas(): any[] {
        const item = localStorage.getItem('typesPersona');
        return item ? JSON.parse(item) : [];
    }
    updatePersona(update: any): any { 
 
        const _personas =  localStorage.getItem('typesPersona');  

        if (_personas !== null) {

            const persona = JSON.parse(_personas); 
            const index   = persona.items.findIndex((a: { id: string }) => a.id === update.id); 
            if (index !== -1) {
 
                persona.items[index]  = update;   
                localStorage.setItem('typesPersona', JSON.stringify(persona));
                return persona.items[index]; 
            }
 
        } 

    }

    /* cards */ 
    insertCard(project: any): any {
 
        const insert = {

            id_project:         project._id,
            id_project_group:   project.id_project_group,
            id_produtor:        project.id_produtor, 
            id_persona:         project.id_persona,

            icon_image:         'assets/images/logo/tangerina.png',
            icon:               'tangerina',
            flag:               'assets/images/flags/brazil.png',
            name:               'Exibido em 19/08/2024',
            title:              'ALMOÇO DO SISTEMA BLINDA MORAES',
            subtitle:           'Subtitle ipsum dolor sit amet.',
            description:        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmo',
            thumbnail:          'assets/images/produtos/no-thumbnail.jpg',
            link_video:         'assets/images/produtos/no-thumbnail-video.jpg',
            link_page:          'assets/images/produtos/no-thumbnail-video.jpg',
            isVideo:            false,
            data_transmission:  null,
            id_type_card:       1, 
            like:               false,
            likes:              0,
            views:              0,

            data_create: new Date().toLocaleString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            }).replace(/\//g, '').replace(/,/g, ''), 

            card_floating           : [],
            product_detail          : [],
            contents                : [],
            contents_footer_top     : [],
            thumbs                  : [],
            thumbs_video            : [],
            thumbs_drawer_top       : [],
            thumbs_drawer_footer    : [], 
            descriptions            : [],
            descriptions_two        : [],
            descriptions_drawer     : [], 
            price_installment_mode  : [],
            prices                  : [],
            title_drawer_footer     : []
        } 

        this._card.insertCard(insert).subscribe( 

            data => {     
                return true;
            },
            error => { return false;} 
        ); 

        return null; 
    }

    /* ***************************************************************************   */

    /* Project */
    async addProject(typePersona: any, idUsuario: any, idProjectGroup: any): Promise<any> { 
 
        const insert = {

            id_project_group    : idProjectGroup, 
            id_produtor         : idUsuario,
            id_persona          : typePersona.id,
            icon_image          :'assets/images/logo/tangerina.png',

            icon                : 'tangerina', 
            flag                : 'assets/images/flags/brazil.png', 
            name                : 'Project name',
            title               : 'Project title',
            subtitle            : 'Subtitle ipsum dolor sit amet.',
            description         : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmo', 

            thumbnail: 'assets/images/produtos/no-thumbnail.jpg',
            link_video: 'assets/images/produtos/no-thumbnail-video.jpg', 
            isVideo: false,
            discount_percentage:'25', 
            price_atual: '9,90',
            id_type_card: '1',
            
            card: {},

            data_create: new Date().toLocaleString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            }).replace(/\//g, '').replace(/,/g, ''),

        } 
 
        try {
            const data = await this._project.insertProject(insert).toPromise();
            
            const _insert = {
                _id                 : data._id,
                id_project_group    : idProjectGroup, 
                id_produtor         : idUsuario,
                id_persona          : typePersona.id
            };
    
            this.insertCard(_insert); 
            return data;
    
        } catch (error) {
            console.error("Error inserting project", error);
            throw error; // Ou retorne algo mais adequado, como null ou uma mensagem de erro
        }  

    }
    newProject() {
        return createNewProject();
    }
    updateProject(idProjeto: string, update: any): any { 

        const projectsGroup = this.getProjectsGroup();  

        if (projectsGroup) { 
    
            for (let projectGroup of projectsGroup) {

                const projectIndex = projectGroup.project_list.findIndex((a: { id: string }) => a.id === update.id_project_group);
                if (projectIndex !== -1) {
    
                    const campaignIndex = projectGroup.project_list[projectIndex].campanhas.findIndex((a: { id: string })  => a.id === update.id);
    
                    if (campaignIndex !== -1) {

                        projectGroup.project_list[projectIndex].campanhas[campaignIndex] = update; 
    
                        localStorage.setItem('projectsGroup', JSON.stringify(projectsGroup)); 
                        

                        return true;
                    }
                }
            }
        } 

        return true;

    } 
    removeProject(id: string) {

        this._project.removeProject(id).subscribe(

            data => {  
                return true;
            },
            error => { }

        ); 

        return true;

    }
    /* labels detail */
    addNewProductDetail(type: string, idProjeto: string, idCard: string) { 

        const newProductDetail = {
            id:             uuidv4(),
            id_card:        idCard,
            id_projeto:     idProjeto,
            icon:           'thumb-edit',
            name:           'label name',
            title:          'label title',
            subtitle:       'sub title Lorem ipsum dolor sit amet',
            description:    'Lorem ipsum dolor sit amet, consectetur.',
            lists: [
                { id: uuidv4(), subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
                { id: uuidv4(), subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' }
            ]
        };  
 
        const projectsGroup = this.getProjectsGroup();
            
        if (projectsGroup) {

            for (let projectGroup of projectsGroup) {
                for (let item of projectGroup.project_list) {

                    const campanhaIndex = item.campanhas.findIndex((a: { id: string }) => a.id === idProjeto);
                    
                    if (campanhaIndex !== -1) { 
                        
                        // Adiciona o novo label details à lista da campanha  
                        item.campanhas[campanhaIndex].card[type] = item.campanhas[campanhaIndex].card[type] || [];
                        item.campanhas[campanhaIndex].card[type].push(newProductDetail); 
                         
                        localStorage.setItem('projectsGroup', JSON.stringify(projectsGroup)); 

                        return item.campanhas[campanhaIndex].card;
                    }

                }
            }

        } 
    
        return null;

    }
    updateProductDetail(type: string, idProjeto: string, itemId: string, update: any): any {

        const projectsGroup = this.getProjectsGroup();
            
        if (projectsGroup) {

            for (let projectGroup of projectsGroup) {
                for (let item of projectGroup.project_list) {

                    const campanhaIndex = item.campanhas.findIndex((a: { id: string })=> a.id === idProjeto);
                    
                    if (campanhaIndex !== -1) { 
                        
                        //atualiza o item de dentro do card
                        const _type = item.campanhas[campanhaIndex].card[type].findIndex((a: { id: string }) => a.id === itemId);
                        if (_type !== -1) {

                            item.campanhas[campanhaIndex].card[type][_type] = update;
                            localStorage.setItem('projectsGroup', JSON.stringify(projectsGroup)); 

                            return item.campanhas[campanhaIndex].card;
                        }  

                    }

                }
            }

        } 

        return null;

    } 

    removeProductDetail(type: string, idProjeto: number, id: string) {

        const projectsGroup = this.getProjectsGroup();
            
        if (projectsGroup) {

            for (let projectGroup of projectsGroup) {
                for (let item of projectGroup.project_list) {

                    const campanhaIndex = item.campanhas.findIndex((a: { id: number }) => a.id === idProjeto);
                    
                    if (campanhaIndex !== -1) { 
                        
                        //remove o item de dentro do card
                        const _type = item.campanhas[campanhaIndex].card[type].findIndex((a: { id: string }) => a.id === id);
                        if (_type !== -1) {

                            item.campanhas[campanhaIndex].card[type].splice(_type, 1);
                            localStorage.setItem('projectsGroup', JSON.stringify(projectsGroup)); 

                            return item.campanhas[campanhaIndex].card;
                        }  

                    }

                }
            }

        }
    }


    /* labels contents */ 
    addNewProductContents(type: string, idProjeto: string, idCard: string) {  
    
        const newProductContents = {
            id:             uuidv4(),
            id_card:        idCard,
            id_projeto:     idProjeto,
            icon:           'thumb-edit',
            name:           'label name',
            title:          'label title',
            subtitle:       'sub title Lorem ipsum dolor sit amet',
            description:    'Lorem ipsum dolor sit amet, consectetur.',
            lists: [
                { id: uuidv4(), subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
                { id: uuidv4(), subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' }
            ]
        }; 
 
        const projectsGroup = this.getProjectsGroup();
            
        if (projectsGroup) {

            for (let projectGroup of projectsGroup) {
                for (let item of projectGroup.project_list) {

                    const campanhaIndex = item.campanhas.findIndex((a: { id: string })=> a.id === idProjeto);
                    
                    if (campanhaIndex !== -1) { 
                        
                        // Adiciona o novo thumbnail à lista de thumbs da campanha  
                        item.campanhas[campanhaIndex].card[type] = item.campanhas[campanhaIndex].card[type] || [];
                        item.campanhas[campanhaIndex].card[type].push(newProductContents); 
                         
                        localStorage.setItem('projectsGroup', JSON.stringify(projectsGroup));  

                        return item.campanhas[campanhaIndex].card;
                    }

                }
            }

        }    
    
        return null;
    } 
    removeProductContents(type: string, idProjeto: number, id: string) {

        const projectsGroup = this.getProjectsGroup();
            
        if (projectsGroup) {

            for (let projectGroup of projectsGroup) {
                for (let item of projectGroup.project_list) {

                    const campanhaIndex = item.campanhas.findIndex((a: { id: number }) => a.id === idProjeto); 
                    
                    if (campanhaIndex !== -1) { 
                        
                        //remove o item de dentro do card
                        const _type = item.campanhas[campanhaIndex].card[type].findIndex((a: { id: string }) => a.id === id);
                        if (_type !== -1) {

                            item.campanhas[campanhaIndex].card[type].splice(_type, 1);
                            localStorage.setItem('projectsGroup', JSON.stringify(projectsGroup)); 

                            return item.campanhas[campanhaIndex].card;
                        }  

                    }

                }
            }

        }
    }
    updateProductContents(type: string, idProjeto: string, itemId: string, update: any): any {

        const projectsGroup = this.getProjectsGroup();
            
        if (projectsGroup) {

            for (let projectGroup of projectsGroup) {
                for (let item of projectGroup.project_list) {

                    const campanhaIndex = item.campanhas.findIndex((a: { id: string }) => a.id === idProjeto);
                    
                    if (campanhaIndex !== -1) { 
                        
                        //atualiza o item de dentro do card
                        const _type = item.campanhas[campanhaIndex].card[type].findIndex((a: { id: string }) => a.id === itemId);
                        if (_type !== -1) {

                            item.campanhas[campanhaIndex].card[type][_type] = update;
                            localStorage.setItem('projectsGroup', JSON.stringify(projectsGroup)); 

                            return item.campanhas[campanhaIndex].card;
                        }  

                    }

                }
            }

        } 

        return null;

    } 

    //
    setStoreTypePersona(id: number) {
        localStorage.setItem(this.localStoragePersona, JSON.stringify(id));
    }
    getStoreTypePersona() {
        const item = localStorage.getItem(this.localStoragePersona);
        return item ? JSON.parse(item) : [];
    }

    /* promote card */
    promoteCard(Card: any): any {  

        const newPost = {
            
            id:             uuidv4(), 
            id_card:        Card.id,
            id_type_card:   Card.id_type_card,
            id_projeto:     Card.id_projeto,

            likes: 2001,
            views: 1021,  
            data_transmission: null,

            icon:           Card.icon,
            icon_image:     Card.icon_image,
            
            user_name:      'Julio Fazenda',
            avatar: 'assets/images/avatars/julio.jpeg',

            name:           Card.name,
            title:          Card.title,
            description:    Card.description,
            thumbnail:      Card.thumbnail,
            link_video:     Card.link_video,

            data_create: new Date().toLocaleString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            }).replace(/\//g, '').replace(/,/g, ''),  
            
            isVideo: Card.isVideo,
            isLike: true, 
            
            /* prices */
            price: {
                price:                       Card.price,
                price_installment:           Card.price_installment,
                price_link_payment:          Card.price_link_payment,
                card_price_num:              Card.card_price_num,
                card_max_installments:       Card.card_max_installments,
                sold:                        Card.sold,
                discount_percentage:         Card.discount_percentage,
                discount_percentage_exist:   Card.discount_percentage_exist,
                price_installment_mode:      Card.price_installment_mode,
                price_atual:                 Card.price_atual,
                price_promotional:           Card.price_promotional,
            },

            images: [],
            users: []
 
        };   

        const projectsGroup = this.getPosts();
            
        if (projectsGroup) {

            projectsGroup.push(newPost);
            localStorage.setItem('posts', JSON.stringify(projectsGroup)); 

            return true;

        }    
    
        return false;
     
    }

    /* grupos de projetos */ 
    getProjectsGroup(): any[] {
        const projects = localStorage.getItem('projectsGroup');
        return projects ? JSON.parse(projects) : [];
    }
    updateProjectsGroup(item: any) { 

        this._projectGroup.updateProjectGroup(item).subscribe(

            data => {  
                return true;
            },
            error => { }

        ); 

        return true;

    }
    removeProjectGroup(id: string) {

        this._projectGroup.removeProjectGroup(id).subscribe(

            data => {  
                return true;
            },
            error => { }

        ); 

        return true;

    }
    createNewProjectGroup(idUsuario: string, idPersona: any) {
         
        const newProjectGroup = { 
            id_produtor: idUsuario,
            id_persona: idPersona,
            active: true,
            icon: 'project-add', 
            icon_image: 'assets/images/logo/tangerina.png',
            name: 'Project group',
            title: 'Title or hashtag',
            subtitle: 'Sub title',
            description: 'Parabéns, você já pode começar seu projeto',
            itemsPerPage: 4,
            data_create: new Date().toLocaleString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            }).replace(/\//g, '').replace(/,/g, '') ,

            campanhas: [] 
        };
        
        this._projectGroup.insertProjectGroup(newProjectGroup).subscribe(

            data => {  
                return true;
            },
            error => { }

        );  

        return true;
    }

    /* thumbnails */ 
    removeCardByProject(id: any): any {
 
        this._card.removeCardByProject(id).subscribe(

            data => {  
                return true;
            },
            error => { }

        ); 

        return true;

    }

    updateCard(update: any): any {
 
        const projectsGroup = this.getProjectsGroup();
            
        if (projectsGroup) {

            for (let projectGroup of projectsGroup) {
                for (let item of projectGroup.project_list) {

                    const campanhaIndex = item.campanhas.findIndex((a: { id: string }) => a.id === update.id_projeto);
                    
                    if (campanhaIndex !== -1) { 

                        item.campanhas[campanhaIndex].card = update;  
                        localStorage.setItem('projectsGroup', JSON.stringify(projectsGroup)); 

                        return item.campanhas[campanhaIndex].card;

                    }

                }
            }

        } 

        return null;

    }
    updateThumb(type: string, idProjeto: string, itemId: string, update: any): any { 
  
        const projectsGroup = this.getProjectsGroup();

        try { 
                
            if (projectsGroup) {

                for (let projectGroup of projectsGroup) {
                    for (let item of projectGroup.project_list) {

                        const campanhaIndex = item.campanhas.findIndex((a: { id: string }) => a.id === idProjeto);
                        
                        if (campanhaIndex !== -1) { 
                            
                            //atualiza o item de dentro do card
                            const _type = item.campanhas[campanhaIndex].card[type].findIndex((a: { id: string }) => a.id === itemId);
                            if (_type !== -1) {

                                item.campanhas[campanhaIndex].card[type][_type] = update;
                                localStorage.setItem('projectsGroup', JSON.stringify(projectsGroup));  

                                return item.campanhas[campanhaIndex].card;
                            }  

                        }

                    }
                }

            }  
                        
        } catch (error) {
            console.log(error);
        }

    }
    removeThumb(type: string, idProjeto: string, itemId: string): any {

        const projectsGroup = this.getProjectsGroup();
            
        if (projectsGroup) {

            for (let projectGroup of projectsGroup) {
                for (let item of projectGroup.project_list) {

                    const campanhaIndex = item.campanhas.findIndex((a: { id: string }) => a.id === idProjeto);
                    
                    if (campanhaIndex !== -1) { 
                        
                        //remove o item de dentro do card
                        const _type = item.campanhas[campanhaIndex].card[type].findIndex((a: { id: string }) => a.id === itemId);
                        if (_type !== -1) {

                            item.campanhas[campanhaIndex].card[type].splice(_type, 1);
                            localStorage.setItem('projectsGroup', JSON.stringify(projectsGroup)); 

                            return item.campanhas[campanhaIndex].card;
                        }  

                    }

                }
            }

        } 

    }
    createNewThumb(type: string, idCard: string, CardMode: string): any {  

        const newThumb = {
 
            id_card:            idCard,  
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
            id_type_card:               CardMode,
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

        this._card.insertThumbnail(type, newThumb).subscribe( data => {   
                return data;
            }, error => {return null; } 
        );  
     
    }

    /* card floating  */
    updateCardFloating(type: string, update: any): any { 
  
        const projectsGroup = this.getProjectsGroup();

        try { 
                
            if (projectsGroup) {

                for (let projectGroup of projectsGroup) {
                    for (let item of projectGroup.project_list) {

                        const campanhaIndex = item.campanhas.findIndex((a: { id: string }) => a.id === update.id_projeto);
                        
                        if (campanhaIndex !== -1) { 
                            
                            //atualiza o item de dentro do card
                            const _type = item.campanhas[campanhaIndex].card[type].findIndex((a: { id: string }) => a.id === update.id);

                            if (_type !== -1) {

                                item.campanhas[campanhaIndex].card[type][_type] = update;  
                                localStorage.setItem('projectsGroup', JSON.stringify(projectsGroup));  

                                return item.campanhas[campanhaIndex].card;
                            }  

                        }

                    }
                }

            }  
                        
        } catch (error) {
            console.log(error);
        }

    }
    createCardFloating(type: string, idProjeto: string, comumOrPrice: string): any {  

        const newThumb = {
            id: uuidv4(),
            id_card:            idProjeto,
            id_projeto:         idProjeto,
            true:               true,
            isVideo:            false, 
            isPrice: false, 
            active: true,
            active_rodape: false,
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
            id_type_card:               comumOrPrice,
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
 
        };   

        const projectsGroup = this.getProjectsGroup();
            
        if (projectsGroup) {

            for (let projectGroup of projectsGroup) {
                for (let item of projectGroup.project_list) {
  
                    const campanhaIndex = item.campanhas.findIndex((a: { id: number }) => a.id === Number(idProjeto)); 

                    if (campanhaIndex !== -1) { 
                        
                        // Adiciona o novo thumbnail à lista de thumbs da campanha  
                        item.campanhas[campanhaIndex].card[type] = item.campanhas[campanhaIndex].card[type] || [];
                        item.campanhas[campanhaIndex].card[type].push(newThumb); 
                         
                        localStorage.setItem('projectsGroup', JSON.stringify(projectsGroup)); 

                        return item.campanhas[campanhaIndex].card;
                    }

                }
            }

        }    
    
        return null;
     
    }

    /*   */
    createNewContent() {
        return createNewContent();
    }

    getCards() {
        return cards;
    }

    getCardById(id: string) {
        return cards.find(card => card.id === id);
    }

    getProductConteudo() {
        return Contents;
    }

    getProductVantage() {
        return Vantage;
    }

    /* labels */
    getProductLabels() {
        return ProductLabels;
    }

    getProductDetail() {
        return ProductDetail;
    }

    getCertificateHolders() {
        return certificateHolders;
    }
 
}
