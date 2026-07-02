package com.ins.ins_classes_be.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Optional;

@Configuration
@EnableJpaAuditing
public class JpaAuditingConfig {
    private static final String SYSTEM_AUDITOR = "SYSTEM";

    @Bean
    public AuditorAware<String> auditorProvider() {
        return () -> {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication == null || authentication instanceof AnonymousAuthenticationToken) {
                return Optional.of(SYSTEM_AUDITOR);
            }

            // Long = userId from JwtAuthFilter; String = email set during self-registration
            Object principal = authentication.getPrincipal();
            if (principal instanceof Long userId) {
                return Optional.of(String.valueOf(userId));
            }
            if (principal instanceof String auditor && !auditor.isBlank()) {
                return Optional.of(auditor);
            }
            return Optional.of(SYSTEM_AUDITOR);
        };
    }
}
