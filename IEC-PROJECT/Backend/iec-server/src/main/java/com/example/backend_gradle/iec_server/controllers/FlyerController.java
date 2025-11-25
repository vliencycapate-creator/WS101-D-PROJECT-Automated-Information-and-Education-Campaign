package com.example.backend_gradle.iec_server.controllers;

import com.example.backend_gradle.iec_server.dtos.flyer.FlyerDto;
import com.example.backend_gradle.iec_server.entities.Flyer;
import com.example.backend_gradle.iec_server.services.FlyerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/iec-server/api/v1")
public class FlyerController {

    private final FlyerService flyerService;

    @Autowired
    FlyerController (FlyerService flyerService) {this.flyerService = flyerService;}

    @GetMapping("/flyers")
    public List<FlyerDto> getFlyers() { return this.flyerService.getAllFlyers(); }

    @GetMapping("/flyers/{id}")
    public FlyerDto getFlyers(@PathVariable int id) { return this.flyerService.getFlyerById(id); }

}
