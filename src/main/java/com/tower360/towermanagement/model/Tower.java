package com.tower360.towermanagement.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Tower {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String towerCode;
    private String address;
    private String type;
    private String status;

    private Double latitude;
    private Double longitude;

    private String description;
    private LocalDate installationDate;
    private Double height;
    private Integer capacity;

    private LocalDate lastUpdated;

    @PrePersist
    @PreUpdate
    public void updateTimestamp() {
        this.lastUpdated = LocalDate.now();
    }
}
