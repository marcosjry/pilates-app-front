import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule, FormArray, FormControl } from '@angular/forms';
import { ClassroomService } from '../../services/classroom.service';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRadioModule } from '@angular/material/radio';
import { Subscription } from 'rxjs';
import { SharedService } from '../../../../shared/services/shared.service';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';
import { MatIcon } from '@angular/material/icon';
import { PresentCustomer } from '../../models/classrom-present-customers';

@Component({
  selector: 'app-classroom-present-customers',
  imports: [
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatRadioModule,
    MatExpansionModule,
    MatIcon
],
  templateUrl: './classroom-present-customers.component.html',
  styleUrl: './classroom-present-customers.component.scss',
  animations: [
    trigger('listAnimation', [
      transition('* => *', [ 
        query(':enter', [ 
          style({ opacity: 0, transform: 'translateY(20px)' }), 
          stagger(100, [ 
            animate('0.4s ease-out', style({ opacity: 1, transform: 'translateY(0)' })) 
          ])
        ], { optional: true }) 
      ])
    ])
  ]
})
export class ClassroomPresentCustomersComponent {

  @Input() isOnClassroomPage: boolean = false;
  @Input() text: string = '';
  @Input() customers!: PresentCustomer[];
  @Input() classScss: string = 'selected';

  @Input() initialSelectedIds: Set<string> = new Set<string>();
  @Output() selectionChange = new EventEmitter<{ id: string, selected: boolean }>();

  private controlSubscriptions: Subscription[] = [];
  ngOnDestroy() {
    this.controlSubscriptions.forEach(sub => sub.unsubscribe());
  }

  form!: FormGroup;

  constructor(private fb: FormBuilder, public shared: SharedService, private service: ClassroomService) {
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
            disabled: false
        });

        const sub = control.valueChanges.subscribe(selected => {
            this.selectionChange.emit({ id: customer.id, selected: selected! });
        });
        this.controlSubscriptions.push(sub); // Guarda para limpar depois

        this.itensSelecionadosFormArray.push(control);
    });
  }

  onDelete(customerId: string) {
    this.service.onDeleteFrequency(customerId);
  }
}
