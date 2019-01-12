package net.riking.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import net.riking.config.Const;
import net.riking.entity.model.TAskContent;
import net.riking.entity.model.TAskInfomation;
import net.riking.service.TAskInfomationService;
import net.riking.service.repo.TAskContentRepo;
import net.riking.service.repo.TAskInfomationRepo;

@Service
public class TAskInfomationServiceImpl implements TAskInfomationService{
	
	@Autowired
	private TAskInfomationRepo tAskInfomationRepo;
	
	@Autowired
	private TAskContentRepo tAskContentRepo;

	@Override
	public List<TAskInfomation> getMyAskList(Long authorId,String status,String search,String lable) {
		List<TAskInfomation> tAskInfomationList = new ArrayList<>();
		//一层过滤：所有，发布，未发布
		switch (status) {
			case Const.SEARCH_LIST_STATUS_ALL: //获取所有我的手记信息
				tAskInfomationList = tAskInfomationRepo.findByAuthorId(authorId);
				break;
			case Const.SEARCH_LIST_STATUS_PUBLISH: //获取所有已发布我的手记信息
				tAskInfomationList = tAskInfomationRepo.findByAuthorIdAndPublishStatus(authorId,Const.ATC_INFO_PUBLISH_STATUS_YES);
				break;
			case Const.SEARCH_LIST_STATUS_NOT_PUBLISH: //获取所有未发布我的手记信息
				tAskInfomationList = tAskInfomationRepo.findByAuthorIdAndPublishStatus(authorId,Const.ATC_INFO_PUBLISH_STATUS_NO);
				break;
			default:
				break;
		}
		//二层过滤：标签
		tAskInfomationList = filterLable(tAskInfomationList,lable);
		//三层过滤：搜索框
		tAskInfomationList = filterSearch(tAskInfomationList,search);
		return tAskInfomationList;
	}
	
	private List<TAskInfomation> filterLable(List<TAskInfomation> tAskInfomationList,String lable){
		if(StringUtils.isBlank(lable))
			return tAskInfomationList;
		List<TAskInfomation> infoList = new ArrayList<>();
		for(TAskInfomation info : tAskInfomationList){
			if(info.getLabelGroup().contains(lable+";"))
				infoList.add(info);
		}
		return infoList;
	}
	
	private List<TAskInfomation> filterSearch(List<TAskInfomation> tAskInfomationList,String search){
		if(StringUtils.isBlank(search))
			return tAskInfomationList;
		List<TAskInfomation> infoList = new ArrayList<>();
		for(TAskInfomation info : tAskInfomationList){
			if(info.getTitleInfo().contains(search))
				infoList.add(info);
		}
		return infoList;
	}

	@Override
	public String saveAsk(TAskInfomation lc) {
		TAskContent content = tAskContentRepo.save(lc.getTAskContent());
		lc.setContentId(content.getId());
		lc.setCreateTime(new Date());
		tAskInfomationRepo.save(lc);
		return null;
	}

	@Override
	public String saveAskInfo(TAskInfomation lc) {
		tAskInfomationRepo.save(lc);
		return null;
	}
	
	
}
