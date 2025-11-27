package com.example.backend_gradle.iec_server.mappers;

import com.example.backend_gradle.iec_server.dtos.flyer.FlyerDto;
import com.example.backend_gradle.iec_server.dtos.flyer.FlyerRequest;
import com.example.backend_gradle.iec_server.entities.Flyer;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface FlyerMapper {
    FlyerDto toDto(Flyer flyer);
    Flyer toEntity(FlyerRequest flyerRequest);
}
