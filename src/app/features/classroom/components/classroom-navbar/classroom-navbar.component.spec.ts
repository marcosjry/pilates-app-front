import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomNavbarComponent } from './classroom-navbar.component';

describe('ClassroomNavbarComponent', () => {
  let component: ClassroomNavbarComponent;
  let fixture: ComponentFixture<ClassroomNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassroomNavbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassroomNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
