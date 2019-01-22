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
@Table(name = "T_LAB_GRP_MANAGER")
public class TLabGrpManager {

	@Id
	@Column(name = "id")
	@GeneratedValue
	private Long id;

	@Comment("组名称")
	@Column(name = "group_name")
	private String groupName;

	@Comment("组描述")
	@Column(name = "group_desc")
	private String groupDesc;
	
}