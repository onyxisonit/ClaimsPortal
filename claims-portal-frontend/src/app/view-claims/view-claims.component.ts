/**
 * ViewClaimsComponent allows users to enter a claim ID and fetch the corresponding claim details.
 * 
 * Features:
 * - Template-driven input field for entering claim ID
 * - Fetches claim data from the backend via ClaimsService
 * - Displays retrieved claim information or an error message if not found
 * 
 * Dependencies:
 * - CommonModule and FormsModule for template-driven forms.
 */

import { Component } from '@angular/core';
import { ClaimsService } from '../claims.service';
import { Claims } from '../claims.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-claims',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './view-claims.component.html',
  styleUrl: './view-claims.component.css'
})
export class ViewClaimsComponent {
  claimId: string = '';
  claim?: Claims;
  error: string = '';

  constructor(private claimsService: ClaimsService) {}

  fetchClaim() {
    this.claim = undefined;
    this.error = '';

    this.claimsService.getClaimById(this.claimId).subscribe({
      next: (res) => {
        this.claim = res;
      },
      error: () => {
        this.error = 'No claim found with that ID.';
      }
    });
  }
}




