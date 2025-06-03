import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import ContractByUser from '../models/last-contract-from-user';
import CustomerInfo from '../models/customer-info';
import { BehaviorSubject, map } from 'rxjs';
import { SharedService } from '../../../shared/services/shared.service';
import { ErrorModalComponent } from '../../../shared/components/error-modal/error-modal.component';
import Cliente from '../models/customer';
import ContractsCustomer from '../models/contracts-from-user';
import { Contracts, CustomerFrequency } from '../models/contracts';
import { FormatTimePipe } from 'app/pipes/format-time.pipe';


@Injectable({
  providedIn: 'root'
})
export class CustomerProfileService {

  private customerInfoSubject = new BehaviorSubject<Cliente>({
    cpf: '', email: '', name: '', id: '', phone: ''
  });
  customerInfo$ = this.customerInfoSubject.asObservable();
  
  private ContractByUserSubject = new BehaviorSubject<ContractByUser>({
    classroomType: '', paymentType: '', status: ''
  });
  private ContractsByUserSubject = new BehaviorSubject<ContractsCustomer[]>([]);
  private frequenciesByCustomerSubject = new BehaviorSubject<CustomerFrequency[]>([]);
  
  frequenciesByCustomer$ = this.frequenciesByCustomerSubject.asObservable();
  contractByUser$ = this.ContractByUserSubject.asObservable();
  contractsByUser$ = this.ContractsByUserSubject.asObservable();

  private baseUrl: string = environment.apiUrl;

  constructor(
    private http: HttpClient, 
    private shared: SharedService, 
    private formatTimePipe: FormatTimePipe) {
    
  }

  getLastContractFromCustomer(customerId: string) {
    this.http.get<ContractByUser>(`${this.baseUrl}/contrato/info-user/${customerId}`).subscribe({
      next: response => {
        this.ContractByUserSubject.next(response);
      },
      error: error => {
        this.shared.openErrorModal(
          'Erro ao carregar Contrato', 
          ErrorModalComponent, 
          'Ocorreu um erro ao tentar carregar o último Contrato do Cliente solicitado, tente novamete.'
        );
      }
    })
  }

  getCustomerInfo(customerId: string) {
    this.http.get<CustomerInfo>(`${this.baseUrl}/aluno/${customerId}`).subscribe({
      next: response => {
        this.customerInfoSubject.next(response.cliente);
      },
      error: error => {
        this.shared.openErrorModal(
          'Erro ao carregar Cliente', 
          ErrorModalComponent, 
          'Ocorreu um erro ao tentar carregar o cliente solicitado, tente novamete.'
        );
      }
    })
  }  

  getContractsFromCustomer(customerId: string) {
    this.http.get<Contracts>(`${this.baseUrl}/contrato/${customerId}`).subscribe({
    next: response => {
      this.ContractsByUserSubject.next(response.contratos);
    },
    error: error => {
      this.shared.openErrorModal(
        'Erro ao carregar Contratos do cliente', 
        ErrorModalComponent, 
        'Ocorreu um erro ao tentar carregar os contratos do cliente solicitado, tente novamete.'
      )
    }
    });
  }

  getFrequenciesFromCustomer(customerId: string) {
    this.http.get<CustomerFrequency[]>(`${this.baseUrl}/aluno/${customerId}/frequencies`).pipe(
      map(response => {
        return response.map(item => ({
          ...item,
          classroomStartTime: this.formatTimePipe.transform(item.classroomStartTime)
        })
      )})
    ).subscribe({
    next: response => {
      this.frequenciesByCustomerSubject.next(response);
    },
    error: error => {
      this.shared.openErrorModal(
        'Erro ao carregar Frequências do cliente', 
        ErrorModalComponent, 
        'Ocorreu um erro ao tentar carregar as Frequências do Cliente solicitado, tente novamete.'
      )
    }
    });
  }
}
