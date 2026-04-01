// src/main/java/csd230/controllers/PhoneController.java
package csd230.controllers;

import csd230.entities.PhoneEntity;
import csd230.repositories.PhoneRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/phones")
@CrossOrigin(origins = "http://localhost:5173")
public class PhoneController {

    private final PhoneRepository phoneRepository;

    public PhoneController(PhoneRepository phoneRepository) {
        this.phoneRepository = phoneRepository;
    }

    @GetMapping
    public List<PhoneEntity> getAllPhones() {
        return phoneRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<PhoneEntity> getPhoneById(@PathVariable Long id) {
        return phoneRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public PhoneEntity createPhone(@RequestBody PhoneEntity phone) {
        return phoneRepository.save(phone);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PhoneEntity> updatePhone(@PathVariable Long id, @RequestBody PhoneEntity details) {
        return phoneRepository.findById(id).map(phone -> {
            phone.setBrand(details.getBrand());
            phone.setPrice(details.getPrice());
            phone.setQuantity(details.getQuantity());
            phone.setStorageGB(details.getStorageGB());
            return ResponseEntity.ok(phoneRepository.save(phone));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePhone(@PathVariable Long id) {
        if (phoneRepository.existsById(id)) {
            phoneRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}