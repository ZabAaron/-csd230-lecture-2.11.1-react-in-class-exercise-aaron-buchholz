// src/main/java/csd230/repositories/PhoneRepository.java
package csd230.repositories;

import csd230.entities.PhoneEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PhoneRepository extends JpaRepository<PhoneEntity, Long> {
}