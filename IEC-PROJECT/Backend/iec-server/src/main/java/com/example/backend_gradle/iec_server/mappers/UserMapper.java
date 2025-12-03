package com.example.backend_gradle.iec_server.mappers;

import com.example.backend_gradle.iec_server.dtos.user.RegistrationRequest;
import com.example.backend_gradle.iec_server.dtos.user.UserDto;
import com.example.backend_gradle.iec_server.entities.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserMapper {
    @Mapping(target = "roles",source = "role")
    UserDto toDto(User user);
    User toEntity(RegistrationRequest registrationRequest);
    default List<String> mapRole(String role) {
        return role != null ? List.of(role) : List.of();
    }
}
