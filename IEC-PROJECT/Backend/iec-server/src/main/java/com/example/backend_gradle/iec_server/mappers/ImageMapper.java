package com.example.backend_gradle.iec_server.mappers;

import com.example.backend_gradle.iec_server.dtos.other.UploadedImage;
import com.example.backend_gradle.iec_server.entities.Image;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ImageMapper {
    Image toEntity(UploadedImage uploadedImage);
}
