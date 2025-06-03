import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { DateSelectComponent } from "../date-select/date-select.component";
import { ClassroomTimeSlotComponent } from "../classroom-time-slot/classroom-time-slot.component";
import { ClassroomPresentCustomersComponent } from "../classroom-present-customers/classroom-present-customers.component";
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { ClassroomService } from '../../services/classroom.service';
import { CommonModule } from '@angular/common';
import { NoContentComponent } from "../../../../shared/components/no-content/no-content.component";
import { SharedService } from '../../../../shared/services/shared.service';
import { LoadingSpinnerComponent } from "../../../../shared/components/loading-spinner/loading-spinner.component";
import { LoadingService } from '@shared/services/loading.service';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { CustomButtomComponent } from "../../../../shared/components/custom-buttom/custom-buttom.component";
import { ErrorModalComponent } from '@shared/components/error-modal/error-modal.component';
import { PresentCustomer } from '../../models/classrom-present-customers';

@Component({
  selector: 'app-classroom-classes',
  imports: [
    DateSelectComponent,
    ClassroomTimeSlotComponent,
    CommonModule,
    NoContentComponent,
    LoadingSpinnerComponent,
    ClassroomPresentCustomersComponent,
    CustomButtomComponent
],
  templateUrl: './classroom-classes.component.html',
  styleUrl: './classroom-classes.component.scss',
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
export class ClassroomClassesComponent implements OnInit, OnDestroy {

  isLoading: boolean = false;
  presentCustomers: PresentCustomer[] = [];
  private date: string = '';
  private hour: string = '';
  private destroy$ = new Subject<void>();  
  selectedCustomerIds = new Set<string>(); 

  constructor(
    private service: ClassroomService, 
    public shared: SharedService,
    private loading: LoadingService) {}


  ngOnInit(): void {
    this.loading.isLoading$.pipe(
      takeUntil(this.destroy$)).subscribe(
        value => this.isLoading = value
    );
    this.service.hour$.pipe(takeUntil(this.destroy$)).subscribe(value => this.hour = value);
    this.service.date$.pipe(takeUntil(this.destroy$)).subscribe(value => this.date = value);
    this.loading.isLoadingSubject.next(true);
    this.service.presentCustomers$.pipe(
      takeUntil(this.destroy$),
      debounceTime(1500)
    ).subscribe(value => { this.presentCustomers = value
      this.loading.isLoadingSubject.next(false);
    });

  }

  onDateChange(date: string) {
    this.service.dateSubject.next(date);
    this.service.getPresentCustomersOnClassroom();
  }

  onFilterHour(hour: string) {
    this.service.hourSubject.next(hour);
    this.service.getPresentCustomersOnClassroom();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.service.onResetProperties();
  }

  onSubmit() {
    if(this.hour.length === 0 || this.date.length === 0 || this.selectedCustomerIds.size === 0) {
      this.shared.openErrorModal(
        'Um ou mais campos necessários.',
        ErrorModalComponent,
        'Selecione um dia, um horário e pelo menos um dos clientes para salvar sua presença na aula.'
      );
      return;
    }
    console.log(this.selectedCustomerIds);
    this.service.saveCustomersPresence(this.selectedCustomerIds);
  }

  handleSelectionChange(event: { id: string, selected: boolean }) {
    if (event.selected) {
        this.selectedCustomerIds.add(event.id);
    } else {
        this.selectedCustomerIds.delete(event.id);
    }
  }
}