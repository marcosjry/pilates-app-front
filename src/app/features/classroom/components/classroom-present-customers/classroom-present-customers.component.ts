import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule, FormArray, FormControl } from '@angular/forms';
import ClassroomHours from '../../models/classroom-hours';
import { ClassroomService } from '../../services/classroom.service';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRadioModule } from '@angular/material/radio';
import PresentCustomer from '../../models/classrom-present-customers';
import { CustomButtomComponent } from "../../../../shared/components/custom-buttom/custom-buttom.component";
import { Subscription } from 'rxjs';
import { SharedService } from '../../../../shared/services/shared.service';

@Component({
  selector: 'app-classroom-present-customers',
  imports: [
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatRadioModule,
    MatExpansionModule
],
  templateUrl: './classroom-present-customers.component.html',
  styleUrl: './classroom-present-customers.component.scss'
})
export class ClassroomPresentCustomersComponent {

  @Input() isOnClassroomPage: boolean = false;
  @Input() text: string = '';
  @Input() customers!: PresentCustomer[];

  @Input() initialSelectedIds: Set<string> = new Set<string>();
  @Output() selectionChange = new EventEmitter<{ id: string, selected: boolean }>();

  private controlSubscriptions: Subscription[] = [];
  ngOnDestroy() {
    this.controlSubscriptions.forEach(sub => sub.unsubscribe());
  }

  form!: FormGroup;

  constructor(private fb: FormBuilder, public shared: SharedService) {
    this.form = this.fb.group({
      itensSelecionados: this.fb.array([]) 
    });
  }

  ngOnInit() {
    this.buildCheckboxes(); 
  }

  get itensSelecionadosFormArray() {
    return this.form.controls['itensSelecionados'] as FormArray;
  }

  ngOnChanges(changes: SimpleChanges) {
    // Se a lista ou o modo de página mudar, reconstrua os checkboxes
    if (changes['customers'] || changes['isOnClassroomPage']) {
      this.buildCheckboxes();
    }
  }

  private buildCheckboxes() {
    this.itensSelecionadosFormArray.clear(); 

    this.customers.forEach((customer) => {
        const isSelected = this.initialSelectedIds.has(customer.id); // Verifica se está no Set do pai
        const control = new FormControl({
            value: isSelected, // Define o valor baseado no Set
            disabled: this.isOnClassroomPage 
        });

        const sub = control.valueChanges.subscribe(selected => {
            this.selectionChange.emit({ id: customer.id, selected: selected! });
        });
        this.controlSubscriptions.push(sub); // Guarda para limpar depois

        this.itensSelecionadosFormArray.push(control);
    });
  }

}
