import { Component, input, Input } from '@angular/core';
import { Customers } from '../../models/customers';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';

import { SharedService } from '../../../../shared/services/shared.service';

import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger
} from '@angular/animations';

import { TranslateContractStatusPipe } from "../../../../pipes/translate-contract-status.pipe";
import { PaymentFormatoPipe } from "../../../../pipes/payment-formato.pipe";
import { Router } from '@angular/router';

@Component({
  selector: 'app-customers-list',
  imports: [
    MatCardModule,
    CommonModule,
    MatListModule,
    TranslateContractStatusPipe,
    PaymentFormatoPipe
],
  templateUrl: './customers-list.component.html',
  styleUrl: './customers-list.component.scss',
  animations: [
    trigger('listAnimation', [
      transition('* => *', [ // Aplica a animação em cada mudança de estado da lista (incluindo a entrada inicial)
        query(':enter', [ // Seleciona os elementos que estão entrando na lista
          style({ opacity: 0, transform: 'translateY(20px)' }), // Estado inicial: invisível e levemente deslocado para baixo
          stagger(200, [ // Aplica um pequeno atraso entre a animação de cada item
            animate('0.4s ease-out', style({ opacity: 1, transform: 'translateY(0)' })) // Estado final: visível e na posição original
          ])
        ], { optional: true }) // Torna a query opcional para evitar erros se não houver itens entrando
      ])
    ])
  ]
})
export class CustomersListComponent {
  
  @Input() customers: Customers[] = []

  constructor(public shared: SharedService, private router: Router) {
  }

  formatText(text: string) {
    return this.shared.capitalizeFirstLetter(text);
  }

  onClick(customer: Customers) {
    this.router.navigate([`/cliente/${customer.id}`])
  }
}