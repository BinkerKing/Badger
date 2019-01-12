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
@Table(name = "T_CST_INFO")
public class TCstInfo {

	@Id
	@Column(name = "id")
	@GeneratedValue
	private Long id;

	@Comment("昵称")
	@Column(name = "pet_name")
	private String petName;

	@Comment("真实姓名")
	@Column(name = "real_name")
	private String realName;

	@Comment("工号")
	@Column(name = "job_number")
	private String jobNumber;
	
	@Comment("状态")
	@Column(name = "cust_status")
	private String custStatus;
	
	@Comment("经验值")
	@Column(name = "empirical_value")
	private String empiricalValue;
	
	@Comment("等级")
	@Column(name = "level")
	private String level;
	
	@Comment("签名")
	@Column(name = "signal")
	private String signal;
	
	@Comment("手机号码")
	@Column(name = "phone_number")
	private String phoneNumber;
	
	@Comment("职位")
	@Column(name = "position")
	private String position;
	
	@Comment("头像图")
	@Column(name = "head_pic")
	private String headPic;
	
	@Comment("手记数量")
	@Column(name = "article_count")
	private Integer articleCount;
	
	@Comment("提问数量")
	@Column(name = "question_count")
	private Integer questionCount;
	
	@Comment("回答数量")
	@Column(name = "answer_count")
	private Integer answerCount;
	
}