package com.onyxisonit.claims_portal.controller;

import java.util.Optional;
import java.util.UUID;
import java.util.List;

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
import org.springframework.beans.factory.annotation.Autowired;

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

    private boolean isApproved(Claims claim) {
    // Mock rules for approval:
    return
        // Must have a policy number
        claim.getPolicyNumber() != null && !claim.getPolicyNumber().isEmpty() &&
        
        // Claim amount must be reasonable
        claim.getClaimAmount() > 100 && claim.getClaimAmount() < 10000 &&
        
        // Must describe the incident in at least 15 characters
        claim.getIncidentDescription() != null &&
        claim.getIncidentDescription().length() >= 15;
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

        // Mock approval logic
        if (isApproved(claim)) {
            claim.setStatus(Status.APPROVED);
        } else {
            claim.setStatus(Status.DENIED);
        }

        return claimsRepository.save(claim);
    }

    @PostMapping
    public ResponseEntity<Claims> submitClaim(@RequestBody Claims claim) {
      // Basic server-side validation 
      //Frontend validation can be bypassed by:
        // Sending a direct API request via Postman or curl
        // A user with JavaScript disabled
        // A malicious user manipulating your frontend or payload
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
