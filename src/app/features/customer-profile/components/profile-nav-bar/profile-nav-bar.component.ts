import { Component, OnDestroy, OnInit } from '@angular/core';
import {  Event as RouterEvent, NavigationEnd, Router, RouterLink, ActivatedRoute, RouterLinkActive } from '@angular/router';
import { filter, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-profile-nav-bar',
  imports: [
    RouterLink, RouterLinkActive
  ],
  templateUrl: './profile-nav-bar.component.html',
  styleUrl: './profile-nav-bar.component.scss'
})
export class ProfileNavBarComponent implements OnInit, OnDestroy {

  activeRoute: string = '';

  private destroy$ = new Subject<void>();

  constructor(private router: Router, public route: ActivatedRoute) { }
  
  ngOnInit() {
    this.activeRoute = this.router.url;

    this.router.events.pipe(
      filter((event: RouterEvent): event is NavigationEnd => event instanceof NavigationEnd),
      takeUntil(this.destroy$)
    ).subscribe((event: NavigationEnd) => {
      this.activeRoute = event.urlAfterRedirects;
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}


