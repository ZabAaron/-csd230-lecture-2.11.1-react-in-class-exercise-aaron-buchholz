package csd230.controllers;

import csd230.entities.TShirtEntity;
import csd230.repositories.TShirtRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tshirts")
@CrossOrigin(origins = "http://localhost:5173")
public class TShirtController {

    private final TShirtRepository tShirtRepository;

    public TShirtController(TShirtRepository tShirtRepository) {
        this.tShirtRepository = tShirtRepository;
    }

    @GetMapping
    public List<TShirtEntity> getAllTShirts() {
        return tShirtRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<TShirtEntity> getTShirtById(@PathVariable Long id) {
        return tShirtRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public TShirtEntity createTShirt(@RequestBody TShirtEntity tshirt) {
        return tShirtRepository.save(tshirt);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TShirtEntity> updateTShirt(@PathVariable Long id, @RequestBody TShirtEntity details) {
        return tShirtRepository.findById(id).map(tshirt -> {
            tshirt.setSize(details.getSize());
            tshirt.setPrice(details.getPrice());
            tshirt.setCopies(details.getCopies());
            tshirt.setSleeveLength(details.getSleeveLength());
            return ResponseEntity.ok(tShirtRepository.save(tshirt));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTShirt(@PathVariable Long id) {
        if (tShirtRepository.existsById(id)) {
            tShirtRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
