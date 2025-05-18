import { Component } from '@angular/core';
import { ClaimsService } from '../claims.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-claims-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './claims-form.component.html',
  styleUrl: './claims-form.component.css'
})
export class ClaimsFormComponent {
  claim = {
    policyNumber: '',
    claimantName: '',
    incidentDescription: '',
    claimAmount: 0
  };

  constructor(private claimsService: ClaimsService) {}

  submitClaim() {
    this.claimsService.submitClaim(this.claim).subscribe(() => {
      alert('Claim submitted successfully!');

    // Reset the form
    this.claim = {
      policyNumber: '',
      claimantName: '',
      incidentDescription: '',
      claimAmount: 0
    };
    });
  }
}
