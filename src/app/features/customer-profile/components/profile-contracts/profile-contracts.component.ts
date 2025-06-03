import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CustomerProfileService } from '../../services/customer-profile.service';
import ContractsCustomer from '../../models/contracts-from-user';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { SharedService } from '../../../../shared/services/shared.service';
import { Subject, takeUntil } from 'rxjs';
import { ContractsListComponent } from "../../../../shared/components/contracts-list/contracts-list.component";
import { CreateContractComponent } from '../create-contract/create-contract.component';

@Component({
  selector: 'app-profile-contracts',
  imports: [
    MatListModule,
    CommonModule,
    ContractsListComponent,
    CreateContractComponent
],
  templateUrl: './profile-contracts.component.html',
  styleUrl: './profile-contracts.component.scss'
})
export class ProfileContractsComponent implements OnInit, OnDestroy{

  contractToEdit!: ContractsCustomer
  contracts: ContractsCustomer[] = []
  private destroy$ = new Subject<void>();
  @ViewChild('ContractChild') childComponentRef!: CreateContractComponent;

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

  setContractToEdit(contract: ContractsCustomer) {
    this.childComponentRef.onEdit(contract);
  }

  ngOnDestroy() { // <--- Implemente o método
    this.destroy$.next();
    this.destroy$.complete();
    console.log("ProfileContractsComponent destruído e inscrição cancelada.");
  }

  
}
