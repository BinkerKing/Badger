package net.riking.service.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import net.riking.entity.model.TAskInfomation;

@Repository
public interface TAskInfomationRepo extends JpaRepository<TAskInfomation, Long> {
	
	@Query("from TAskInfomation where authorId = ?1")
	List<TAskInfomation> findByAuthorId(Long authorId);
	
	@Query("from TAskInfomation where authorId = ?1 and publishStatus = ?2")
	List<TAskInfomation> findByAuthorIdAndPublishStatus(Long authorId,Byte publishStatus);
}
