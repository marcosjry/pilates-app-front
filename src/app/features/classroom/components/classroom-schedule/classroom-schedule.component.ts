import { Component, OnDestroy, OnInit } from '@angular/core';
import { ClassroomTimeSlotComponent } from '../classroom-time-slot/classroom-time-slot.component';
import { DateSelectComponent } from '../date-select/date-select.component';
import { ClassroomService } from '../../services/classroom.service';
import { BehaviorSubject, debounceTime, Subject, takeUntil } from 'rxjs';
import { ClassroomPresentCustomersComponent } from "../classroom-present-customers/classroom-present-customers.component";
import { CommonModule } from '@angular/common';
import { FilterComponent } from '../../../customers/components/filter/filter.component';
import { Customers } from '../../../customers/models/customers';
import { SearchComponent } from "../../../../shared/components/search/search.component";
import { NoContentComponent } from "../../../../shared/components/no-content/no-content.component";
import { CustomButtomComponent } from '../../../../shared/components/custom-buttom/custom-buttom.component';
import { SharedService } from '../../../../shared/services/shared.service';
import { ErrorModalComponent } from '../../../../shared/components/error-modal/error-modal.component';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';
import { LoadingSpinnerComponent } from '@shared/components/loading-spinner/loading-spinner.component';
import { LoadingService } from '@shared/services/loading.service';
import { PresentCustomer } from '../../models/classrom-present-customers';

@Component({
  selector: 'app-classroom-schedule',
  imports: [
    DateSelectComponent,
    ClassroomTimeSlotComponent,
    ClassroomPresentCustomersComponent,
    FilterComponent,
    CommonModule,
    SearchComponent,
    CustomButtomComponent,
    NoContentComponent,
    LoadingSpinnerComponent
],
  templateUrl: './classroom-schedule.component.html',
  styleUrl: './classroom-schedule.component.scss',
  animations: [
    trigger('listAnimation', [
      transition('* => *', [ 
        query(':enter', [ 
          style({ opacity: 0, transform: 'translateY(20px)' }), 
          stagger(100, [ 
            animate('0.4s ease-out', style({ opacity: 1, transform: 'translateY(0)' })) 
          ])
        ], { optional: true }) 
      ])
    ])
  ]
})
export class ClassroomScheduleComponent implements OnInit, OnDestroy {

  allCustomersAvailable: PresentCustomer[] = [];
  filteredCustomers: PresentCustomer[] = [];

  selectedCustomerIds = new Set<string>(); 
  private destroy$ = new Subject<void>();  

  filterIsLoadingSubject = new BehaviorSubject<boolean>(false);
  filterIsLoading$ = this.filterIsLoadingSubject.asObservable();


  isLoading: boolean = false;
  filterIsLoading: boolean = false;
  private date: string = '';
  private hour: string = '';


  constructor(
    private service: ClassroomService, 
    private shared: SharedService, 
    private loading: LoadingService
  ) {}

  ngOnInit(): void {
    this.service.allAvailableCustomers$.pipe(takeUntil(this.destroy$)).subscribe(value => this.allCustomersAvailable = value);
    this.loading.isLoading$.pipe(takeUntil(this.destroy$), debounceTime(1500)).subscribe(value => this.isLoading = value);
    this.filterIsLoading$.pipe(takeUntil(this.destroy$), debounceTime(800)).subscribe(value => this.filterIsLoading = value);
    this.service.filterAvailableCustomers$.pipe(takeUntil(this.destroy$)).subscribe(value => {this.filteredCustomers = value;});
    this.service.hour$.pipe(takeUntil(this.destroy$)).subscribe(value => this.hour = value);
    this.service.date$.pipe(takeUntil(this.destroy$)).subscribe(value => this.date = value);
    
    this.isLoading = true;
    this.service.getAllAvailableCustomers();
    this.service.onFilter();
    this.loading.isLoadingSubject.next(false);

  }

  onDateChange(date: string) {
    this.service.dateSubject.next(date);
  }

  onFilterHour(hour: string) {
    this.service.hourSubject.next(hour);
  }

  onFilter(query: Customers) {
    const { paymentType } = query;
    this.service.pTypeSubject.next(paymentType);
    this.filterIsLoading = true;
    this.service.onFilter();
    this.filterIsLoadingSubject.next(false);
  }

  onSearch(query: string) {
    this.service.nameSubject.next(query);
    this.filterIsLoading = true;
    this.service.onFilter();
    this.filterIsLoadingSubject.next(false);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.service.onResetProperties();
  }

  handleSelectionChange(event: { id: string, selected: boolean }) {
    if (event.selected) {
        this.selectedCustomerIds.add(event.id);
    } else {
        this.selectedCustomerIds.delete(event.id);
    }
  }

  onSubmit() {
    if(this.hour.length === 0 || this.date.length === 0 || this.selectedCustomerIds.size === 0) {
      this.shared.openErrorModal(
        'Um ou mais campos necessários.',
        ErrorModalComponent,
        'Selecione um dia, um horário e pelo menos um dos clientes para salvar a aula.'
      );
      return;
    }
    this.service.createClassroomFrequenCy(this.selectedCustomerIds);
  }

}
