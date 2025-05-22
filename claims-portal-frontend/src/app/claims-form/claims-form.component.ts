/**
 * ClaimsFormComponent provides a form interface for users to submit insurance claims.
 * It uses two-way data binding via ngModel to bind form input fields to a `Claims` model.
 * 
 * Features:
 * - Displays a form for entering policy number, claimant name, incident description, and claim amount.
 * - Performs basic client-side validation before sending data to the backend.
 * - Calls ClaimsService to POST the claim data to the server.
 * - Displays the generated claim ID on success, or an error message on failure.
 * - Resets the form after successful submission.
 * 
 * Dependencies:
 * - CommonModule and FormsModule for template-driven forms.
 * - ClaimsService for HTTP communication.
 * - Claims model for type-safe form data.
 */

import { Component } from '@angular/core';
import { ClaimsService } from '../claims.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Claims } from '../claims.model';

function emptyClaim(): Claims {
  return {
    claimId: '',
    policyNumber: '',
    claimantName: '',
    incidentDescription: '',
    claimAmount: 0,
  };
}

@Component({
  selector: 'app-claims-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './claims-form.component.html',
  styleUrl: './claims-form.component.css'
})
export class ClaimsFormComponent {

  claim : Claims = emptyClaim();
  generatedClaimId = "";
  submissionSuccess: boolean = false;
  submissionError: string = '';

  constructor(private claimsService: ClaimsService) {}

  
  submitClaim() {
    if (
      !this.claim.policyNumber ||
      !this.claim.claimantName ||
      !this.claim.incidentDescription ||
      this.claim.claimAmount <= 0
    ) {
      this.submissionSuccess = false;
      this.generatedClaimId = '';
      return;
    }
    
    this.claimsService.submitClaim(this.claim).subscribe({
      next: (res: any) => {
      this.generatedClaimId = res.claimId;
      this.submissionSuccess = true;
      this.submissionError = '';
      this.claim = emptyClaim(); // Reset form
    },
      error: (err) => {
        this.submissionSuccess = false;
        this.submissionError = 'Failed to submit claim. Please try again.';
      }
    });
  }
}
