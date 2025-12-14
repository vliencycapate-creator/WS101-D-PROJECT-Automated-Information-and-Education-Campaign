package com.example.backend_gradle.iec_server.exceptions;

import lombok.NonNull;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ApiException.class)
    public ResponseEntity<@NonNull  Map<String, Object>> handleApiException(ApiException ex) {
        Map<String, Object> body = new HashMap<>();
        body.put("success", false);
        body.put("status", ex.getStatus().value());
        body.put("message", ex.getMessage());
        body.put("timestamp", new java.util.Date());

        if (ex.getErrors() != null) {
            body.put("errors", ex.getErrors());
        }

        return new ResponseEntity<>(body, ex.getStatus());
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<@NonNull Map<String, Object>> handleOtherExceptions(Exception ex) {
        Map<String, Object> body = new HashMap<>();
        body.put("success", false);
        body.put("status", 500);
        body.put("error", "Internal Server Error");
        body.put("message", ex.getMessage());
        body.put("timestamp", new java.util.Date());

        return new ResponseEntity<>(body, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
