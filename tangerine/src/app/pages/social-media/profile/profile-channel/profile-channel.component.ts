import { Component, ElementRef, inject, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Posts, TypesPersona } from '../../../../api/data/projects'; 
import { MatDialog } from '@angular/material/dialog';
import { ImagesService } from '../../../../api/services/images.service';
import { ProjectGroupService } from '../../../../api/services/project-group.service';
import { ProductsService } from '../../../../api/services/products.service';
import { UtilService } from '../../../../util/util.service';
import { CardService } from '../../../../api/services/card.service';

export interface Cards {
  data_create: string; // "04092024 14:48:40"
  description: string; 
  discount_percentage: string; 
  flag: string;  
  icon: string;  
  icon_image: string;  
  id_persona: number; 
  id_produtor: string; 
  id_project_group: string; // "66d21e86d0ed7bc36aab628a"
  id_type_card: string;  
  isVideo: boolean;  
  link_video: string; // Link para vídeo: "https://www.youtube.com/watch?v=6BzbCDLgWb4"
  name: string; 
  price_atual: string; 
  subtitle: string; 
  thumbnail: string; 
  title: string; 
  _id: string; // "66d89d78abcd478fa0b9d144"
}

interface TypePersona {
  id_produtor: string;
  items: {
      id: number; 
      icon: string; 
      icon_image: string;
      name: string;
      avatar: string;
      selected: boolean;
      description: string;
      thumb: string;
      title: string;
      thumbnail: string;
      isVideo: boolean;
      campanhas: Cards[];
  }[];
}

@Component({
  selector: 'app-profile-channel',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './profile-channel.component.html',
  styleUrl: './profile-channel.component.css'
})
export class ProfileChannelComponent implements OnInit {

  id_produtor = '66bdfcbee19d9529ee4f733c';

  @Input() title: string = '';
  @Input() description = '';
  @Input() item?: TypePersona[]; 

  view = 'projects';

  cards?: Cards[];  
  typePersona: any;   
  projects: any; 

  @ViewChild('fileInput') fileInput!: ElementRef;
  readonly dialog = inject(MatDialog);  

  constructor(private _projectGroup: ProjectGroupService,
    private _service: ProductsService, 
    private _util: UtilService,
    private _card: CardService,
              private _image: ImagesService) {

               
  } 
 
  ngOnInit(): void { 

    this.typePersona = this.item;
    this.getProjectsGroupByProdutorPersona();
  }

  setLike(item: any) {

      this._util.setLike();
  }

  /* projetos */  
  getProjectsGroupByProdutorPersona() {  
 
        this._projectGroup.getProjectsGroupByProdutorPersona(this.typePersona.id, this.id_produtor).subscribe( data => {

            this.projects = data;
            this.view = 'projects';
            console.log('projects: ', this.projects); 
        },
        error => {
            console.error('Erro ao buscar personas:', error);
        }
   
    ); 
  } 
  addNewProjectGroup() {  

      const add =  this._service.createNewProjectGroup(this.id_produtor, this.typePersona.id); 
      if (add) {   
          this.getProjectsGroupByProdutorPersona();    
      }  
  } 
  removeGroupProject(id: any) {    
    const add =  this._service.removeProjectGroup(id); 
    if (add) {   
      this.getProjectsGroupByProdutorPersona();   
    } 
  }  

  /* thumbnails & campanhas */ 
  viewCampanhas(item: any) { 
    this.view = 'cards';
    this.cards = item.campanhas;   
  }

  removeThumb(type: string, id: any) {    

    this._card.removeThumbnail(type, id).subscribe( data => {    

      console.log('removeThumb: ', data);

        if (data) {     
              if (data && this.cards) { // Verifica se 'data' é válido e 'this.cards' não é undefined
                  this.cards = this.cards.filter((a) => a._id !== id);  

                  this.viewCampanhas(this.cards);
              } 
        } 
        
    }, error => {return null; } 
    ); 
}

}
