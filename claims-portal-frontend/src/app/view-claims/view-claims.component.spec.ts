import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewClaimsComponent } from './view-claims.component';
import { ClaimsService } from '../claims.service';
import { Claims } from '../claims.model';
import { of, throwError } from 'rxjs';

describe('ViewClaimsComponent', () => {
  let component: ViewClaimsComponent;
  let fixture: ComponentFixture<ViewClaimsComponent>;
  let mockService: jasmine.SpyObj<ClaimsService>;

  beforeEach(async () => {
    mockService = jasmine.createSpyObj('ClaimsService', ['getClaimById']);

    await TestBed.configureTestingModule({
      imports: [ViewClaimsComponent],
      providers: [{provide: ClaimsService, useValue: mockService}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewClaimsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch and assign claim on valid ID', () => {
    const mockClaim: Claims = {
      policyNumber: 'TEST123',
      claimantName: 'Nyx',
      incidentDescription: 'Scratched window',
      claimAmount: 100,
      claimId: 'CN-test'
    };

    mockService.getClaimById.and.returnValue(of(mockClaim));

    component.claimId = 'CN-test';
    component.fetchClaim();

    expect(component.claim).toEqual(mockClaim);
    expect(component.error).toBe('');
  });

  it('should set error on failed claim fetch', () => {
    mockService.getClaimById.and.returnValue(throwError(() => ({ status: 404 })));

    component.claimId = 'CN-invalid';
    component.fetchClaim();

    expect(component.claim).toBeUndefined();
    expect(component.error).toBe('No claim found with that ID.');
  });
});

