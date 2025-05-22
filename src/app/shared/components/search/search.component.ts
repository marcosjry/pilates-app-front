import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GenericInputComponent } from '../generic-input/generic-input.component';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { NgIf } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-search',
  imports: [
    NgIf,
    ReactiveFormsModule,
    MatIcon
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {

  @Input() placeholder: string = 'Procure por Clientes...';
  @Input() debounceTime: number = 500;

  @Input() label: string = '';
  @Output() onSearch: EventEmitter<string> = new EventEmitter();

  searchForm!: FormGroup
  searchControl!: FormControl
  
  constructor(
    private fb: FormBuilder
  ) {
    this.searchForm = this.fb.group({
      texto: ['', Validators.required]
    });
    this.searchControl = this.searchForm.get('texto') as FormControl;
    this.searchControl.valueChanges.pipe(
      debounceTime(this.debounceTime),
      distinctUntilChanged()
    ).subscribe(value => {
      this.onSearch.emit(value || '');
    });
  }

  clearSearch(): void {
    this.searchControl.setValue('');
  }

}
