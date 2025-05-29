import { Component } from '@angular/core';
import { Event as RouterEvent,Router, ActivatedRoute, NavigationEnd, RouterLink, RouterLinkActive } from '@angular/router';
import { Subject, filter, takeUntil } from 'rxjs';

@Component({
  selector: 'app-classroom-navbar',
  imports: [
    RouterLink, 
    RouterLinkActive
  ],
  templateUrl: './classroom-navbar.component.html',
  styleUrl: './classroom-navbar.component.scss'
})
export class ClassroomNavbarComponent {
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
