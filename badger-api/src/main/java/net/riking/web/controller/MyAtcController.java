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
import net.riking.entity.model.SearchParam;
import net.riking.entity.model.TAtcInfomation;
import net.riking.entity.model.TAtcNote;
import net.riking.service.TAtcInfomationService;

@InModLog(modName = "我的手记")
@RestController
@RequestMapping(value = "/MyAtcController")
public class MyAtcController {
	
	@Autowired
	public TAtcInfomationService tAtcInfomationService;
	
	@InFunLog(funName = "获取我的文章列表", args = { 0 })
	@RequestMapping(value = "/getMyAtcList", method = RequestMethod.POST)
	public Resp getMyAtcList(@RequestBody SearchParam param){
		List<TAtcInfomation> tAtcInfomationList = tAtcInfomationService.getMyAtcList(param.getAuthorId(),param.getStatus(),param.getSearch(),param.getLable());
		return new Resp(tAtcInfomationList,CodeDef.SUCCESS);
	}
	
	@RequestMapping(value = "/saveAtc", method = RequestMethod.POST)
	public Resp saveAtc(@RequestBody TAtcInfomation lc){
		tAtcInfomationService.saveAtc(lc);
		return new Resp(CodeDef.SUCCESS);
	}
	
	@InFunLog(funName = "保存文章信息", args = { 0 })
	@RequestMapping(value = "/saveAtcInfo", method = RequestMethod.POST)
	public Resp saveAtcInfo(@RequestBody TAtcInfomation lc){
		tAtcInfomationService.saveAtcInfo(lc);
		return new Resp(CodeDef.SUCCESS);
	}
	
	@InFunLog(funName = "获取我的文章列表", args = { 0 })
	@RequestMapping(value = "/getMyAtcView", method = RequestMethod.GET)
	public Resp getMyAtcView(@RequestParam("id") Long id){
		TAtcInfomation tAtcInfomation = tAtcInfomationService.getMyAtcView(id);
		if(tAtcInfomation == null)
			return new Resp().setCode(CodeDef.ERROR);
		return new Resp(tAtcInfomation,CodeDef.SUCCESS);
	}
	
	@RequestMapping(value = "/saveNote", method = RequestMethod.POST)
	public Resp saveNote(@RequestBody TAtcNote lc){
		tAtcInfomationService.saveNote(lc);
		return new Resp().setCode(CodeDef.SUCCESS);
	}
	
	@RequestMapping(value = "/udpateNotes", method = RequestMethod.POST)
	public Resp udpateNotes(@RequestBody List<TAtcNote> notes){
		tAtcInfomationService.updateNotes(notes);
		return new Resp().setCode(CodeDef.SUCCESS);
	}
	
	@RequestMapping(value = "/deleteNote", method = RequestMethod.GET)
	public Resp deleteNote(@RequestParam("id") Long id){
		tAtcInfomationService.deleteNote(id);
		return new Resp().setCode(CodeDef.SUCCESS);
	}
	
	@RequestMapping(value = "/getNotes", method = RequestMethod.GET)
	public Resp getNotes(@RequestParam("id") Long id,@RequestParam("custId") Long custId){
		List<TAtcNote> noteList = tAtcInfomationService.getNotes(id,custId);
		return new Resp(noteList).setCode(CodeDef.SUCCESS);
	}
}
