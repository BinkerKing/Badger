package net.riking.service.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import net.riking.entity.model.TAskContent;

@Repository
public interface TAskContentRepo extends JpaRepository<TAskContent, Long> {
	

}
