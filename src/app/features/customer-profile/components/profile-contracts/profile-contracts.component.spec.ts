import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileContractsComponent } from './profile-contracts.component';

describe('ProfileContractsComponent', () => {
  let component: ProfileContractsComponent;
  let fixture: ComponentFixture<ProfileContractsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileContractsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileContractsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
