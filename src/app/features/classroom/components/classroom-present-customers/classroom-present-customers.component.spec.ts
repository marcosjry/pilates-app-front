import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomPresentCustomersComponent } from './classroom-present-customers.component';

describe('ClassroomPresentCustomersComponent', () => {
  let component: ClassroomPresentCustomersComponent;
  let fixture: ComponentFixture<ClassroomPresentCustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassroomPresentCustomersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassroomPresentCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
