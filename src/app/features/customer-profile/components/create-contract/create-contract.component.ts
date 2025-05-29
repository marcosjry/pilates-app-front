import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIcon } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { Subject, takeUntil } from 'rxjs';
import { GenericInputComponent } from '../../../../shared/components/generic-input/generic-input.component';
import { CustomButtomComponent } from '../../../../shared/components/custom-buttom/custom-buttom.component';
import { LoadingService } from '../../../../shared/services/loading.service';
import { ContractService } from '../../../contracts/services/contract.service';

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

  submitted = false;
  showCreation = false;
  form!: FormGroup
  private destroy$ = new Subject<void>();
  
  constructor(
    private fb: FormBuilder,
    private loading: LoadingService, 
    private service: ContractService,
    private datePipe: DatePipe
  ) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      paymentType: [null, Validators.required],
      contractStatus: [null, Validators.required],
      initDate: [null, Validators.required],
      price: [null, Validators.required]
    });
  }

  toggleFilters() {
    this.showCreation = !this.showCreation;
  }

  ngOnDestroy() { // <--- Implemente o método
    this.destroy$.next();
    this.destroy$.complete();
    console.log("FilterComponent destruído e inscrição cancelada.");
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }
    const formValues = { ...this.form.value };
    const dateOriginal = formValues.initDate;
    const priceOriginal = formValues.price;
    formValues.initDate = this.datePipe.transform(dateOriginal, 'yyyy-MM-dd');
    formValues.price = Number(priceOriginal);
    this.service.createContract(formValues);
  }
}
