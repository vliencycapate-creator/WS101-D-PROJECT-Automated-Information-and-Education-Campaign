package com.example.backend_gradle.iec_server.controllers;

import com.example.backend_gradle.iec_server.dtos.user.LoginRequest;
import com.example.backend_gradle.iec_server.dtos.user.RegistrationRequest;
import com.example.backend_gradle.iec_server.dtos.user.UserDto;
import com.example.backend_gradle.iec_server.validation.ValidationHelper;
import com.example.backend_gradle.iec_server.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/iec-server/api/v1")
@AllArgsConstructor
public class UserController {

    private final UserService userService;
    private final ValidationHelper validationHelper;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@ModelAttribute RegistrationRequest registrationRequest) {
        this.validationHelper.validate(registrationRequest);
        return this.userService.registerUser(registrationRequest);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@ModelAttribute LoginRequest loginRequest) {
        this.validationHelper.validate(loginRequest);
        return this.userService.loginUser(loginRequest);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logoutUser(@AuthenticationPrincipal UserDto user) { return this.userService.logoutUser(user); }

    @GetMapping("/users")
    public ResponseEntity<?> getUsers(@AuthenticationPrincipal UserDto user) { return this.userService.getAllUsers(user); }

}
