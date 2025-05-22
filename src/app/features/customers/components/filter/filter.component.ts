import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIcon } from '@angular/material/icon';
import { Customers } from '../../models/customers';


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
export class FilterComponent {
  showFilters = false;

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
  ];

  contractStatusOptions = [
    { label: 'Todos', value: '' },
    { label: 'Ativo', value: 'ACTIVE' },
    { label: 'Pendente', value: 'PENDING' },
    { label: 'Cancelado', value: 'CANCEL' },
    { label: 'Expirado', value: 'EXPIRED' },
  ];

  @Output() onFilter: EventEmitter<Customers> = new EventEmitter();
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      classroomType: [''],
      paymentType: [''],
      contractStatus: ['']
    });
  }

  ngOnInit() {
    // Monitorar alterações nos valores do formulário
    this.form.valueChanges.subscribe(values => {
      this.onFilter.emit(values);
      // Aqui você pode chamar métodos para filtrar dados com base nas seleções
    });
  }

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

  // Método opcional para verificar se há filtros ativos
  hasActiveFilters(): boolean {
    const values = this.form.value;
    return values.roomType !== '' || 
           values.paymentType !== '' || 
           values.contractStatus !== '';
  }

}
