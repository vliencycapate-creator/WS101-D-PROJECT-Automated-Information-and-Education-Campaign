package com.example.backend_gradle.iec_server.services;

import com.example.backend_gradle.iec_server.entities.Flyer;
import com.example.backend_gradle.iec_server.entities.Image;
import com.example.backend_gradle.iec_server.utils.ApiAssert;
import com.example.backend_gradle.iec_server.utils.ImageHelper;
import com.example.backend_gradle.iec_server.mappers.ImageMapper;
import com.example.backend_gradle.iec_server.repositories.ImageJpaRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@AllArgsConstructor
public class ImageService {

    private final ImageHelper imageHelper;
    private final ImageMapper imageMapper;
    private final ImageJpaRepository imageRepo;

    public void postImages(Flyer flyer, Object imageList) {
        var images = this.imageHelper.uploadImage(flyer.getId(), (MultipartFile[]) imageList)
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
        this.imageHelper.removeImages(imagesToDel);
        this.imageRepo.deleteAll(imagesToDel);
    }

    @Transactional
    public void deleteUploadedImages(Flyer flyer) {
        this.imageHelper.removeImages(flyer.getImages());
    }

}
