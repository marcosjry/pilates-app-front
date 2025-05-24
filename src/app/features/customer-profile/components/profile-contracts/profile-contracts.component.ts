import { Component, NgModule, OnDestroy, OnInit } from '@angular/core';
import { CustomerProfileService } from '../../services/customer-profile.service';
import ContractsCustomer from '../../models/contracts-from-user';
import { CustomButtomComponent } from '../../../../shared/components/custom-buttom/custom-buttom.component';
import { CommonModule, NgFor } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { SharedService } from '../../../../shared/services/shared.service';
import { MatIcon } from '@angular/material/icon';
import { FormatoDataExtensoPipe } from "../../../../pipes/formato-data-extenso.pipe";
import { TranslateContractStatusPipe } from "../../../../pipes/translate-contract-status.pipe";
import { PaymentFormatoPipe } from "../../../../pipes/payment-formato.pipe";
import { Subject, takeUntil } from 'rxjs';
import { ContractsListComponent } from "../../../../shared/components/contracts-list/contracts-list.component";

@Component({
  selector: 'app-profile-contracts',
  imports: [
    CustomButtomComponent,
    MatListModule,
    CommonModule,
    ContractsListComponent
],
  templateUrl: './profile-contracts.component.html',
  styleUrl: './profile-contracts.component.scss'
})
export class ProfileContractsComponent implements OnInit, OnDestroy{

  contracts: ContractsCustomer[] = []
  private destroy$ = new Subject<void>();

  constructor(
    private service: CustomerProfileService,
    public shared: SharedService
  ) {}

  ngOnInit(): void {
    this.service.contractsByUser$.pipe(
      takeUntil(this.destroy$)).subscribe(
        value => this.contracts = value
    );
  }

  ngOnDestroy() { // <--- Implemente o método
    this.destroy$.next();
    this.destroy$.complete();
    console.log("ProfileContractsComponent destruído e inscrição cancelada.");
  }

  
}
