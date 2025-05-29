import { Component, OnDestroy, OnInit } from '@angular/core';
import { ClassroomTimeSlotComponent } from '../classroom-time-slot/classroom-time-slot.component';
import { DateSelectComponent } from '../date-select/date-select.component';
import { ClassroomService } from '../../services/classroom.service';
import PresentCustomer from '../../models/classrom-present-customers';
import { Subject, takeUntil } from 'rxjs';
import { ClassroomPresentCustomersComponent } from "../classroom-present-customers/classroom-present-customers.component";
import { CommonModule } from '@angular/common';
import { FilterComponent } from '../../../customers/components/filter/filter.component';
import { Customers } from '../../../customers/models/customers';
import { SearchComponent } from "../../../../shared/components/search/search.component";
import { NoContentComponent } from "../../../../shared/components/no-content/no-content.component";
import { CustomButtomComponent } from '../../../../shared/components/custom-buttom/custom-buttom.component';
import { SharedService } from '../../../../shared/services/shared.service';
import { ErrorModalComponent } from '../../../../shared/components/error-modal/error-modal.component';

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
    NoContentComponent
],
  templateUrl: './classroom-schedule.component.html',
  styleUrl: './classroom-schedule.component.scss'
})
export class ClassroomScheduleComponent implements OnInit, OnDestroy {

  allCustomersAvailable: PresentCustomer[] = [];
  filteredCustomers: PresentCustomer[] = [];

  selectedCustomerIds = new Set<string>(); 
  private destroy$ = new Subject<void>();  

  private date: string = '';
  private hour: string = '';


  constructor(private service: ClassroomService, private shared: SharedService) {}

  ngOnInit(): void {
    this.service.allAvailableCustomers$.pipe(takeUntil(this.destroy$)).subscribe(value => this.allCustomersAvailable = value);
    this.service.filterAvailableCustomers$.pipe(takeUntil(this.destroy$)).subscribe(value => this.filteredCustomers = value);
    this.service.hour$.pipe(takeUntil(this.destroy$)).subscribe(value => this.hour = value);
    this.service.date$.pipe(takeUntil(this.destroy$)).subscribe(value => this.date = value);
    this.service.getAllAvailableCustomers();
    this.service.onFilter();
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
    this.service.onFilter();
  }

  onSearch(query: string) {
    this.service.nameSubject.next(query);
    this.service.onFilter();
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
