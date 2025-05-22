import { Component, Input } from '@angular/core';
import { LoadingService } from '../services/loading.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

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

  isLoading!: boolean
  @Input() spinnerSize!: number

  constructor(private loadingService: LoadingService) {
    this.loadingService.isLoading$.subscribe(value => this.isLoading = value);
  }
}
