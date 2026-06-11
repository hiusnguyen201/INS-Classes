package com.ins.ins_classes_be.common;

import lombok.Getter;

@Getter
public class BusinessException extends RuntimeException {
    private final ExceptionError error;

    public BusinessException(ExceptionError error) {
        super(error.getMessage());
        this.error = error;
    }

    public BusinessException(ExceptionError error, String message) {
        super(message);
        this.error = error;
    }
}
