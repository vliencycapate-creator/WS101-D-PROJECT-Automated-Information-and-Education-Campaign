package com.example.backend_gradle.iec_server.services;

import com.example.backend_gradle.iec_server.dtos.flyer.FlyerRequest;
import com.example.backend_gradle.iec_server.entities.Flyer;
import com.example.backend_gradle.iec_server.exceptions.ApiException;
import com.example.backend_gradle.iec_server.helpers.handlers.ImageUploader;
import com.example.backend_gradle.iec_server.helpers.responses.ResponseBuilder;
import com.example.backend_gradle.iec_server.mappers.FlyerMapper;
import com.example.backend_gradle.iec_server.mappers.ImageMapper;
import com.example.backend_gradle.iec_server.repositories.FlyerJpaRepository;
import com.example.backend_gradle.iec_server.repositories.ImageJpaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class FlyerService {
    private final FlyerJpaRepository flyerRepo;
    private final ImageJpaRepository imageRepo;
    private final UserService userService;
    private final FlyerMapper flyerMapper;
    private final ImageMapper imageMapper;
    private final ImageUploader imageUploader;

    @Autowired
    public FlyerService(
            ImageUploader imageUploader,
            ImageMapper imageMapper,
            FlyerMapper flyerMapper,
            UserService userService,
            ImageJpaRepository imageRepo,
            FlyerJpaRepository flyerRepo
    ) {
        this.imageUploader = imageUploader;
        this.imageMapper = imageMapper;
        this.flyerMapper = flyerMapper;
        this.userService = userService;
        this.imageRepo = imageRepo;
        this.flyerRepo = flyerRepo;
    }

    public ResponseEntity<?> getAllFlyers() {
        var flyers = this.flyerRepo.findAll();
        var flyersDto = flyers.stream()
                .map(flyer -> {
                    var flyerDto = flyerMapper.toDto(flyer);
                    flyerDto.setCreatedBy(userService.getUserById(flyer.getCreatedBy()).getUsername());
                    return flyerDto;
                })
                .toList();
        return ResponseBuilder.success("Flyers fetch successful", flyersDto);
    }

    public ResponseEntity<?> getFlyerById(int id) {
        var flyer = this.flyerRepo.findById(id).orElseThrow(() -> new ApiException("No Flyer found with id: " + id, HttpStatus.NOT_FOUND));
        var flyerDto = flyerMapper.toDto(flyer);
        flyerDto.setCreatedBy(userService.getUserById(flyer.getCreatedBy()).getUsername());
        return ResponseBuilder.success("Flyer fetch successful", flyer);
    }

    public ResponseEntity<?> postFlyer(FlyerRequest flyerRequest) throws IOException {
        Flyer flyer = flyerMapper.toEntity(flyerRequest);
        var savedFlyer = this.flyerRepo.save(flyer);
        var images = this.imageUploader.uploadImage(savedFlyer.getId(), flyerRequest.getImages())
                .stream()
                .map(uploadedImage -> {
                    var image = this.imageMapper.toEntity(uploadedImage);
                    image.setFlyer(savedFlyer);
                    return image;
                })
                .toList();
        this.imageRepo.saveAll(images);
        return ResponseBuilder.created("Flyer created successful");
    }

    public ResponseEntity<?> deleteFlyerById(int id) {
        var flyer = this.flyerRepo.findById(id).orElseThrow(() -> new ApiException("No Flyer found with id: " + id, HttpStatus.NOT_FOUND));
        this.flyerRepo.deleteById(flyer.getId());
        return ResponseBuilder.success("Flyer deleted successful", null);
    }


}
