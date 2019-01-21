package net.riking.service.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import net.riking.entity.model.TAtcInfomation;

@Repository
public interface TAtcInfomationRepo extends JpaRepository<TAtcInfomation, Long> {
	
	@Query("from TAtcInfomation where authorId = ?1")
	List<TAtcInfomation> findByAuthorId(Long authorId);
	
	@Query("from TAtcInfomation where authorId = ?1 and publishStatus = ?2")
	List<TAtcInfomation> findByAuthorIdAndPublishStatus(Long authorId,Byte publishStatus);
	
	@Query("from TAtcInfomation where publishStatus = 1 and validFlag = 1")
	List<TAtcInfomation> findByPublish();
}
