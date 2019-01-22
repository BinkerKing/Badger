package net.riking.service.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import net.riking.entity.model.TLabGrpManager;

@Repository
public interface TLabGrpManagerRepo extends JpaRepository<TLabGrpManager, Long> {
	

}
