package net.riking.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import net.riking.entity.model.TCdeContent;
import net.riking.entity.model.TCdeInfo;
import net.riking.service.TCdeInfoService;
import net.riking.service.repo.TCdeContentRepo;
import net.riking.service.repo.TCdeInfoRepo;

@Service
public class TCdeInfoServiceImpl implements TCdeInfoService{

	@Autowired
	private TCdeInfoRepo tCdeInfoRepo;
	
	@Autowired
	private TCdeContentRepo tCdeContentRepo;
	
	@Override
	public List<TCdeInfo> getCodeList(Long custId) {
		List<TCdeInfo> tCdeInfoList = tCdeInfoRepo.findByCustId(custId);
		return tCdeInfoList;
	}

	@Override
	public TCdeInfo getCodeContent(Long infoId) {
		TCdeInfo codeInfo = tCdeInfoRepo.findOne(infoId);
		List<TCdeContent> contentList = tCdeContentRepo.findByInfoId(infoId);
		codeInfo.setTcdeContentList(contentList);
		return codeInfo;
	}
	
	
}
