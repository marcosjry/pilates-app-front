import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpiringContractsComponent } from './expiring-contracts.component';

describe('ExpiringContractsComponent', () => {
  let component: ExpiringContractsComponent;
  let fixture: ComponentFixture<ExpiringContractsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpiringContractsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpiringContractsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
