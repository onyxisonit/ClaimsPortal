/**
 * Defines the structure of a Claims object used across the frontend application.
 * 
 * This interface is used for:
 * - Submitting new claims to the backend
 * - Displaying or retrieving existing claim data
 * - Type-checking HTTP responses and form values
 * 
 * Optional fields (marked with `?`) represent values that
 * may not exist during initial form submission (e.g., `id`, `claimId`, `status`)
 */

export interface Claims {
    id?: number;
    claimId?: string;
    policyNumber: string;
    claimantName: string;
    incidentDescription: string;
    claimAmount: number;
    status?: string;
    denialReason?: string;
}
