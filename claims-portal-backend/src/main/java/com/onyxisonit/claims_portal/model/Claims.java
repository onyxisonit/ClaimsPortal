package com.onyxisonit.claims_portal.model;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity

public class Claims{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String claimId;

    private String policyNumber;
    private String claimantName;
    private String incidentDescription;
    private double claimAmount;
    private String denialReason;

    public enum Status {
        SUBMITTED,
        APPROVED,
        DENIED
    }

    @Enumerated(EnumType.STRING)
    private Status status = Status.SUBMITTED;

    // Getters and setters
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getClaimId() {
        return claimId;
    }
    public void setClaimId(String claimId) {
        this.claimId = claimId;
    }

    public String getPolicyNumber() {
        return policyNumber;
    }
    public void setPolicyNumber(String policyNumber) {
        this.policyNumber = policyNumber;
    }

    public String getClaimantName() {
        return claimantName;
    }
    public void setClaimantName(String claimantName) {
        this.claimantName = claimantName;
    }

    public String getIncidentDescription() {
        return incidentDescription;
    }
    public void setIncidentDescription(String incidentDescription) {
        this.incidentDescription = incidentDescription;
    }

    public double getClaimAmount() {
        return claimAmount;
    }
    public void setClaimAmount(double claimAmount){
        this.claimAmount = claimAmount;
    }

    public Status getStatus(){
        return status;
    }
    public void setStatus(Status status){
        this.status = status;
    }

    public String getDenialReason() {
        return denialReason;
    }
    public void setDenialReason(String denialReason) {
        this.denialReason = denialReason;
    }

}