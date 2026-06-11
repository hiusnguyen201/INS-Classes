package com.ins.ins_classes_be.common;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@RestControllerAdvice
public class ExceptionHandler {
    @ExceptionHandler(ExceptionError.class)
    public ResponseEntity<ApiResponse<Void>> handleExceptionError (ExceptionError e) {

    }
}
