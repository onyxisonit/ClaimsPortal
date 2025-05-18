package com.onyxisonit.claims_portal.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.onyxisonit.claims_portal.model.Claims;

public interface ClaimsRepository extends JpaRepository<Claims, Long> { 
}
