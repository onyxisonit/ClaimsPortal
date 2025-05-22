package com.onyxisonit.claims_portal.controller;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.onyxisonit.claims_portal.model.Claims;
import com.onyxisonit.claims_portal.model.Claims.Status;
import com.onyxisonit.claims_portal.repository.ClaimsRepository;

@RestController
@RequestMapping("/api/claims")
@CrossOrigin(origins = "*") //replace for frontend domain when you set u-p angular later
public class ClaimsController {

    @Autowired
    private ClaimsRepository claimsRepository;

    private String isApproved(Claims claim) {
    // Mock rules for approval and denial
        if (claim.getClaimAmount() <= 100 || claim.getClaimAmount() > 100000) {
            return "Claim amount must be between $100 and $10,000.";
        }

        if (claim.getIncidentDescription() == null || claim.getIncidentDescription().length() < 25) {
            return "Incident description must be at least 15 characters.";
        }

        if (!claim.getIncidentDescription().matches(".*\\b(hit|damage|accident|incident|loss|fire|theft)\\b.*")) {
            return "Incident description must reference a valid cause (e.g., hit, damage, accident, incident, loss).";
        }

        if (claim.getClaimantName().length() < 3 || !claim.getClaimantName().matches("^[A-Za-z ]+$")) {
            return "Claimant name must be at least 3 characters and contain only letters and spaces.";
        }

        if (claim.getPolicyNumber().length() != 7 || !claim.getPolicyNumber().matches("^[A-Z]{3}[0-9]{4}$")) {
            return "Policy number must be in format ABC1234.";
        }

        if (claim.getClaimAmount() > 5000 && claim.getIncidentDescription().length() < 50) {
            return "High-value claims require more detailed incident descriptions.";
        }

        return null; // All conditions met — approved
    }


    @GetMapping
    public List<Claims> getAllClaims() {
        return claimsRepository.findAll();
    }

    @GetMapping("/{claimId}")
    public ResponseEntity<Claims> getClaimByClaimId(@PathVariable String claimId) {
        Optional<Claims> optionalClaim = claimsRepository.findByClaimId(claimId);
        return optionalClaim.map(ResponseEntity::ok)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Claim not found"));
    }

    @PutMapping("/{id}/review")
    public Claims reviewClaim(@PathVariable Long id) {
        Claims claim = claimsRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

       
        String denialReason = isApproved(claim);

        if (denialReason == null) {
            claim.setStatus(Status.APPROVED);
            claim.setDenialReason(null);
        } else {
            claim.setStatus(Status.DENIED);
            claim.setDenialReason(denialReason);
        }

        return claimsRepository.save(claim);
    }

    @PostMapping
    public ResponseEntity<Claims> submitClaim(@RequestBody Claims claim) {
      // Basic server-side validation 
    if (claim.getPolicyNumber() == null || claim.getPolicyNumber().isEmpty()
        || claim.getClaimantName() == null || claim.getClaimantName().isEmpty()
        || claim.getClaimAmount() <= 0) {
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Missing required fields or invalid claim amount");
    }

    // Generate unique claimIds with CN prefix
    if (claim.getClaimId() == null || claim.getClaimId().isEmpty()){
        String claimId = "CN-" + UUID.randomUUID().toString().substring(0, 8);
        claim.setClaimId(claimId);
        
    }

    // Save the claim
    claim.setStatus(Status.SUBMITTED);
    Claims saved = claimsRepository.save(claim);
    return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }
    
    
}
