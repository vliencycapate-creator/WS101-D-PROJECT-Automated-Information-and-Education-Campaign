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
@Table(name = "images")
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "image_id")
    private long id;

    @Column(name = "image_name")
    private String imageName;

    @Column(name = "image_path")
    private  String imagePath;

    @ManyToOne
    @JoinColumn(name = "flyer_id")
    @ToString.Exclude
    @JsonIgnore
    private Flyer flyer;
}
