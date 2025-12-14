package com.example.backend_gradle.iec_server.repositories;

import com.example.backend_gradle.iec_server.entities.Flyer;
import lombok.NonNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FlyerJpaRepository extends JpaRepository<@NonNull Flyer, @NonNull Long> {

    @Override
    @NonNull
    Optional<Flyer> findById(Long id);

    @Query(value = """
    SELECT f.* FROM flyers f
    JOIN users u ON u.user_id = f.created_by
    JOIN flyer_records fr ON fr.flyer_id = f.flyer_id
    WHERE 1 = 1
    AND (:category IS NULL OR f.category = :category)
    AND (:status IS NULL OR fr.status = :status)
    AND (
        :search IS NULL OR
    	(
    	    (f.title REGEXP CONCAT(
    	    '(^|[^a-zA-Z0-9])',
    	    REPLACE(:search ,' ','([^a-zA-Z0-9]|$)|(^|[^a-zA-Z0-9])'),
    	    '([^a-zA-Z0-9]|$)')
    	    OR
        u.username REGEXP CONCAT(
            '(^|[^a-zA-Z0-9])',
            REPLACE(:search ,' ','([^a-zA-Z0-9]|$)|(^|[^a-zA-Z0-9])'),
            '([^a-zA-Z0-9]|$)')
            )
        )
    );
    """, nativeQuery = true)
    List<Flyer> findAll(@Param("category") String category, @Param("search") String search, @Param("status") String status);

    @Query(value = """
    SELECT f.* FROM flyers f
    JOIN users u ON u.user_id = f.created_by
    JOIN flyer_records fr ON fr.flyer_id = f.flyer_id
    WHERE fr.status = 'approved'
    AND (:category IS NULL OR f.category = :category)
    AND (
        :search IS NULL OR
    	(
    	    (f.title REGEXP CONCAT(
    	    '(^|[^a-zA-Z0-9])',
    	    REPLACE(:search ,' ','([^a-zA-Z0-9]|$)|(^|[^a-zA-Z0-9])'),
    	    '([^a-zA-Z0-9]|$)')
    	    OR
        u.username REGEXP CONCAT(
            '(^|[^a-zA-Z0-9])',
            REPLACE(:search ,' ','([^a-zA-Z0-9]|$)|(^|[^a-zA-Z0-9])'),
            '([^a-zA-Z0-9]|$)')
            )
        )
    );
    """, nativeQuery = true)
    List<Flyer> findAllApproved(@Param("category") String category, @Param("search") String search);

    @Query(value = """
            SELECT f.* FROM flyers f
            JOIN flyer_records fr on fr.flyer_record_id = f.flyer_record_id
            WHERE fr.status = 'approved' AND f.flyer_id = :id
            """, nativeQuery = true)
    Optional<Flyer> findApprovedById(@Param("id") Long id);

    @Query(value = """
    SELECT f.* FROM flyers f
    JOIN users u ON u.user_id = f.created_by
    JOIN flyer_records fr ON fr.flyer_id = f.flyer_id
    WHERE u.user_id = :userId
    AND (:category IS NULL OR f.category = :category)
    AND (:status IS NULL OR fr.status = :status)
    AND (
        :search IS NULL OR
    	(
    	    (f.title REGEXP CONCAT(
    	    '(^|[^a-zA-Z0-9])',
    	    REPLACE(:search ,' ','([^a-zA-Z0-9]|$)|(^|[^a-zA-Z0-9])'),
    	    '([^a-zA-Z0-9]|$)')
    	    OR
        u.username REGEXP CONCAT(
            '(^|[^a-zA-Z0-9])',
            REPLACE(:search ,' ','([^a-zA-Z0-9]|$)|(^|[^a-zA-Z0-9])'),
            '([^a-zA-Z0-9]|$)')
            )
        )
    );
    """, nativeQuery = true)
    List<Flyer> findAllForUser(@Param("userId") Long id,@Param("category") String category, @Param("search") String search, @Param("status") String status);

    @Query(value = """
            SELECT f.* FROM flyers f
            JOIN users u on u.user_id = f.created_by
            WHERE u.user_id = :userId
            AND f.flyer_id = :flyerId
            """, nativeQuery = true)
    Optional<Flyer> findByIdForUser(@Param("flyerId") Long flyerId, @Param("userId") Long userId);

}
