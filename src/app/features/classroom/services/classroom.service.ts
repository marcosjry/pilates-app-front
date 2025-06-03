import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import ClassroomHours from '../models/classroom-hours';
import { SharedService } from '../../../shared/services/shared.service';
import { ErrorModalComponent } from '../../../shared/components/error-modal/error-modal.component';
import { FormatTimePipe } from '../../../pipes/format-time.pipe';
import ClassroomHourAndDate from '../models/classroom-filter';
import { SuccessModalComponent } from '../../../shared/components/success-modal/success-modal.component';
import { PresentCustomer } from '../models/classrom-present-customers';

@Injectable({
  providedIn: 'root'
})
export class ClassroomService {

  private hourAndDate: ClassroomHourAndDate = { date: '', hour: '' }

  hourSubject = new BehaviorSubject<string>('')
  hour$ = this.hourSubject.asObservable();
  dateSubject = new BehaviorSubject<string>('')
  date$ = this.dateSubject.asObservable();

  pTypeSubject = new BehaviorSubject<string>('');
  pType$ = this.pTypeSubject.asObservable();
  nameSubject = new BehaviorSubject<string>('');
  name$ = this.nameSubject.asObservable();

  private customerName:string = '';
  private customerPaymentType:string = '';

  private classroomIds = new Map<string, string>()

  allAvailabeCustomersSubject = new BehaviorSubject<PresentCustomer[]>([]);
  allAvailableCustomers$ = this.allAvailabeCustomersSubject.asObservable();

  filterAvailabeCustomersSubject = new BehaviorSubject<PresentCustomer[]>([]);
  filterAvailableCustomers$ = this.filterAvailabeCustomersSubject.asObservable();

  private presentCustomersSubject = new BehaviorSubject<PresentCustomer[]>([]);
  presentCustomers$ = this.presentCustomersSubject.asObservable();

  private baseUrl: string = environment.apiUrl;
  private classroomHoursSubject = new BehaviorSubject<ClassroomHours[]>([]);
  classroomHours$ = this.classroomHoursSubject.asObservable();

  constructor(
    private http: HttpClient, 
    private shared: SharedService, 
    private formatTimePipe: FormatTimePipe
  ) {
    this.hour$.subscribe(value => this.hourAndDate.hour = value);
    this.date$.subscribe(value => this.hourAndDate.date = value);
    this.pType$.subscribe(value => this.customerPaymentType = value);
    this.name$.subscribe(value => this.customerName = value);
  }

  getClassroomAvailableHours() {
    this.http.get<ClassroomHours[]>(`${this.baseUrl}/turma/hours-available`).pipe(
      map(response => {
        return response.map(item => ({
          ...item,
          startTime: this.formatTimePipe.transform(item.startTime)
        }))
      })
    ).subscribe({
      next: response => {
        this.classroomHoursSubject.next(response);
        response.map(value => this.classroomIds.set(value.startTime, value.classroomID));
      },
      error: error => {
        this.shared.openErrorModal(
          "Erro ao carregar Horários", 
          ErrorModalComponent,
          "Erro encontrado durante a tentativa de carregar os horários das turmas. Tente novamente."
        );
        console.log(error);
      }
    })
  }

  getClassroomIdFromHour(hour: string) {
    return this.classroomIds.get(hour);
  }
  
  getPresentCustomersOnClassroom() {

    if(this.hourAndDate.date.length === 0 || this.hourAndDate.hour.length === 0) return; 

    this.http.get<PresentCustomer[]>(`${this.baseUrl}/frequencia/search?date=${this.hourAndDate.date}&hour=${this.hourAndDate.hour}`,).subscribe({
      next: response => {
        this.presentCustomersSubject.next(response);
      },
      error: error => {
        this.shared.openErrorModal(
          "Erro ao carregar Clientes", 
          ErrorModalComponent,
          "Erro encontrado durante a tentativa de carregar os Clientes no horário especificado. Tente novamente."
        );
        console.log(error);
      }
    })
  }
  
  getAllAvailableCustomers() {
    this.http.get<PresentCustomer[]>(`${this.baseUrl}/aluno/available?name=${this.customerName}&pType=${this.customerPaymentType}`,).subscribe({
      next: response => {
        this.allAvailabeCustomersSubject.next(response);
      },
      error: error => {
        this.shared.openErrorModal(
          "Erro ao carregar Clientes", 
          ErrorModalComponent,
          "Erro encontrado durante a tentativa de carregar os Clientes no horário especificado. Tente novamente."
        );
        console.log(error);
      }
    })
  }

  onResetProperties() {
    this.hourSubject.next('')
    this.dateSubject.next('')
    this.pTypeSubject.next('')
    this.nameSubject.next('')
    this.allAvailabeCustomersSubject.next([])
    this.filterAvailabeCustomersSubject.next([])
    this.presentCustomersSubject.next([])
    this.classroomHoursSubject.next([])    
  }

  onFilter() {
    this.http.get<PresentCustomer[]>(`${this.baseUrl}/aluno/available?name=${this.customerName}&pType=${this.customerPaymentType}`,).subscribe({
      next: response => {
        this.filterAvailabeCustomersSubject.next(response);
      },
      error: error => {
        this.shared.openErrorModal(
          "Erro ao carregar Clientes", 
          ErrorModalComponent,
          "Erro encontrado durante a tentativa de carregar os Clientes no horário especificado. Tente novamente."
        );
        console.log(error);
      }
    })
  }

  onDeleteFrequency(customerId: string) {
    const classroomId = this.getClassroomIdFromHour(this.hourAndDate.hour);
    this.http.delete<string>(`${this.baseUrl}/frequencia/delete?customerId=${customerId}&classroomId=${classroomId}&date=${this.hourAndDate.date}&hour=${this.hourAndDate.hour}`).subscribe({
      next: response => {
        this.shared.openSuccessModal(
          'Cliente removido da Aula.',
          SuccessModalComponent,
          'O cliente foi removido com sucesso da aula desejada.'
        )
        this.getPresentCustomersOnClassroom();
      },
      error: error => {
        this.shared.openErrorModal(
          "Erro ao Remover Cliente da Aula", 
          ErrorModalComponent,
          "Erro durante a tentativa de remover o Cliente no horário e dia especificado. Tente novamente."
        );
        console.log(error);
      }
    })
  }

  createClassroomFrequenCy(usersId: Set<String>) {
    const customers = Array.from(usersId);
    const classroomId = this.getClassroomIdFromHour(this.hourAndDate.hour);
    console.log(customers);
    this.http.post(`${this.baseUrl}/frequencia/batch-create`, { classroomId: classroomId, date: this.hourAndDate.date, 
      customers: customers }).subscribe({

      next: response => {
        this.shared.openSuccessModal(
          'Aula salva com sucesso!',
          SuccessModalComponent,
          'A aula foi salva com os clientes informados.'
        )
        this.getPresentCustomersOnClassroom();
      },
      error: error => {
        this.shared.openErrorModal(
          "Erro ao tentar Salvar Aula", 
          ErrorModalComponent,
          "Erro durante a tentativa de Salvar Aula no horário e dia especificado. Tente novamente."
        );
        console.log(error);
      }

    })
  }

  saveCustomersPresence(usersId: Set<String>) {
    console.log(this.hourAndDate);
    const customers = Array.from(usersId);
    this.http.put(`${this.baseUrl}/frequencia/batch/change-presences`, { 
      date: this.hourAndDate.date,
      startTime: this.hourAndDate.hour,
      customers: customers
    }).subscribe({
      next: response => {
        this.shared.openSuccessModal(
          'Presenças salvas com sucesso!',
          SuccessModalComponent,
          'As presenças foram salvas para os clientes informados.'
        )
        this.getPresentCustomersOnClassroom();
      },
      error: error => {
        this.shared.openErrorModal(
          "Erro ao tentar Salvar Presenças", 
          ErrorModalComponent,
          "Erro durante a tentativa de Salvar Aula no horário e dia especificado. Tente novamente."
        );
        console.log(error);
      }

    })
  }
}
