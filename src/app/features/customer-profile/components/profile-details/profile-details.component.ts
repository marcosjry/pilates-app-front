import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import Cliente from '../../models/customer';
import { CustomerProfileService } from '../../services/customer-profile.service';
import { MatIcon } from '@angular/material/icon';
import ContractByUser from '../../models/last-contract-from-user';
import { TranslateContractStatusPipe } from "../../../../pipes/translate-contract-status.pipe";
import { PaymentFormatoPipe } from "../../../../pipes/payment-formato.pipe";
import { SharedService } from '../../../../shared/services/shared.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-profile-details',
  imports: [
    MatIcon,
    TranslateContractStatusPipe,
    PaymentFormatoPipe,
    CommonModule
],
  templateUrl: './profile-details.component.html',
  styleUrl: './profile-details.component.scss'
})
export class ProfileDetailsComponent implements OnInit, OnDestroy{

  customer!: Cliente
  contract!: ContractByUser
  private destroy$ = new Subject<void>();
  
  constructor(
    private service: CustomerProfileService, 
    public shared: SharedService, 
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.service.customerInfo$.pipe(
      takeUntil(this.destroy$)).subscribe(
        value => this.customer = value
      );
    this.service.contractByUser$.pipe(
      takeUntil(this.destroy$)).subscribe(
        value => this.contract = value
      );
  }

  
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    console.log("ProfileDetailsComponent destruído e inscrição cancelada.");
  }

  
  

}
