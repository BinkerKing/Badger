package net.riking.service.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import net.riking.entity.model.TCltInfo;

@Repository
public interface TCltInfoRepo extends JpaRepository<TCltInfo, Long> {
	
	@Query("from TCltInfo where custId = ?1")
	public List<TCltInfo> findByCustId(Long custId);

	@Query("from TCltInfo where type = ?1 and atcId = ?2 and custId = ?3")
	public TCltInfo findInfo(String type, Long id, Long custId);
}
