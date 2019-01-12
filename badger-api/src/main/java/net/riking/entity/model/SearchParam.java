package net.riking.entity.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SearchParam {

	//用户id
	private Long authorId;
	
	//查询状态
	private String status;
	
	//模糊查询字符
	private String search;
	
	//标签
	private String lable;
	
}