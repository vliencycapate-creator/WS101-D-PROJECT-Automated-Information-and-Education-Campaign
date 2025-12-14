package com.example.backend_gradle.iec_server.validation.validation_interface;

import com.example.backend_gradle.iec_server.validation.validator_classes.ImageValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = ImageValidator.class)
@Target({ ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
public @interface ImageOnly {
    String message() default "Invalid image(s)";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
