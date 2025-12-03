package com.example.backend_gradle.iec_server.dtos.other;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ResponseToken {
    private String token;
    private String role;
}
