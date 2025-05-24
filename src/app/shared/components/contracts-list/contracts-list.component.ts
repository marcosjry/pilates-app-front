import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { FormatoDataExtensoPipe } from '../../../pipes/formato-data-extenso.pipe';
import { PaymentFormatoPipe } from '../../../pipes/payment-formato.pipe';
import { TranslateContractStatusPipe } from '../../../pipes/translate-contract-status.pipe';
import ContractsCustomer from '../../../features/customer-profile/models/contracts-from-user';
import { SharedService } from '../../services/shared.service';

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
  styleUrl: './contracts-list.component.scss'
})
export class ContractsListComponent implements OnInit {
  @Input() contracts!: ContractsCustomer[]
  
  constructor(public shared: SharedService) {}


  ngOnInit(): void {
    
  }

}
