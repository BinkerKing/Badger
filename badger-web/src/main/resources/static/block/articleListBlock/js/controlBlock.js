var articleListTmpl = {
	getTpl : {},
	view : {},
	data : {},
	init : function(divId,data){
		articleListTmpl.getTpl = $("#myArticleListTmpl").innerHTML;
		articleListTmpl.view = $("#"+divId);
		articleListTmpl.data = data;
	},
	load : function(){
		layui.laytpl(articleListTmpl.getTpl).render(articleListTmpl.data, function(html) {
			view.innerHTML = html;
		});
	}
};