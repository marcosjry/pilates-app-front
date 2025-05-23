import { Component, OnInit } from '@angular/core';
import { LayoutComponent } from '../../layout/layout.component';
import { GenericInputComponent } from '../../shared/components/generic-input/generic-input.component';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CustomButtomComponent } from '../../shared/components/custom-buttom/custom-buttom.component';
import { CustomersService } from '../customers/services/customers.service';
import { LoadingService } from '../../shared/services/loading.service';

@Component({
  selector: 'app-create-customer',
  imports: [
    LayoutComponent,
    GenericInputComponent,
    ReactiveFormsModule,
    CommonModule,
    CustomButtomComponent
  ],
  templateUrl: './create-customer.component.html',
  styleUrl: './create-customer.component.scss'
})
export class CreateCustomerComponent implements OnInit {

  classroomTypes = [
    { value: 'HIDRO', label: 'Hidro' },
    { value: 'PILATES', label: 'Pilates' }
  ];

  myForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private service: CustomersService, private loading: LoadingService) {

    this.myForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]{2,50}$/)]],
      cpf: ['', [Validators.required, Validators.minLength(11), Validators.pattern(/^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/)]],
      email: ['', [Validators.required, Validators.email, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      phone: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(14), Validators.pattern(/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/)]],
      classroomType: [null, [Validators.required]]
    
    });

  }

  ngOnInit(): void {}

  get f() {
    return this.myForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.myForm.invalid) {
      Object.values(this.myForm.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }
    this.loading.isLoadingButtonSubject.next(true);
    setTimeout(() => {
      this.service.onCreateCustomer(this.myForm.value);
      this.loading.isLoadingButtonSubject.next(false);
    }, 1500)
  }
}
