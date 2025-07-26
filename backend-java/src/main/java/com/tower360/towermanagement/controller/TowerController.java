package com.tower360.towermanagement.controller;

import com.tower360.towermanagement.model.Tower;
import com.tower360.towermanagement.service.TowerService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/towers")
@CrossOrigin(origins = "http://localhost:5173")

public class TowerController {

    private final TowerService service;

    public TowerController(TowerService service) {
        this.service = service;
    }

    @GetMapping
    public List<Tower> getAllTowers() {
        return service.getAllTowers();
    }

    @GetMapping("/{id}")
    public Tower getTower(@PathVariable Long id) {
        return service.getTower(id);
    }

    @PostMapping
    public Tower createTower(@RequestBody Tower tower) {
        return service.SaveTower(tower);
    }

    @PutMapping("/{id}")
    public Tower updateTower(@PathVariable Long id, @RequestBody Tower tower) {
        tower.setId(id);
        return service.SaveTower(tower);
    }

    @DeleteMapping("/{id}")
    public void deleteTower(@PathVariable Long id) {
        service.deleteTower(id);
    }

}
