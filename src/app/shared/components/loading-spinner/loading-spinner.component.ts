import { Component, Input } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-loading-spinner',
  imports: [
    MatProgressSpinner,
    CommonModule
  ],
  templateUrl: './loading-spinner.component.html',
  styleUrl: './loading-spinner.component.scss'
})
export class LoadingSpinnerComponent {

  isLoading: boolean = false
  @Input() spinnerSize!: number

  constructor(private loadingService: LoadingService) {
    this.loadingService.isLoading$.subscribe(value => this.isLoading = value);
  }
}
