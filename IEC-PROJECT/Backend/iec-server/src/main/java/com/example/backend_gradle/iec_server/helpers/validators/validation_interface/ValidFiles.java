package com.example.backend_gradle.iec_server.helpers.validators.validation_interface;

import com.example.backend_gradle.iec_server.helpers.validators.FileValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = FileValidator.class)
@Target({ ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
public @interface ValidFiles {
    String message() default "Invalid file(s)";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
