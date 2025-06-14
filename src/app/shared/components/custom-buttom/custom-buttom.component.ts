import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-custom-buttom',
  imports: [
    MatIcon,
    CommonModule,
    MatProgressSpinner
  ],
  templateUrl: './custom-buttom.component.html',
  styleUrl: './custom-buttom.component.scss'
})
export class CustomButtomComponent {

  @Input() isLoading: boolean = false;

  @Input() haveIcon: boolean = false
  @Input() icon: string = '';
  @Input() text: string = '';
  @Input() classText: string = ''; 
  @Input() classButton: string = ''; 

  constructor(private loading: LoadingService) {
    
  }
  
}
