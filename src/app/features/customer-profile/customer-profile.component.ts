import { Component, OnInit } from '@angular/core';
import { CustomerProfileService } from './services/customer-profile.service';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { LayoutComponent } from '../../layout/layout.component';
import { ProfileLayoutComponent } from "./components/profile-layout/profile-layout.component";
import Cliente from './models/customer';
import { Subject, takeUntil } from 'rxjs';

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
