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




