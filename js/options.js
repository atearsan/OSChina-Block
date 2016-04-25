/**
 * 
 * 
 * @author  github.com/liuxey
 * @date 2016-04-08
 */

$(function(){

	var pageSize = 15;
	var pageNo = 1;
	var totalPage = 1;
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
			render();	
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
	
	function render() {
		// todo 过滤和分页功能需要在撸一撸
		filterKeyword = $("#filter-keyword").val();

		var _blockList = [];
		if (filterKeyword && $.trim(filterKeyword) != "") {
			for (var i = 0; i < blockList.length; i++) {
				var _item = blockList[i];
				if (_item[1].indexOf(filterKeyword) != -1) {
					_blockList.push(_item);
				}
			}

		} else {
			_blockList = blockList;
		}

		var tableHtml = "";
		for (var i = 0; i < pageSize; i++) {
			var index = (pageNo - 1) * pageSize + i;
			if (index < _blockList.length) {
				var item = _blockList[index];
				tableHtml += '<tr><td>' + (index + 1) + '</td><td>' + formatDate(new Date(item[2])) +
				'</td><td>'+item[0]+
				'</td><td><a href="http://my.oschina.net/u/'+item[0]+'" target="_blank">'+item[1]+
				'</a></td><td><a href="javascript:;" userid="'+item[0]+'" class="oscb-list-cancel">取消屏蔽</a></td></tr>'
			}
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

		// pagination
		var pagination = $("#oscb-pagination");
		if (_blockList.length > 0) {
			totalPage = parseInt((_blockList.length + pageSize - 1) / pageSize);

			if (totalPage > 1) {
				var pageHtml = '';
				pageHtml += '<ul class="pagination">';
	        	pageHtml += '<li>';
	          	pageHtml += '<a aria-label="Previous" _page='+(pageNo - 1)+' class="page-btn">';
	            pageHtml += '<span aria-hidden="true">&laquo;</span>';
	          	pageHtml += '</a>';
	        	pageHtml += '</li>';
	       		for (var i = 1; i <= totalPage; i++) {
	       			if ( i == pageNo) {
						pageHtml += '<li class="active"><a _page='+i+' class="page-btn">'+i+'</a></li>';
	       			} else {
	       				pageHtml += '<li><a _page='+i+' class="page-btn">'+i+'</a></li>';
	       			}
	       		}
	        	pageHtml += '<li>';
	          	pageHtml += '<a aria-label="Next" _page='+(pageNo + 1)+' class="page-btn">';
	            pageHtml += '<span aria-hidden="true">&raquo;</span>';
	          	pageHtml += '</a>';
	        	pageHtml += '</li>';
	      		pageHtml += '</ul>';

	      		pagination.html(pageHtml).show();

	      		$(".page-btn").on("click", function(){
	      			var _pageNo = $(this).attr("_page");
	      			if (_pageNo >= 1 && _pageNo <= totalPage && _pageNo != pageNo) {
	      				pageNo = parseInt(_pageNo);
	      				render();
	      			}
	      		}).css("cursor", "pointer");

			} else {
				pagination.hide();
			}

		} else {
			pagination.hide();
		}
	}


	function showBlockList() {
		$(".options-main").hide();
		$("#oscb-list").fadeIn(200);
	}

	function showAbout() {
		$(".options-main").hide();
		$("#oscb-about").fadeIn(200);
	}

	$("#filter-keyword").on("keyup", function(event) {
		if (event.which == 13) {
			$("#filter-btn").click();
		}
	});
	$("#filter-btn").on("click", function() {
		pageNo = 1;
		render();
	})


	init();
	showBlockList();
	$("#version-span").text(OSCB_VERSION);
})