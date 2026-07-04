package backend.Repository;

import backend.Model.adm;
import backend.Repository.Entity.admEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface admJpaRepository extends JpaRepository<admEntity, Integer> {
    Optional<admEntity> findByEmail(String email);
}
