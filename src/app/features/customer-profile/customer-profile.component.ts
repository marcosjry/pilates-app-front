import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutComponent } from '../../layout/layout.component';
import { ProfileLayoutComponent } from "./components/profile-layout/profile-layout.component";


@Component({
  selector: 'app-customer-profile',
  imports: [
    LayoutComponent,
    ProfileLayoutComponent,
    RouterOutlet
],
  templateUrl: './customer-profile.component.html',
  styleUrl: './customer-profile.component.scss'
})
export class CustomerProfileComponent {

  constructor() { }
}
