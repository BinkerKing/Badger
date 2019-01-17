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
		topListTmpl : {
			onload : function(data){
				var getTpl = document.getElementById("topListTmpl").innerHTML;
				var view = document.getElementById("topListTmplDiv");
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
		}
};