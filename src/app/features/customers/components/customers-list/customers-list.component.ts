import { Component, input, Input } from '@angular/core';
import { Customers } from '../../models/customers';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';

import { CustomersService } from '../../services/customers.service';
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
import { NoContentComponent } from '../../../../shared/no-content/no-content.component';

@Component({
  selector: 'app-customers-list',
  imports: [
    MatCardModule,
    CommonModule,
    MatListModule,
    TranslateContractStatusPipe
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

  constructor(private shared: SharedService) {
  }

  formatText(text: string) {
    return this.shared.capitalizeFirstLetter(text);
  }

  getStatusClass(contractStatus: string){
    const validacoes: { [key: string]: string} = {
        ACTIVE: "Ativo",
        PENDING:"Pendente",
        CANCEL: "Cancelado",
        EXPIRED:"Finalizado",
        null: "Nenhum"
    };
    const validacao = validacoes[contractStatus];
    return validacao;
  }

  getStatusBorderClass(contractStatus: string){
    const validacoes: { [key: string]: string} = {
        ACTIVE: "Ativo-border",
        PENDING:"Pendente-border",
        CANCEL: "Cancelado-border",
        EXPIRED:"Finalizado-border",
        null: "Nenhum-border"
    };
    const validacao = validacoes[contractStatus];
    return validacao;
  }
}



