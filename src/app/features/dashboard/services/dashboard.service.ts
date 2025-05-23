import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { SummaryTotals } from '../models/summary-total';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { TodayClasses } from '../models/today-classes';
import { ExpiringContracts } from '../models/expiring-contracts';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private baseUrl: string = environment.apiUrl;

  private summaryTotalsSubject = new BehaviorSubject<SummaryTotals>({
    countCustomers: 0,
    countActiveContracts: 0
  });
  summaryTotals$ = this.summaryTotalsSubject.asObservable();

  private todayClassesSubject = new BehaviorSubject<TodayClasses[]>([]);
  todayClasses$ = this.todayClassesSubject.asObservable();

  private expiringContractsSubject = new BehaviorSubject<ExpiringContracts[]>([]);
  expiringContracts$ = this.expiringContractsSubject.asObservable();

  constructor(private http: HttpClient) { }

  getTotalSummary() {
    this.http.get<SummaryTotals>(`${this.baseUrl}/contrato/totals`).subscribe({
      next: response => {
        this.summaryTotalsSubject.next(response);
      },
      error: error => {
        console.log(error);
      }
    });
  }

  getTodayClasses() {
    this.http.get<TodayClasses[]>(`${this.baseUrl}/turma/today-classes`).subscribe({
      next: response => {
        this.todayClassesSubject.next(response);
      },
      error: error => {
        console.log(error);
      }
    })
  }

  getExpiringContracts() {
    this.http.get<ExpiringContracts[]>(`${this.baseUrl}/contrato/expiring-contracts`).subscribe({
      next: response => {
        this.expiringContractsSubject.next(response);
      },
      error: error => {
        console.log(error);
      }
    })
  }
}
