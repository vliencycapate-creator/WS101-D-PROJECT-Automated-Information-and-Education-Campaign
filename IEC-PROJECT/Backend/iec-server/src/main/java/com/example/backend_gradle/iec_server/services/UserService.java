package com.example.backend_gradle.iec_server.services;

import com.example.backend_gradle.iec_server.configs.SecurityConfig;
import com.example.backend_gradle.iec_server.dtos.other.ResponseToken;
import com.example.backend_gradle.iec_server.dtos.user.LoginRequest;
import com.example.backend_gradle.iec_server.dtos.user.RegistrationRequest;
import com.example.backend_gradle.iec_server.dtos.user.UserDto;
import com.example.backend_gradle.iec_server.entities.User;
import com.example.backend_gradle.iec_server.entities.enums.UserStatus;
import com.example.backend_gradle.iec_server.exceptions.ApiException;
import com.example.backend_gradle.iec_server.http.ResponseBuilder;
import com.example.backend_gradle.iec_server.exceptions.ApiAssert;
import com.example.backend_gradle.iec_server.mappers.UserMapper;
import com.example.backend_gradle.iec_server.repositories.UserJpaRepository;
import com.example.backend_gradle.iec_server.security.JwtUtils;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


@Service
@AllArgsConstructor
public class UserService {

    private final UserJpaRepository userRepo;
    private final UserMapper userMapper;
    private final SecurityConfig securityConfig;
    private final JwtUtils jwtUtils;

    public ResponseEntity<?> registerUser(RegistrationRequest registrationRequest) {
        var isRegistered = this.userRepo.findByEmail(registrationRequest.getEmail()).orElse(null);
        ApiAssert.unAuthorizedIf(isRegistered != null, "Email is already registered");
        var passEncoder = securityConfig.passwordEncoder();
        var user = this.userMapper.toEntity(registrationRequest);
        user.setPassword(passEncoder.encode(user.getPassword()));
        this.userRepo.save(user);
        return ResponseBuilder.created("User registered successful");
    }

    public ResponseEntity<?> loginUser(LoginRequest loginRequest) {
        var user = this.userRepo.findByEmail(loginRequest.getEmail()).orElse(null);
        ApiAssert.unAuthorizedIf(
                user == null || !securityConfig
                        .passwordEncoder()
                        .matches(loginRequest.getPassword(), user.getPassword()), "Invalid email or password");
        user.setStatus(UserStatus.online);
        this.userRepo.save(user);
        var token = this.jwtUtils.generateToken(this.userMapper.toDto(user));
        return ResponseBuilder.success("Login successful",new ResponseToken(token, user.getRole().toString()));
    }

    public ResponseEntity<?> logoutUser(UserDto userDto) {
        var user = this.userRepo.findByEmail(userDto.getEmail()).orElse(null);
        ApiAssert.unAuthorizedIf(user == null , "User not found");
        user.setStatus(UserStatus.offline);
        this.userRepo.save(user);
        return ResponseBuilder.success("Logout successful", null);
    }

    public User getUserById(long id) {
        User user = this.userRepo.findById(id).orElse(null);
        ApiAssert.notFoundIf(user == null, "User not found");
        return user;
    }

    public ResponseEntity<?> getAllUsers(UserDto userDto) {
        ApiAssert.forbiddenIf(userDto == null || !userDto.getRoles().contains("admin"), "Unauthorized access prohibited!");
        var users = this.userRepo.findAll()
                .stream()
                .map(userMapper::toDto)
                .toList();
        ApiAssert.notFoundIf(users.isEmpty(), "No users found");
        return ResponseBuilder.success("Users fetched successful", users);
    }

}
