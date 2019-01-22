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
@Table(name = "T_ATC_NOTE")
public class TAtcNote {

	@Id
	@Column(name = "id")
	@GeneratedValue
	private Long id;

	@Comment("用户ID")
	@Column(name = "cust_id")
	private Long custId;
	
	@Comment("文章ID")
	@Column(name = "atc_id")
	private Long atcId;

	@Lob
	@Comment("笔记内容")
	@Column(name = "note")
	private String note;
	
	@Comment("笔记标题")
	@Column(name = "note_title")
	private String noteTitle;
	
}