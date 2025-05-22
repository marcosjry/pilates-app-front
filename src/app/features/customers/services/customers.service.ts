import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Customers } from '../models/customers';
import { FilterParameters } from '../models/filter-parameters';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  private baseUrl: String = environment.apiUrl;

  private customersSubject = new BehaviorSubject<Customers[]>([]);
  customers$ = this.customersSubject.asObservable();
  private classroomSubject = new BehaviorSubject<string>("");
  classroomType$ = this.classroomSubject.asObservable();
  private contractStatusSubject = new BehaviorSubject<string>("");
  contractStatus$ = this.contractStatusSubject.asObservable();
  private paymentTypeSubject = new BehaviorSubject<string>("");
  paymentType$ = this.paymentTypeSubject.asObservable();
  private nameSubject = new BehaviorSubject<string>("");
  name$ = this.nameSubject.asObservable();

  private name!: string
  private paymentType!: string
  private contractStatus!: string
  private classroomType!: string

  constructor(private http: HttpClient) {
    this.classroomType$.subscribe(classroomType => this.classroomType = classroomType);
    this.contractStatus$.subscribe(contractStatus => this.contractStatus = contractStatus);
    this.paymentType$.subscribe(paymentType => this.paymentType = paymentType);
    this.name$.subscribe(name => this.name = name);
  }

  getCustomers(){
    this.onFilter();
  }

  onFilter(){
    this.http.get<Customers[]>(`${this.baseUrl}/aluno/filter?name=${this.name}&status=${this.contractStatus}&pType=${this.paymentType}&roomType=${this.classroomType}`).subscribe({
      next: response => {
        this.customersSubject.next(response);
      },
      error: error => {
        console.log(error);
      }
    })
  }

  searchOnCustomers(query: string) {
    this.nameSubject.next(query);
    this.onFilter();
  }

  setSearchFilterParameters(parameters: FilterParameters) {
    this.classroomSubject.next(parameters.classroomType);
    this.contractStatusSubject.next(parameters.contractStatus);
    this.paymentTypeSubject.next(parameters.paymentType);
  }

}

