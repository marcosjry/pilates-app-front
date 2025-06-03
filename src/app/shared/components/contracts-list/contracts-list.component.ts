import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { FormatoDataExtensoPipe } from '../../../pipes/formato-data-extenso.pipe';
import { PaymentFormatoPipe } from '../../../pipes/payment-formato.pipe';
import { TranslateContractStatusPipe } from '../../../pipes/translate-contract-status.pipe';
import ContractsCustomer from '../../../features/customer-profile/models/contracts-from-user';
import { SharedService } from '../../services/shared.service';
import { Router } from '@angular/router';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';

@Component({
  selector: 'app-contracts-list',
  imports: [
    MatListModule,
    CommonModule,
    MatIcon,
    FormatoDataExtensoPipe,
    TranslateContractStatusPipe,
    PaymentFormatoPipe
  ],
  templateUrl: './contracts-list.component.html',
  styleUrl: './contracts-list.component.scss',
  animations: [
    trigger('listAnimation', [
      transition('* => *', [ 
        query(':enter', [ 
          style({ opacity: 0, transform: 'translateY(20px)' }), 
          stagger(200, [ 
            animate('0.4s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class ContractsListComponent implements OnInit {
  
  @Input() clickAble: boolean = false;
  @Input() isOnProfile: boolean = false;
  @Input() contracts!: ContractsCustomer[]
  
  @Output() editEvent = new EventEmitter<ContractsCustomer>()

  constructor(public shared: SharedService, private router: Router) {}


  ngOnInit(): void {
    
  }

  onClick(customerId: string ) {
    if(this.clickAble)
      this.router.navigate([`/cliente/${customerId}`])
    return;
  }

  onEdit(contract: any) {
    this.editEvent.emit(contract);
  }
}
