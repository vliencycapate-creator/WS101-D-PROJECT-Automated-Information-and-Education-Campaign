package com.example.backend_gradle.iec_server.controllers;

import com.example.backend_gradle.iec_server.dtos.flyer.FlyerImageRequest;
import com.example.backend_gradle.iec_server.dtos.flyer.FlyerRequest;
import com.example.backend_gradle.iec_server.dtos.flyer.RequestFlyerStatus;
import com.example.backend_gradle.iec_server.dtos.user.UserDto;
import com.example.backend_gradle.iec_server.validation.ValidationHelper;
import com.example.backend_gradle.iec_server.services.FlyerService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/iec-server/api/v1")
@AllArgsConstructor
public class FlyerController {

    private final FlyerService flyerService;
    private final ValidationHelper validateHelper;

    @GetMapping("/flyers")
    public ResponseEntity<?> getFlyers(
            @AuthenticationPrincipal UserDto user,
            @RequestParam(required = false, name = "category") String category,
            @RequestParam(required = false, name = "search") String search,
            @RequestParam(required = false, name = "status") String status) {
        return this.flyerService.getAllFlyers(user, category, search, status);
    }

    @GetMapping("/flyers/{id}")
    public ResponseEntity<?> getFlyersById(@PathVariable long id, @AuthenticationPrincipal UserDto user) {
        return this.flyerService.getFlyerById(id, user);
    }

    @GetMapping("/myflyers")
    public ResponseEntity<?> getUserFlyers(
            @AuthenticationPrincipal UserDto user,
            @RequestParam(required = false, name = "category") String category,
            @RequestParam(required = false, name = "search") String search,
            @RequestParam(required = false, name = "status") String status) {
        return this.flyerService.getAllFlyersForUsers(user, category, search, status);
    }

    @PostMapping("/flyers")
    public ResponseEntity<?> postFlyer(
            @ModelAttribute FlyerRequest flyerRequest,
            @ModelAttribute FlyerImageRequest flyerImageRequest,
            @AuthenticationPrincipal UserDto user) {
        this.validateHelper.validate(flyerRequest);
        this.validateHelper.validate(flyerImageRequest);
        return this.flyerService.postFlyer(flyerRequest, flyerImageRequest, user);
    }

    @DeleteMapping("/flyers/{id}")
    public ResponseEntity<?> deleteFlyerById(@PathVariable long id, @AuthenticationPrincipal UserDto user) {
        return this.flyerService.deleteFlyerById(id, user);
    }

    @PostMapping("/flyers/{id}")
    public ResponseEntity<?> UpdateFlyerById(
            @PathVariable long id,
            @ModelAttribute FlyerRequest flyerRequest,
            @ModelAttribute FlyerImageRequest flyerImageRequest,
            @AuthenticationPrincipal UserDto userDto) {
        this.validateHelper.validate(flyerRequest);
        if (flyerImageRequest.getImages() != null) {
            this.validateHelper.validate(flyerImageRequest);
        }
        return this.flyerService.updateFlyerById(id, flyerRequest, flyerImageRequest, userDto);
    }

    @PutMapping("/flyers/{id}")
    public ResponseEntity<?> updateFlyerStatusById(@PathVariable long id, @ModelAttribute RequestFlyerStatus requestStatus) {
        this.validateHelper.validate(requestStatus);
        return this.flyerService.updateFlyerStatusById(id, requestStatus.getStatus());
    }

}
