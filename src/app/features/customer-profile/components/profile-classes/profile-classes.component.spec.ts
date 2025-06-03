import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileClassesComponent } from './profile-classes.component';

describe('ProfileClassesComponent', () => {
  let component: ProfileClassesComponent;
  let fixture: ComponentFixture<ProfileClassesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileClassesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
