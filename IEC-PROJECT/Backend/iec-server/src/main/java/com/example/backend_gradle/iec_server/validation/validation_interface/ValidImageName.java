package com.example.backend_gradle.iec_server.validation.validation_interface;

import com.example.backend_gradle.iec_server.validation.validator_classes.ImageNameValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Constraint(validatedBy = ImageNameValidator.class)
@Target({ ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
public @interface ValidImageName {
    String message() default "Invalid image name";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}

