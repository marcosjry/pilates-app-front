import { Component, OnDestroy, OnInit } from '@angular/core';
import { LayoutComponent } from "../../layout/layout.component";
import { SearchComponent } from '../../shared/components/search/search.component';
import { ContractsListComponent } from "../../shared/components/contracts-list/contracts-list.component";
import { ContractService } from './services/contract.service';
import ContractsCustomer from '../customer-profile/models/contracts-from-user';
import { Subject, takeUntil } from 'rxjs';
import { FilterComponent } from "../customers/components/filter/filter.component";
import { Customers } from '../customers/models/customers';
import { NoContentComponent } from "../../shared/components/no-content/no-content.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contracts',
  imports: [
    LayoutComponent,
    SearchComponent,
    ContractsListComponent,
    FilterComponent,
    NoContentComponent,
    CommonModule
],
  templateUrl: './contracts.component.html',
  styleUrl: './contracts.component.scss'
})
export class ContractsComponent implements OnInit, OnDestroy{

  contracts: ContractsCustomer[] = []

  private destroy$ = new Subject<void>();

  constructor(private service: ContractService) {}
  
  ngOnInit(): void {
    this.service.contracts$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(value => this.contracts = value);
    this.service.getContracts();
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSearch(query: string) {
    this.service.onSearch(query);
  }

  onFilter(filter: Customers) {
    const { contractStatus } = filter;
    this.service.onFilter(contractStatus);
  }

}
