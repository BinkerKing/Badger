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
import net.riking.entity.model.TCltInfo;
import net.riking.service.TCltInfoService;

@InModLog(modName = "我的收藏")
@RestController
@RequestMapping(value = "/MyCltController")
public class MyCltController {
	
	@Autowired
	public TCltInfoService tCltInfoService;
	
	@InFunLog(funName = "获取我的收藏列表", args = { 0 })
	@RequestMapping(value = "/getMyAskList", method = RequestMethod.POST)
	public Resp getMyAskList(@RequestParam("custId") Long custId){
		List<TCltInfo> cltInfoList = tCltInfoService.getMyCltList(custId);
		return new Resp(cltInfoList,CodeDef.SUCCESS);
	}
	
	@InFunLog(funName = "收藏操作", args = { 0 })
	@RequestMapping(value = "/collect", method = RequestMethod.GET)
	public Resp collect(@RequestParam("type") String type,@RequestParam("id") Long id,@RequestParam("custId") Long custId){
		tCltInfoService.collect(type,id,custId);
		return new Resp().setCode(CodeDef.SUCCESS);
	}
	
	@InFunLog(funName = "收藏信息", args = { 0 })
	@RequestMapping(value = "/getCollectInfo", method = RequestMethod.GET)
	public Resp getCollectInfo(@RequestParam("type") String type,@RequestParam("id") Long id,@RequestParam("custId") Long custId){
		TCltInfo cltInfo = tCltInfoService.getCollectInfo(type,id,custId);
		return new Resp(cltInfo).setCode(CodeDef.SUCCESS);
	}
}
