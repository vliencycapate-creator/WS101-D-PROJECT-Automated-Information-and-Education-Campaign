package com.example.backend_gradle.iec_server.repositories;

import com.example.backend_gradle.iec_server.entities.Record;

import lombok.NonNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RecordJpaRepository extends JpaRepository<@NonNull Record, @NonNull Long> {
    @Query(value = "SELECT * FROM flyer_records where flyer_id = :id", nativeQuery = true)
    Optional<Record> findByFlyerId(@Param("id") Long id);
}
