function downExcel(fileName, jsonStr) {
	var excelIo = new GC.Spread.Excel.IO();
	excelIo.save(jsonStr, function(blob) {
		saveAs(blob, fileName + ".xlsx");
	}, function(e) {
		console.info(e);
	});
}

function showErrorExcel(msg) {
	var jsonStr1 = msg;
	if (document.getElementById("ss").innerHTML != "") {
		document.getElementById("ss").innerHTML = ""
	}
	jsonStr1 = jsonStr1.split("\\\"").join("\"");
	jsonStr1 = jsonStr1.split("\\\\").join("\\");
	var spread = new GC.Spread.Sheets.Workbook(document.getElementById("ss"), {
		sheetCount : 1
	});
	spread.fromJSON(JSON.parse(jsonStr1));
	// 报表禁止在线编辑
	var sheet = spread.getActiveSheet();
	spread.suspendPaint();
	sheet.getRange(0, 0, sheet.getRowCount(), sheet.getColumnCount()).locked(
			true);
	sheet.options.isProtected = true;
	// 不显示新增sheet的按钮
	spread.options.newTabVisible = false;
	sheet.options.protectionOptions = {
		allowResizeRows : true,
		allowResizeColumns : true,
		allowSort : false
	};
	spread.resumePaint();
	document.getElementById("ss").style.border = "solid 1px";
	document.getElementById("desc").style.display = "block";
	var theUA = window.navigator.userAgent.toLowerCase();
	if ((theUA.match(/msie\s\d+/) && theUA.match(/msie\s\d+/)[0])
			|| (theUA.match(/trident\s?\d+/) && theUA.match(/trident\s?\d+/)[0])) {
		var ieVersion = theUA.match(/msie\s\d+/)[0].match(/\d+/)[0]
				|| theUA.match(/trident\s?\d+/)[0];
		if (ieVersion < 10) {
			document.getElementById("error2").style.display = "block";
			return;
		}
	}
	document.getElementById("error").style.display = "block";
	$("#downLoadError").click(function() {
		var myDate = new Date().format("yyyy/MM/dddd");
		var inner = $("#downLoad").html();

		downExcel("个人账户异常数据" + myDate, jsonStr1);
	});
}

function downloadExcel(url) {
	layer.open({
		title : '请选择导出数据交易状态',
		type : 2,
		area: ['auto', '55%'],
		content : [ '../exportExcelCheckbox.html', 'no' ],
		btn : [ '导出', '取消' ],
		yes : function(index, layero) {
			layer.close(index);
			var wait = layer.load();
			var body = layer.getChildFrame('body', index); // 巧妙的地方在这里哦
			var chk_value = [];
			body.contents().find('input[name="jyzt"]:checked').each(function() {
				chk_value.push(this.value);
			});
			if (chk_value.length == 0) {
				layer.close(wait);
				layer.alert('你还没有选择任何内容！', {
					icon : 5
				});
			} else {
				var value = JSON.stringify(chk_value).substring(1,JSON.stringify(chk_value).length - 1).replace(/"/g, "");
				location.href = url + "?value=" + value + "&Auth=" + View.TOKEN;
				layer.close(wait); // 如果设定了yes回调，需进行手工关闭
				// TmplUtils.showMsgSuccess('Excel文件导出成功！');
			}
		}
	});
}

function downloadExcels(url, tableName,value) {
	location.href = url + "?"+value+"&Auth="+ View.TOKEN;
}


function downloadExcelModel(url, link) {
	link.attr("href", url + "?Auth=" + View.TOKEN);
}
function checkData(fileDir) {
	var suffix = fileDir.substr(fileDir.lastIndexOf("."));
	if ("" == fileDir) {
		layer.alert("选择需要导入的Excel文件！");
		return false;
	}
	if (".xls" != suffix && ".xlsx" != suffix) {
		layer.alert("选择Excel格式的文件导入！");
		return false;
	}
	return true;
}
//判断是否是txt文件
function checkData_txt(fileDir) {
	var suffix = fileDir.substr(fileDir.lastIndexOf("."));
	if ("" == fileDir) {
		layer.alert("选择需要导入的TXT文件！");
		return false;
	}
	if (".txt" != suffix) {
		layer.alert("选择TXT格式的文件导入！");
		return false;
	}
	return true;
}
function uploadFile(url, fileDir) {
	if (!checkData(fileDir)) {
		return;
	}
	var wait = layer.load();
	$('#addMore')
			.ajaxSubmit(
					{
						type : 'post',
						url : url + "&Auth=" + View.TOKEN,
						dataType : 'json',
						success : function(resp) {
							console.info(resp);
							layer.close(wait);
							
								TmplUtils.showMsgSuccess(resp.data);
								parent.tbTmpl.refresh("pindex="
										+ (parent.TmplUtils.currPage - 1)
										+ "&pcount=" + TmplUtils.pageSize
										+ TmplUtils.searchParam);
								parent.previewTmpl.refresh();
								var index = parent.layer
										.getFrameIndex(window.name); // 获取窗口索引
								parent.layer.close(index);
							
						},
						error : function(code) {
							console.info(code);
							layer.close(wait);
							TmplUtils.showMsgFail('导入失败');
						}
					});

}
function uploadExcel(url, fileDir) {
	if (!checkData(fileDir)) {
		return;
	}
	var wait = layer.load();
	$('#addMore')
			.ajaxSubmit(
					{
						type : 'post',
						url : url + "&Auth=" + View.TOKEN,
						dataType : 'json',
						success : function(resp) {
							layer.close(wait);
							if (resp.code != CodeDef.success) {
								var jsonStr1 = resp.data;
								if (jsonStr1.length < 150) {
									layer.alert(resp.data, {
										icon : 5
									});
									parent.tableTmpl.refresh("pindex=" + (parent.TmplUtils.currPage - 1)
											+ "&pcount=" + parent.TmplUtils.pageSize
											+ parent.TmplUtils.searchParam);
								} else {
									if(document.getElementById("ss").innerHTML!=""){
										document.getElementById("ss").innerHTML=""
									}
									/*document.getElementById("ss").innerHTML = null;*/
									jsonStr1 = jsonStr1.substring(1,
											jsonStr1.length - 1);
									jsonStr1 = jsonStr1.split("\\\"")
											.join("\"");
									jsonStr1 = jsonStr1.split("\\\\")
											.join("\\");
									var spread = new GC.Spread.Sheets.Workbook(
											document.getElementById("ss"), {
												sheetCount : 1
											});
									spread.fromJSON(JSON.parse(jsonStr1));
									// 报表禁止在线编辑
									var sheet = spread.getActiveSheet();
									spread.suspendPaint();
									sheet.getRange(0, 0, sheet.getRowCount(),
											sheet.getColumnCount())
											.locked(true);
									sheet.options.isProtected = true;
									// 不显示新增sheet的按钮
									spread.options.newTabVisible = false;
									sheet.options.protectionOptions = {
										allowResizeRows : true,
										allowResizeColumns : true,
										allowSort : false
									};
									spread.resumePaint();
									document.getElementById("ss").style.border = "solid 1px";
									document.getElementById("desc").style.display = "block";
									var theUA = window.navigator.userAgent.toLowerCase();
								    if ((theUA.match(/msie\s\d+/) && theUA.match(/msie\s\d+/)[0]) || (theUA.match(/trident\s?\d+/) && theUA.match(/trident\s?\d+/)[0])) {
								        var ieVersion = theUA.match(/msie\s\d+/)[0].match(/\d+/)[0] || theUA.match(/trident\s?\d+/)[0];
								        if (ieVersion < 10) {
								        	document.getElementById("error2").style.display = "block";
								        	return;
								        }
								    }
								    document.getElementById("error").style.display = "block";
						        	$("#downLoadError").click(
											function() {
												var myDate = new Date().format("yyyy/MM/dddd");
												var inner = $("#downLoad")
														.html();
												var name = inner.substring(
														inner.indexOf("《") + 1,
														inner.indexOf("."));
												
												downExcel(name + "异常数据"
														+ myDate, jsonStr1);
											})
									parent.tableTmpl.refresh("pindex=" + (parent.TmplUtils.currPage - 1)
											+ "&pcount=" + parent.TmplUtils.pageSize
											+ parent.TmplUtils.searchParam);
								}
							} else {
								TmplUtils.showMsgSuccess(resp.data.replace(/\"/g,""));
								parent.tableTmpl.refresh("pindex=" + (parent.TmplUtils.currPage - 1)
										+ "&pcount=" + parent.TmplUtils.pageSize
										+ parent.TmplUtils.searchParam);
								var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
								parent.layer.close(index);
							}
							
						},
						error : function(code) {
							console.info(code);
							layer.close(wait);
							TmplUtils.showMsgFail('导入失败');
						}
					});

}