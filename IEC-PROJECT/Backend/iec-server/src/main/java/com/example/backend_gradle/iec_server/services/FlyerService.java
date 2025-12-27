package com.example.backend_gradle.iec_server.services;

import com.example.backend_gradle.iec_server.dtos.flyer.FlyerImageRequest;
import com.example.backend_gradle.iec_server.dtos.flyer.FlyerRequest;
import com.example.backend_gradle.iec_server.dtos.user.UserDto;
import com.example.backend_gradle.iec_server.entities.Flyer;
import com.example.backend_gradle.iec_server.entities.enums.FlyerStatus;
import com.example.backend_gradle.iec_server.http.ResponseBuilder;
import com.example.backend_gradle.iec_server.exceptions.ApiAssert;
import com.example.backend_gradle.iec_server.mappers.FlyerMapper;
import com.example.backend_gradle.iec_server.repositories.FlyerJpaRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class FlyerService {

    private final FlyerJpaRepository flyerRepo;
    private final UserService userService;
    private final FlyerMapper flyerMapper;
    private final ImageService imageService;
    private final RecordService recordService;

    public ResponseEntity<?> getAllFlyers(UserDto userDto, String category, String search, String status) {
        List<Flyer> flyers;

        if (userDto != null && userDto.getRoles().contains("admin")) {
            flyers = this.flyerRepo.findAll(category, search, status);
            IO.println(status);
        } else {
            flyers = this.flyerRepo.findAllApproved(category, search);
        }

        ApiAssert.notFoundIf(flyers.isEmpty(), "No flyers found");
        var flyersDto = flyers.stream()
                .map(flyer -> {
                    var flyerDto = flyerMapper.toDto(flyer);
                    flyerDto.setCreatedBy(this.userService.getUserById(flyer.getCreatedBy()).getUsername());
                    return flyerDto;
                })
                .toList();
        return ResponseBuilder.success("Flyers fetch successful", flyersDto, flyersDto.size());
    }

    public ResponseEntity<?> getFlyerById(Long id, UserDto userDto) {
        Flyer flyer;

        if (userDto != null && userDto.getRoles().contains("admin")) {
            flyer = this.flyerRepo.findById(id).orElse(null);
        } else if (userDto != null && userDto.getRoles().contains("faculty")) {
            flyer = this.flyerRepo.findByIdForUser(id, userDto.getId()).orElse(null);
        } else {
            flyer = this.flyerRepo.findApprovedById(id).orElse(null);
        }

        ApiAssert.notFoundIf(flyer == null, "Flyer not found");
        var flyerDto = flyerMapper.toDto(flyer);
        flyerDto.setCreatedBy(this.userService.getUserById(flyer.getCreatedBy()).getUsername());
        return ResponseBuilder.success("Flyer fetch successful", flyer);
    }

    public ResponseEntity<?> getAllFlyersForUsers(UserDto userDto, String category, String search, String status) {
        var flyers = this.flyerRepo.findAllForUser(userDto.getId(), category, search, status);
        ApiAssert.notFoundIf(flyers.isEmpty(), "No flyers found!");
        var flyersDto = flyers.stream()
                .map(flyer -> {
                    var flyerDto = flyerMapper.toDto(flyer);
                    flyerDto.setCreatedBy(this.userService.getUserById(flyer.getCreatedBy()).getUsername());
                    return flyerDto;
                })
                .toList();
        return ResponseBuilder.success("Flyers fetch successful", flyersDto, flyersDto.size());
    }

    // Reuse in mutation
    public Flyer getFlyerByIdForUsers(long id, long userId) {
        var flyer = this.flyerRepo.findByIdForUser(id, userId).orElse(null);
        ApiAssert.notFoundIf(flyer == null, "Flyer not found");
        return flyer;
    }

    @Transactional
    public ResponseEntity<?> postFlyer(FlyerRequest flyerRequest, FlyerImageRequest flyerImageRequest, UserDto user) {
        var flyer = this.flyerMapper.toEntity(flyerRequest);
        flyer.setCreatedBy(this.userService.getUserById(user.getId()).getId());
        var savedFlyer = this.flyerRepo.save(flyer);
        var record = this.recordService.postRecord(savedFlyer, user.getEmail());
        savedFlyer.setRecord(record);
        this.flyerRepo.save(savedFlyer);
        this.imageService.postImages(savedFlyer, flyerImageRequest.getImages());
        return ResponseBuilder.created("Flyer created successful");
    }

    @Transactional
    public ResponseEntity<?> deleteFlyerById(long id, UserDto userDto) {
        var flyer = this.getFlyerByIdForUsers(id, userDto.getId());
        this.recordService.updateRecordByFlyerId(flyer, FlyerStatus.deleted);
        this.imageService.deleteUploadedImages(flyer);
        this.flyerRepo.delete(flyer);
        return ResponseBuilder.success("Flyer deleted successful", null);
    }

    @Transactional
    public ResponseEntity<?> updateFlyerById(long id, FlyerRequest flyerRequest, FlyerImageRequest flyerImageRequest, UserDto userDto) {
        var flyer = this.getFlyerByIdForUsers(id, userDto.getId());
        flyer.setTitle(flyerRequest.getTitle());
        flyer.setDescription(flyerRequest.getDescription());
        flyer.setCategory(flyerRequest.getCategory());

        if (flyerImageRequest.getImages() != null) {
            this.imageService.postImages(flyer, flyerImageRequest.getImages());
        }

        if (flyerImageRequest.getImagesToDel() != null) {
            this.imageService.deleteImagesFromListId(flyer, flyerImageRequest.getImagesToDel());
        }

        this.recordService.updateRecordByFlyerId(flyer, FlyerStatus.pending);
        return ResponseBuilder.success("Flyer updated successful", null);
    }

    public ResponseEntity<?> updateFlyerStatusById(long id, String status) {
        var flyer = this.flyerRepo.findById(id).orElse(null);
        ApiAssert.notFoundIf(flyer == null, "Flyer not found");
        this.recordService.updateRecordByFlyerId(flyer, FlyerStatus.valueOf(status));
        return ResponseBuilder.success("Flyer " + status + " successful", null);
    }

}
