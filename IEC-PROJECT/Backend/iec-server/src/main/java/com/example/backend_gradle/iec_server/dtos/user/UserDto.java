package com.example.backend_gradle.iec_server.dtos.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDto{
    private int id;
    private String username;
    private String email;
    private String role;
    private String createdAt;
}
