import { Component } from '@angular/core';
import { LayoutComponent } from '../../layout/layout.component';
import { SummaryComponent } from './components/summary/summary.component';
import { DashboardService } from './services/dashboard.service';
import { DailyClassesComponent } from './components/daily-classes/daily-classes.component';
import { ExpiringContractsComponent } from './components/expiring-contracts/expiring-contracts.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    LayoutComponent,
    SummaryComponent,
    DailyClassesComponent,
    ExpiringContractsComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  constructor(private service: DashboardService) {
  }

}
