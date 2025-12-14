package com.example.backend_gradle.iec_server.validation.validation_interface;

import com.example.backend_gradle.iec_server.validation.validator_classes.ImageSizeValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = ImageSizeValidator.class)
@Target({ ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
public @interface ImageSize {
    String message() default "Invalid image(s) size";
    boolean required() default true;
    int min() default 0;
    int max() default Integer.MAX_VALUE;
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
