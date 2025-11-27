package com.example.backend_gradle.iec_server.helpers.handlers;


import com.example.backend_gradle.iec_server.dtos.other.UploadedImage;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@Component
public class ImageUploader {
    private static final Path baseFolder = Paths.get("").toAbsolutePath().resolve("IEC-PROJECT/Backend/iec-server/uploads");

    public List<UploadedImage> uploadImage(long id, MultipartFile[] files) throws IOException {
        List<UploadedImage> uploadedImages = new ArrayList<>();
        if (!Files.exists(baseFolder)) {
            Files.createDirectories(baseFolder);
        }

        String folderName = "flyer_" + id;
        Path folderPath = baseFolder.resolve(folderName);
        if (!Files.exists(folderPath)) {
            Files.createDirectories(folderPath);
        }

        for (MultipartFile file : files) {
            if (file.isEmpty() || file.getContentType() == null || !file.getContentType().startsWith("image/")) {
                continue;
            }

            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path filePath = folderPath.resolve(fileName);
            file.transferTo(filePath.toFile());

            String urlPath = "/images/" + folderName + "/" + fileName;
            uploadedImages.add(new UploadedImage(fileName, urlPath));
        }
        return uploadedImages;
    }
}
