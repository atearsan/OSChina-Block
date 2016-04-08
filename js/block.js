/**
 * 
 * 
 * @author  github.com/liuxey
 * @date 2016-04-08
 */

var url = document.location.href;
var OSC_BLOCK_LIST_NAME = "oscblock";


if (url.indexOf("my.oschina.net") != -1) {
	handleHomePage();

} else if (url.indexOf("oschina.net/news/") != -1) {
	handleNews();

} else if (url.indexOf("oschina.net/question/") != -1) {
	handleQuestion();

} else if (url.indexOf("oschina.net/translate/") != -1) {
	handleTranslate();

} else if (location.pathname == "/question") {
	handleQuestionList();

} else if (location.pathname == "/") {
	handleIndex()
}

function handleHomePage() {
	var operationSpan = $("#OSC_Content .Owner .U .opts span");
	var userId = operationSpan.attr("id").split("_")[2];
	if (operationSpan.text().indexOf("关注此人") != -1) {
		chrome.storage.sync.get(OSC_BLOCK_LIST_NAME, function(result){
			result = result[OSC_BLOCK_LIST_NAME] || [];

			// query if blocked
			if (("_" + result.join("_") + "_").indexOf("_" + userId + "_") == -1) {
				operationSpan.append('&nbsp;<a href="javascript:;" id="oscblock_block" _userId="'+userId+'">屏蔽此人</a>');
				$("#oscblock_block").on("click", function(){
					if (confirm("用【OSChina Block】屏蔽\""+$("#OSC_Content .Owner .U .Name").html()+"\"？")) {
						block($(this).attr("_userId"));
					}
				});
			} else {
				operationSpan.html('<a href="javascript:;" id="oscblock_unblock" _userId="'+userId+'">取消屏蔽</a>');
				$("#oscblock_unblock").on("click", function(){
					unblock($(this).attr("_userId"));
				});
			}
		})
	}
}

function handleNews() {
	chrome.storage.sync.get(OSC_BLOCK_LIST_NAME, function(result){
		result = result[OSC_BLOCK_LIST_NAME] || [];
		var blockUserIdString = "_" + result.join("_") + "_";
		if (result.length > 0) {
			$("#userComments ul:first li").each(function(index, el){
				var _userId = $(el).find("img.SmallPortrait").attr("user");
				if (_userId != "" && blockUserIdString.indexOf("_" + _userId + "_") != -1) {
					$(el).remove();
				}
			});
		}
	})
}

function handleQuestion() {
	chrome.storage.sync.get(OSC_BLOCK_LIST_NAME, function(result){
		result = result[OSC_BLOCK_LIST_NAME] || [];
		var blockUserIdString = "_" + result.join("_") + "_";
		if (result.length > 0) {
			$(".QuestionReplies li.Answer").each(function(index, el){
				var _userId = $(el).find(".user .user_img img.SmallPortrait").attr("user");
				console.log(_userId);
				if (_userId != "" && blockUserIdString.indexOf("_" + _userId + "_") != -1) {
					$(el).prev().remove();
					$(el).next().remove();
					$(el).remove();
				}
			});
		}
	})
}

function handleQuestionList() {
	chrome.storage.sync.get(OSC_BLOCK_LIST_NAME, function(result){
		result = result[OSC_BLOCK_LIST_NAME] || [];
		var blockUserIdString = "_" + result.join("_") + "_";
		$(".question-list .list .question").each(function(idnex, el) {
			var _userId = $(el).find(".question-detail .author img.SmallPortrait").attr("user");
			if (_userId != "" && blockUserIdString.indexOf("_" + _userId + "_") != -1) {
				$(el).remove();
			}
		})
	});
	
}

function handleTranslate() {
	chrome.storage.sync.get(OSC_BLOCK_LIST_NAME, function(result){
		result = result[OSC_BLOCK_LIST_NAME] || [];
		var blockUserIdString = "_" + result.join("_") + "_";
		if (result.length > 0) {
			$(".comment").each(function(index, el){
				var _userId = $(el).find("img.SmallPortrait").attr("user");
				if (_userId != "" && blockUserIdString.indexOf("_" + _userId + "_") != -1) {
					$(el).remove();
				}
			});
		}
	})
}

function handleIndex() {
	chrome.storage.sync.get(OSC_BLOCK_LIST_NAME, function(result){
		result = result[OSC_BLOCK_LIST_NAME] || [];
		var blockUserIdString = "_" + result.join("_") + "_";

		$("#q_list_1 tr").each(function(idnex, el) {
			var href = $(el).find("a").attr("href");
			var _userId = href.substring(href.lastIndexOf("/") + 1, href.indexOf("_"));
			if (_userId != "" && blockUserIdString.indexOf("_" + _userId + "_") != -1) {
				$(el).remove();
			}
		})
		$("#q_list_2 tr").each(function(idnex, el) {
			var href = $(el).find("a").attr("href");
			var _userId = href.substring(href.lastIndexOf("/") + 1, href.indexOf("_"));
			if (_userId != "" && blockUserIdString.indexOf("_" + _userId + "_") != -1) {
				$(el).remove();
			}
		})
		$("#q_list_3 tr").each(function(idnex, el) {
			var href = $(el).find("a").attr("href");
			var _userId = href.substring(href.lastIndexOf("/") + 1, href.indexOf("_"));
			if (_userId != "" && blockUserIdString.indexOf("_" + _userId + "_") != -1) {
				$(el).remove();
			}
		})
		$(document.getElementById("job_list_$ipage")).find("tr").each(function(idnex, el) {
			var href = $(el).find("a").attr("href");
			var _userId = href.substring(href.lastIndexOf("/") + 1, href.indexOf("_"));
			if (_userId != "" && blockUserIdString.indexOf("_" + _userId + "_") != -1) {
				$(el).remove();
			}
		})

		$(".HotTweets li").each(function(index, el){
			var _userId = $(el).find(".portrait img.SmallPortrait").attr("user");
			if (_userId != "" && blockUserIdString.indexOf("_" + _userId + "_") != -1) {
				$(el).remove();
			}
		})
		handleTweet();
		setInterval(handleTweet, 1500);
	});
}

function handleTweet() {
	chrome.storage.sync.get(OSC_BLOCK_LIST_NAME, function(result){
		result = result[OSC_BLOCK_LIST_NAME] || [];
		var blockUserIdString = "_" + result.join("_") + "_";

		$(".TopTweets li").each(function(index, el){
			var _userId = $(el).find(".portrait img.SmallPortrait").attr("user");
			if (_userId != "" && blockUserIdString.indexOf("_" + _userId + "_") != -1) {
				$(el).remove();
			}
		})
	});
}

function isBlock(userId, callback) {
	chrome.storage.sync.get(OSC_BLOCK_LIST_NAME, function(result){
		result = result[OSC_BLOCK_LIST_NAME] || [];
		for (var _userId in result) {
			if (result[_userId] == userId) {
				callback(true);
			}
		}
		callback(false);
	})
}

function block(userId) {
	chrome.storage.sync.get(OSC_BLOCK_LIST_NAME, function(result){
		result = result[OSC_BLOCK_LIST_NAME] || [];
		result.push(userId);

		chrome.storage.sync.set({
			"oscblock" : result
		}, function(){
			location.href=location.href;
		})
	})
}

function unblock(userId) {
	chrome.storage.sync.get(OSC_BLOCK_LIST_NAME, function(result){
		result = result[OSC_BLOCK_LIST_NAME] || [];
		var _result = [];
		for (var _userId in result) {
			if (result[_userId] != userId) {
				_result.push(result[_userId]);
			}
		}

		chrome.storage.sync.set({
			"oscblock" : _result
		}, function(){
			location.href=location.href;
		})
	})
}