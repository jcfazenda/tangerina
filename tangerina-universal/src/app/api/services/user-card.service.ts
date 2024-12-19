import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';   
import confetti from 'canvas-confetti'; 
import { v4 as uuidv4 } from 'uuid';
 
import { ProductsService } from './products.service';
import { UserThumb } from '../mock/user-thumb';

@Injectable({
    providedIn: 'root'
})
export class UserCardService { 

    private storageUserCard = 'userCard';
    private storageProjects = 'projects';

    constructor(private _httpClient: HttpClient, private _service: ProductsService) {}

    setStoreProjects(item: any[]) {
        localStorage.setItem(this.storageProjects, JSON.stringify(item));
    }

    setStoreUserCard(item: any) {
        localStorage.setItem(this.storageUserCard, JSON.stringify(item));
    }

    setLike() {

        const count = 800;
        const defaults = { origin: { y: 0.7 } };
        
        function fire(particleRatio: number, opts: any) {
            confetti({ ...defaults, ...opts, particleCount: Math.floor(count * particleRatio) });
        }
        
        fire(0.25, { spread: 26, startVelocity: 55 });
        fire(0.2, { spread: 60 });
        fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
        fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
        fire(0.1, { spread: 120, startVelocity: 45 });
    } 

    getUserThumbFilter(idUser: string, idCard: string, idThumb: string) { 
        return UserThumb.find(a => a.id_user === idUser && a.id_card === idCard && a.id === idThumb);
    }

    getUserCard(idUser: string, idCard: string) {

        const userCardsData = localStorage.getItem(this.storageUserCard);
        let userCards: any[] = [];
    
        // Verifica se os dados existem e são válidos
        if (userCardsData) {
            try {
                userCards = JSON.parse(userCardsData);
                if (!Array.isArray(userCards)) {
                    userCards = [];
                }
            } catch (error) {
                console.error("Error parsing user cards data from localStorage:", error);
                userCards = [];
            }
        }
    
        const userCard = userCards.find((a: any) => a.id_user === idUser && a.id_card === idCard) || {
            id: 0,
            id_user: '',
            id_card: '',
            like: false,
            registered: false,
            receive_channel: false,
            receive_channel_email: false,
            follow_only: false
        };
    
        return userCard;
    }
    
    setLikeUserCard(type: string, idUser: string, idCard: string, thumbId?: string) {

        let userCardsData = localStorage.getItem(this.storageUserCard);
        let userCards: any[] = [];

        if (userCardsData) {
            try {
                userCards = JSON.parse(userCardsData);
                if (!Array.isArray(userCards)) {
                    userCards = [];
                }
            } catch (error) {
                console.error("Error parsing user cards data from localStorage:", error);
                userCards = [];
            }
        }

        let userCard = userCards.find((a: any) => a.id_user === idUser && a.id_card === idCard);

        if (!userCard) {
            userCard = {
                id: uuidv4(),
                id_user: idUser,
                id_card: idCard,
                like: true,
                registered: false,
                receive_channel: false,
                receive_channel_email: false,
                follow_only: false
            };
            userCards.push(userCard);
        } else {
            userCard.like = !userCard.like;
        }

        const userCardIndex = userCards.findIndex((a: any) => a.id_user === idUser && a.id_card === idCard);
        userCards[userCardIndex] = userCard;

        if (userCard.like) { this.setLike(); }
        this.setStoreUserCard(userCards);

        let projects = this._service.getProjects() ?? [];
        let projectIndex = projects.findIndex(p => p.card.id === idCard);

        if (projectIndex !== -1) {
            if (type === 'card') {
                projects[projectIndex].card.like = userCard.like;
            } else if (type === 'thumbs' && thumbId) {
                let thumbIndex = projects[projectIndex].card.thumbs.findIndex(t => t.id === thumbId);
                if (thumbIndex !== -1) {
                    projects[projectIndex].card.thumbs[thumbIndex].like = userCard.like;
                }
            }
            this.setStoreProjects(projects);
        }

        return projects[projectIndex]?.card;
    }

}
