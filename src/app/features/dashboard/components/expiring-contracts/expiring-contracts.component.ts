import { Component, OnDestroy, OnInit } from '@angular/core';
import { ExpiringContracts } from '../../models/expiring-contracts';
import { DashboardService } from '../../services/dashboard.service';
import { CommonModule, DatePipe, NgFor } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { SharedService } from '../../../../shared/services/shared.service';
import { TranslateContractStatusPipe } from "../../../../pipes/translate-contract-status.pipe";
import { FormatoDataExtensoPipe } from "../../../../pipes/formato-data-extenso.pipe";
import { NoContentComponent } from '../../../../shared/components/no-content/no-content.component';
import { LoadingService } from '../../../../shared/services/loading.service';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { debounceTime, Subject, takeUntil } from 'rxjs';

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
  styleUrl: './expiring-contracts.component.scss',
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
export class ExpiringContractsComponent implements OnInit, OnDestroy {
  
  expiringContracts!: ExpiringContracts[]
  isLoading: boolean = false;
  private destroy$ = new Subject<void>();

  constructor(
    private service: DashboardService, 
    private shared: SharedService,
    private loading: LoadingService
  ) {}

  ngOnInit(): void {
    this.service.expiringContracts$.subscribe(value => this.expiringContracts = value);
    this.loading.isLoading$.pipe(
      takeUntil(this.destroy$),
      debounceTime(1500)
    ).subscribe(value => this.isLoading = value);
    this.isLoading = true;
    this.service.getExpiringContracts();
    this.loading.isLoadingSubject.next(false);
  }

  formatText(text: string) {
    return this.shared.capitalizeFirstLetter(text);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
