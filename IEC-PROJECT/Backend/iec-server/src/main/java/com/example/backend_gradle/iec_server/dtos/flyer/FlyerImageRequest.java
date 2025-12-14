package com.example.backend_gradle.iec_server.dtos.flyer;

import com.example.backend_gradle.iec_server.validation.validation_interface.ImageOnly;
import com.example.backend_gradle.iec_server.validation.validation_interface.ImageSize;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FlyerImageRequest {
    @ImageOnly(message = "Must have a valid image")
    @ImageSize(max = 5_000_000, message = "Image size must be below 5mb")
    private MultipartFile[] images;
    private List<Long> imagesToDel;
}
