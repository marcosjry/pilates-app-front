import { Component, EventEmitter, Output } from '@angular/core';
import { GenericInputComponent } from "../../../../shared/components/generic-input/generic-input.component";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-date-select',
  imports: [
    GenericInputComponent,
    ReactiveFormsModule
  ],
  templateUrl: './date-select.component.html',
  styleUrl: './date-select.component.scss'
})
export class DateSelectComponent {
  myForm!: FormGroup;
  submitted = false;
  private dateControl!: FormControl
  @Output() dateSelected: EventEmitter<string> = new EventEmitter();;

  constructor(private fb: FormBuilder, private datePipe: DatePipe) {

  }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      date: [ null , Validators.required]
    });
    this.dateControl = this.myForm.get('date') as FormControl;

    this.dateControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(value => {
      const formattedDate = this.datePipe.transform(value, 'yyyy-MM-dd');
      this.dateSelected.emit(formattedDate!);
    })
  }

}
