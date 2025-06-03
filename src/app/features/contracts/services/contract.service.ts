import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import ContractsCustomer from '../../customer-profile/models/contracts-from-user';
import { SharedService } from '../../../shared/services/shared.service';
import { ErrorModalComponent } from '../../../shared/components/error-modal/error-modal.component';
import { CustomerProfileService } from '../../customer-profile/services/customer-profile.service';
import Cliente from '../../customer-profile/models/customer';
import ContractToCreate from '../../customer-profile/models/contract-to-create';
import { SuccessModalComponent } from '../../../shared/components/success-modal/success-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  private baseUrl: string = environment.apiUrl;

  private ContractsSubject = new BehaviorSubject<ContractsCustomer[]>([]);
  contracts$ = this.ContractsSubject.asObservable();
  private nameSubject = new BehaviorSubject<string>('');
  name$ = this.nameSubject.asObservable();
  private contractStatusSubject = new BehaviorSubject<string>('');
  contractStatus$ = this.contractStatusSubject.asObservable();

  private currentCustomer!: Cliente
  private name!: string;
  private status!: string;

  constructor(private http: HttpClient, private shared: SharedService, private service: CustomerProfileService) { 
    this.name$.subscribe(value => this.name = value);
    this.contractStatus$.subscribe(value => this.status = value);
    this.service.customerInfo$.subscribe(value => this.currentCustomer = value);
  }

  createContract(contractInfo: ContractToCreate) {
    console.log(contractInfo)
    const { classroomType, contractStatus, initDate, paymentType, price } = contractInfo;
    this.http.post(`${this.baseUrl}/contrato`, { classroomType, contractStatus, initDate, paymentType, price, customerId: this.currentCustomer.id }).subscribe({
      next: response => {
        this.shared.openSuccessModal(
          'Contrato Criado com Sucesso!', 
          SuccessModalComponent, 
          'O Contrato foi criado com sucesso para o Cliente solicitado.'
        );
        this.service.getContractsFromCustomer(this.currentCustomer.id);
        this.service.getLastContractFromCustomer(this.currentCustomer.id);
        this.service.getCustomerInfo(this.currentCustomer.id);
      },
      error: error => {
        this.shared.openErrorModal(
          'Erro ao salvar Contrato', 
          ErrorModalComponent, 
          'Não foi possível Salvar o Contrato no momento. Tente novamente.'
        );
        console.log(error);
      }
    })
  }

  getContracts() {
    this.http.get<ContractsCustomer[]>(`${this.baseUrl}/contrato/search?status=${this.status}&name=${this.name}`).subscribe({
      next: response => {
        this.ContractsSubject.next(response);
      },
      error: error => {
        this.shared.openErrorModal(
          'Erro ao carregar contratos', 
          ErrorModalComponent, 
          'Não foi possível carregar os Contratos no momento. Tente novamente.'
        );
        console.log(error);
      }
    })
  }

  onEditContract(contract: ContractsCustomer) {
    const { contractId } = contract;
    console.log('contrato atualizado: ', contract);
    this.http.put(`${this.baseUrl}/contrato/${contractId}`, contract).subscribe({
      next: response => {
        this.service.getContractsFromCustomer(this.currentCustomer.id);
        this.service.getLastContractFromCustomer(this.currentCustomer.id);
        this.service.getCustomerInfo(this.currentCustomer.id);
      },
      error: error => {
        this.shared.openErrorModal(
          'Erro ao tentar editar Contrato', 
          ErrorModalComponent, 
          'Não foi possível editar o Contrato no momento. Tente novamente.'
        );
        console.log(error);
      }
    })
  }

  onSearch(query: string) {
    this.nameSubject.next(query);
    this.getContracts();   
  }

  onFilter(query: string) {
    this.contractStatusSubject.next(query);
    this.getContracts();   
  }

  onResetProperties() {
    this.ContractsSubject.next([]);
    this.nameSubject.next('');
    this.contractStatusSubject.next('');
  }
}
