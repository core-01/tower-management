package com.tower360.towermanagement.service;
import com.tower360.towermanagement.model.Tower;
import com.tower360.towermanagement.repository.TowerRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TowerService {

    private final TowerRepository repository;

    public TowerService(TowerRepository repository){
        this.repository = repository;
    }

    public List<Tower> getAllTowers(){
        return repository.findAll();
    }

    public Tower getTower(Long id){
        return repository.findById(id).orElse(null);
    }

    public Tower SaveTower(Tower tower){
        return repository.save(tower);
    }
    
    public void deleteTower(Long id){
        repository.deleteById(id);
    }
    
}
