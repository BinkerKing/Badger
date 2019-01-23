package net.riking.entity.model;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import lombok.Getter;
import lombok.Setter;
import net.riking.core.annos.Comment;

@Entity
@Getter
@Setter
@Table(name = "T_CDE_INFO")
public class TCdeInfo {

	@Id
	@Column(name = "id")
	@GeneratedValue
	private Long id;

	@Comment("用户ID")
	@Column(name = "cust_id")
	private Long custId;
	
	@Comment("标题")
	@Column(name = "title")
	private String title;
	
	@Comment("备注")
	@Column(name = "note")
	private String note;
	
	@Transient
	private List<TCdeContent> tcdeContentList;
	
}