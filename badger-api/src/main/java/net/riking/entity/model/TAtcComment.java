package net.riking.entity.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;
import net.riking.core.annos.Comment;

@Entity
@Getter
@Setter
@Comment("手记评论表")
@Table(name = "T_ATC_COMMENT")
public class TAtcComment {

	@Id
	@Column(name = "id")
	@GeneratedValue
	private Long id;

	@Comment("手记信息ID")
	@Column(name = "pet_name")
	private String petName;

	
}