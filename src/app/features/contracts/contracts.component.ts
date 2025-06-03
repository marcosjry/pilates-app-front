import { Component, OnDestroy, OnInit } from '@angular/core';
import { LayoutComponent } from "../../layout/layout.component";
import { SearchComponent } from '@shared/components/search/search.component';
import { ContractsListComponent } from "@shared/components/contracts-list/contracts-list.component";
import { ContractService } from './services/contract.service';
import ContractsCustomer from '../customer-profile/models/contracts-from-user';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { FilterComponent } from "../customers/components/filter/filter.component";
import { Customers } from '../customers/models/customers';
import { NoContentComponent } from "@shared/components/no-content/no-content.component";
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from "../../shared/components/loading-spinner/loading-spinner.component";
import { LoadingService } from '@shared/services/loading.service';

@Component({
  selector: 'app-contracts',
  imports: [
    LayoutComponent,
    SearchComponent,
    ContractsListComponent,
    FilterComponent,
    NoContentComponent,
    CommonModule,
    LoadingSpinnerComponent
],
  templateUrl: './contracts.component.html',
  styleUrl: './contracts.component.scss'
})
export class ContractsComponent implements OnInit, OnDestroy{

  contracts: ContractsCustomer[] = []
  isLoading: boolean = false;
  private destroy$ = new Subject<void>();

  constructor(private service: ContractService, private loading: LoadingService) {}
  
  ngOnInit(): void {
    this.service.contracts$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(value => this.contracts = value);
    this.loading.isLoading$.pipe(takeUntil(this.destroy$), debounceTime(1500))
    .subscribe(value => this.isLoading = value);

    this.isLoading = true;
    this.service.getContracts();
    this.loading.isLoadingSubject.next(false);
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.service.onResetProperties();
  }

  onSearch(query: string) {
    this.isLoading = true;
    this.service.onSearch(query);
    this.loading.isLoadingSubject.next(false);
  }

  onFilter(filter: Customers) {
    const { contractStatus } = filter;
    this.isLoading = true;
    this.service.onFilter(contractStatus);
    this.loading.isLoadingSubject.next(false);
  }

}
