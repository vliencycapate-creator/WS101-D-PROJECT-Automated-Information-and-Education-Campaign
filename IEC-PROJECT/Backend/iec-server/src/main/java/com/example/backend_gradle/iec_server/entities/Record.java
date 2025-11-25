package com.example.backend_gradle.iec_server.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "flyer_records")
public class Record {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "flyer_record_id")
    private int id;

    @Column(name = "status")
    private String status;

    @Column(name = "email")
    private String email;

    @Column(name = "modified_at")
    private String modifiedAt;

    @OneToOne
    @JoinColumn(name = "flyer_id")
    @ToString.Exclude
    @JsonIgnore
    private Flyer flyer;
}
