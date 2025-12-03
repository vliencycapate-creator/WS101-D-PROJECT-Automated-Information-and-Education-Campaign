package com.example.backend_gradle.iec_server.repositories;

import com.example.backend_gradle.iec_server.entities.Image;
import lombok.NonNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImageJpaRepository extends JpaRepository<@NonNull Image, @NonNull Long> {
    @Query(value = "SELECT * FROM images where flyer_id = :id", nativeQuery = true)
    List<Image> findAllById(@Param("id") Long id);
}
