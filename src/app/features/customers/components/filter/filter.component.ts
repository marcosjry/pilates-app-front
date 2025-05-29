import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIcon } from '@angular/material/icon';
import { Customers } from '../../models/customers';
import { Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'app-filter',
  imports: [
    MatCheckboxModule,
    FormsModule, 
    ReactiveFormsModule,
    CommonModule,
    MatRadioModule,
    MatExpansionModule,
    MatIcon
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent implements OnInit, OnDestroy {

  
  roomTypeOptions = [
    { label: 'Todos', value: '' },
    { label: 'Pilates', value: 'PILATES' },
    { label: 'Hidro', value: 'HIDRO' },
  ];
  
  paymentTypeOptions = [
    { label: 'Todos', value: '' },
    { label: 'Dinheiro', value: 'CASH' },
    { label: 'Gympass', value: 'GYMPASS' },
    { label: 'Cartão de Crédito', value: 'CC' },
    { label: 'Cartão de Débito', value: 'CD' },
    { label: 'Pix', value: 'PIX' },
  ];
  
  contractStatusOptions = [
    { label: 'Todos', value: '' },
    { label: 'Ativo', value: 'ACTIVE' },
    { label: 'Pendente', value: 'PENDING' },
    { label: 'Cancelado', value: 'CANCEL' },
    { label: 'Expirado', value: 'EXPIRED' },
  ];
  
  @Input() type = 'customers';
  @Output() onFilter: EventEmitter<Customers> = new EventEmitter();
  form: FormGroup;
  showFilters = false;
  private destroy$ = new Subject<void>();
  
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      classroomType: [''],
      paymentType: [''],
      contractStatus: ['']
    });
  }

  ngOnInit() {
    this.form.valueChanges.pipe(
      takeUntil(this.destroy$)).subscribe(values => {
        this.onFilter.emit(values)
    });
  }

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

  ngOnDestroy() { // <--- Implemente o método
    this.destroy$.next();
    this.destroy$.complete();
    console.log("FilterComponent destruído e inscrição cancelada.");
  }
}
