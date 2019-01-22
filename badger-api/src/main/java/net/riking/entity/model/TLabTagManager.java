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
@Table(name = "T_LAB_TAG_MANAGER")
public class TLabTagManager {

	@Id
	@Column(name = "id")
	@GeneratedValue
	private Long id;

	@Comment("组ID")
	@Column(name = "group_id")
	private Long groupId;

	@Comment("标签名称")
	@Column(name = "label_name")
	private String labelName;
	
	@Comment("标签描述")
	@Column(name = "label_desc")
	private String labelDesc;
}