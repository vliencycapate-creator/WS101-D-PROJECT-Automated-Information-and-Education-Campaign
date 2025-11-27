package com.example.backend_gradle.iec_server.dtos.flyer;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FlyerRequest {
    @NotBlank
    @Size(min = 5, message = "Title must have at least 5 characters")
    private String title;

    @NotBlank
    @Size(min = 5, message = "Description must have at least 5 characters")
    private String description;

    @NotBlank
    @Size(min = 3, message = "Category must have at least 3 characters")
    private String category;

    @NotNull
    private int createdBy;

    private MultipartFile[] images;
}
