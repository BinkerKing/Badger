package net.riking.web.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import net.riking.config.CodeDef;
import net.riking.core.entity.Resp;
import net.riking.core.log.InFunLog;
import net.riking.core.log.InModLog;
import net.riking.entity.model.TCdeInfo;
import net.riking.service.TCdeInfoService;

@InModLog(modName = "代码块")
@RestController
@RequestMapping(value = "/TCdeInfoController")
public class TCdeInfoController {
	
	@Autowired
	public TCdeInfoService tCdeInfoService;
	
	@InFunLog(funName = "获取我的代码块列表", args = { 0 })
	@RequestMapping(value = "/getCodeList", method = RequestMethod.GET)
	public Resp getCodeList(@RequestParam("custId") Long custId){
		List<TCdeInfo> codeList = tCdeInfoService.getCodeList(custId);
		return new Resp(codeList,CodeDef.SUCCESS);
	}
	
	@InFunLog(funName = "获取我的代码块内容", args = { 0 })
	@RequestMapping(value = "/getCodeContent", method = RequestMethod.GET)
	public Resp getCodeContent(@RequestParam("infoId") Long infoId){
		TCdeInfo info = tCdeInfoService.getCodeContent(infoId);
		return new Resp(info,CodeDef.SUCCESS);
	}
}
