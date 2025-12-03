package com.example.backend_gradle.iec_server.dtos.flyer;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RequestFlyerStatus {
    @NotBlank(message = "Status to update is required")
    @Pattern(regexp = "approved|declined", message = "Status value must be approved or declined")
    private String status;
}
