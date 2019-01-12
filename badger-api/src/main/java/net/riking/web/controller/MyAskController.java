package net.riking.web.controller;

import java.util.List;

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
import net.riking.entity.model.TAskInfomation;
import net.riking.service.TAskInfomationService;

@InModLog(modName = "我的提问")
@RestController
@RequestMapping(value = "/MyAskController")
public class MyAskController {
	
	@Autowired
	public TAskInfomationService tAskInfomationService;
	
	@InFunLog(funName = "获取我的提问列表", args = { 0 })
	@RequestMapping(value = "/getMyAskList", method = RequestMethod.POST)
	public Resp getMyAskList(@RequestBody SearchParam param){
		List<TAskInfomation> tAskInfomationList = tAskInfomationService.getMyAskList(param.getAuthorId(),param.getStatus(),param.getSearch(),param.getLable());
		return new Resp(tAskInfomationList,CodeDef.SUCCESS);
	}
	
	@InFunLog(funName = "保存提问", args = { 0 })
	@RequestMapping(value = "/saveAsk", method = RequestMethod.POST)
	public Resp saveAsk(@RequestBody TAskInfomation lc){
		tAskInfomationService.saveAsk(lc);
		return new Resp(CodeDef.SUCCESS);
	}
	
	@InFunLog(funName = "保存提问信息", args = { 0 })
	@RequestMapping(value = "/saveAskInfo", method = RequestMethod.POST)
	public Resp saveAskInfo(@RequestBody TAskInfomation lc){
		tAskInfomationService.saveAskInfo(lc);
		return new Resp(CodeDef.SUCCESS);
	}
}
