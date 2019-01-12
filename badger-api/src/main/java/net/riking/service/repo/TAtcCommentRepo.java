package net.riking.service.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import net.riking.entity.model.TAtcComment;

@Repository
public interface TAtcCommentRepo extends JpaRepository<TAtcComment, Long> {
	

}
