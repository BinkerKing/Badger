package net.riking.service.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import net.riking.entity.model.TCdeContent;

@Repository
public interface TCdeContentRepo extends JpaRepository<TCdeContent, Long> {
	
	@Query("from TCdeContent where infoId = ?1")
	public List<TCdeContent> findByInfoId(Long codeId);
}
