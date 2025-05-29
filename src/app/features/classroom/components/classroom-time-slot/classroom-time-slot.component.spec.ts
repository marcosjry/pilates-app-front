import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomTimeSlotComponent } from './classroom-time-slot.component';

describe('ClassroomTimeSlotComponent', () => {
  let component: ClassroomTimeSlotComponent;
  let fixture: ComponentFixture<ClassroomTimeSlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassroomTimeSlotComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassroomTimeSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
