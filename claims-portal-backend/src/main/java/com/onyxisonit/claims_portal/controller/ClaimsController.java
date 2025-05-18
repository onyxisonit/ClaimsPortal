package com.onyxisonit.claims_portal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import com.onyxisonit.claims_portal.model.Claims;
import com.onyxisonit.claims_portal.model.Claims.Status;
import com.onyxisonit.claims_portal.repository.ClaimsRepository;
import java.util.List;

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
    public Claims submitClaim(@RequestBody Claims claim) {
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

    // else, successful submission
    claim.setStatus(Status.SUBMITTED);
    return claimsRepository.save(claim);
    }

    
    
}
