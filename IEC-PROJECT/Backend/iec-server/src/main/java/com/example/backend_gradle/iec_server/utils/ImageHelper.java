package com.example.backend_gradle.iec_server.helpers.utils;


import com.example.backend_gradle.iec_server.dtos.other.UploadedImage;
import com.example.backend_gradle.iec_server.entities.Image;
import com.example.backend_gradle.iec_server.exceptions.ApiException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@Component
public class ImageHelper {
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

    public void removeImages(List<Image> images) throws IOException {
        images.forEach(image -> {
            try {
                String pathName = image.getImagePath().substring(8);
                Files.deleteIfExists(baseFolder.resolve(pathName));
                IO.println(baseFolder.resolve(pathName).toString());
            } catch (Exception e) {
                throw new ApiException(e.getMessage(), HttpStatus.CONFLICT);
            }
        });
    }

}
