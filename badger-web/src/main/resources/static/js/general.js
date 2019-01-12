//全属性对比获取修改字段
function getChangePropetyConfig(oldObj, newObj) {
	var change=[];
	for(var str in newObj){
		if(/^[a-zA-Z]+$/.test(str)&&str!="status"){
			if(newObj[str]==""||newObj[str]==null){
				if(oldObj[str]!=""&&oldObj[str]!=null){
					change.push(str);
				}
			}else if(newObj[str]!=oldObj[str]){
				change.push(str);
			}
		}
	}
	return change;
}

//全属性对比获取修改字段
function getChangePropetyEdit(oldObj, newObj) {
	var change=[];
	if(oldObj["history"]!=null&&oldObj["history"]!=""){
		var history=JSON.parse(JSON.parse(oldObj["history"]));
		for(var str in newObj){
			if(/^[a-zA-Z]+$/.test(str)&&str!="status"){
				if(newObj[str]==""||newObj[str]==null){
					if(history[str]!=""&&history[str]!=null){
						change.push(str);
					}
				}else if(newObj[str]!=history[str]){
					change.push(str);
				}
			}
		}
	}
	return change;
}
//排序方法
var union_order_param = {};
TmplUtils.onSort(function() {
	
	var orderString = TmplUtils.searchParam;
	var od = pageListOrder(union_order_param,orderString);

	tbTmpl.refresh("pindex=" + (TmplUtils.currPage - 1) + "&pcount="
			+ TmplUtils.pageSize + od);
});
//List页面的工作流控制方法
function getListController(obj){
	if (obj.isOperColumn && obj.row > 1) {
		var view = "<a href='javascript:;'title='查看' class='layui-btn layui-btn-mini btn-primary iconfont icon-chakan' onclick='edit(\""
			+ obj.item.id +"\",\"view\")'>查看</a>";
		var recrod = "<a href='javascript:;' class='layui-btn layui-btn-mini btn-primary iconfont icon-bianji' onclick='edit(\""
			+ obj.item.id + "\",\"recrod\")' title='补录' >补录</a>";
		var submit = "<a href='javascript:;' class='layui-btn layui-btn-mini btn-primary  iconfont icon-submit_basic' onclick='edit(\""
				+ obj.item.id + "\",\"submit\")' title='提交' >提交</a>";
		var verify = "<a href='javascript:;' class='layui-btn layui-btn-mini btn-primary iconfont icon-verify_basic' onclick='edit(\""
				+ obj.item.id + "\",\"verify\")' title='审核' >审核</a>";
		var reset = "<a href='javascript:;' class='layui-btn layui-btn-mini btn-primary iconfont icon-reset_basic' onclick='reset(\""
			+ obj.item.id + "\")' title='还原' >还原</a>";
		var restore = "<a href='javascript:;' class='layui-btn layui-btn-mini btn-primary iconfont icon-recovery_basic' onclick='restore(\""
			+ obj.item.id + "\")' title='重置' >重置</a>";
		var history = "<a href='javascript:;' class='layui-btn layui-btn-mini btn-primary iconfont icon-er' onclick='showHistory(\""
				+ obj.item.businessKey + "\")' title='历史信息' >历史信息</a>";
		var _html = view;
		if(obj.item.status=="00"||obj.item.status=="09"){
			_html+=recrod+reset;
		}
		if(obj.item.status=="01"){
			_html+=recrod+submit+reset;
		}else if(obj.item.status=="02"){
			_html+=verify;
		}else if(obj.item.status=="03"){
			_html+=restore;
		}
		_html+=history;
		return _html;
	}else if(obj.col==2 && obj.row > 1){
		if(obj.item.status=="09"){
			reasonObj["\""+(obj.row-2)+"\""]=obj.item.odsRemark;
		}
		if(obj.item.status!="03"){
			return "<span style='color:red'>"+obj.html+"</span>";
		}else{
			return obj.html;
		}
	}else{ 
		return obj.html;
	}
}
//List页面跳转编辑页面
function edit(id,action) {
	layer.open({
		type : 2,	
		title : '添加数据',
		shadeClose : true,
		shade : false,
		maxmin : false, //开启最大化最小化按钮
		area: ['100%', '100%'],
		offset : '0px',
		move : false,
		content : Const.sys.webAccessUrl+'/businessData/'+tableName+'Edit.html?id=' + id+"&&action="+action //iframe的url
	});
	
}
//List页面的跳转历史信息
function showHistory(businessKey){
	layer.open({
		type : 2,
		title : '查看历史',
		shadeClose : true,
		shade : false,
		maxmin : false, //开启最大化最小化按钮
		area: ['100%', '100%'],
		offset : '0px',
		move : false,
		content : Const.sys.webAccessUrl+'/businessData/his'+uncap_first(tableName)+'List.html?businessKey='+businessKey //iframe的url
	});
}
//List页面还原请求
function reset(id){
	var url=Const.apiUrl+"/"+tableName+"/reset";
	View.get(url,"id="+id,function(resp){
		TmplUtils.showMsgSuccess(resp);
		tbTmpl.refresh("pindex=" + (TmplUtils.currPage - 1) + "&pcount="
	            + TmplUtils.pageSize + TmplUtils.searchParam);
	    TmplUtils.closePreview();
	},function(code, data){
		TmplUtils.showMsgFail(data.data);
	},300000);
}
//List页面重置请求
function restore(id){
	var url=Const.apiUrl+"/"+tableName+"/restore";
	View.get(url,"id="+id,function(resp){
		TmplUtils.showMsgSuccess(resp);
		tbTmpl.refresh("pindex=" + (TmplUtils.currPage - 1) + "&pcount="
	            + TmplUtils.pageSize + TmplUtils.searchParam);
	    TmplUtils.closePreview();
	},function(code, data){
		TmplUtils.showMsgFail(data.data);
	},300000);
}
//编辑页面按钮控制
function editController(){
	if ("recrod" == action) {
		$("#save").show();
		$("#saveAndSubmit").show();
	}
	if("submit" == action){
		$("#submit").show();
	}
	if ("verify"== action) {
		$("#verifyPass").show();
		$("#verifyNotPass").show();
	}
}
//编辑页面编辑保存
function edit_event() {
	var dept = Utils.formToObj("edit");
	var change=getChangePropetyConfig(tmpl._data.data,dept)
	var oldChange=getChangePropetyEdit(tmpl._data.data,dept)
	dept["changeList"]=change;
	if(oldChange.length==0){
		TmplUtils.showMsgFail("此次修改将导致数据与BASE数据相同，如需这样修改请还原数据");
		return;
	}else{
		dept["editProperty"]=JSON.stringify(oldChange);
	}
	var url = Const.apiUrl + "/"+tableName+"/update";
	View.post(url, dept, function(resp) {
    
		parent.tbTmpl.refresh("pindex=" + (parent.TmplUtils.currPage - 1)
				+ "&pcount=" + parent.TmplUtils.pageSize
				+ parent.TmplUtils.searchParam);
		parent.previewTmpl.refresh();
		var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
		parent.layer.close(index);
		TmplUtils.showMsgSuccess('编辑成功');
	}, function(code,data) {
		if(null!=data.data){
			//判断是否返回的是数组类型，若是则表明有不可修改的字段被修改了，否则是其他错误会有反馈描述
			if(Object.prototype.toString.call(data.data) === '[object Array]'){
				var desc="";
				for(var index in data.data){
					if(!isNaN(index)){
						if(""!=desc){
							desc+=",";
						}
						desc+=$("[name='"+data.data[index]+"']").attr("data-alias");
					}
				}
				TmplUtils.showMsgFail('编辑失败因为以下字段不可修改却被改了值\r\n:'+desc);
			}else{
				TmplUtils.showMsgFail(data.data)
			}
		}else{
			TmplUtils.showMsgFail('编辑失败');
		}
	});
}
//编辑页面提交操作
function sumbit_event() {
	var dept = Utils.formToObj("edit");
	var url = Const.apiUrl + "/"+tableName+"/sumbit";
	var change=getChangePropetyConfig(tmpl._data.data,dept)
	var oldChange=getChangePropetyEdit(tmpl._data.data,dept)
	dept["changeList"]=change;
	if(oldChange.length==0){
		TmplUtils.showMsgFail("此次修改将导致数据与BASE数据相同，如需这样修改请还原数据");
		return;
	}else{
		dept["editProperty"]=JSON.stringify(oldChange);
	}
	dept["changeList"]=change;
	dept["editPropertySet"]=change;
	View.post(url, dept, function(resp) {
		parent.tbTmpl.refresh("pindex=" + (parent.TmplUtils.currPage - 1)
				+ "&pcount=" + parent.TmplUtils.pageSize
				+ parent.TmplUtils.searchParam);
		parent.previewTmpl.refresh();
		var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
		parent.layer.close(index);
		TmplUtils.showMsgSuccess('编辑成功');
	}, function(code,data) {
		if(null!=data.data){
			//判断是否返回的是数组类型，若是则表明有不可修改的字段被修改了，否则是其他错误会有反馈描述
			if(Object.prototype.toString.call(data.data) === '[object Array]'){
				var desc="";
				for(var index in data.data){
					if(!isNaN(index)){
						if(""!=desc){
							desc+=",";
						}
						desc+=$("[name='"+data.data[index]+"']").attr("data-alias");
					}
				}
				TmplUtils.showMsgFail('编辑失败因为以下字段不可修改却被改了值\r\n:'+desc);
			}else{
				TmplUtils.showMsgFail(data.data)
			}
		}else{
			TmplUtils.showMsgFail('编辑失败');
		}
	});
}
//编辑页面审核操作
function verify_event(verify_event){
	var url=Const.apiUrl+"/"+tableName+"/verify";
	var req={};
	req["id"]=id;
	if(verify_event=="pass"){
		var actType={"id":id,"action":verify_event}
		View.post(url,actType,function(resp){
			TmplUtils.showMsgSuccess(resp);
			parent.View.fireEvent("TB_DATA_CHANGE", {
				"window" : window.name
			});
		},function(code, data){
			TmplUtils.showMsgFail(data.data);
		},300000);
	}else if(verify_event=="nopass"){
		layer.confirm('<div><textarea id="wf_comments" class="layui-textarea"></textarea></div>',
				{btn : ['确定', '取消'],area : ['420px', '240px'],title : "不通过原因"}, function() {
					var comments = $("#wf_comments").val();
					if (comments == "") {
						TmplUtils.showMsgFail('请填写不通过原因');
						return;
					} else {
						var actType={"id":id,"action":verify_event,"reason":comments}
						View.post(url,actType,function(resp){
							TmplUtils.showMsgSuccess(resp);
							parent.View.fireEvent("TB_DATA_CHANGE", {
								"window" : window.name
							});
						},function(code, data){
							TmplUtils.showMsgFail(data.data);
						},300000);
						return;
					}
				});
	}
}
function showFieldMsg(data){
	if (("view" != action &&"submit" != action && "verify" != action)&&null!=data.data["odsPropertyConfigs"]) {
		odsPropertyConfigs=data.data["odsPropertyConfigs"];
		for(var index in odsPropertyConfigs){
			var odsPropertyConfig=odsPropertyConfigs[index];
			if(null!=odsPropertyConfig["editSwitch"]&&"on"==odsPropertyConfig["editSwitch"]){
				$("[name='"+odsPropertyConfig["propertyName"]+"']").removeAttr("disabled");
			}
		}
		for(var index in odsPropertyConfigs){
			var odsPropertyConfig=odsPropertyConfigs[index];
			if(null!=odsPropertyConfig["detailSwitch"]&&"on"==odsPropertyConfig["detailSwitch"]){
				$("[name='"+odsPropertyConfig["propertyName"]+"']").parent().parent().find("label span").after("<i class='iconfont icon-feedback' onClick='showTips("+index+")'></i>");
			}
		}
	}
}
function showTips(index){
	var e = window.event;
	e.stopPropagation();
	var odsPropertyConfig=odsPropertyConfigs[index];
	var desc="来源：<br/> 来源于"+odsPropertyConfig["sourceFileName"]+"文件的"+odsPropertyConfig["sourceFieldName"]+"列<br/> 影响：<br/>";
	desc+=odsPropertyConfig["subsystemDesc"];
	var dom=$("[name='"+odsPropertyConfig["propertyName"]+"']").parent().parent().find("label span");
	layer.tips(desc,  dom,{tips:[3,'#0FA6D8'],time: 4000});
}
function pageListOrder(union_order_param,newOrderString){
	var newOrderString = newOrderString.replace("&sort=", "");
	var split = newOrderString.split("_");
	union_order_param[split[0]] = split[1];
	var appendParam = "";
	Object.keys(union_order_param).forEach(function(orderKey, i) {
		var od = union_order_param[orderKey];
		appendParam += (orderKey+"_"+od+"|");
	});
	if(!!appendParam){
		appendParam = "&sort="+appendParam;
	}
	return appendParam;
}
//首字母大写方法
function uncap_first(string){
	return string.slice(0, 1).toUpperCase() + string.slice(1);
}