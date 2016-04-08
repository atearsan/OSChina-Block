/**
 * 
 * 
 * @author  github.com/liuxey
 * @date 2016-04-08
 */

// chrome.tabs.onCreated.addListener(function(tab){
// 	judgeInjection(tab);
// })

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
	console.log(new Date().getTime());
	console.log(changeInfo);
	if (tab.url.indexOf("oschina.net") != -1 && changeInfo.status == "loading") {
		chrome.tabs.executeScript(tabId, {
			file: "js/jquery.js",
			runAt: "document_start",
			allFrames: false
		}, function(){

		});

		chrome.tabs.executeScript(tabId, {
			file: "js/block.js",
			runAt: "document_end",
			allFrames: false
		}, function(){

		})
	}
})