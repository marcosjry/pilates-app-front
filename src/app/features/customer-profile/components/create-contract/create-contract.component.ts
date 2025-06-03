import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { Subject } from 'rxjs';
import { GenericInputComponent } from '../../../../shared/components/generic-input/generic-input.component';
import { CustomButtomComponent } from '../../../../shared/components/custom-buttom/custom-buttom.component';
import { ContractService } from '../../../contracts/services/contract.service';
import ContractsCustomer from '../../models/contracts-from-user';

@Component({
  selector: 'app-create-contract',
  imports: [
    FormsModule, 
    ReactiveFormsModule,
    CommonModule,
    GenericInputComponent,
    CustomButtomComponent,
    MatIcon
  ],
  templateUrl: './create-contract.component.html',
  styleUrl: './create-contract.component.scss'
})
export class CreateContractComponent implements OnInit, OnDestroy {

  paymentTypes = [
    { value: 'CC', label: 'Cartão de Crédito' },
    { value: 'CD', label: 'Cartão de Débito' },
    { value: 'CASH', label: 'Dinheiro' },
    { value: 'GYMPASS', label: 'Gympass' },
    { value: 'PIX', label: 'Pix' }
  ];

  contractStatusOptions = [
    { label: 'Ativo', value: 'ACTIVE' },
    { label: 'Pendente', value: 'PENDING' },
    { label: 'Cancelado', value: 'CANCEL' },
    { label: 'Expirado', value: 'EXPIRED' },
  ];

  action:string = 'Crie um Contrato'
  private contractId: string = '';
  submitted = false;
  showCreation = false;
  form!: FormGroup
  formToEdit!: FormGroup
  textButton: string = 'Adicionar Novo Contrato'

  private destroy$ = new Subject<void>();
  type:string = 'creation'

  constructor(
    private fb: FormBuilder, 
    private service: ContractService,
    private datePipe: DatePipe
  ) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      paymentType: [null, Validators.required],
      contractStatus: [null, Validators.required],
      initDate: [null, Validators.required],
      endDate: [null],
      price: [null, Validators.required]
    });
  }

  toggleFilters() {
    this.showCreation = !this.showCreation;
    if(!this.showCreation) {
      setTimeout(() => {
        this.resetFormValues();
        this.action = `Crie um Contrato`
        this.textButton = 'Adicionar Novo Contrato'
        this.type = 'creation'
      }, 700);
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    
    console.log("FilterComponent destruído e inscrição cancelada.");
  }

  onSubmit() {
    this.submitted = true;
    
    const formValues = { ...this.form.value };
    console.log('Valores formulário:', this.form.value)
    const newInitDate = formValues.initDate;
    const newEndDate = formValues.endDate;
    const priceOriginal = formValues.price;
    console.log('Data expiração',newEndDate)
    console.log('Data inicio',newInitDate)
    formValues.initDate = this.datePipe.transform(newInitDate, 'yyyy-MM-dd');
    formValues.endDate = this.datePipe.transform(newEndDate, 'yyyy-MM-dd');
    formValues.price = Number(priceOriginal);

    console.log(this.type);
    if (this.type === 'edit') return this.toEdit(formValues);

    if (this.form.invalid) {
      Object.values(this.form.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }
    this.service.createContract(formValues) 
  }

  toEdit(contract: ContractsCustomer) {
    this.toggleFilters();
    contract.contractId = this.contractId;
    this.service.onEditContract(contract);
  }

  resetFormValues() {
    this.form.controls['contractStatus'].setValue(null)
    this.form.controls['endDate'].setValue(null)
    this.form.controls['initDate'].setValue(null)
    this.form.controls['paymentType'].setValue(null)
    this.form.controls['price'].setValue(null)
  }

  onEdit(contract: ContractsCustomer) {
    const { contractId ,contractStatus, endDate, initDate, paymentType, price } = contract;

    this.contractId = contractId;
    this.type = 'edit';
    this.action = `Editando Contrato`;
    this.textButton = 'Salvar Contrato';

    const initDateParts = initDate.split('-').map(part => parseInt(part, 10));
    const localInitDate = new Date(initDateParts[0], initDateParts[1] - 1, initDateParts[2]);
    const endDateParts = endDate.split('-').map(part => parseInt(part, 10));
    const localEndDate = new Date(endDateParts[0], endDateParts[1] - 1, endDateParts[2]);

    this.form.controls['initDate'].setValue(localInitDate);
    this.form.controls['endDate'].setValue(localEndDate);
    this.form.controls['contractStatus'].setValue(contractStatus);
    this.form.controls['paymentType'].setValue(paymentType);
    this.form.controls['price'].setValue(price);
    
    this.toggleFilters();
  }

}
