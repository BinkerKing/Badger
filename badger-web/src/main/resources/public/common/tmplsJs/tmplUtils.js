var tmplTools = {
		person_atcListTmpl : {//我的文章列表
			onload : function(data){
				var getTpl = document.getElementById("person_atcListTmpl").innerHTML;
				var view = document.getElementById("person_atcListTmplDiv");
				layui.laytpl(getTpl).render(data, function(html){
					view.innerHTML = html;
				});
			}
		},
		person_searchTmpl : {
			onload : function(data){
				var getTpl = document.getElementById("person_searchTmpl").innerHTML;
				var view = document.getElementById("person_searchTmplDiv");
				layui.laytpl(getTpl).render(data, function(html){
					view.innerHTML = html;
				});
			}
		},
		person_outlineTmpl : {
			onload : function(data){
				var getTpl = document.getElementById("person_outlineTmpl").innerHTML;
				var view = document.getElementById("person_outlineTmplDiv");
				layui.laytpl(getTpl).render(data, function(html){
					view.innerHTML = html;
				});
			}
		},
		communion_topListTmpl : {
			onload : function(data){
				var getTpl = document.getElementById("communion_topListTmpl").innerHTML;
				var view = document.getElementById("communion_topListTmplDiv");
				layui.laytpl(getTpl).render(data, function(html){
					view.innerHTML = html;
				});
			}
		},
		communion_atcListTmpl : {//我的文章列表
			onload : function(data){
				var getTpl = document.getElementById("communion_atcListTmpl").innerHTML;
				var view = document.getElementById("communion_atcListTmplDiv");
				layui.laytpl(getTpl).render(data, function(html){
					view.innerHTML = html;
				});
			}
		},
		communion_searchTmpl : {
			onload : function(data){
				var getTpl = document.getElementById("communion_searchTmpl").innerHTML;
				var view = document.getElementById("communion_searchTmplDiv");
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
var search_status = "1";//全部搜索
var search_value="";

//角色 1-个人 2-共享
var role = 1;

/*searchTmpl-start*/
//遍历我的文章列表
function initGlobalVal(r){
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
	
	role = r;
}

//个人：标签搜索
function lableSearch(lableValue){
	var resp = getLableSearch(lableValue);
	//articleList模板
	var listData = {};
	listData.article = resp;
	tmplTools.person_atcListTmpl.onload(listData);
	//searchResult模板初始化
	var searchResultData = {};
	tmplTools.searchResultTmpl.onload(searchResultData);
}
//个人：内存搜索-AtcList
function getLableSearch(lableValue){
	var list = [];
	for(var i=0;i<AtcList.length;i++){
		var labelGroup = AtcList[i].labelGroup;
		var lables = JSON.parse(labelGroup);
		for ( var j = 0; j<lables.length; j++){
			if(lables[j]==lableValue){
				list.push(AtcList[i]);
			}
		}
	}
	return list;
}

//公用：模糊搜索弹框
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

//公用：标题模糊查询
function searchByTitle(titleSearch){
	var data={};
	data.article = [];
	for(var i=0;i<AtcList.length;i++){
		if(AtcList[i].titleInfo.indexOf(titleSearch)!=-1){
			data.article.push(AtcList[i]);
		}
	}
	data.article = data.article;
	if(role == 1){//个人
		tmplTools.person_atcListTmpl.onload(data);
	}else{//共享
		tmplTools.communion_atcListTmpl.onload(data);
	}
	//刷新搜索结果块
	var searchResultData = {};
	searchResultData.searchContent = titleSearch;
	searchResultData.titleCount = data.article.length;
	tmplTools.searchResultTmpl.onload(searchResultData);
	View.resetUi();
}

//公用：写文章弹框
function addArticle(){
	var content = '/part/articleEdit.html';
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
//共享：跳转到标签相关文章列表
function toTag(tag){
	var content = 'tagList.html?tag='+tag;
	layer.open({
		type : 2,
		title : tag+'文章组',
		skin: 'layui-layer-rim',
		shadeClose : false,
		shade : .3,
		resize  : false,
		area: ['100%', '100%'],
		maxmin : false,
		zIndex: layer.zIndex,
	    success: function(layero){
	        layer.setTop(layero);
	    },
		content : content
	});
}
/*searchTmpl-end*/
/*TopListTmpl-start*/
//个人：按状态搜索
function searchByStatus(status){
	var data = {};
	switch (status) {
		case 1: data.article = AtcList; break;
		case 2: data.article = PublishList; break;
		case 3: data.article = UnPublishList; break;
		case 4: data.article = GoodList; break;
		default: break;
	}
	tmplTools.person_atcListTmpl.onload(data);
	changeSearchStatus(status);
	//searchResult模板初始化
	var searchResultData = {};
	tmplTools.searchResultTmpl.onload(searchResultData);
	View.resetUi();
}
//个人：改变选中状态颜色
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
//公用：查看文章
function viewArticle (id){
	var content;
	if(role==1){
		content = 'myArticleView.html?id='+id;
	}else if(role==2){
		content = 'atcView.html?id='+id;
	}
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

//个人：设置文章属性
function setProperty(id){
	var content = 'myAtcProperty.html?id='+id;
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

/*TopListTmpl-end*/
//共享：获取标签，遍历list
function orderTop(list){
	var top = [];
	var untop = [];
	var list2 = [];
	for(var i=0;i<list.length;i++){
		if(list[i].topFlag==1){
			top.push(list[i]);
		}else{
			untop.push(list[i]);
		}
	}
	list2 = list2.concat(top);
	list2 = list2.concat(untop);
	return list2;
}

//共享：获取TopList
function getTopList(count,resp){
	var list = [];
	if(resp == null){
		resp = TopList;
	}
	for(var i=0;i<resp.length;i++){
		if(count == 0)
			return list;
		if(resp[i].topFlag == 1){
			list.push(resp[i]);
			count --;
		}
	}
	return list;
}

//公用：通过id获取文章信息
function getInfoById(id){
	for(var i=0;i<AtcList.length;i++){
		if(AtcList[i].id==id){
			return AtcList[i];
		}
	}
}