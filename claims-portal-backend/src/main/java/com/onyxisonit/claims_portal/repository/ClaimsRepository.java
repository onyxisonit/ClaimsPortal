package com.onyxisonit.claims_portal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.onyxisonit.claims_portal.model.Claims;
import java.util.Optional;

public interface ClaimsRepository extends JpaRepository<Claims, Long> { 
    Optional<Claims> findByClaimId(String claimId);
}
