import { Component, OnDestroy, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { TodayClasses } from '../../models/today-classes';
import { MatListModule } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { SharedService } from '../../../../shared/services/shared.service';
import { NoContentComponent } from '../../../../shared/components/no-content/no-content.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { LoadingService } from '../../../../shared/services/loading.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-daily-classes',
  imports: [
    MatListModule,
    MatIcon,
    NgFor,
    NgIf,
    NoContentComponent,
    LoadingSpinnerComponent
  ],
  templateUrl: './daily-classes.component.html',
  styleUrl: './daily-classes.component.scss'
})
export class DailyClassesComponent implements OnInit, OnDestroy {

  todayClasses!: TodayClasses[];
  isLoading: boolean = false;
  private destroy$ = new Subject<void>();

  constructor(
    private service: DashboardService, 
    private datePipe: DatePipe, 
    private shared: SharedService,
    private loading: LoadingService) {
    
  }
  ngOnInit(): void {
    this.service.todayClasses$.pipe(
      takeUntil(this.destroy$)).subscribe(
        value => this.todayClasses = value
      );
    this.loading.isLoading$.pipe(
      takeUntil(this.destroy$)).subscribe(
        value => this.isLoading = value
      );

    this.loading.isLoadingSubject.next(true);
    setTimeout(() => {
      this.loading.isLoadingSubject.next(false);
      this.service.getTodayClasses();
    }, 1500)
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    console.log("ProfileDetailsComponent destruído e inscrição cancelada.");
  }

  formatTime12h(time: string): string | null {
    const date = new Date(`1970-01-01T${time}`);
    return this.datePipe.transform(date, 'hh:mm a'); // Ex: 07:00 PM
  }

  formatText(text: string) {
    return this.shared.capitalizeFirstLetter(text);
  }


}
