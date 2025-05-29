import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRadioModule } from '@angular/material/radio';

import ClassroomHours from '../../models/classroom-hours';
import { ClassroomService } from '../../services/classroom.service';

@Component({
  selector: 'app-classroom-time-slot',
  imports: [
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatRadioModule,
    MatExpansionModule
],
  templateUrl: './classroom-time-slot.component.html',
  styleUrl: './classroom-time-slot.component.scss'
})
export class ClassroomTimeSlotComponent {

  hoursAvailable!: ClassroomHours[]  

  form: FormGroup;

  @Output() onTimeFilter: EventEmitter<string> = new EventEmitter();

  constructor(private fb: FormBuilder, private service: ClassroomService) {
    this.form = this.fb.group({
      startTime: ['']
    });
    this.service.classroomHours$.subscribe(value => {
      this.hoursAvailable = value;
    })
    this.service.getClassroomAvailableHours();
    this.form.valueChanges.subscribe(value =>{
      this.onTimeFilter.emit(value.startTime);
    })
  }



}
