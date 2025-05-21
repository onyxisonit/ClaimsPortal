package com.onyxisonit.claims_portal;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")

public class ClaimsControllerTests {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void testSubmitClaim_success() throws Exception {
        String jsonPayload = """
            {
                "policyNumber": "ABC123",
                "claimantName": "Jane Doe",
                "incidentDescription": "Test incident",
                "claimAmount": 1500
            }
        """;

        mockMvc.perform(post("/api/claims")
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonPayload))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.claimId").exists());
    }

    @Test
    public void testSubmitClaim_missingPolicyNumber() throws Exception {
        String jsonPayload = """
            {
                "claimantName": "Jane Doe",
                "incidentDescription": "Test incident",
                "claimAmount": 1500
            }
        """;

        mockMvc.perform(post("/api/claims")
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonPayload))
            .andExpect(status().isBadRequest());
    }

    @Test
    public void testSubmitClaim_invalidClaimAmount() throws Exception {
        String jsonPayload = """
            {
                "policyNumber": "ABC123",
                "claimantName": "Jane Doe",
                "incidentDescription": "Test incident",
                "claimAmount": -100
            }
        """;

        mockMvc.perform(post("/api/claims")
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonPayload))
            .andExpect(status().isBadRequest());
    }
}
