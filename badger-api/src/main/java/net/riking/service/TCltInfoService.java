package net.riking.service;

import java.util.List;

import net.riking.entity.model.TCltInfo;

public interface TCltInfoService {
	
	public List<TCltInfo> getMyCltList(Long custId);

	public String collect(String type,Long id,Long custId);
	
	public TCltInfo getCollectInfo(String type,Long id,Long custId);
}