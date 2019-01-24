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
		for(TCdeInfo info : tCdeInfoList){
			List<TCdeContent> contentList = tCdeContentRepo.findByInfoId(info.getId());
			info.setTcdeContentList(contentList);
		}
		return tCdeInfoList;
	}

	@Override
	public TCdeInfo getCodeContent(Long infoId) {
		TCdeInfo codeInfo = tCdeInfoRepo.findOne(infoId);
		List<TCdeContent> contentList = tCdeContentRepo.findByInfoId(infoId);
		codeInfo.setTcdeContentList(contentList);
		return codeInfo;
	}

	@Override
	public TCdeInfo save(TCdeInfo info) {
		Integer flag = 0 ;//初始化
		if(info.getId()==null){
			flag = 1;//首次保存
		}
		TCdeInfo result = new TCdeInfo();
		result = tCdeInfoRepo.save(info);
		if(flag==1){
			//首次保存
			info.getTcdeContentList().get(0).setInfoId(result.getId());
		}else{
			for(TCdeContent content : info.getTcdeContentList()){
				content.setInfoId(result.getId());
			}
		}
		List<TCdeContent> contents = tCdeContentRepo.save(info.getTcdeContentList());
		result.setTcdeContentList(contents);
		return result;
	}

	@Override
	public String deleteCodeContent(Long id) {
		tCdeContentRepo.delete(id);
		return null;
	}
	
	
}
