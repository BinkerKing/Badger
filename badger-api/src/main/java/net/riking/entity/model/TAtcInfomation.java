package net.riking.entity.model;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import lombok.Getter;
import lombok.Setter;
import net.riking.core.annos.Comment;

@Entity
@Getter
@Setter
@Table(name = "T_ATC_INFOMATION")
public class TAtcInfomation {

	@Id
	@Column(name = "id")
	@GeneratedValue
	private Long id;

	@Lob
	@Comment("标签组")
	@Column(name = "label_group")
	private String labelGroup;

	@Comment("标题")
	@Column(name = "title_info")
	private String titleInfo;
	
	@Comment("创建时间")
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "create_time")
	private Date createTime;
	
	@Comment("标记")
	@Column(name = "sign")
	private String sign;
	
	@Comment("知识树ID")
	@Column(name = "tree_id")
	private Long treeId;
	
	@Comment("知识树路径")
	@Column(name = "tree_address")
	private Long treeAddress;
	
	@Comment("发表人ID")
	@Column(name = "author_id")
	private Long authorId;
	
	@Comment("发表人")
	@Column(name = "authorName")
	private String authorName;
	
	@Comment("预览量")
	@Column(name = "scan_count")
	private Integer scanCount;
	
	@Comment("点赞量")
	@Column(name = "like_count")
	private Integer likeCount;
	
	@Comment("分类")
	@Column(name = "classification")
	private String classification;
	
	@Comment("手记内容id")
	@Column(name = "content_id")
	private Long contentId;
	
	@Comment("收藏数")
	@Column(name = "collection_count")
	private Integer collectionCount;
	
	@Comment("发布状态")
	@Column(name = "publish_status")
	private String publishStatus;
	
	@Comment("标星")
	@Column(name = "star_flag")
	private String starFlag;
	
	@Comment("置顶")
	@Column(name = "top_flag")
	private String topFlag;
	
	//正文内容
	@Transient
	private TAtcContent tAtcContent;
	
	//评论
	@Transient
	private List<TAtcComment> tAtcCommentList;
	
	
}