package net.riking.service.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import net.riking.entity.model.TLabTagManager;


@Repository
public interface TLabTagManagerRepo extends JpaRepository<TLabTagManager, Long> {
	

}
