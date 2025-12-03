package com.example.backend_gradle.iec_server.dtos.other;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class Meta {
    private LocalDateTime timestamp;
}
