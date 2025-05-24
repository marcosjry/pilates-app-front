import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import ContractsCustomer from '../../customer-profile/models/contracts-from-user';
import { SharedService } from '../../../shared/services/shared.service';
import { ErrorModalComponent } from '../../../shared/components/error-modal/error-modal.component';

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

  private name!: string;
  private status!: string;

  constructor(private http: HttpClient, private shared: SharedService) { 
    this.name$.subscribe(value => this.name = value);
    this.contractStatus$.subscribe(value => this.status = value);
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

  onSearch(query: string) {
    this.nameSubject.next(query);
    this.getContracts();   
  }

  onFilter(query: string) {
    this.contractStatusSubject.next(query);
    this.getContracts();   
  }
}
