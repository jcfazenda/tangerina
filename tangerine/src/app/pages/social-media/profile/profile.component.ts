import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileChannelComponent } from './profile-channel/profile-channel.component';
import { ImagesService } from './../../../api/services/images.service';
import { PersonaService } from './../../../api/services/persona.service';


interface Image {
    id_thumbnail: string;
    type_image: string;
    thumbnail: string;
}
interface TypePersona {
    id: number;
    icon: string;
    name: string;
    avatar: string;
    selected: boolean;
    description: string;
    thumb: string;
    title: string;
    thumbnail: string;
    isVideo: boolean;
}[];

@Component({
    selector: 'app-profile',
    imports: [CommonModule, ProfileChannelComponent],
    standalone: true,
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

    @ViewChild('fileInput') fileInput!: ElementRef;
    user: any;

    typeUpdate: any;
    typePersona: any;
    types_persona: TypePersona[] = []; 

    selectedTab: string = 'channel'; // Aba inicial
    currentSection = 'Projetos';
    id_produtor = '66bdfcbee19d9529ee4f733c';

    constructor(private _persona: PersonaService,
        private _image: ImagesService) {

        /* */
        let clear: boolean = true;
        if (clear) {
            localStorage.removeItem('projects');
            localStorage.removeItem('typesPersona');
            localStorage.removeItem('projectsGroup');
            localStorage.removeItem('posts');
        }

        const currentUserString = localStorage.getItem('currentUser');
        if (currentUserString !== null) {
            this.user = JSON.parse(currentUserString);
        }

        this.ListProjects(1);

    }

    ListProjects(idTypePersona: number) {

        this.currentSection = 'Canais'; 

        this._persona.getPersonasByProdutor(this.id_produtor).then((data) => {

            console.log('data: ', data);

            this.types_persona = data;
            this.typePersona = this.types_persona.find(a => a.id === idTypePersona);
            this.setImage(this.typePersona);

        }).catch((error) => {
            console.error('Erro ao carregar personas:', error);
        });
    }

    /* update image */
    triggerFileInput(typeUpdate: string): void {

        this.typeUpdate = typeUpdate;

        if (this.fileInput) {
            this.fileInput.nativeElement.click();
        } else {
            console.error('fileInput is not defined');
        }
    }
    onFileSelected(event: Event): void {

        const input = event.target as HTMLInputElement;

        if (input.files && input.files.length > 0) {

            const file = input.files[0];
            const reader = new FileReader();

            reader.onload = (e: ProgressEvent<FileReader>) => {

                if (e.target) {

                    const base64String = (e.target.result as string).split(',')[1];
                    this.typePersona[this.typeUpdate] = e.target.result as string;

                    const update = {
                        _id: Number(this.typePersona.id),
                        id_project_group: 1,
                        typeUpdate: this.typeUpdate,
                        image: base64String
                    };
                    this._image.insertImage(update).subscribe(
                        data => { },
                        error => { console.error('Error sending image and hash', error); }
                    );

                }
            };

            reader.readAsDataURL(file);
        }
    }

    setImage(result: any) {
        this._image.getByThumbnail(result.id).subscribe(
            (images: Image[]) => {
                images.forEach((_image: Image) => {
                    if (_image.id_thumbnail === String(result.id)) {
                        if (_image.type_image === 'thumb') {
                            this._image.setUrl(_image.thumbnail).then((url) => {
                                this.typePersona.thumb = url;
                            }).catch(error => {
                                this.typePersona.thumb = 'assets/images/produtos/no-thumbnail.jpg';
                            });
                        }
                        if (_image.type_image === 'image_lateral') {
                            this._image.setUrl(_image.thumbnail).then((url) => {
                                this.typePersona.image_lateral = url;
                            }).catch(error => {
                                this.typePersona.image_lateral = 'assets/images/produtos/no-thumbnail.jpg';
                            });
                        }
                        if (_image.type_image === 'image_lateral_direita') {
                            this._image.setUrl(_image.thumbnail).then((url) => {
                                this.typePersona.image_lateral_direita = url;
                            }).catch(error => {
                                this.typePersona.image_lateral_direita = 'assets/images/produtos/no-thumbnail.jpg';
                            });
                        }
                        if (_image.type_image === 'avatar') {
                            this._image.setUrl(_image.thumbnail).then((url) => {
                                this.typePersona.avatar = url;
                            }).catch(error => {
                                this.typePersona.avatar = 'assets/images/produtos/no-thumbnail.jpg';
                            });
                        }
                        return;
                    }
                });
            },
            error => {
                this.typePersona.thumb = 'assets/images/produtos/no-thumbnail.jpg';
                this.typePersona.image_lateral = 'assets/images/produtos/no-thumbnail.jpg';
                this.typePersona.image_lateral_direita = 'assets/images/produtos/no-thumbnail.jpg';
            }
        );
    }

    selectTab(tab: string): void {
        this.selectedTab = tab;
    }
}
