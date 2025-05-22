import { Component } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { SummaryTotals } from '../../models/summary-total';
import { MatCardModule } from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-summary',
  imports: [
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent {
  summaryTotals!: SummaryTotals

  constructor(private service: DashboardService) {
    this.service.summaryTotals$.subscribe(value => this.summaryTotals = value);
    this.service.getTotalSummary();
  }


}
