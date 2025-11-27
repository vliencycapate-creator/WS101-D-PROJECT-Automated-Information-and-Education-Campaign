package com.example.backend_gradle.iec_server.helpers.validators;

import com.example.backend_gradle.iec_server.exceptions.ApiException;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validator;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

@Component
@AllArgsConstructor
public class ValidationHelper {

    private Validator validator;

    public void validate(Object obj) {
        Set<ConstraintViolation<Object>> violations = validator.validate(obj);

        Map<String, String> errors = new HashMap<>();

        for (ConstraintViolation<Object> v : violations) {
            String field = v.getPropertyPath().toString();
            String message = v.getMessage();
            errors.put(field, message);
        }
        if(!errors.isEmpty()) throw new ApiException("Invalid field", errors, HttpStatus.BAD_REQUEST);
        IO.println("Nothing happens");
    }
}

