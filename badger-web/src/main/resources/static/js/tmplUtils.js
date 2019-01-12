var TmplUtils = {
	_tableData : 0,
	_isResize : 0,
	_tdClickId: 0,
    isEditing: 0,
    pageSize: 15,
    totalPages: -1,
    currPage: 1,
    searchParam: "",
    pageTmpl: {},
    totalCount: 0,
    _eunmLinkselectOnChangeCall: null,
    _eunmLinkselectChangedCall: null,
    onEunmLinkChanged: function(eunmLinkselectOnChangeCall, eunmLinkselectChangedCall) {
        TmplUtils._eunmLinkselectOnChangeCall = eunmLinkselectOnChangeCall;
        TmplUtils._eunmLinkselectChangedCall = eunmLinkselectChangedCall;
    },
    verify: {
        required: [
            /[\S]+/, '必填项不能为空'
        ],
        phone: [
            /^1\d{10}$|^$/, '请输入正确的手机号'
        ],
        email: [
            /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$|^$/, '邮箱格式不正确'
        ],
        url: [
            /(^#)|(^http(s*):\/\/[^\s]+\.[^\s]+)/, '链接格式不正确'
        ],
        number: [
            /^\d+$|^$/, '只能填写数字'
        ],
        amount: [
        	/^\d{1,3}(,\d{3})*(\.(\d*))?$|^$/, '格式不正确'
        	
        ],
        date: [
            /^(\d{4})[-\/](\d{1}|0\d{1}|1[0-2])([-\/](\d{1}|0\d{1}|[1-2][0-9]|3[0-1]))*$|^$/, '日期格式不正确'
        ],
        time: [
            /^([0-2][0-9]):([0-5][0-9]):([0-5][0-9])$/, '时间格式不正确'
        ],
        identity: [
            /(^\d{15}$)|(^\d{17}(x|X|\d)$)/, '请输入正确的身份证号'
        ],
        specialCode: [
            /^[\u4e00-\u9fa5a-z]+$/gi, '请输入非特殊符号字符'
        ],
        spaceCode: [
            /^[^\s]*$/, '请输入非空格字符'
        ],
        minLen: function(value, len) {
            if (value.length < len) {
                return '请输入超过' + len + '个字符';
            }
        },
        maxLen: function(value, len) {
            if (value.length > len) {
                return '请输入少于' + len + '个字符';
            }
        }
    },
    __tablePreviewSwitch: function(id) {
        if (TmplUtils.isEditing == 0) {
            /*    if ($(".tableContent").hasClass("w1") && id == TmplUtils._tdClickId && TmplUtils._tdClickId != 0) {
             $(".tableContent").removeClass("w1");
             $(".contentRight").removeClass("w2");
             $(".lay-tab-right").removeClass("w3");
             $("#tr_"+id).removeClass("bg081");
             $(window).resize();
             $(".viewTable").show();
             TmplUtils.isEditing = 0;
             }*/
        }
    },
    //修改-xb
    __tablePreviewOpen: function(id) {
        if (TmplUtils.isEditing == 0) {
            TmplUtils._tdClickId = id;
            $(".contentRight").addClass("contentRight-s");
        }
    },
    __getEnumVal: function(enums, tableName, filed, key) {
        if (enums[tableName.toUpperCase()]) {
            for (var i = 0; i < enums[tableName.toUpperCase()].length; i++) {
                if (enums[tableName.toUpperCase()][i].field.toLowerCase() == filed.toLowerCase() && enums[tableName.toUpperCase()][i].ke == key) {
                    return enums[tableName.toUpperCase()][i].valu;
                }
            }
        } else {
            return "";
        }
        return "";
    },
    __getEnumKeyVals: function(enums, tableName, field) {
        var keyVals = [];
        if (enums[tableName.toUpperCase()]) {
            for (var i = 0; i < enums[tableName.toUpperCase()].length; i++) {
                if (enums[tableName.toUpperCase()][i].field.toLowerCase() == field.toLowerCase()) {
                    var keyVal = {};
                    keyVal.key = enums[tableName.toUpperCase()][i].ke;
                    keyVal.val = enums[tableName.toUpperCase()][i].valu;
                    keyVals.push(keyVal);
                }
            }
        }
        return keyVals;
    },
    //修改 -xb
    //关闭预览
    closePreview: function() {
        $(".contentRight").removeClass("contentRight-s");
        $(".layui-table-main tr").removeClass("tron");
    },
    // 表格加载结束
    tableOnLoad: function(d) {
    	if(!d){
    		return;
    	}
        var enums = {};
        var enumurlHtmlObjs = $("._enumurl");
        for (var i = 0; i < enumurlHtmlObjs.size(); i++) {
            var enumurlHtmlObj = enumurlHtmlObjs.eq(i);
            var prop = enumurlHtmlObj.data("prop");
            var data = {};
            data.enumurl = enumurlHtmlObj.data("enumurl");
            data.enumparam = enumurlHtmlObj.data("enumparam");
            data.prop = enumurlHtmlObj.data("prop");
            enums[prop] = data;
        }
        for (var key in enums) {
            var url = enums[key].enumurl;
            if (url.indexOf("http") == -1) {
                url = Const.apiUrl + url;
            }
            var param = "";
            if (enums[key].enumparam && enums[key].enumparam != "undefined") {
                param = enums[key].enumparam + "&prop=" + enums[key].prop;
            } else {
                param = "prop=" + enums[key].prop;
            }
            View.get(url, param, function(resp) {
                var enumurlSpans = $("._enumurl");
                for (var i = 0; i < resp.length; i++) {
                    for (var k = 0; k < enumurlSpans.size(); k++) {
                        var dataKey = enumurlSpans.eq(k).data("key");
                        var dataProp = enumurlSpans.eq(k).data("prop");
                        if (resp[i].prop) {
                            if (dataKey == resp[i].key && dataProp == resp[i].prop) {
                                enumurlSpans.eq(k).html(resp[i].value);
                            }
                        } else {
                            if (dataKey == resp[i].key) {
                                enumurlSpans.eq(k).html(resp[i].value);
                            }
                        }
                    }
                }
            }, function() {});
        }
        var multipleChoicePropObj = {};
        $("._multipleChoice").each(function() {
            var url = $(this).data("choiceurl");
            if (!url || url == "undefined") {
                return;
            }
            var param = $(this).data("choiceparam");
            if (!param || param == "undefined") {
                param = "";
            }
            var prop = $(this).data("prop");
            var data = {};
            data.prop = prop;
            data.url = url;
            data.param = param;
            multipleChoicePropObj[prop] = data;
        });

        for (var prop in multipleChoicePropObj) {
            View.get(multipleChoicePropObj[prop].url, multipleChoicePropObj[prop].param, function(resp) {
                if (resp) {
                    $("._multipleChoice").each(function() {
                        var keysStr = $(this).data("keys");
                        var keys = [];
                        if (keysStr && keysStr != 'undefined') {
                            keys = keysStr.toString().split(",");
                        }
                        var htmlStr = "";
                        for (var i = 0; i < resp.length; i++) {
                            if ((resp[i].prop && resp[i].prop == $(this).data("prop")) || !resp[i].prop) {
                                if ($.inArray(resp[i].key, keys) > -1) {
                                    htmlStr = htmlStr + resp[i].value + ",";
                                }
                            }
                        }
                        if (htmlStr) {
                            htmlStr = htmlStr.substring(0, htmlStr.length - 1);
                        }
                        $(this).html(htmlStr);
                    });
                }
            }, function() {});
        }
        TmplUtils._tableData = d;
        this.initTable("tableTmpl",TmplUtils._tableData);
        
		/*table.on("sort(tableTmpl)",function(obj){
			if(obj.type != null){
				var name = obj.field;
				name = name.replace(/-/g,".");
				TmplUtils.searchParam += "&sort=" + name + "_" + obj.type;
			}
			View.info();
			search();
		});*/
    },
    initTable : function(tableId,d){
    	var checkedBox = this._loadThWidth(tableId,d);
    	
        var table = layui.table;
 		table.init(tableId, {});
 		this._loadTrClickEvent(d,checkedBox);
    },
    _resizeTable : function(){
    	if(TmplUtils._tableData){
    		TmplUtils.initTable("tableTmpl",TmplUtils._tableData);
    		var tmpl = View.getTmpl("table");
    		if(tmpl._onFinishCall){
    			tmpl._onFinishCall.call(tmpl,TmplUtils._tableData);
    		}
    		TmplUtils._isResize = 0;
    	}
    },
    //table自适应高度设置
    _loadThWidth : function(tableId,d){
    	var contentWidth = $(".tableContent").width();
    	var tableRows = $("#" + tableId).get(0).rows;
        var ths = tableRows[0].cells;
        var ts = [];
        var checkedBox;
        for (var i = 0; i < ths.length; i++) {
			ts[i] = true;
		}
        var opt = {ts:ts,contentWidth:contentWidth,ths:ths,tableId:tableId};
        if(!!d){
        	if(d.hasCheckbox){
            	opt.contentWidth -= 45;
            	opt.ts[0] = false;
            	
            	//获取选中的复选框，重置后重新勾选用
            	var tableView = $(".layui-table-main").find("table");
            	if(tableView.length){
            		checkedBox = {};
            		var tableHead = $(".layui-table-header").find("table");
            		checkedBox.tableTh = $(tableHead.get(0).rows[0].cells[0]).find(":checkbox").get(0).checked;
            		checkedBox.tableTd = [];
            		$(tableView.get(0).rows).each(function(index,item){
            			var checkbox = $(this.cells[0]).find(":checkbox");
            			if(checkbox.length){
            				checkedBox.tableTd[index] = checkbox.get(0).checked;
            			}
            		});
            	}
            }
        	if(d.hasOperation && d.operationWidth){
        		var operationWidth = parseInt(contentWidth * d.operationWidth / 100);
        		opt.contentWidth -= (operationWidth);
        		var operationTh = $(ths[ths.length - 1]);
        		var operationLayData = eval("("+ operationTh.attr("lay-data") +")");
        		operationLayData.width = operationWidth;
        		operationTh.attr("lay-data",JSON.stringify(operationLayData));
        		opt.ts[ths.length - 1] = false;
        	}
        	opt.d = d;
        }
    	var widths = this._getTableThWidths(opt);
    	for (var i = 0; i < ths.length; i++) {
    		if(ts[i]){
    			var th = $(ths[i]);
    			var lay_data = eval("("+ th.attr("lay-data") +")");
    			lay_data.width = widths[i];
    			th.attr("lay-data",JSON.stringify(lay_data));
    		}
		}
    	return checkedBox;
    },
    //计算表格自适应宽度
    _getTableThWidths : function(opt){
    	var tableId = opt.tableId;
    	var d = opt.d;
    	var ts = opt.ts;
    	var contentWidth = opt.contentWidth;
    	var ths = opt.ths;
        var cellWidths = [];
        if(!!d && d.tdWidth){
        	var widths = $.extend(true,[],d.tdWidth);
        	for (var i = 0; i < ts.length; i++) {
				if(ts[i]){
					cellWidths[i] = widths.shift();
				}
			}
        }else if(!!d && ((d.tdLeftWidth && d.tdLeftWidth.length > 0) || (d.tdRightWidth && d.tdRightWidth.length > 0))){
        	var widths = [];
        	var index = 0;
        	var count = 0;
    		for (var i = 0; i < d.tdLeftWidth.length; i++) {
                widths[index] = d.tdLeftWidth[i];
        		index ++;
			}
    		for (var i = 0; i < d.tdRightWidth.length; i++) {
                widths[index] = d.tdRightWidth[i];
        		index ++;
			}
        	for (var i = 0; i < ts.length; i++) {
				if(ts[i]){
					count ++;
					cellWidths[i] = widths.shift();
				}
			}
        	if(index != count){
        		cellWidths = this._getTableContentWidths(opt);
        	}
        }else{
        	cellWidths = this._getTableContentWidths(opt);
        }
        
        var tableObj = document.getElementById(tableId);
        var thLengths = [];
        var thRows = tableObj.rows[0];
        for (var i = 0; i < thRows.cells.length; i++) {
        	if(ts[i]){
        		thLengths[i] = thRows.cells[i].innerHTML.gblen() * 11;
        	}
		}
        
        var widths = [];
        var widthSum = 0;
        for (var i = 0; i < cellWidths.length; i++) {
			if(cellWidths[i]){
				var width = parseInt(cellWidths[i] * contentWidth / 100);
				widthSum += width;
				if(i == cellWidths.length - 1){
					width = width + (contentWidth - widthSum) - (ths.length + 1);
				}
				width = width < thLengths[i] ? thLengths[i] : width;
				widths[i] = width;
			}
		}
        return widths;
    },
    _getTableContentWidths : function(opt){
    	var tableId = opt.tableId;
    	var ts = opt.ts;
    	var tableObj = document.getElementById(tableId);
        var lengths = [];
        
        for (var i = 0; i < tableObj.rows.length; i++) {    //遍历Table的所有Row
            for (var j = 0; j < ts.length; j++) {   //遍历Row中的每一列
              if(ts[j]){
            	  var cells = tableObj.rows[i].cells;
            	  if(!cells || cells.length <= 0){
            		  continue;
            	  }
            	  var tdHtmllength  = cells[j].innerHTML.gblen();   //获取Table中单元格的内容
                  if(lengths[j]){
                      if(lengths[j]<tdHtmllength){
                          lengths[j] = tdHtmllength;
                      }
                  }else{
                      lengths[j] = tdHtmllength;
                  }
              }
            }
        }
        var total = 0;
        for(var i=0; i<lengths.length;i++){
            if(lengths[i]){
            	total +=lengths[i];
            }
        }
        for(var i=0; i<lengths.length;i++){
            lengths[i] =(lengths[i]/total)*100;
        }
        return lengths;
    },
    _loadTrClickEvent : function(d,checkedBox){
    	if(!!d.trClick && d.trClick != ''){
    		$(".layui-table-main tr").each(function(index){
    			$(this).bind("click",function(){
    				window[d.trClick].call(window,d.data.content[index]);
    				if($(".contentRight").hasClass("contentRight-s") && TmplUtils.isEditing == 0){
    					$(".layui-table-main tr").removeClass("tron");
        				$(this).addClass("tron");
        			}
    			});
    		});
    	}
    	if(d.hasCheckbox){
    		$(".layui-table-main input[name='layTableCheckbox']").each(function(index){
        		if(index == d.data.content.length){
        			return false;
        		}
        		$(this).attr("name","tdCheckbox").attr("data-id",d.data.content[index].id).attr("lay-filter","tdCheckbox");
        	});
    		$(".layui-table-main input[name='layTableCheckbox']").each(function(index){
    			$(this).next().remove();
    			$(this).remove();
    		});
        	$("input[lay-filter='layTableAllChoose']").attr("lay-filter","allChoose");
        	var form = layui.form;
        	form.on('checkbox(allChoose)', function(data) {
        		var child = $(data.elem).parents('table').parent().next("div").find(
        				'input[type="checkbox"]');
        		child.each(function(index, item) {
        			item.checked = data.elem.checked;
        		});
        		form.render('checkbox');
        	});
        	form.on('checkbox(tdCheckbox)',function(data){
        		var checked = true;
        		$($(".layui-table-main").find("table").get(0).rows).each(function(){
        			var chechBox = $(this.cells[0]).find(":checkbox");
        			if(chechBox.length){
        				var c = chechBox.get(0).checked;
            			if(!c){
            				checked = false;
            			}
        			}
        		});
        		$($(".layui-table-header").find("table").get(0).rows[0].cells[0]).find(":checkbox").get(0).checked = checked;
        		form.render('checkbox');
        	});
        	
        	//选中的checkBox重新勾选
        	if(checkedBox){
        		var tableView = $(".layui-table-main").find("table");
            	if(tableView.length){
            		var tableHead = $(".layui-table-header").find("table");
            		$(tableHead.get(0).rows[0].cells[0]).find(":checkbox").get(0).checked = checkedBox.tableTh;
            		$(tableView.get(0).rows).each(function(index,item){
            			var checkBox =  $(this.cells[0]).find(":checkbox");
            			if(checkBox.length){
            				checkBox.get(0).checked = checkedBox.tableTd[index];
            			}
            		});
            		form.render('checkbox');
            	}
        	}
    	}
    },
    // 查询条件加载结束
    filterCriteriaOnLoad: function() {
    	$("#layui-form-select-p").find("input[data-type='date'],input[date-type='datetime']").each(function(){
    		var type = $(this).data("type");
    		var dateChangeCall = $(this).data("call");
    		var opt = {
    			elem : this
    		};
    		if(type == 'datetime'){
    			opt.type = 'datetime';
    		}
    		if(!!dateChangeCall && dateChangeCall != ''){
    			opt.done = dateChangeCall;
    		}
    		layui.laydate.render(opt);
    	});
    	
        // 筛选查询
    	$("#layui-form-select-l").click(function (event) {
            $("#layui-form-select-p").toggleClass("layui-form-selected-l");
            $(this).toggleClass("layui-form-select-show");
            event.stopPropagation();
        });
        // 筛选查询tip
        $("._query").mouseover(function() {
            if ($(this).data("desc")) {
                layer.tips($(this).data("desc"), $(this), {
                    tips: [3, '#08c'], // 还可配置颜色
                    time: 1000
                });
            }
        });

        $(".layui-unselect").mouseover(function() {
            if ($(this).parent(".layui-form-select").siblings("._query").data("desc")) {
                layer.tips($(this).parent(".layui-form-select").siblings("._query").data("desc"), $(this), {
                    tips: [3, '#08c'], // 还可配置颜色
                    time: 3000
                });
            }
        });

        $(document).click(function() {
            $("#layui-form-select-p").removeClass("layui-form-selected-l");
        });
        $("#layui-form-select-p").click(function(event) {
            event.stopPropagation();
        });

        setTimeout(function() {
            $(".layui-form-select dd").mouseover(function() {
                if ($(this).html().length > 15) {
                    layer.tips($(this).html(), $(this), {
                        tips: [1, '#08c'], // 还可配置颜色
                        time: 3000
                    });
                }
            });
        }, 500);
        $("input").each(function() {
            if ($(this).data("type") && $(this).data("type") == "date") {
                $(this).bind("input propertychange", function() {
                    if ($(this).val().length == 8 && $(this).val().indexOf("-") == -1) {
                        $(this).val($(this).val().substr(0, 4) + "-" + $(this).val().substr(4, 2) + "-" + $(this).val().substr(6, 2));
                    }
                });
            }
        });
        $("#filterCriteria").find("select").each(function() {
            if ($(this).data("enumurl") && $(this).data("enumurl") != "undefined") {
                var url = $(this).data("enumurl");
                var prop = $(this).data("prop");
                var param = $(this).data("enumparam");
                if (!param || param == "undefined") {
                    param = "prop=" + prop;
                } else {
                    param = prop + "&prop=" + prop;
                }
                var _this = this;
                View.get(url, param, function(resp) {
                    if (resp) {
                        for (var i = 0; i < resp.length; i++) {
                            $(_this).append("<option value='" + resp[i].key + "'>" + resp[i].value + "</option>");
                        }
                    }
                    layui.form.render();
                    TmplUtils.layuiSelectOptionMouseOver();
                }, function() {})
            }
        });
    },

    // 预览加载结束
    previewOnLoad: function() {
        var contentH = $(".tableContent").innerHeight();
        $(".contentRight").css("height", contentH);
        $(".contentRight .text").css("height", contentH - 67);
        var form = layui.form;
        // 监听指定开关
        form.on('switch(switchTest)', function(data) {
            if (this.checked) {
                $("#htmlCont select").each(function() {
                    if ($(this).data("editable") && $(this).data("editable") == 2) {} else {
                        $(this).removeAttr("disabled");
                        $(this).next().removeClass("layui-select-disabled");
                    }
                });
                $("#preservationBtn").show();
                $("#checkBnt").show();
                $('#preview input,#preview textarea').each(function() {
                    if ($(this).data("editable") && $(this).data("editable") == 2) {} else {
                        $(this).removeAttr("disabled");
                    }

                });
                TmplUtils.isEditing = 1;

            } else {
                $("#htmlCont select").attr("disabled", 'disabled');
                $("#preservationBtn").hide();
                $('#preview input,#preview textarea').attr("disabled", "disabled");
                $("#checkBnt").hide();
                TmplUtils.isEditing = 0;
            }
        });
        $("#closePreview").click(function() {
            TmplUtils.closePreview();
        });
        setTimeout(function() {
            $("#preview").find("select").each(function() {
                if ($(this).data("enumurl") && $(this).data("enumurl") != "undefined") {
                    var url = Const.apiUrl + $(this).data("enumurl");
                    var _this = this;
                    var param = $(this).data("enumparam");
                    var prop = $(this).data("prop");
                    if (!param || param == "undefined") {
                        param = "";
                    } else {
                        param = param + "&prop" + prop;
                    }
                    View.get(url, param, function(resp) {
                        if (resp) {
                            $(_this).html("");
                            $(_this).append("<option value='--##--'>--请选择--</option>");
                            for (var i = 0; i < resp.length; i++) {
                                if ($(_this).data("key") == resp[i].key) {
                                    $(_this).append("<option selected='true' value='" + resp[i].key + "'>" + resp[i].value + "</option>");
                                } else {
                                    $(_this).append("<option value='" + resp[i].key + "'>" + resp[i].value + "</option>");
                                }
                            }
                        }
                        layui.form.render();
                        TmplUtils.layuiSelectOptionMouseOver();
                        if ($(_this).data("type") == "enumLink") {
                            var attrName = $(_this).attr("name");
                            var attrNameNext = attrName.substr(0, attrName.lastIndexOf("-|-") + 3) + (parseInt(attrName.substr(attrName.lastIndexOf("-|-") + 3, attrName.length)) + 1);
                            if ($("select[name='" + attrNameNext + "']").size() > 0) {
                                var form = layui.form;
                                form.on('select(' + attrName + ')', function(data) {
                                    var attrName = $(data.elem).attr("name");
                                    var attrNameNext = attrName.substr(0, attrName.lastIndexOf("-|-") + 3) + (parseInt(attrName.substr(attrName.lastIndexOf("-|-") + 3, attrName.length)) + 1);
                                    if (!$("select[name='" + attrNameNext + "']")) {
                                        return;
                                    }
                                    var url_t = $("select[name='" + attrNameNext + "']").data("enumurl");
                                    var param_t = $("select[name='" + attrNameNext + "']").data("enumparam");
                                    var prop = $("select[name='" + attrNameNext + "']").data("prop");
                                    if (param_t && param_t != "undefined") {
                                        param_t = param_t + "&key=" + data.value + "&prop=" + prop;
                                    } else {
                                        param_t = "key=" + data.value + "&prop=" + prop;;
                                    }
                                    View.get(url_t, param_t, function(resp) {
                                        if (resp) {
                                            $("select[name='" + attrNameNext + "']").html("");
                                            $("select[name='" + attrNameNext + "']").append("<option value='--##--'>--请选择--</option>");
                                            for (var i = 0; i < resp.length; i++) {
                                                if ($("select[name='" + attrNameNext + "']").data("key") == resp[i].key) {
                                                    $("select[name='" + attrNameNext + "']").append("<option selected='true' value='" + resp[i].key + "'>" + resp[i].value + "</option>");
                                                } else {
                                                    $("select[name='" + attrNameNext + "']").append("<option value='" + resp[i].key + "'>" + resp[i].value + "</option>");
                                                }
                                            }
                                        }
                                        layui.form.render();
                                        TmplUtils.layuiSelectOptionMouseOver();
                                    });
                                });
                            }
                        }
                    }, function() {})
                }
            });
            $("#preview").find("._multipleChoice").each(function() {
                var url = $(this).data("choiceurl");
                if (!url || url == "undefined") {
                    return;
                }
                var param = $(this).data("choiceparam");
                if (!param || param == "undefined") {
                    param = "";
                }
                var keysStr = $(this).data("keys");
                var keys = [];
                if (keysStr && keysStr != 'undefined') {
                    try {
                        keys = keysStr.toString().split(",");
                    } catch (e) {}
                }
                var prop = $(this).data("prop");
                var editable = $(this).data("editable");
                if (!editable || editable == "undefined") {
                    editable == "0";
                }
                editable = parseInt(editable);
                var _this = this;
                View.get(url, param, function(resp) {
                    if (resp) {
                        for (var i = 0; i < resp.length; i++) {
                            if (editable > 0) {
                                if ($.inArray(resp[i].key, keys) > -1) {
                                    $(_this).append('<input disabled type="checkbox" name="' + prop + '-|-' + resp[i].key + '" checked title="' + resp[i].value + '" lay-skin="primary">');
                                } else {
                                    $(_this).append('<input disabled type="checkbox" name="' + prop + '-|-' + resp[i].key + '" title="' + resp[i].value + '" lay-skin="primary">');
                                }
                            } else {
                                if ($.inArray(resp[i].key, keys) > -1) {
                                    $(_this).append('<input type="checkbox" name="' + prop + '-|-' + resp[i].key + '" checked title="' + resp[i].value + '" lay-skin="primary">');
                                } else {
                                    $(_this).append('<input type="checkbox" name="' + prop + '-|-' + resp[i].key + '" title="' + resp[i].value + '" lay-skin="primary">');
                                }
                            }
                        }
                        layui.form.render();
                    }
                }, function() {});
            });
        }, 500)
        $("#htmlCont").find("input[data-type='date'],input[date-type='datetime']").each(function(){
    		var type = $(this).data("type");
    		var opt = {
    			elem : this
    		};
    		if(type == 'datetime'){
    			opt.type = 'datetime';
    		}
    		layui.laydate.render(opt);
    	});
    },
    //编辑加载结束
    editOnLoad: function() {
        var element = layui.element;
        var layer = layui.layer;
        element.init();
        //监听折叠
        element.on('collapse(edit)', function(data) {

        });
        // 筛选查询tip
        $("label").mouseover(function() {
            if ($(this).data("desc")) {
                layer.tips($(this).data("desc"), $(this), {
                    tips: ['1', '#08c'], // 还可配置颜色
                    time: 3000
                });
                $(".layui-layer-tips").css("left", $(this).offset().left + 120);
            }
        });
        $(".layui-form-select dd").mouseover(function() {
            if ($(this).html().length > 15) {
                layer.tips($(this).html(), $(this), {
                    tips: [1, '#08c'], // 还可配置颜色
                    time: 3000
                });
            }
        });
        $("input").each(function() {
            if ($(this).data("type") && $(this).data("type") && $(this).data("type") == "date") {
                $(this).bind("input propertychange", function() {
                    if ($(this).val().length == 8 && $(this).val().indexOf("-") == -1) {
                        $(this).val($(this).val().substr(0, 4) + "-" + $(this).val().substr(4, 2) + "-" + $(this).val().substr(6, 2));
                    }
                });
            }
        });
        setTimeout(function() {
            $("#edit").find("select").each(function() {
                if ($(this).data("enumurl") && $(this).data("enumurl") != "undefined") {
                    var url = Const.apiUrl + $(this).data("enumurl");
                    var prop = $(this).data("prop");
                    var _this = this;
                    var param = $(this).data("enumparam");
                    if (!param || param == "undefined") {
                        param = "prop=" + prop;
                    } else {
                        param = param + "&prop=" + prop;
                    }
                    View.get(url, param, function(resp) {
                        if (resp) {
                            $(_this).html("");
                            $(_this).append("<option value='--##--'>--请选择--</option>");
                            for (var i = 0; i < resp.length; i++) {
                                if ($(_this).data("key") == resp[i].key) {
                                    $(_this).append("<option selected='true' value='" + resp[i].key + "'>" + resp[i].value + "</option>");
                                } else {
                                    $(_this).append("<option value='" + resp[i].key + "'>" + resp[i].value + "</option>");
                                }
                            }
                        }
                        layui.form.render();
                        TmplUtils.layuiSelectOptionMouseOver();
                        if ($(_this).data("type") == "enumLink") {
                            var attrName = $(_this).attr("name");
                            var attrNameNext = attrName.substr(0, attrName.lastIndexOf("-|-") + 3) + (parseInt(attrName.substr(attrName.lastIndexOf("-|-") + 3, attrName.length)) + 1);
                            if ($("select[name='" + attrNameNext + "']").size() > 0) {
                                var form = layui.form;
                                form.on('select(' + attrName + ')', function(data) {
                                    if (TmplUtils._eunmLinkselectOnChangeCall) {
                                        if (!TmplUtils._eunmLinkselectOnChangeCall.call(this, data.elem)) {
                                            return;
                                        }
                                    }
                                    var attrName = $(data.elem).attr("name");
                                    var attrNameNext = attrName.substr(0, attrName.lastIndexOf("-|-") + 3) + (parseInt(attrName.substr(attrName.lastIndexOf("-|-") + 3, attrName.length)) + 1);
                                    if (!$("select[name='" + attrNameNext + "']")) {
                                        return;
                                    }
                                    var url_t = $("select[name='" + attrNameNext + "']").data("enumurl");
                                    var param_t = $("select[name='" + attrNameNext + "']").data("enumparam");
                                    var prop = $("select[name='" + attrNameNext + "']").data("prop");
                                    if (param_t && param_t != "undefined") {
                                        param_t = param_t + "&key=" + data.value + "&prop=" + prop;
                                    } else {
                                        param_t = "key=" + data.value + "&prop=" + prop;;
                                    }
                                    View.get(url_t, param_t, function(resp) {
                                        if (resp) {
                                            $("select[name='" + attrNameNext + "']").html("");
                                            $("select[name='" + attrNameNext + "']").append("<option value='--##--'>--请选择--</option>");
                                            for (var i = 0; i < resp.length; i++) {
                                                if ($("select[name='" + attrNameNext + "']").data("key") == resp[i].key) {
                                                    $("select[name='" + attrNameNext + "']").append("<option selected='true' value='" + resp[i].key + "'>" + resp[i].value + "</option>");
                                                } else {
                                                    $("select[name='" + attrNameNext + "']").append("<option value='" + resp[i].key + "'>" + resp[i].value + "</option>");
                                                }
                                            }
                                        }
                                        layui.form.render();
                                        TmplUtils.layuiSelectOptionMouseOver();
                                        if (TmplUtils._eunmLinkselectChangedCall) {
                                            TmplUtils._eunmLinkselectChangedCall.call(this, data.elem);
                                        }
                                    });
                                });
                            }
                        }
                    }, function() {})
                }
            });
            $("#edit").find("._multipleChoice").each(function() {
                var url = $(this).data("choiceurl");
                if (!url || url == "undefined") {
                    return;
                }
                var param = $(this).data("choiceparam");
                if (!param || param == "undefined") {
                    param = "";
                }
                var keysStr = $(this).data("keys");
                var keys = [];
                if (keysStr && keysStr != 'undefined') {
                    try {
                        keys = keysStr.toString().split(",");
                    } catch (e) {}
                }
                var prop = $(this).data("prop");
                var editable = $(this).data("editable");
                if (!editable || editable == "undefined") {
                    editable == "0";
                }
                editable = parseInt(editable);
                var _this = this;
                View.get(url, param, function(resp) {
                    if (resp) {
                        $(_this).html("");
                        for (var i = 0; i < resp.length; i++) {
                            if (editable > 1) {
                                if ($.inArray(resp[i].key, keys) > -1) {
                                    $(_this).append('<input disabled type="checkbox" name="' + prop + '-|-' + resp[i].key + '" checked title="' + resp[i].value + '" lay-skin="primary">');
                                } else {
                                    $(_this).append('<input disabled type="checkbox" name="' + prop + '-|-' + resp[i].key + '" title="' + resp[i].value + '" lay-skin="primary">');
                                }
                            } else {
                                if ($.inArray(resp[i].key, keys) > -1) {
                                    $(_this).append('<input type="checkbox" name="' + prop + '-|-' + resp[i].key + '" checked title="' + resp[i].value + '" lay-skin="primary">');
                                } else {
                                    $(_this).append('<input type="checkbox" name="' + prop + '-|-' + resp[i].key + '" title="' + resp[i].value + '" lay-skin="primary">');
                                }
                            }
                        }
                        layui.form.render();
                    }
                }, function() {});
            });
        }, 500);
        $(top.window).scrollTop(0);
        $(parent.document).find('.layer-iframe-js').css({
            "min-height": "100%"
        });
        $("._box").find("input[data-type='date'],input[date-type='datetime']").each(function(){
    		var type = $(this).data("type");
    		var opt = {
    			elem : this
    		};
    		if(type == 'datetime'){
    			opt.type = 'datetime';
    		}
    		layui.laydate.render(opt);
    	});
    },
    pagesOnload: function(_tbTmpl) {
        // $("#page_count").change(function () {
        //     TmplUtils.pageSize = $("#page_count").val()
        //     tbTmpl.refresh("pindex=0"+"&pcount="+pageSize +searchParam);
        //     TmplUtils.closePreview();
        // })
        var form = layui.form;
        form.on('select(pageSelect)', function(data) {
            TmplUtils.pageSize = data.value;
            TmplUtils.currPage = 1;
            if (_tbTmpl) {
                _tbTmpl.refresh("pindex=0" + "&pcount=" + TmplUtils.pageSize + TmplUtils.searchParam);
            }
            TmplUtils.closePreview();
        });
    },
    showMsgSuccess: function(str) {
        var layer = layui.layer;
        top.layer.msg(str, {
            icon: 6
        });
    },
    showMsgFail: function(str) {
        var layer = layui.layer;
        top.layer.msg(str, {
            icon: 5
        });
    },
    showConfirm: function(str, ok, cancel, okCallback, cancelCallback) {
        var layer = top.layui.layer;
        layer.confirm(str, {
            btn: [ok, cancel] //按钮
        }, function() {
            okCallback.call(this);
        }, function() {
            cancelCallback.call(this);
        });
    },
    check: function(formId) {
        var formObj = document.getElementById(formId);
        var fobj = Utils.formToObj(formId);
        var reg = /^[0-9]+.?[0-9]*$/;
        if (formObj) {
            var elementsObj = formObj.elements;
            var obj;
            var ff;
            if (elementsObj) {
                for (var i = 0; i < elementsObj.length; i += 1) {
                    obj = elementsObj[i];
                    var value = obj.value;
                    if (value) {
                        value = value.replace("--##--", "");
                    }
                    var verifys = [];
                    if ($(obj).data("verifyfun") && $(obj).data("verifyfun") != "undefined") {
                        for (var key in fobj) {
                            if ($(obj).data("verifyfun").indexOf("$" + key) > 0) {
                                var val;
                                if (reg.test(fobj[key]) && fobj[key].type == "int") {
                                    val = fobj[key];
                                } else {
                                    val = '"' + fobj[key] + '"';
                                }
                                ff = $(obj).data("verifyfun");
                                ff = ff.replace("$" + key, val);
                                try {
                                    var fun = new Function(ff);
                                    verifys = fun().split(",");
                                } catch (e) {

                                }
                            }
                        }
                    }
                    if ($(obj).data("verify")) {
                        var ver = $(obj).data("verify").split(',');
                        for (var j = 0; j < ver.length; j++) {
                            verifys.push(ver[j]);
                        }
                    }
                    for (var j = 0; j < verifys.length; j++) {
                        thisVer = verifys[j];
                        if (TmplUtils.verify[thisVer]) {
                            var isFn = typeof TmplUtils.verify[thisVer] === 'function';
                            var tips = "";
                            if (TmplUtils.verify[thisVer] && (isFn ? tips = TmplUtils.verify[thisVer](value, $(obj).data("len")) : !TmplUtils.verify[thisVer][0].test(value))) {
                                if (tips) {
                                    TmplUtils.showMsgFail($(obj).data("alias") + tips);
                                } else {
                                    TmplUtils.showMsgFail($(obj).data("alias") + TmplUtils.verify[thisVer][1]);
                                }
                                /*            if($(obj).parent("div").parent("div").parent("div")){
                                 $(obj).parent("div").parent("div").parent("div").parent("div").addClass("layui-show");
                                 }*/
                                if ($(obj).parent("div").parent("div").parent("div").parent("div")) {
                                    $(obj).parent("div").parent("div").parent("div").parent("div").addClass("layui-show");
                                }
                                if (obj.tagName == "SELECT") {
                                    $(obj).next("div").find("input").removeAttr("readonly");
                                    $(obj).next("div").find("input").focus();
                                    $(obj).next("div").find("input").attr("readonly", true);
                                } else {
                                    $(obj).focus();
                                }
                                $(obj).addClass('layui-form-danger');
                                return false;
                            }
                        }
                    }
                }
                var forms = formObj.getElementsByTagName("form");
                for (var i = 0; i < forms.length; i++) {
                    if (!TmplUtils.check($(forms[i]).attr("id"))) {
                        return false;
                    }
                }
            } else {
                return true;
            }
        } else {
            return true;
        }
        return true;
    },
    pagesOnBind: function(attrs, param, dependTmpl) {
        tmpl = this;
        TmplUtils.pageTmpl = tmpl;
        var _this = this;
        var dependTmpl = View.getTmpl(dependTmpl);
        if (null == TmplUtils.totalPages || undefined == TmplUtils.totalPages  ||  TmplUtils.totalPages < 0) {
            return;
        }
        tmpl.bind(function(callback) {
            callback.call(_this, {});
            var laypage = layui.laypage;
            laypage.render({
            	elem: 'laypage',
            	count: TmplUtils.totalCount,
            	groups : 5,
                limit : TmplUtils.pageSize,
                curr: TmplUtils.currPage,
                jump: function(obj, first) {
                    if (!first) {
                        TmplUtils.currPage = obj.curr;
                        dependTmpl.refresh("pindex=" + (obj.curr - 1) + "&pcount=" + TmplUtils.pageSize + TmplUtils.searchParam);
                        TmplUtils.closePreview();
                    }
                }
            });
            //加载选择页数下拉框切换事件
            TmplUtils.pagesOnload(dependTmpl);
        })
    },
    rollingDown: function() {
        if (document.getElementsByTagName("iframe")[0]) {
            $(document.getElementsByTagName("iframe")[0].contentWindow.document).find(".layui-btn-div").css("top", $(parent.window).scrollTop() - 127);
        }

    },
    roll: function() {
        if (document.getElementsByTagName("iframe")[0]) {
            $(document.getElementsByTagName("iframe")[0].contentWindow.document).find(".layui-btn-div").css("top", 0);
        }
    },
    layuiSelectOptionMouseOver: function() {
        $(".layui-form-select dd").mouseover(function() {
            if ($(this).html().length > 15) {
                layer.tips($(this).html(), $(this), {
                    tips: [1, '#08c'], // 还可配置颜色
                    time: 3000
                });
            }
        });
    },
    _getTableTdConfig: function(data) {
        var tableTdConfig = {};
        tableTdConfig.cellCount = data.cellCount || Const.cellCount;
        tableTdConfig.cellLeftCount = !!Const.cellLeftCount ? Const.cellLeftCount : 4;
        tableTdConfig.cellRightCount = !!Const.cellRightCount ? Const.cellRightCount : 3;
        tableTdConfig.cellLeftCount = !!data.cellLeftCount ? data.cellLeftCount : tableTdConfig.cellLeftCount;
        tableTdConfig.cellRightCount = !!data.cellRightCount ? data.cellRightCount : tableTdConfig.cellRightCount;
        tableTdConfig.totalCellLeftCount = tableTdConfig.cellLeftCount;
        tableTdConfig.totalCellRightCount = tableTdConfig.cellRightCount;
        //是否需要全选checkbox
        tableTdConfig.tdLeftWidthList = [];
        tableTdConfig.tdRightWidthList = [];
        if (data.hasCheckbox) {
            tableTdConfig.totalCellLeftCount++;
            tableTdConfig.tdLeftWidthList.push(5);
        }
        //是否有操作列
        if (data.hasOperation) {
            tableTdConfig.totalCellLeftCount++;
            if (data.operationWidth) {
                tableTdConfig.tdLeftWidthList.push(data.operationWidth)
            } else {
                tableTdConfig.tdLeftWidthList.push(20);
            }
        }

        if (!data.tdLeftWidth) {
            data.tdLeftWidth = [];
            tableTdConfig.hasLeftWidth = 0;
        } else {
            tableTdConfig.hasLeftWidth = 1;
        }
        for (var i = 0; i < tableTdConfig.cellLeftCount; i++) {
            if (i < data.attrs.length) {
                if (i < data.tdLeftWidth.length) {
                    tableTdConfig.tdLeftWidthList.push(data.tdLeftWidth[i]);
                } else {
                    tableTdConfig.tdLeftWidthList.push(20);
                }
            }
        }
        if (!data.tdRightWidth) {
            data.tdRightWidth = [];
            tableTdConfig.hasRightWidth = 0;
        } else {
            tableTdConfig.hasRightWidth = 1;
        }
        for (var i = 0; i < tableTdConfig.cellRightCount; i++) {
            if (i + tableTdConfig.cellLeftCount < data.attrs.length) {
                if (i < data.tdRightWidth.length) {
                    tableTdConfig.tdRightWidthList.push(data.tdRightWidth[i]);
                } else {
                    tableTdConfig.tdRightWidthList.push(20);
                }
            }
        }
        tableTdConfig.hasRight = false;
        if (tableTdConfig.cellLeftCount + 1 < data.attrs.length) {
            tableTdConfig.hasRight = true;
            if (tableTdConfig.cellLeftCount + tableTdConfig.cellRightCount > data.attrs.length) {
                tableTdConfig.cellRightCount = data.attrs.length - tableTdConfig.cellLeftCount;
                tableTdConfig.totalCellRightCount = tableTdConfig.cellRightCount;
            }
        } else if (tableTdConfig.cellLeftCount + 1 == data.attrs.length) {
            tableTdConfig.cellLeftCount++;
            tableTdConfig.totalCellLeftCount++;
            data.tdLeftWidth.push(data.tdRightWidth[0]);
        } else {
            var comp = tableTdConfig.totalCellLeftCount - tableTdConfig.cellLeftCount;
            tableTdConfig.cellLeftCount = data.attrs.length;
            tableTdConfig.totalCellLeftCount = comp + tableTdConfig.cellLeftCount;
        }
        return tableTdConfig;
    },

    _getPropValue: function(itemStr, prop) {
        var fun = new Function("return " + itemStr + "." + prop + ";");
        var propValue = "";
        try {
            propValue = fun();
        } catch (e) {}
        if (null == propValue || undefined == propValue || propValue == "null" || propValue == "undefined") {
            return "";
        }
        return propValue;
    },

    _addMultipleString: function(_this, name) {
        var htmlStr = '<div class="layui-form-item multipleStringInfo"> <input type="text" name="' + name + '-|-' + Math.ceil(Math.random() * 10000) + '"  autocomplete="off" placeholder="" class="layui-input"> <span class="multipleString" onclick="TmplUtils._removeMultipleString(this);"><i class="layui-icon">&#xe640;</i></span> </div>';
        $(_this).after(htmlStr);
    },
    _removeMultipleString: function(_this) {
        $(_this).parent(".multipleStringInfo").remove();
    },
    _addMultipleEnum: function(name) {
        var val = $("select[name=" + name + "_me]").val();
        if (!val || val == "--##--") {
            TmplUtils.showMsgFail("请选择一个选项");
            return;
        }
        var text = $("select[name=" + name + "_me]").find("option:selected").text();
        var htmlStr = ' <li> <input name="' + name + '-|-' + Math.ceil(Math.random() * 10000) + '" data-type="multipleEnum"  data-key="' + val + '" value="' + text + '"/> <i class="layui-icon" title="删除" onclick="TmplUtils._removeMultipleEnum(this);">&#xe640;</i> </li>';
        $("ul[name=" + name + "]").append(htmlStr);
    },
    _removeMultipleEnum: function(_this) {
        $(_this).parent("li").remove();
    },
    getThData : function(d){
    	var data = {};
    	data.row = 1;
    	data.col = d.index;
    	if(d.index == 1 && d.data.hasCheckbox){
    		data.html = '<input type="checkbox" name="" lay-skin="primary" lay-filter="allChoose">';
    		data.json = JSON.stringify({
    			field:"id", 
    			checkbox : true
    		});
    	}else if(d.last && d.data.hasOperation){
    		data.isOperColumn = true;
    		data.html = "操作";
    		data.json = JSON.stringify({
    			field : "operation",
    			fixed:'right'
    		});
    	}else{
    		var offset = 1;
    		if(d.data.hasCheckbox){
    			offset = 2;
    		}
    		var attr = d.data.attrs[d.index - offset];
    		data.html = attr.alias;
    		var opt = {
    			field : attr.prop.indexOf(".") == -1 ? attr.prop : attr.prop.replace(/\./g,"-"),
    			prop : attr.prop
    		};
    		if(attr.sort == 1){
    			opt.sort = true;
    		}
    		data.json = JSON.stringify(opt);
    	}
    	this._tdBeforeFill(d.data,data);
    	return data;
    },
    getTrHtml : function(d){
    	var _this = this;
    	var data = {};
    	data.row = d.row;
    	data.item = d.item;
    	data.col = d.index;
    	if(d.index == 1 && d.data.hasCheckbox){
    		data.html = d.item.id;
    		_this._tdBeforeFill(d.data,data);
    	}else if(d.last && d.data.hasOperation){
    		data.html = '';
    		data.isOperColumn = true;
    		layui.each(d.data.operations, function(index, operation){
				data.html += "<a href='javascript:' onclick='{0}' title='{1}'><i class='{2}'></i></a></a> ".format(operation.onclick +"("+ d.item.id +")",operation.value,operation["class"]);
			});
    		_this._tdBeforeFill(d.data,data);
    		if(!!d.data.trClick && d.data.trClick != ''){
    			var itemStr = B64.encode(JSON.stringify(d.item));
    			data.html += "<a href='javascript:' onclick='{0}' title='预览'><i class='iconfont icon-yulan ico-shrink'></i></a>".format('TmplUtils._preCall("'+ itemStr +'","'+ d.data.trClick +'")');
    		}
    	}else{
    		var offset = 1;
    		if(d.data.hasCheckbox){
    			offset = 2;
    		}
    		data.html = this._getItemValue(d.data.attrs[d.index - offset],d.item,d.data);
    		data.prop = d.data.attrs[d.index - offset].prop;
    		_this._tdBeforeFill(d.data,data);
    	}
    	return data.html;
    },
    _getItemValue : function(attr,item,d){
    	var propValue = this._getPropValue(JSON.stringify(item),attr.prop);
    	if (attr.type == "string"){
    		return propValue;
    	}else if (attr.type == 'date'){
    		return Utils.getDate(propValue);
    	}else if (attr.type == "enum" && !attr.enum_url){
    		if(attr.dict_key){
    			var keys = attr.dict_key.split(".");
    			return TmplUtils.__getEnumVal(d.enums,keys[0],keys[1],propValue);
    		}else{
    			return TmplUtils.__getEnumVal(d.enums,d.table,attr.prop,propValue);
    		}
    	}else if (attr.type == 'money'){
    		return Utils.numberToMoney(propValue,attr.digit);
    	}else if (attr.type == "enum" && attr.enum_url){
    		return '<span class="_enumurl" data-enumurl="'+attr.enum_url+ '" data-enumparam="'+attr.enum_param+  '" data-key="'+propValue+'" data-prop="'+attr.prop+'"></span>';
    	}else if (attr.type == "enumLink"){
    		var enumUrls = attr.enum_urls.split(',');
            var values = [];
            var value = '';
            if(propValue){
                values = propValue.split(",");
            }
            for(var k=0;k< enumUrls.length;k++){
                value += '<span class="_enumurl" data-enumurl="'+enumUrls[k]+ '" data-enumparam="'+attr.enum_param+  '" data-key="'+values[k]+'" data-prop="'+attr.prop+ '_'+k+'"></span>';
            }
            return value;
    	}else if (attr.type == 'multipleChoice'){
    		return '<span class="_multipleChoice" data-choiceurl="'+attr.choice_url+ '" data-choiceparam="'+attr.choice_param+  '" data-keys="'+propValue+'" data-prop="'+attr.prop+'"></span>';
    	}else if (attr.type == 'datetime'){
    		return Utils.getDatetime(propValue);
    	}else if (attr.type == "time"){
    		return Utils.getTime(propValue);
    	}else{
    		return propValue;
    	}
    },
    _tdBeforeFill : function(d,data){
    	if(d.tdBeforeFill){																											
    		data.html = d.tdBeforeFill(data);
    	}
    },
    getUnTableHiddenAttrs : function(d){
    	var tempAttrs = [];
    	for(var i=0; i<d.attrs.length ; i++){
    	    if(d.attrs[i].hidden && d.attrs[i].hidden.indexOf('table') > -1){
    	    }else{
    	        tempAttrs.push(d.attrs[i]);
    	    }
    	}
    	return tempAttrs;
    },
    _getFilterCiterias:function (d) {
        var criterias = [];
        for(var i=0; i<d.attrs.length; i++){
            if(d.attrs[i].query && d.attrs[i].query == 1){
                criterias.push(d.attrs[i]);
            }
        }
        criterias.sort(Utils.compare("query_order"));
        return criterias;
    },
    _getFilterHtml: function (d,item) {
        var html = '<div class="layui-input-inline layui-input-wd">';
        if(item.type == "date" || item.type == 'datetime'){
            html = html + '<input type="text" name="{0}" data-type="{1}" placeholder="{2}"  data-desc="{3}" data-call="{4}" autocomplete="off" class="layui-input _query">'.format(item.prop,item.type,item.alias,item.desc?item.desc:'',d.dateChangeCall ? d.dateChangeCall : '');
        }else if(item.type == "enum"){
            html = html +
                '<select name="'+item.prop+'" class="_query" lay-filter="' +item.prop + '" data-desc="' + (item.desc?item.desc:'') + '" ';
                if(1==item.enum_search) {
                    html = html + 'lay-search ';
                }
            html = html +
                'data-enumurl="'+ item.enum_url  + '" data-enumparam="' + item.enum_param +'" data-type="'+item.type+'" data-prop="'+item.prop+'"> '+
                '<option value="--##--">--'+item.alias+'--</option>';
            var keyVals = [];
            if(item.dict_key){
                keyVals = TmplUtils.__getEnumKeyVals(d.enums,item.dict_key.split('.')[0],item.dict_key.split('.')[1]);
            }else{
                keyVals = TmplUtils.__getEnumKeyVals(d.enums,d.table,item.prop);
            }
            layui.each(keyVals, function(index, keyVal){
                html = html + '<option value="' +keyVal.key +'">'+keyVal.val+'</option>';
            });
            html = html + '</select>';
        }else{
            html = html + '<input type="text" name="{0}" data-type="{1}" placeholder="{2}" data-desc="{3}" autocomplete="off" class="layui-input _query">'.format(item.prop,item.type,item.alias,item.desc?item.desc:'');
        }
        html = html + '</div>';
        return html;
    },
    _preCall : function(itemStr,callbackName){
    	var item = JSON.parse(B64.decode(itemStr));
    	TmplUtils.__tablePreviewOpen(item.id);
    	window[callbackName].call(window,item);
    }
}
$(document).bind('click', function(e) {
    $(".layui-layer-tips").each(function() {
        if ($(this).attr('showtime') < 5000) {
            $(this).hide();
        }
    });
    $(".layui-table-tips").show();
    if (e.target.tagName == "INPUT" && $(e.target).val().indexOf("请选择") > 0) {
        $(e.target).val("");
    }
});

$(function(){
	$(window).resize(function(){
		$(".layui-table-tips").hide(); 
		if(TmplUtils._isResize){
			return;
		}
		TmplUtils._isResize = 1;
		setTimeout('TmplUtils._resizeTable()', 200);
	});
});
