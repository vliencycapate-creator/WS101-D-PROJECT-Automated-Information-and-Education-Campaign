package com.example.backend_gradle.iec_server.repositories;

import com.example.backend_gradle.iec_server.entities.Record;

import lombok.NonNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RecordJpaRepository extends JpaRepository<@NonNull Record, @NonNull Long> {
    @NonNull
    @Override
    Optional<Record> findById(Long id);
}
