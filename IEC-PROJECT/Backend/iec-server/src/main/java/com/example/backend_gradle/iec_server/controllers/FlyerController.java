package com.example.backend_gradle.iec_server.controllers;

import com.example.backend_gradle.iec_server.dtos.flyer.FlyerRequest;
import com.example.backend_gradle.iec_server.helpers.validators.ValidationHelper;
import com.example.backend_gradle.iec_server.services.FlyerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/iec-server/api/v1")
public class FlyerController {

    private final FlyerService flyerService;
    private final ValidationHelper validateHelper;

    @Autowired
    FlyerController (FlyerService flyerService, ValidationHelper validateHelper) {
        this.flyerService = flyerService;
        this.validateHelper = validateHelper;
    }

    @GetMapping("/flyers")
    public ResponseEntity<?> getFlyers() { return this.flyerService.getAllFlyers(); }

    @GetMapping("/flyers/{id}")
    public ResponseEntity<?> getFlyersById(@PathVariable int id) { return this.flyerService.getFlyerById(id); }

    @PostMapping("/flyers")
    public ResponseEntity<?> postFlyer(@ModelAttribute FlyerRequest flyerRequest) throws IOException {
        this.validateHelper.validate(flyerRequest);
        return this.flyerService.postFlyer(flyerRequest);
    }

    @DeleteMapping("/flyers/{id}")
    public ResponseEntity<?> deleteFlyerById(@PathVariable int id) { return this.flyerService.deleteFlyerById(id); }
}
