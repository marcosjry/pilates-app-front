import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { DateSelectComponent } from "../date-select/date-select.component";
import { ClassroomTimeSlotComponent } from "../classroom-time-slot/classroom-time-slot.component";
import { ClassroomPresentCustomersComponent } from "../classroom-present-customers/classroom-present-customers.component";
import { Subject, takeUntil } from 'rxjs';
import PresentCustomer from '../../models/classrom-present-customers';
import { ClassroomService } from '../../services/classroom.service';
import { CommonModule } from '@angular/common';
import { NoContentComponent } from "../../../../shared/components/no-content/no-content.component";
import { MatIcon } from '@angular/material/icon';
import { SharedService } from '../../../../shared/services/shared.service';
import ClassroomHours from '../../models/classroom-hours';

@Component({
  selector: 'app-classroom-classes',
  imports: [
    DateSelectComponent,
    ClassroomTimeSlotComponent,
    MatIcon,
    CommonModule,
    NoContentComponent
],
  templateUrl: './classroom-classes.component.html',
  styleUrl: './classroom-classes.component.scss'
})
export class ClassroomClassesComponent implements OnInit, OnDestroy {

  presentCustomers: PresentCustomer[] = [];
  private destroy$ = new Subject<void>();  


  constructor(private service: ClassroomService, public shared: SharedService) {}


  ngOnInit(): void {
    this.service.presentCustomers$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(value => this.presentCustomers = value);
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
  
  onDelete(customerId: string) {
    this.service.onDeleteFrequency(customerId);
  }
}
