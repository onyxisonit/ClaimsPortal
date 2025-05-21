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

  getClaimById(claimId: string): Observable<Claims> {
    return this.http.get<Claims>(`${this.baseUrl}/${claimId}`);
  }
  
  submitClaim(claim: Claims) {
    return this.http.post(this.baseUrl, claim);
  }
}
