import { Component, Input, OnInit } from '@angular/core';
import { ProfileNavBarComponent } from '../profile-nav-bar/profile-nav-bar.component';
import { CustomerProfileService } from '../../services/customer-profile.service';
import CustomerInfo from '../../models/customer-info';
import Cliente from '../../models/customer';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-profile-layout',
  imports: [
    ProfileNavBarComponent,
    MatIcon
  ],
  templateUrl: './profile-layout.component.html',
  styleUrl: './profile-layout.component.scss'
})
export class ProfileLayoutComponent implements OnInit {

  customer!: Cliente
  private destroy$ = new Subject<void>();
  private customerId!: string;

  
  constructor(
    private service: CustomerProfileService, 
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.service.customerInfo$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(value => {
      this.customer = value;
    });
    
    this.customerId = String(this.route.snapshot.paramMap.get('id'));
    if (this.customerId) {
      this.service.getLastContractFromCustomer(this.customerId);
      this.service.getCustomerInfo(this.customerId);
      this.service.getContractsFromCustomer(this.customerId);
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onBack() {
    this.router.navigate(['/clients'])
  }
}
