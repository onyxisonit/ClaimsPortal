/**
 * Unit tests for the ClaimsService.
 * 
 * This test suite verifies that:
 * - The service is created successfully
 * - POST requests correctly send new claims to the backend
 * - GET requests fetch claims by claimId as expected
 * - 404 errors are properly handled when a claim is not found
 * 
 * Angular's HttpClientTestingModule is used to mock HTTP calls and
 * validate request methods, payloads, and responses without hitting a real server.
 */

import { TestBed } from '@angular/core/testing';

import { ClaimsService } from './claims.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { Claims } from './claims.model';

describe('ClaimsService', () => {
  let service: ClaimsService;
  let httpMock: HttpTestingController;
  const baseUrl = 'http://localhost:8080/api/claims';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ClaimsService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(ClaimsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  // Test 1: ensures the ClaimsService is created
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Test 2: ensures POST requests send new claims to the backend
  it('should POST a new claim to the backend', () => {
    const testClaim: Claims = {
      policyNumber: 'ABC123',
      claimantName: 'Nyx',
      incidentDescription: 'Window cracked',
      claimAmount: 200
    };

    service.submitClaim(testClaim).subscribe(response => {
      expect(response).toEqual(testClaim);
    });
   
    const req = httpMock.expectOne(`${baseUrl}`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(testClaim);

    req.flush(testClaim); // Simulate backend response

  });

  // Test 3: ensures GET requests fetch claims by claimId
  it('should GET a claim by claimId from the backend', () => {
    const mockClaim: Claims = {
      policyNumber: 'XYZ789',
      claimantName: 'Triston',
      incidentDescription: 'Tree fell on roof',
      claimAmount: 1500,
      claimId: 'CN-abc12345',
      status: 'SUBMITTED'
    };

    service.getClaimById(mockClaim.claimId!).subscribe(res => {
      expect(res).toEqual(mockClaim);
    });

    const req = httpMock.expectOne(`${baseUrl}/${mockClaim.claimId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockClaim);
  });


  // Test 4: ensures 404 errors are properly handled
  it('should handle 404 error when claim not found', () => {
    const claimId = 'CN-doesnotexist';

    service.getClaimById(claimId).subscribe({
      next: () => fail('Expected error, but got success'),
      error: (error) => {
        expect(error.status).toBe(404);
      }
    });

    const req = httpMock.expectOne(`${baseUrl}/${claimId}`);
    req.flush('Claim not found', { status: 404, statusText: 'Not Found' });
  });
  
});