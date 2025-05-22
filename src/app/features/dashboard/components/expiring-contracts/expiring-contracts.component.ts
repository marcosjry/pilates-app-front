import { Component } from '@angular/core';
import { ExpiringContracts } from '../../models/expiring-contracts';
import { DashboardService } from '../../services/dashboard.service';
import { CommonModule, DatePipe, NgFor } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { SharedService } from '../../../../shared/services/shared.service';
import { TranslateContractStatusPipe } from "../../../../pipes/translate-contract-status.pipe";
import { FormatoDataExtensoPipe } from "../../../../pipes/formato-data-extenso.pipe";
import { NoContentComponent } from '../../../../shared/no-content/no-content.component';
import { LoadingService } from '../../../../shared/services/loading.service';
import { LoadingSpinnerComponent } from '../../../../shared/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-expiring-contracts',
  imports: [
    MatListModule,
    NgFor,
    MatIcon,
    TranslateContractStatusPipe,
    FormatoDataExtensoPipe,
    NoContentComponent,
    CommonModule,
    LoadingSpinnerComponent
],
  templateUrl: './expiring-contracts.component.html',
  styleUrl: './expiring-contracts.component.scss'
})
export class ExpiringContractsComponent {
  expiringContracts!: ExpiringContracts[]
  isLoading: boolean = false;

  constructor(
    private service: DashboardService, 
    private shared: SharedService,
    private loading: LoadingService
  ) {
    this.service.expiringContracts$.subscribe(value => this.expiringContracts = value);
    this.loading.isLoading$.subscribe(value => this.isLoading = value);
    this.service.getExpiringContracts();
  }

  formatText(text: string) {
    return this.shared.capitalizeFirstLetter(text);
  }
}
