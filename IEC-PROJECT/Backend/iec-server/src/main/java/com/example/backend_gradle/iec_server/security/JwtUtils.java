package com.example.backend_gradle.iec_server.security;

import com.example.backend_gradle.iec_server.dtos.user.UserDto;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.List;

@Component
public class JwtUtils {

    private final SecretKey secretKey =
            Keys.hmacShaKeyFor("IEC-Jhemric4536-mahalkoparinsiyaMylOVe".getBytes());

    public String generateToken(UserDto user) {
        Date expiration = Date.from(
                Instant.now().plus(3, ChronoUnit.HOURS)  // 3 hours from now
        );
        return Jwts.builder()
                .claim("id", user.getId())
                .claim("username", user.getUsername())
                .claim("email", user.getEmail())
                .claim("roles", user.getRoles())
                .setExpiration(expiration)
                .signWith(secretKey, SignatureAlgorithm.HS256)
                .compact();
    }

    public UserDto verifyToken(String token) {
        Claims claims = Jwts
                .parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody();

        UserDto user = new UserDto();
        user.setId(Long.parseLong(claims.get("id").toString()));
        user.setUsername(claims.get("username").toString());
        user.setEmail(claims.get("email").toString());
        user.setRoles(((List<?>) claims.get("roles")).stream()
                .map(Object::toString)
                .toList());

        return user;
    }

}
