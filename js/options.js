/**
 * 
 * 
 * @author  github.com/liuxey
 * @date 2016-04-08
 */

$(function(){

	var pageSize = 15;
	var pageNo = 1;
	var filterKeyword = "";
	var blockList = [];

	$("#menu-list").on("click", function() {
		showBlockList();
	})

	$("#menu-about").on("click", function() {
		showAbout();
	})

	$("#clear-btn").on("click", function() {
		if (blockList.length > 0 && confirm("清空列表【" + blockList.length + "】条记录？")) {
			clear(init);
		}
	})

	function init() {
		list(function(_blockList){
			blockList = _blockList;
			render(pageNo, pageSize);	
		})
	}

	function formatDate(date) {
		var dateString = '';
		dateString += (date.getYear() + 1900) + '-';
		dateString += (date.getMonth() + 1) + "-";
		dateString += date.getDay() + " ";
		dateString += date.getHours() + ":";
		dateString += date.getMinutes() + ":";
		dateString += date.getSeconds();
		return dateString;
	}
	
	function render(pageNo, pageSize) {
		// todo 过滤和分页功能需要在撸一撸
		filterKeyword = $("#filter-keyword").val();
		var tableHtml = "";
		for (var i = 0; i < blockList.length; i++) {
			var item = blockList[i];
			tableHtml += '<tr><td>' + (i + 1) + '</td><td>' + formatDate(new Date(item[2])) +
			'</td><td>'+item[0]+
			'</td><td><a href="http://my.oschina.net/u/'+item[0]+'" target="_blank">'+item[1]+
			'</a></td><td><a href="javascript:;" userid="'+item[0]+'" class="oscb-list-cancel">取消屏蔽</a></td></tr>'
		}
		$("#oscb-list-body").html(tableHtml);
		$(".oscb-list-cancel").off("click").on("click", function(){
			if (confirm("嗯哼？")) {
				var _userId = $(this).attr("userId");
				unblock(_userId, function(){
					init();
				})
			}
		});
	}


	function showBlockList() {
		$(".options-main").hide();
		$("#oscb-list").fadeIn(200);
	}

	function showAbout() {
		$(".options-main").hide();
		$("#oscb-about").fadeIn(200);
	}


	init();
	showBlockList();
})