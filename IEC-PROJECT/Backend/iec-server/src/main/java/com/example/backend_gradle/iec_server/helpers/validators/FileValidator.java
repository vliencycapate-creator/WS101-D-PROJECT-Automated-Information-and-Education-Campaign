package com.example.backend_gradle.iec_server.helpers.validators;


import com.example.backend_gradle.iec_server.helpers.validators.validation_interface.ValidFiles;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.web.multipart.MultipartFile;

public class FileValidator implements ConstraintValidator<ValidFiles, MultipartFile[]> {
    @Override
    public boolean isValid(MultipartFile[] files, ConstraintValidatorContext context) {
        if (files == null || files.length == 0) return false;

        for (MultipartFile file : files) {
            if (file.isEmpty()) return false;
            if (file.getContentType() == null || !file.getContentType().startsWith("image/")) return false;
            if (file.getSize() > 5 * 1024 * 1024) return false; // max 5MB
        }

        return true;
    }
}