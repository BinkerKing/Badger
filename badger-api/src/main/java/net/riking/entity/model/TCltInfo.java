package net.riking.entity.model;

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
@Comment("收藏表")
@Table(name = "T_CLT_INFO")
public class TCltInfo {

	@Id
	@Column(name = "id")
	@GeneratedValue
	private Long id;

	@Comment("客户ID")
	@Column(name = "cust_id")
	private Long custId;
	
	@Comment("文章类型 1-手记 2-猿问 3-代码块 4-知识树")
	@Column(name = "type")
	private String type;

	@Comment("手记ID")
	@Column(name = "atc_id")
	private Long atcId;
	
	@Comment("手记标题")
	@Column(name = "atc_title")
	private String atcTitle;
	
	@Comment("手记内容ID")
	@Column(name = "atc_content_id")
	private Long atcContentId;
	
	@Comment("猿问ID")
	@Column(name = "ask_id")
	private Long askId;
	
	@Comment("猿问标题")
	@Column(name = "ask_title")
	private String askTitle;
	
	@Comment("猿问内容ID")
	@Column(name = "ask_content_id")
	private Long askContentId;
	
	//手记信息
	@Transient
	private TAtcInfomation tatcInfomation;
	
	//手记正文内容
	@Transient
	private TAtcContent tatcContent;
	
	//猿问信息
	@Transient
	private TAskInfomation taskInfomation;
	
	//手记正文内容
	@Transient
	private TAskContent taskContent;
}