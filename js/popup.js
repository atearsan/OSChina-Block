/**
 * 
 * 
 * @author  github.com/liuxey
 * @date 2016-04-08
 */

$("#clearBlock").on("click", function(){
	chrome.storage.sync.set({
		"oscblock":[]
	})
})