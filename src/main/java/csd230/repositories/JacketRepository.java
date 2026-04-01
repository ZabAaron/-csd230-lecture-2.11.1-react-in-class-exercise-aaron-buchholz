package csd230.repositories;

import csd230.entities.JacketEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JacketRepository extends JpaRepository<JacketEntity, Long> {
}
