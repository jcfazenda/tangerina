import { Component } from '@angular/core';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';  

@Component({
  selector: 'app-root',
  standalone: true,  
  imports: [SidebarComponent, HeaderComponent, RouterModule],  // Ajuste
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular Standalone Example';
}
