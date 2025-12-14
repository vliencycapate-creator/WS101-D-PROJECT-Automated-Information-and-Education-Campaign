package com.example.backend_gradle.iec_server.validation.validator_classes;

import com.example.backend_gradle.iec_server.validation.validation_interface.ImageSize;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.web.multipart.MultipartFile;

public class ImageSizeValidator implements ConstraintValidator<ImageSize, MultipartFile[]> {

    private int min;
    private int max;

    @Override
    public void initialize(ImageSize constraintAnnotation) {
        this.min = constraintAnnotation.min();
        this.max = constraintAnnotation.max();
    }

    @Override
    public boolean isValid(MultipartFile[] files, ConstraintValidatorContext context) {
        if (files == null || files.length == 0) return false;
        for (MultipartFile file : files) {
            if (file.isEmpty()) return false;
            if (file.getSize() < min || file.getSize() > max) return false;
        }
        return true;
    }

}
