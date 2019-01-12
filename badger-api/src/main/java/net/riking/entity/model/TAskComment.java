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
@Table(name = "T_ASK_COMMENT")
public class TAskComment {

	@Id
	@Column(name = "id")
	@GeneratedValue
	private Long id;

	@Comment("提问信息ID")
	@Column(name = "pet_name")
	private String petName;

	
	
	
	
}