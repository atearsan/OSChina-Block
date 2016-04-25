/**
 *
 *
 * @author  github.com/liuxey
 * @date 2016-04-08
 */

// initialize switch
chrome.storage.local.get(OSCB_STORAGE_KEY_SWITCH, function(result){ 
	if (typeof result[OSCB_STORAGE_KEY_SWITCH] == "undefined") {
		data = {};
		data[OSCB_STORAGE_KEY_SWITCH] = true;
		chrome.storage.local.set(data);
	}
})
