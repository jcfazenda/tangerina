import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  logado: string = 'logout'; // Simulação simples

  constructor(private router: Router) {}

  signIn(): void { 
    this.logado = 'loggin'; // Marca como logado (substituir por lógica real)
    localStorage.setItem('logado', 'loggin');  // Armazenar como string '1'
    this.router.navigate(['/']); // Redireciona para a aplicação principal
  }


}
