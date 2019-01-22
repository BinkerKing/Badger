package net.riking.service;

import java.util.List;

import net.riking.entity.model.TAtcInfomation;
import net.riking.entity.model.TAtcNote;

public interface TAtcInfomationService {

	//获取我的文章列表
	public List<TAtcInfomation> getMyAtcList(Long authorId,String status,String search,String lable);
	
	public String saveAtc(TAtcInfomation lc);
	
	public String saveAtcInfo(TAtcInfomation lc);
	
	public TAtcInfomation getMyAtcView(Long id);
	
	//获取共享章列表
	public List<TAtcInfomation> getAtcList(String status,String search,String lable);
	
	public String saveNote(TAtcNote note);
	
	public String deleteNote(Long id);
	
	public List<TAtcNote> getNotes(Long id,Long custId);
	
	public String updateNotes(List<TAtcNote> notes);
}