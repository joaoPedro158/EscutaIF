package backend.Repository;

import backend.Repository.Entity.admEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface admJpaRepository extends JpaRepository<admEntity, Integer> {
}
