import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomButtomComponent } from './custom-buttom.component';

describe('CustomButtomComponent', () => {
  let component: CustomButtomComponent;
  let fixture: ComponentFixture<CustomButtomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomButtomComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomButtomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
