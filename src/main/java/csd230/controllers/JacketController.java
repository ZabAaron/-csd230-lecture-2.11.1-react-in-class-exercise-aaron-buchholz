package csd230.controllers;

import csd230.entities.JacketEntity;
import csd230.repositories.JacketRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jackets")
@CrossOrigin(origins = "http://localhost:5173")
public class JacketController {

    private final JacketRepository jacketRepository;

    public JacketController(JacketRepository jacketRepository) {
        this.jacketRepository = jacketRepository;
    }

    @GetMapping
    public List<JacketEntity> getAllJackets() {
        return jacketRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<JacketEntity> getJacketById(@PathVariable Long id) {
        return jacketRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public JacketEntity createJacket(@RequestBody JacketEntity jacket) {
        return jacketRepository.save(jacket);
    }

    @PutMapping("/{id}")
    public ResponseEntity<JacketEntity> updateJacket(@PathVariable Long id, @RequestBody JacketEntity details) {
        return jacketRepository.findById(id).map(jacket -> {
            jacket.setSize(details.getSize());
            jacket.setPrice(details.getPrice());
            jacket.setCopies(details.getCopies());
            jacket.setInsulated(details.getInsulated());
            return ResponseEntity.ok(jacketRepository.save(jacket));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteJacket(@PathVariable Long id) {
        if (jacketRepository.existsById(id)) {
            jacketRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
