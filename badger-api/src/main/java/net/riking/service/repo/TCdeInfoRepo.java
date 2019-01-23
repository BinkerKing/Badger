package net.riking.service.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import net.riking.entity.model.TCdeInfo;

@Repository
public interface TCdeInfoRepo extends JpaRepository<TCdeInfo, Long> {
	
	@Query("from TCdeInfo where custId = ?1")
	List<TCdeInfo> findByCustId(Long custId);
	
}
