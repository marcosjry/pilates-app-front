import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomClassesComponent } from './classroom-classes.component';

describe('ClassroomClassesComponent', () => {
  let component: ClassroomClassesComponent;
  let fixture: ComponentFixture<ClassroomClassesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassroomClassesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassroomClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
