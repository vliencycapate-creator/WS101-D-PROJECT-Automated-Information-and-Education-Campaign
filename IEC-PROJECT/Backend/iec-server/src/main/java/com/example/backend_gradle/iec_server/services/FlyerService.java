package com.example.backend_gradle.iec_server.services;

import com.example.backend_gradle.iec_server.dtos.flyer.FlyerDto;
import com.example.backend_gradle.iec_server.entities.Flyer;
import com.example.backend_gradle.iec_server.mappers.FlyerMapper;
import com.example.backend_gradle.iec_server.repositories.FlyerJpaRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class FlyerService {
    private final FlyerJpaRepository flyerRepo;
    private UserService userService;
    private FlyerMapper flyerMapper;

    public List<FlyerDto> getAllFlyers() {
        var flyers = this.flyerRepo.findAll();
        return flyers.stream()
                .map(flyer -> {
                    var flyerDto = flyerMapper.toDto(flyer);
                    flyerDto.setCreatedBy(userService.getUserById(flyer.getCreatedBy()).getUsername());
                    return flyerDto;
                }).toList();
    }

    public FlyerDto getFlyerById(int id) {
        var flyer = this.flyerRepo.findById(id).orElseThrow(() -> new RuntimeException("gem is love"));
        var flyerDto = flyerMapper.toDto(flyer);
        flyerDto.setCreatedBy(userService.getUserById(flyer.getCreatedBy()).getUsername());
        return flyerDto;
    }
}
