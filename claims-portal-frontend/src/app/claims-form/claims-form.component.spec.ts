import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimsFormComponent } from './claims-form.component';

describe('ClaimsFormComponent', () => {
  let component: ClaimsFormComponent;
  let fixture: ComponentFixture<ClaimsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClaimsFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClaimsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
