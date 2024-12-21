import { Routes } from '@angular/router';
import { BodyComponent } from './body/body.component';
import { PhotosComponent } from './pages/photos/photos.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProfileComponent } from './pages/social-media/profile/profile.component';
import { LoginComponent } from  './pages/authenticator/login/login.component';  
import { AuthGuard } from  './pages/authenticator/auth.guard'; // Guard de autenticação

export const routes: Routes = [
  { path: 'login', component: LoginComponent }, // Página de login (acesso público)
  { path: 'photo', component: PhotosComponent, canActivate: [AuthGuard] }, // Protegido pelo AuthGuard
  { path: 'body', component: BodyComponent, canActivate: [AuthGuard] }, // Protegido pelo AuthGuard
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] }, // Protegido pelo AuthGuard
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] }, // Protegido pelo AuthGuard
  { path: '', redirectTo: 'body', pathMatch: 'full' }, // Redireciona para Body como padrão
  { path: '**', redirectTo: 'body' }, // Redireciona qualquer rota inválida para Body
];
