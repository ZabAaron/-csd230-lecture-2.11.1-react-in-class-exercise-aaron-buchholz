package csd230.repositories;

import csd230.entities.TShirtEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TShirtRepository extends JpaRepository<TShirtEntity, Long> {
}
