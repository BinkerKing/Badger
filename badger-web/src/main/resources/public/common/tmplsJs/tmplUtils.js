var tmplTools = {
		searchTmpl : {
			onload : function(data){
				var getTpl = document.getElementById("searchTmpl").innerHTML;
				var view = document.getElementById("searchTmplDiv");
				layui.laytpl(getTpl).render(data, function(html){
					view.innerHTML = html;
				});
			}
		},
		TopListTmpl : {
			onload : function(data){
				var getTpl = document.getElementById("TopListTmpl").innerHTML;
				var view = document.getElementById("TopListTmplDiv");
				layui.laytpl(getTpl).render(data, function(html){
					view.innerHTML = html;
				});
			}
		},
		articleListTmpl : {
			onload : function(data){
				var getTpl = document.getElementById("articleListTmpl").innerHTML;
				var view = document.getElementById("articleListTmplDiv");
				layui.laytpl(getTpl).render(data, function(html){
					view.innerHTML = html;
				});
			}
		},
		outlineTmpl : {
			onload : function(data){
				var getTpl = document.getElementById("outlineTmpl").innerHTML;
				var view = document.getElementById("outlineTmplDiv");
				layui.laytpl(getTpl).render(data, function(html){
					view.innerHTML = html;
				});
			}
		},
		searchResultTmpl : {
			onload : function(data){
				var getTpl = document.getElementById("searchResultTmpl").innerHTML;
				var view = document.getElementById("searchResultTmplDiv");
				layui.laytpl(getTpl).render(data, function(html){
					view.innerHTML = html;
				});
			}
		}
};
/*全局变量*/
var AtcList = [];//所有的
var PublishList = [];//已发布的
var UnPublishList = [];//委发布的
var GoodList = [];//精选

var TopList = [];//置顶
var MyAllTag = [];//我的所有标签

//统计变量
var Outline_unpublish=0;
var Outline_publish=0;
var Outline_like=0;
var Outline_view=0;

//筛选组
var search_lable = "";
var search_status = "1";
var search_value="";

/*searchTmpl-start*/
//遍历我的文章列表
function initGlobalVal(){
	//初始化全局统计变量
	Outline_unpublish=0;
	Outline_publish=0;
	Outline_like=0;
	Outline_view=0;
	
	AtcList = [];//所有的
	PublishList = [];//已发布的
	UnPublishList = [];//委发布的
	GoodList = [];//精选

	TopList = [];//置顶
	MyAllTag = [];//我的所有标签
	
	//筛选组
	search_lable = "";
	search_status = "1";
	search_value="";
}
function eachAtcList(){
	$.each(AtcList,function(i,item){
		//获取我的所有标签
		var lableGroup = item.labelGroup;
		var lables = lableGroup.split(",");
		for ( var i = 0; i <lables.length; i++){
			if(!isInArray(MyAllTag,lables[i])){
				var lableObj = {};
				lableObj.name = lables[i];
				MyAllTag.push(lableObj);
			}
		}
		//获取发布组和未发布组
		if(item.publishStatus == "1"){
			Outline_publish ++;
			PublishList.push(item);
		}else{
			Outline_unpublish ++;
			UnPublishList.push(item);
		}
		//统计查看总数和点赞总数
		Outline_like += item.likeCount;
		Outline_view += item.scanCount;
		
		//获取标星组
		if(item.starFlag == "1"){
			GoodList.push(item);
		}
		//获取置顶组
		if(item.topFlag == "1"){
			TopList.push(item);
		}
	});
}
//标签搜索
function lableSearch(lableValue){
	var resp = getLableSearch(lableValue);
	//topList模板
	/* var topData = {};
	topData.article = getTopList(3,resp);
	tmplTools.topListTmpl.onload(topData); */
	//articleList模板
	var listData = {};
	listData.article = orderTop(resp);
	tmplTools.articleListTmpl.onload(listData);
	//searchResult模板初始化
	var searchResultData = {};
	tmplTools.searchResultTmpl.onload(searchResultData);
}

function getLableSearch(lableValue){
	var list = [];
	for(var i=0;i<AtcList.length;i++){
		var lableGroup = AtcList[i].labelGroup;
		var lables = lableGroup.split(",");
		for ( var j = 0; j<lables.length; j++){
			if(lables[j]==lableValue){
				list.push(AtcList[i]);
			}
		}
	}
	return list;
}

//搜索方法
function searchTitle(){
	layer.open({
	    type: 1
	    ,title: false
	    ,closeBtn: false
	    //,shade: [0.1, '#fff']
	    ,shadeClose: true
	    ,maxWidth: 10000
	    ,skin: 'fly-layer-search'
	    ,content: ['<form action="">'
	      ,'<input autocomplete="off" placeholder="搜索内容，回车跳转" type="text" name="q">'
	    ,'</form>'].join('')
	    ,success: function(layero,index){
	      	var input = layero.find('input');
	      	input.focus();
	      	input.keydown(function (e) {
	      		if(e.which == 13){//回车
	      			search_value = $(this).val();
	      			if(search_value!=""){
	      				searchByTitle(search_value);
	      			}
	      			layer.close(index);
	      		}
			});
	    }
	})
}

//标题模糊查询
function searchByTitle(titleSearch){
	var data={};
	data.article = [];
	for(var i=0;i<AtcList.length;i++){
		if(AtcList[i].titleInfo.indexOf(titleSearch)!=-1){
			data.article.push(AtcList[i]);
		}
	}
	data.article = orderTop(data.article);
	tmplTools.articleListTmpl.onload(data);
	
	var searchResultData = {};
	searchResultData.searchContent = titleSearch;
	searchResultData.titleCount = data.article.length;
	tmplTools.searchResultTmpl.onload(searchResultData);
	View.resetUi();
}

//写文章
function addArticle(){
	var content = 'articleEdit.html';
	layer.open({
		type : 2,
		title : '写文章',
		skin: 'layui-layer-rim',
		shadeClose : false,
		shade : .3,
		resize  : false,
		area: ['100%', '100%'],
		maxmin : false, //开启最大化最小化按钮
		zIndex: layer.zIndex,
	    success: function(layero){
	        layer.setTop(layero);
	    },
		content : content //iframe的url
	});
}
/*searchTmpl-end*/
/*TopListTmpl-start*/
//按状态搜索
function searchByStatus(status){
	var data = {};
	switch (status) {
		case 1: data.article = orderTop(AtcList); break;
		case 2: data.article = orderTop(PublishList); break;
		case 3: data.article = orderTop(UnPublishList); break;
		case 4: data.article = orderTop(GoodList); break;
		default: break;
	}
	tmplTools.articleListTmpl.onload(data);
	changeSearchStatus(status);
	//searchResult模板初始化
	var searchResultData = {};
	tmplTools.searchResultTmpl.onload(searchResultData);
	View.resetUi();
}
function changeSearchStatus(status){
	if(status == 1){
		$("#a1").addClass("layui-this");
		$("#a2").removeClass("layui-this");
		$("#a3").removeClass("layui-this");
		$("#a4").removeClass("layui-this");
	}else if(status == 2){
		$("#a2").addClass("layui-this");
		$("#a1").removeClass("layui-this");
		$("#a3").removeClass("layui-this");
		$("#a4").removeClass("layui-this");
	}else if(status == 3){
		$("#a3").addClass("layui-this");
		$("#a1").removeClass("layui-this");
		$("#a2").removeClass("layui-this");
		$("#a4").removeClass("layui-this");
	}else if(status == 4){
		$("#a4").addClass("layui-this");
		$("#a1").removeClass("layui-this");
		$("#a2").removeClass("layui-this");
		$("#a3").removeClass("layui-this");
	}
}
//查看文章
function viewArticle (id){
	var content = 'myArticleView.html?id='+id;
	layer.open({
		type : 2,
		title : '我的文章',
		skin: 'layui-layer-rim',
		shadeClose : false,
		shade : 0,
		resize  : false,
		scrollbar: false,
		area: ['100%', '100%'],
		maxmin: false,
		zIndex: layer.zIndex,
	    success: function(layero){
	        layer.setTop(layero);
	    },
		content : content //iframe的url
	});
}
//设置文章属性
function setProperty(id){
	var content = 'atcProperty.html?id='+id;
	layer.open({
		type : 2,
		title : '编辑文章属性',
		skin: 'layui-layer-rim',
		shadeClose : false,
		shade : .3,
		resize  : false,
		area: ['40%', '80%'],
		maxmin : false, //开启最大化最小化按钮
		zIndex: layer.zIndex,
	    success: function(layero){
	        layer.setTop(layero);
	    },
		content : content //iframe的url
	});
}
//获取TopList
function getTopList(count,resp){
	var list = [];
	if(resp == null){
		resp = TopList;
	}
	for(var i=0;i<resp.length;i++){
		if(count == 0)
			return list;
		if(resp[i].topFlag == "1"){
			list.push(resp[i]);
			count --;
		}
	}
	return list;
}
/*TopListTmpl-end*/
//获取标签，遍历list
function orderTop(list){
	var top = [];
	var untop = [];
	var list2 = [];
	for(var i=0;i<list.length;i++){
		if(list[i].topFlag=="1"){
			top.push(list[i]);
		}else{
			untop.push(list[i]);
		}
	}
	list2 = list2.concat(top);
	list2 = list2.concat(untop);
	return list2;
}

function getInfoById(id){
	for(var i=0;i<AtcList.length;i++){
		if(AtcList[i].id==id){
			return AtcList[i];
		}
	}
}