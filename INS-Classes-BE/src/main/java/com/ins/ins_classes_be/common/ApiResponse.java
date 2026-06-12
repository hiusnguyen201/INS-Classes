package com.ins.ins_classes_be.common;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ApiResponse<T> {
    private T data = null;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private ErrorResponse error;

    public static <T> ApiResponse<T> ok(T data) {
        return ApiResponse.<T>builder().data(data).build();
    }

    public static <T> ApiResponse<T> error(String code, String message) {
        return ApiResponse.<T>builder()
                .error(ErrorResponse.builder()
                        .code(code)
                        .message(message)
                        .build())
                .build();
    }

    public static <T> ApiResponse<T> error(ExceptionError error) {
        return ApiResponse.<T>builder()
                .error(ErrorResponse.builder()
                        .code(error.getCode())
                        .message(error.getMessage())
                        .build())
                .build();
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ErrorResponse {
        private String code;
        private String message;
    }
}
