package com.tower360.towermanagement.repository;
import com.tower360.towermanagement.model.Tower;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TowerRepository extends JpaRepository<Tower, Long> {
    
}