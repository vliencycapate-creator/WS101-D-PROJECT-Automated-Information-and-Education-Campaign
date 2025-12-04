package com.example.backend_gradle.iec_server.configs;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        Path currentDir = Paths.get("").toAbsolutePath();
        Path baseFolder = currentDir.resolve("IEC-PROJECT/Backend/iec-server/uploads");
        if (!Files.exists(baseFolder)) {
            try {
                Files.createDirectories(baseFolder);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }

        registry.addResourceHandler("iec-server/images/**")
                .addResourceLocations("file:" + baseFolder + "/");
    }

}

