import { Routes } from '@angular/router';
import { BodyComponent } from './body/body.component'; // Exemplo de rota
import { PhotosComponent } from './pages/photos/photos.component'; // Outra rota
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProfileComponent } from './pages/social-media/profile/profile.component';

export const routes: Routes = [
  { path: 'photo', component: PhotosComponent },
  { path: 'body', component: BodyComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: 'body', pathMatch: 'full' }, // Redirecionar para Body por padrão
];
