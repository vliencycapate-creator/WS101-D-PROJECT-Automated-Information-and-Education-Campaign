package com.example.backend_gradle.iec_server.exceptions;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class ApiException extends RuntimeException {

    private final HttpStatus status;
    private Object errors;

    public ApiException(String message, HttpStatus status) {
        super(message);
        this.status = status;
    }

    public ApiException(String message, Object errors, HttpStatus status) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

}

