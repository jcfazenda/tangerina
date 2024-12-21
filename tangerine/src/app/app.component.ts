import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';  
import { LoginComponent } from './pages/authenticator/login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,  
  imports: [SidebarComponent, HeaderComponent, RouterModule, LoginComponent, CommonModule ],  // Ajuste
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Angular Standalone Example';
  logado: string = 'logout'; // Valor padrão

  constructor(private router: Router) {
    
    // Verifica se está no navegador (client-side)
    if (typeof window !== 'undefined' && localStorage.getItem('logado')) {

        this.logado = localStorage.getItem('logado') || 'logout'; // Recupera o estado de login do localStorage
        this.logado = this.logado.toString(); 
    }
    
  }

  logout(): void {
    localStorage.removeItem('logado');
    this.router.navigate(['/login']);
  }

}
