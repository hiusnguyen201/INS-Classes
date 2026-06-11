package com.ins.ins_classes_be.common;

import lombok.*;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum ExceptionError {
    // ========== Common ==========
    INTERNAL_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "INTERNAL_ERROR", "Internal server error"),
    BAD_REQUEST(HttpStatus.BAD_REQUEST, "BAD_REQUEST", "Invalid request"),
    VALIDATION_ERROR(HttpStatus.BAD_REQUEST, "VALIDATION_ERROR", "Validation failed"),
    RESOURCE_NOT_FOUND(HttpStatus.NOT_FOUND, "RESOURCE_NOT_FOUND", "Resource is not found"),

    // ========== Auth ==========
    UNAUTHORIZED(HttpStatus.UNAUTHORIZED, "UNAUTHORIZED", "Authentication is required"),
    INVALID_CREDENTIALS(HttpStatus.UNAUTHORIZED, "INVALID_CREDENTIALS", "Email or password is incorrect"),
    TOKEN_EXPIRED(HttpStatus.UNAUTHORIZED, "TOKEN_EXPIRED", "Token has expired"),
    TOKEN_INVALID(HttpStatus.UNAUTHORIZED, "TOKEN_INVALID", "Token is invalid"),
    FORBIDDEN(HttpStatus.FORBIDDEN, "FORBIDDEN", "You do not have permission to perform this action"),

    // ========== User ==========
    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "USER_NOT_FOUND", "User is not found"),
    EMAIL_EXISTS(HttpStatus.CONFLICT, "EMAIL_EXISTS", "Email already exists"),
    PASSWORD_INVALID(HttpStatus.BAD_REQUEST, "PASSWORD_INVALID", "Password does not meet requirements"),
    OLD_PASSWORD_INCORRECT(HttpStatus.BAD_REQUEST, "OLD_PASSWORD_INCORRECT", "Old password is incorrect"),
    USER_DISABLED(HttpStatus.FORBIDDEN, "USER_DISABLED", "User account has been disabled");

    private final HttpStatus status;
    private final String code;
    private final String message;
}