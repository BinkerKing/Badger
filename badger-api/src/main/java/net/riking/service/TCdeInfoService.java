package net.riking.service;

import java.util.List;

import net.riking.entity.model.TCdeContent;
import net.riking.entity.model.TCdeInfo;

public interface TCdeInfoService {

	public List<TCdeInfo> getCodeList(Long custId);
	
	public TCdeInfo getCodeContent(Long codeId);
	
	public TCdeInfo saveCode(TCdeInfo info);
	
	public TCdeContent saveContent(TCdeContent content);
	
	public String deleteCodeContent(Long id);
}