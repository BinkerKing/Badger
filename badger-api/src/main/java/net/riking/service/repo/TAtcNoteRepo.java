package net.riking.service.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import net.riking.entity.model.TAtcNote;

@Repository
public interface TAtcNoteRepo extends JpaRepository<TAtcNote, Long> {
	
	@Query("from TAtcNote where atcId = ?1 and custId = ?2")
	List<TAtcNote> findByAtcIdAndCustId(Long atcId,Long custId);
}
