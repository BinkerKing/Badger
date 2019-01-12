package net.riking.service;

import java.util.List;

import net.riking.entity.model.TAskInfomation;

public interface TAskInfomationService {

	public List<TAskInfomation> getMyAskList(Long authorId,String status,String search,String lable);
	
	public String saveAsk(TAskInfomation lc);
	
	public String saveAskInfo(TAskInfomation lc);
}