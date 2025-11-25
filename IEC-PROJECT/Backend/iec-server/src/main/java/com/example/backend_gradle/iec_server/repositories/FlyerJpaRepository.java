package com.example.backend_gradle.iec_server.repositories;

import com.example.backend_gradle.iec_server.entities.Flyer;
import lombok.NonNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FlyerJpaRepository extends JpaRepository<@NonNull Flyer, @NonNull Integer> {
    @Override
    @NonNull
    List<Flyer> findAll();

    @Override
    @NonNull
    Optional<Flyer> findById(Integer id);
}
