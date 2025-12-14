package com.example.backend_gradle.iec_server.validation.validator_classes;

import com.example.backend_gradle.iec_server.validation.validation_interface.ImageOnly;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.web.multipart.MultipartFile;

public class ImageValidator implements ConstraintValidator<ImageOnly, MultipartFile[]> {

    @Override
    public boolean isValid(MultipartFile[] files, ConstraintValidatorContext context) {
        if (files == null || files.length == 0) return false;
        for (MultipartFile file : files) {
            if (file.isEmpty()) return false;
            if (file.getContentType() == null || !file.getContentType().startsWith("image/")) return false;
        }
        return true;
    }

}
