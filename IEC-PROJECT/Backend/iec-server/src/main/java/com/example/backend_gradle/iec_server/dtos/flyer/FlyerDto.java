package com.example.backend_gradle.iec_server.dtos.flyer;

import com.example.backend_gradle.iec_server.entities.Image;
import com.example.backend_gradle.iec_server.entities.Record;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class FlyerDto {
    private long id;
    private String title;
    private String description;
    private String category;
    private String createdBy;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private List<Image> images;
    private Record record;
}