/** 
* ClaimsService is responsible for communicating with the backend API
* to perform operations related to insurance claims.
* 
* - `getClaimById(claimId: string)` sends a GET request to retrieve a claim by its unique ID.
 * - `submitClaim(claim: Claims)` sends a POST request to submit a new insurance claim.
 * 
 * This service uses Angular's HttpClient and returns Observables,
 * allowing components to subscribe to asynchronous data streams.
*/

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Claims } from './claims.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClaimsService {
  private baseUrl = 'http://localhost:8080/api/claims';
  constructor(private http: HttpClient) { }

  // GET request: claim by claimId
  getClaimById(claimId: string): Observable<Claims> {
    return this.http.get<Claims>(`${this.baseUrl}/${claimId}`);
  }
  
  // POST request: claim
  submitClaim(claim: Claims) {
    return this.http.post(this.baseUrl, claim);
  }
}
