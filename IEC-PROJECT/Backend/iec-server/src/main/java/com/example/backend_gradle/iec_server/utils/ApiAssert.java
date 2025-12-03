package com.example.backend_gradle.iec_server.utils;

import com.example.backend_gradle.iec_server.exceptions.ApiException;
import org.springframework.http.HttpStatus;

public class ApiAssert {

    public static void badRequestIf(boolean condition, String message) {
        if (condition) throw new ApiException(message, HttpStatus.BAD_REQUEST);
    }

    public static void badRequestIf(boolean condition, String message, Object data) {
        if (condition) throw new ApiException(message, data, HttpStatus.BAD_REQUEST);
    }

    public static void notFoundIf(boolean condition, String message) {
        if (condition) throw new ApiException(message, HttpStatus.NOT_FOUND);
    }

    public static void forbiddenIf(boolean condition, String message) {
        if (condition) throw new ApiException(message, HttpStatus.FORBIDDEN);
    }

}
