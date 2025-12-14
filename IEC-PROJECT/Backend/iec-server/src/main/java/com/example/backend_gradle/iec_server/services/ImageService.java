package com.example.backend_gradle.iec_server.services;

import com.example.backend_gradle.iec_server.dtos.other.UploadedImage;
import com.example.backend_gradle.iec_server.entities.Flyer;
import com.example.backend_gradle.iec_server.entities.Image;
import com.example.backend_gradle.iec_server.exceptions.ApiAssert;
import com.example.backend_gradle.iec_server.exceptions.ApiException;
import com.example.backend_gradle.iec_server.mappers.ImageMapper;
import com.example.backend_gradle.iec_server.repositories.ImageJpaRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@AllArgsConstructor
public class ImageService {

    private final ImageMapper imageMapper;
    private final ImageJpaRepository imageRepo;
    private static final Path baseFolder = Paths.get("")
            .toAbsolutePath()
            .resolve("IEC-PROJECT/Backend/iec-server/uploads");

    @Transactional
    public void postImages(Flyer flyer, Object imageList) {
        var images = this.uploadImage(flyer.getId(), (MultipartFile[]) imageList)
                .stream()
                .map(uploadedImage -> {
                    var image = this.imageMapper.toEntity(uploadedImage);
                    image.setFlyer(flyer);
                    return image;
                })
                .toList();
        this.imageRepo.saveAll(images);
    }

    @Transactional
    public void deleteImagesFromListId(Flyer flyer, List<Long> listId) {
        var images = this.imageRepo.findAllById(flyer.getId());
        ApiAssert.notFoundIf(images.isEmpty(), "No Images found with flyer id :" + flyer.getId());
        ApiAssert.badRequestIf((long) listId.size() == (long) images.size(), "Must have at least 1 image present");
        Set<Long> idSet = new HashSet<>(listId);
        List<Image> imagesToDel = images.stream()
                .filter(image -> idSet.contains(image.getId()))
                .toList();
        this.removeImages(imagesToDel);
        this.imageRepo.deleteAll(imagesToDel);
    }

    @Transactional
    public void deleteUploadedImages(Flyer flyer) {
        this.removeImages(flyer.getImages());
    }

    private List<UploadedImage> uploadImage(long id, MultipartFile[] files) {
        List<UploadedImage> uploadedImages = new ArrayList<>();
        try {
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
        } catch (Exception e) {
            throw new ApiException(e.getMessage(), HttpStatus.CONFLICT);
        }
    }

    private void removeImages(List<Image> images) {
        images.forEach(image -> {
            try {
                String pathName = image.getImagePath().substring(8);
                Files.deleteIfExists(baseFolder.resolve(pathName));
                image.setFlyer(null);
            } catch (Exception e) {
                throw new ApiException(e.getMessage(), HttpStatus.CONFLICT);
            }
        });
    }
}
