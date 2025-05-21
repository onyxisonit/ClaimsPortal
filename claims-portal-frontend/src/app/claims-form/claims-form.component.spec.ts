import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClaimsFormComponent } from './claims-form.component';
import { ClaimsService } from '../claims.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('ClaimsFormComponent', () => {
  let component: ClaimsFormComponent;
  let fixture: ComponentFixture<ClaimsFormComponent>;
  let mockService: jasmine.SpyObj<ClaimsService>;


  beforeEach(async () => {
    mockService = jasmine.createSpyObj('ClaimsService', ['submitClaim']);
    await TestBed.configureTestingModule({
      imports: [ClaimsFormComponent],
      providers: [
        { provide: ClaimsService, useValue: mockService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClaimsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty claim fields', () => {
    expect(component.claim.policyNumber).toBe('');
    expect(component.claim.claimAmount).toBe(0);
  });

  it('should show generatedClaimId after submission (mocked)', () => {
    component.claim = {
      policyNumber: 'ABC123',
      claimantName: 'Tester',
      incidentDescription: 'Test incident',
      claimAmount: 500
    };

    mockService.submitClaim.and.returnValue(of({ claimId: 'CN-123456' }));

    component.submitClaim();

    expect(component.generatedClaimId).toBe('CN-123456');
    expect(component.submissionSuccess).toBeTrue();
  });


  it('should not allow submission when form is invalid', () => {
    component.claim = {
      policyNumber: '', 
      claimantName: '',
      incidentDescription: '', 
      claimAmount: 0    
    };

    component.submitClaim();

    expect(mockService.submitClaim).not.toHaveBeenCalled();
    expect(component.generatedClaimId).toBe('');
    expect(component.submissionSuccess).toBeFalse();
  });

});
