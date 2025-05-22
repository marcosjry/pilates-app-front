import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-no-content',
  imports: [],
  templateUrl: './no-content.component.html',
  styleUrl: './no-content.component.scss'
})
export class NoContentComponent {
  
  @Input() text!: string;

}
