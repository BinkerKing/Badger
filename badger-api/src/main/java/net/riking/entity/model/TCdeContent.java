package net.riking.entity.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;
import net.riking.core.annos.Comment;

@Entity
@Getter
@Setter
@Table(name = "T_CDE_CONTENT")
public class TCdeContent {

	@Id
	@Column(name = "id")
	@GeneratedValue
	private Long id;

	@Comment("代码块信息ID")
	@Column(name = "info_id")
	private Long infoId;
	
	@Lob
	@Comment("内容")
	@Column(name = "content")
	private String content;
	
	@Comment("编辑框样式")
	@Column(name = "theme")
	private String theme;
	
	@Comment("代码格式")
	@Column(name = "mod")
	private String mod;
	
	@Comment("备注")
	@Column(name = "note")
	private String note;
	
}