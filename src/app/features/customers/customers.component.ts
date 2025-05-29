import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { LayoutComponent } from '../../layout/layout.component';
import { SearchComponent } from '../../shared/components/search/search.component';
import { CustomersListComponent } from './components/customers-list/customers-list.component';
import { CustomersService } from './services/customers.service';
import { FilterComponent } from './components/filter/filter.component';
import { Customers } from './models/customers';
import { NgIf } from '@angular/common';
import { LoadingService } from '../../shared/services/loading.service';
import { LoadingSpinnerComponent } from "../../shared/components/loading-spinner/loading-spinner.component";
import { NoContentComponent } from '../../shared/components/no-content/no-content.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-customers',
  imports: [
    LayoutComponent,
    SearchComponent,
    CustomersListComponent,
    FilterComponent,
    NgIf,
    LoadingSpinnerComponent,
    NoContentComponent
],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss'
})

export class CustomersComponent implements OnInit, OnDestroy {

  customersList: Customers[] = []
  isLoading: boolean = false;
  private destroy$ = new Subject<void>();
  
  constructor(
    private service: CustomersService, 
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.service.customers$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(value => this.customersList = value);

    this.loadingService.isLoading$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(value => this.isLoading = value);

    this.service.getCustomers();
  }
 
  onSearch(query: string) {
    this.loadingService.isLoadingSubject.next(true);
    setTimeout(() => {
      this.loadingService.isLoadingSubject.next(false);
      this.service.searchOnCustomers(query);
    }, 1500)
  }

  onFilter(query: Customers) {
    const { contractStatus, paymentType, classroomType} = query
    const name = ""
    this.loadingService.isLoadingSubject.next(true);
    this.service.setSearchFilterParameters({ name, contractStatus, paymentType, classroomType });
    setTimeout(() => {
      this.service.onFilter();
      this.loadingService.isLoadingSubject.next(false);
    }, 1500);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.service.onResetProperties();
    console.log("CustomersComponent destruído e inscrições canceladas.");
  }
}