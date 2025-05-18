import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClaimsService {
  private baseUrl = 'http://localhost:8080/api/claims';
  constructor(private http: HttpClient) { }

  submitClaim(claim: any) {
    return this.http.post(this.baseUrl, claim);
  }
}
