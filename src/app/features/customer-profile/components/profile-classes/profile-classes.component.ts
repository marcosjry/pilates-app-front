import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { SharedService } from '@shared/services/shared.service';
import { FormatoDataExtensoPipe } from 'app/pipes/formato-data-extenso.pipe';
import { PaymentFormatoPipe } from 'app/pipes/payment-formato.pipe';
import { TranslateContractStatusPipe } from 'app/pipes/translate-contract-status.pipe';
import { CustomerProfileService } from '../../services/customer-profile.service';
import { CustomerFrequency } from '../../models/contracts';
import { Subject, takeUntil } from 'rxjs';
import { NoContentComponent } from '@shared/components/no-content/no-content.component';

@Component({
  selector: 'app-profile-classes',
  imports: [
    MatListModule,
    CommonModule,
    MatIcon,
    FormatoDataExtensoPipe,
    NoContentComponent
  ],
  templateUrl: './profile-classes.component.html',
  styleUrl: './profile-classes.component.scss'
})
export class ProfileClassesComponent implements OnInit, OnDestroy {

  customerFrequency!: CustomerFrequency[]
  private destroy$ = new Subject<void>();

  constructor(public shared: SharedService, private service: CustomerProfileService) {

  }
  
  ngOnInit(): void {
    this.service.frequenciesByCustomer$.pipe(
      takeUntil(this.destroy$)).subscribe(
        value => this.customerFrequency = value
      );
  }
  
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
