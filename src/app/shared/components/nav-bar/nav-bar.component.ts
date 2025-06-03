import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'app/auth/auth.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  imports: [
    MatIcon
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  activeRoute: string = '';

  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit() {
    // Detecta mudanças de rota para atualizar o item ativo
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.activeRoute = event.urlAfterRedirects;
    });

    // Define a rota inicial
    this.activeRoute = this.router.url;
  }

  navigate(route: string) {
    this.router.navigate([route]);
  }

  logout() {
    this.auth.onLogout();
    this.navigate('/');
  }

}
