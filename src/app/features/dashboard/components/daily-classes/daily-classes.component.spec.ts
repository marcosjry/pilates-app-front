import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyClassesComponent } from './daily-classes.component';

describe('DailyClassesComponent', () => {
  let component: DailyClassesComponent;
  let fixture: ComponentFixture<DailyClassesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DailyClassesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
