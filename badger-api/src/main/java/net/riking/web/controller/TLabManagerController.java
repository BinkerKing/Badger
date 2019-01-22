package net.riking.web.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import net.riking.config.CodeDef;
import net.riking.core.entity.Resp;
import net.riking.core.log.InFunLog;
import net.riking.core.log.InModLog;
import net.riking.entity.model.SearchParam;
import net.riking.entity.model.TLabGrpManager;
import net.riking.entity.model.TLabTagManager;
import net.riking.service.TLabManagerService;

@InModLog(modName = "标签管理")
@RestController
@RequestMapping(value = "/tLabManager")
public class TLabManagerController {
	
	@Autowired
	public TLabManagerService tLabManagerService;
	
	@InFunLog(funName = "获取我的提问列表", args = { 0 })
	@RequestMapping(value = "/findTLabMap", method = RequestMethod.POST)
	public Resp findTLabMap(@RequestBody SearchParam param){
		Map<String, List<TLabTagManager>> tagManagerMap = tLabManagerService.findLabTagManagerMap();
		return new Resp(tagManagerMap,CodeDef.SUCCESS);
	}
	
	@InFunLog(funName = "保存组信息", args = { 0 })
	@RequestMapping(value = "/saveGrp", method = RequestMethod.POST)
	public Resp saveGrp(@RequestBody TLabGrpManager lg){
		tLabManagerService.saveGrp(lg);
		return new Resp(CodeDef.SUCCESS);
	}
	
	@InFunLog(funName = "保存标签信息", args = { 0 })
	@RequestMapping(value = "/saveTag", method = RequestMethod.POST)
	public Resp saveTag(@RequestBody TLabTagManager lt){
		tLabManagerService.saveTag(lt);
		return new Resp(CodeDef.SUCCESS);
	}
}
