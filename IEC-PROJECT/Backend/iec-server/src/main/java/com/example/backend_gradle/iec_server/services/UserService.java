package com.example.backend_gradle.iec_server.services;

import com.example.backend_gradle.iec_server.dtos.user.UserDto;
import com.example.backend_gradle.iec_server.mappers.UserMapper;
import com.example.backend_gradle.iec_server.repositories.UserJpaRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserService {
    private final UserJpaRepository userRepo;
    private UserMapper userMapper;

    public UserDto getUserByEmail(String email) {
        var user = this.userRepo.findByEmail(email).orElse(null);
        return userMapper.toDto(user);
    }

    public UserDto getUserById(int id) {
        var user = this.userRepo.findById(id).orElse(null);
        return userMapper.toDto(user);
    }
}
