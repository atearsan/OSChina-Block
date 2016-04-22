/**
 * 
 * 
 * @author  github.com/liuxey
 * @date 2016-04-22
 */

$(function(){

	var PATH_INDEX = "/";
	var PATH_NEWS = "/news/";
	var PATH_QUESTION = "/question/";
	var PATH_QUESTION_LIST = "/question";
	var PATH_TRANSLATE = "/translate/";

	var mapping = {};
	mapping[PATH_INDEX] = handleIndex;
	mapping[PATH_NEWS] = handleNews;
	mapping[PATH_QUESTION] = handleQuestion;
	mapping[PATH_QUESTION_LIST] = handleQuestionList;
	mapping[PATH_TRANSLATE] = handleTranslate;

	isOn(function(flag){
		if (flag) {
			var domain = document.domain;
			var pathname = location.pathname;
			if (domain == OSCB_DOMAIN_WWW) {
				$.each(mapping, function(prefix, handler){
					if (pathname.startsWith(prefix) && (typeof handler == "function")) {
						idList(handler);
					}
				});

			} else if (domain == OSCB_DOMAIN_USER) {
				handleUser();
			}
		}
	})

	function handleIndex(blockIdList) {
		var blockUserIdString = "_" + blockIdList.join("_") + "_";

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

		function handleTweet(blockIdList) {
			var blockUserIdString = "_" + blockIdList.join("_") + "_";

			$(".TopTweets li").each(function(index, el){
				var _userId = $(el).find(".portrait img.SmallPortrait").attr("user");
				if (_userId != "" && blockUserIdString.indexOf("_" + _userId + "_") != -1) {
					$(el).remove();
				}
			})
		}

		handleTweet(blockIdList);
		// setInterval(handleTweet, 1500);
		$(".TopTweets").on("DOMNodeInserted", function() {
			handleTweet(blockIdList);
		});
	}

	function handleNews(blockIdList) {
		var blockUserIdString = "_" + blockIdList.join("_") + "_";
		if (blockIdList.length > 0) {
			$("#userComments ul:first li").each(function(index, el){
				var _userId = $(el).find("img.SmallPortrait").attr("user");
				if (_userId != "" && blockUserIdString.indexOf("_" + _userId + "_") != -1) {
					$(el).remove();
				}
			});
		}
	}

	function handleQuestion(blockIdList) {
		var blockUserIdString = "_" + blockIdList.join("_") + "_";
		if (blockIdList.length > 0) {
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
	}

	function handleQuestionList(blockIdList) {
		var blockUserIdString = "_" + blockIdList.join("_") + "_";
		if (blockIdList.length > 0 ) {
			$(".question-list .list .question").each(function(idnex, el) {
				var _userId = $(el).find(".question-detail .author img.SmallPortrait").attr("user");
				if (_userId != "" && blockUserIdString.indexOf("_" + _userId + "_") != -1) {
					$(el).remove();
				}
			})
		}
	}

	function handleTranslate(blockIdList) {
		var blockUserIdString = "_" + blockIdList.join("_") + "_";
		if (blockIdList.length > 0) {
			$(".comment").each(function(index, el){
				var _userId = $(el).find("img.SmallPortrait").attr("user");
				if (_userId != "" && blockUserIdString.indexOf("_" + _userId + "_") != -1) {
					$(el).remove();
				}
			});
		}
	}

	function handleUser() {
		var operationSpan = $("#OSC_Content .Owner .U .opts span");
		var userId = operationSpan.attr("id").split("_")[2];
		if (operationSpan.text().indexOf("关注此人") != -1) {
			isBlock(userId, function(flag) {
				if (flag) {
					operationSpan.html('<a href="javascript:;" id="oscblock_unblock" _userId="'+userId+'">取消屏蔽</a>');
					$("#oscblock_unblock").on("click", function(){
						unblock($(this).attr("_userId"), function() {
							location.href = location.href;
						});
					});

				} else {
					operationSpan.append('&nbsp;<a href="javascript:;" id="oscblock_block" _userId="'+userId+'">屏蔽此人</a>');
					$("#oscblock_block").on("click", function(){
						var username = $("#OSC_Content .Owner .U .Name").html();
						if (confirm("用【OSChina Block】屏蔽\""+username+"\"？")) {
							block($(this).attr("_userId"), username, function() {
							location.href = location.href;
						});
						}
					});
				}
			});
		}
	}
})