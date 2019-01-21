package net.riking.entity.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SearchParam {

	//用户id
	private Long authorId;
	
	//查询状态(1:查询所有 2：查询已发布 3：查询未发布)
	private String status;
	
	//模糊查询字符
	private String search;
	
	//标签
	private String lable;
	
}