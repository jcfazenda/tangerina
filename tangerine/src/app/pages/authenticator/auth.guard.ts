import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {

    // Verifica se está sendo executado no navegador antes de acessar o localStorage
    if (typeof window !== 'undefined') {
      const isLoggedIn = localStorage.getItem('logado') === 'loggin'; // Comparação correta com string 'true'

      if (isLoggedIn) {
        return true; // Usuário está logado, pode acessar a rota
      }
    }

    // Se não estiver logado ou não estiver no navegador, redireciona para o login
    this.router.navigate(['/login']);
    return false;
  }
}
