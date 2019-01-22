package net.riking.service;

import java.util.List;
import java.util.Map;

import net.riking.entity.model.TLabGrpManager;
import net.riking.entity.model.TLabTagManager;

public interface TLabManagerService {
	
	public Map<String, List<TLabTagManager>> findLabTagManagerMap();

	public void saveGrp(TLabGrpManager lg);
	
	public void saveTag(TLabTagManager lt);

}