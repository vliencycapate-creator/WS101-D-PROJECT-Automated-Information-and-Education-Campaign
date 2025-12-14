package com.example.backend_gradle.iec_server.validation.validator_classes;

import com.example.backend_gradle.iec_server.validation.validation_interface.ValidImageName;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.web.multipart.MultipartFile;

import java.util.regex.Pattern;

public class ImageNameValidator implements ConstraintValidator<ValidImageName, MultipartFile[]> {

    private static final Pattern VALID_NAME = Pattern.compile("^[A-Za-z0-9\\-_]+\\.(jpg|jpeg|png|gif|webp)$", Pattern.CASE_INSENSITIVE);

    @Override
    public boolean isValid(MultipartFile[] files, ConstraintValidatorContext context) {
        if (files == null) return true;

        for (MultipartFile file : files) {
            String name = file.getOriginalFilename();
            if (name == null || !VALID_NAME.matcher(name).matches()) {
                return false;
            }
        }
        return true;
    }
}

