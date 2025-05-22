import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { NavigationEnd, Router } from '@angular/router';
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

  constructor(private router: Router) { }

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
}
