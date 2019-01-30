package net.riking.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSON;

import net.riking.config.Const;
import net.riking.entity.model.TAtcContent;
import net.riking.entity.model.TAtcInfomation;
import net.riking.entity.model.TAtcNote;
import net.riking.entity.model.TCltInfo;
import net.riking.service.TAtcInfomationService;
import net.riking.service.repo.TAtcContentRepo;
import net.riking.service.repo.TAtcInfomationRepo;
import net.riking.service.repo.TAtcNoteRepo;
import net.riking.service.repo.TCltInfoRepo;

@Service
public class TAtcInfomationServiceImpl implements TAtcInfomationService{
	
	@Autowired
	private TAtcInfomationRepo tAtcInfomationRepo;
	
	@Autowired
	private TAtcContentRepo tAtcContentRepo;
	
	@Autowired
	private TAtcNoteRepo tAtcNoteRepo;
	
	@Override
	public List<TAtcInfomation> getMyAtcList(Long authorId,String status,String search,String lable) {
		List<TAtcInfomation> tAtcInfomationList = new ArrayList<>();
		//一层过滤：所有，发布，未发布
		switch (status) {
			case Const.SEARCH_LIST_STATUS_ALL: //获取所有我的手记信息
				tAtcInfomationList = tAtcInfomationRepo.findByAuthorId(authorId);
				break;
			case Const.SEARCH_LIST_STATUS_PUBLISH: //获取所有已发布我的手记信息
				tAtcInfomationList = tAtcInfomationRepo.findByAuthorIdAndPublishStatus(authorId,Const.ATC_INFO_PUBLISH_STATUS_YES);
				break;
			case Const.SEARCH_LIST_STATUS_NOT_PUBLISH: //获取所有未发布我的手记信息
				tAtcInfomationList = tAtcInfomationRepo.findByAuthorIdAndPublishStatus(authorId,Const.ATC_INFO_PUBLISH_STATUS_NO);
				break;
			default:
				break;
		}
		//二层过滤：标签
		tAtcInfomationList = filterLable(tAtcInfomationList,lable);
		//三层过滤：搜索框
		tAtcInfomationList = filterSearch(tAtcInfomationList,search);
		return tAtcInfomationList;
	}
	
	private List<TAtcInfomation> filterLable(List<TAtcInfomation> tAtcInfomationList,String tag){
		if(StringUtils.isBlank(tag))
			return tAtcInfomationList;
		List<TAtcInfomation> infoList = new ArrayList<>();
		for(TAtcInfomation info : tAtcInfomationList){
			List<String> labelList = JSON.parseArray(info.getLabelGroup(), String.class);
			if(labelList.contains(tag))
				infoList.add(info);
		}
		return infoList;
	}
	
	private List<TAtcInfomation> filterSearch(List<TAtcInfomation> tAtcInfomationList,String search){
		if(StringUtils.isBlank(search))
			return tAtcInfomationList;
		List<TAtcInfomation> infoList = new ArrayList<>();
		for(TAtcInfomation info : tAtcInfomationList){
			if(info.getTitleInfo().contains(search))
				infoList.add(info);
		}
		return infoList;
	}

	@Override
	public String saveAtc(TAtcInfomation lc) {
		TAtcContent content = tAtcContentRepo.save(lc.getTatcContent());
		lc.setContentId(content.getId());
		lc.setCreateTime(new Date());
		tAtcInfomationRepo.save(lc);
		return null;
	}

	@Override
	public String saveAtcInfo(TAtcInfomation lc) {
		tAtcInfomationRepo.save(lc);
		return null;
	}

	@Override
	public TAtcInfomation getMyAtcView(Long id) {
		TAtcInfomation atcInfo = tAtcInfomationRepo.findOne(id);
		if(atcInfo == null)
			return null;
		TAtcContent content = tAtcContentRepo.findOne(atcInfo.getContentId());
		atcInfo.setTatcContent(content);
		return atcInfo;
	}
	
	@Override
	public List<TAtcInfomation> getAtcList(String status,String search,String lable) {
		//查询所有有效的，并且发布的文章列表
		List<TAtcInfomation> tAtcInfomationList = tAtcInfomationRepo.findByPublish();
		//一层过滤：标签
		tAtcInfomationList = filterLable(tAtcInfomationList,lable);
		//二层过滤：搜索框
		tAtcInfomationList = filterSearch(tAtcInfomationList,search);
		return tAtcInfomationList;
	}

	@Override
	public String saveNote(TAtcNote note) {
		tAtcNoteRepo.save(note);
		return null;
	}
	
	@Override
	public String deleteNote(Long id) {
		tAtcNoteRepo.delete(id);
		return null;
	}

	@Override
	public List<TAtcNote> getNotes(Long id, Long custId) {
		return tAtcNoteRepo.findByAtcIdAndCustId(id,custId);
	}

	@Override
	public String updateNotes(List<TAtcNote> notes) {
		tAtcNoteRepo.save(notes);
		return null;
	}

}
