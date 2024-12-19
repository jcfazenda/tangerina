import { Component } from '@angular/core';
import { SidebarComponent } from './sidebar/sidebar.component';  // Importa o SidebarComponent
import { HeaderComponent } from './header/header.component';  // Importa o SidebarComponent
import { RouterModule } from '@angular/router';  // Importa o RouterModule

@Component({
  selector: 'app-root',
  standalone: true,  // Tornando o AppComponent standalone
  imports: [SidebarComponent, HeaderComponent, RouterModule],  // Importa SidebarComponent aqui
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-app';
}
