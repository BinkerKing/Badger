package net.riking.web.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import net.riking.config.CodeDef;
import net.riking.core.entity.Resp;
import net.riking.core.log.InFunLog;
import net.riking.core.log.InModLog;
import net.riking.entity.model.TCdeInfo;
import net.riking.entity.model.TLabGrpManager;
import net.riking.service.TCdeInfoService;

@InModLog(modName = "代码块")
@RestController
@RequestMapping(value = "/TCdeInfoController")
public class TCdeInfoController {
	
	@Autowired
	public TCdeInfoService tCdeInfoService;
	
	@RequestMapping(value = "/getCodeList", method = RequestMethod.GET)
	public Resp getCodeList(@RequestParam("custId") Long custId){
		List<TCdeInfo> codeList = tCdeInfoService.getCodeList(custId);
		return new Resp(codeList,CodeDef.SUCCESS);
	}
	
	@RequestMapping(value = "/getCodeContent", method = RequestMethod.GET)
	public Resp getCodeContent(@RequestParam("infoId") Long infoId){
		TCdeInfo info = tCdeInfoService.getCodeContent(infoId);
		return new Resp(info,CodeDef.SUCCESS);
	}
	
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public Resp save(@RequestBody TCdeInfo lg){
		TCdeInfo info = tCdeInfoService.save(lg);
		return new Resp(info,CodeDef.SUCCESS);
	}
	
	@RequestMapping(value = "/deleteCodeContent", method = RequestMethod.GET)
	public Resp deleteCodeContent(@RequestParam("id") Long id,@RequestParam("custId") Long custId){
		tCdeInfoService.deleteCodeContent(id);
		return new Resp(tCdeInfoService.getCodeList(custId),CodeDef.SUCCESS);
	}
}
