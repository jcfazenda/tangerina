import { Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { Posts, TypesPersona } from '../../../../api/data/projects'; 
import { MatDialog } from '@angular/material/dialog';

interface Capa {
  id: number; 
  icon: string; 
  id_persona: string;
  icon_image: string;
  name: string;
  title: string;
  subtitle: string;
  description: string;
  thumbnail: string;
  isVideo: boolean;
  link_video: string;
  image: string;
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
      capas: Capa[];
  }[];
}

@Component({
  selector: 'app-profile-channel',
  imports: [],
  standalone: true,
  templateUrl: './profile-channel.component.html',
  styleUrl: './profile-channel.component.css'
})
export class ProfileChannelComponent {

  @Input() title: string;
  @Input() description: string;
  @Input() item: TypePersona[];  

  typesPersona: any = TypesPersona; 
  typePersona: any = TypesPersona; 

  @ViewChild('fileInput') fileInput!: ElementRef;
  readonly dialog = inject(MatDialog); 

  /* variables */ 
  currentSection: string;
  idProject = 0;
  idTypeProject = 0;  
  user: any;
  card: any;
  cardPrice: any;
  project: any; 
  projects: any[] = [];  

  postagens: any[] = []; 
  posts = Posts;

}
