package com.example.backend_gradle.iec_server.dtos.user;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RegistrationRequest {
    @NotBlank
    @Size(min = 3, message = "Username must have at least 3 characters")
    private String username;

    @NotBlank
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank
    @Size(min = 6, message = "password must have at least 6 characters")
    private String password;

    @NotBlank
    @Pattern(regexp = "admin|faculty", message = "Role is invalid")
    private String role;
}
