/**
 * 
 * 
 * @author  github.com/liuxey
 * @date 2016-04-08
 */

$(function(){

	function reloadStatus() {
		chrome.storage.local.get(OSCB_STORAGE_KEY_SWITCH, function(result){
			var flag = result[OSCB_STORAGE_KEY_SWITCH];

			if (flag) {
				$('#btn-on').removeClass('btn-default').addClass('btn-success');
				$('#btn-off').removeClass('btn-success').addClass('btn-default');

			} else {
				$('#btn-off').removeClass('btn-default').addClass('btn-success');
				$('#btn-on').removeClass('btn-success').addClass('btn-default');
			}
		})
	}

	function updateStatus(flag) {
		data = {};
		data[OSCB_STORAGE_KEY_SWITCH] = flag;
		chrome.storage.local.set(data);
	}

	reloadStatus();

	$('#btn-option').on('click', function(){
		chrome.tabs.create({ url: 'html/options.html' });
	})

	$('#btn-on').on('click', function(){
		updateStatus(true);
		reloadStatus();
	})

	$('#btn-off').on('click', function(){
		updateStatus(false);
		reloadStatus();
	})
	
	$("#version-span").text(OSCB_VERSION);
})

