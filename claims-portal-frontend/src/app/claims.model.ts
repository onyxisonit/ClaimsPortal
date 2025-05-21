export interface Claims {
    id?: number;
    claimId?: string;
    policyNumber: string;
    claimantName: string;
    incidentDescription: string;
    claimAmount: number;
    status?: string;
}
