package net.riking.service.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import net.riking.entity.model.TAskComment;

@Repository
public interface TAskCommentRepo extends JpaRepository<TAskComment, Long> {
	

}
