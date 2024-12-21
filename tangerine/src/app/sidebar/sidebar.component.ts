import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,  // Torna o Sidebar também independente
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {


  constructor(private router: Router) {}
  
  navigateTo(page: string) {
    this.router.navigate([`/${page}`]);  // Navega para a página /dashboard
  }
 
}
