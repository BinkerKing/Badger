(function(win) {
	var scaned = false;
	var Block = {};
	Block.load = function(){
		var doms = $("div._block");
		for (var dom, i = 0; dom = doms[i++];) {
			var jdom = $(dom);
			Block.init(jdom, "block");
		}
	};
	Block.init = function(jdom, type){
		var bindFun = jdom.data("bind");
		var param = jdom.data("param");
		var url = jdom.data("url");
		var depend = jdom.data("depend");
		var attr = jdom.data("attr");
		
		var tid = "";
		if (type == "block") {
			tid = url.match(/(\w+)\.html/)[1];
			url = View.CTX + TMPL_PATH + url;
		}
		
		jdom.load(url, function() {
			
		});
		
	};
})(window);
