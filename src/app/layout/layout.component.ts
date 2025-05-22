import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NavBarComponent } from '../shared/components/nav-bar/nav-bar.component';

@Component({
  selector: 'app-layout',
  imports: [
    MatCardModule,
    MatButtonModule,
    NavBarComponent
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

  @Input() title: string = 'Teste Título';
}
