package net.riking.service;

import java.util.List;

import net.riking.entity.model.TAtcInfomation;

public interface TAtcInfomationService {

	public List<TAtcInfomation> getMyAtcList(Long authorId,String status,String search,String lable);
	
	public String saveAtc(TAtcInfomation lc);
	
	public String saveAtcInfo(TAtcInfomation lc);
	
	public TAtcInfomation getMyAtcView(Long id);
}