import { Routes, RouterModule } from '@angular/router';
import { PhotosComponent } from './pages/photos/photos.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './pages/authenticator/auth.guard';

// Importe o componente standalone
import { LoginComponent } from './pages/authenticator/login/login.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: 'login', component: LoginComponent }, // Login standalone
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'photo', component: PhotosComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
