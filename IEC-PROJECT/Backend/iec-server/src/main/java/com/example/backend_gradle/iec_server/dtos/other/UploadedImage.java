package com.example.backend_gradle.iec_server.dtos.other;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UploadedImage {
    private String imageName;
    private String imagePath;
}
