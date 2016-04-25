/**
 *
 *
 * @author  github.com/liuxey
 * @date 2016-04-21
 */
var OSCB_VERSION = "0.1.1";

var OSCB_DOMAIN_WWW = "www.oschina.net";

var OSCB_DOMAIN_USER = "my.oschina.net";

var OSCB_STORAGE_KEY_SWITCH = "oscb.switch";

var OSCB_STORAGE_KEY_BLOCK_LIST = "oscb.block.list";

function block(id, name, callback) {
	var item = [id, name, new Date().getTime()];
	callback = callback || function(){};


	chrome.storage.sync.get(OSCB_STORAGE_KEY_BLOCK_LIST, function(result){
		var list = result[OSCB_STORAGE_KEY_BLOCK_LIST] || [];

		var flag = true;
		for (var i = 0; i < list.length; i++) {
			if (list[i][0] == item[0]) {
				flag = false;
			} 
		}

		if (flag) {
			list.push(item);
			var data = {};
			data[OSCB_STORAGE_KEY_BLOCK_LIST] = list;
			chrome.storage.sync.set(data, function(){
				callback(flag);				
			})

		} else {
			callback(flag)
		}
	});
}

function idList(callback) {
	callback = callback || function(){};
	chrome.storage.sync.get(OSCB_STORAGE_KEY_BLOCK_LIST, function(result){
		var list = result[OSCB_STORAGE_KEY_BLOCK_LIST] || [];

		var idList = [];

		for (var i = 0 ; i < list.length; i++) {
			idList.push(list[i][0]);
		}

		callback(idList);
	});
}

function list(callback) {
	callback = callback || function(){};
	chrome.storage.sync.get(OSCB_STORAGE_KEY_BLOCK_LIST, function(result){
		var list = result[OSCB_STORAGE_KEY_BLOCK_LIST] || [];

		callback(list);
	});
}

function isBlock(id, callback) {
	callback = callback || function(){};

	chrome.storage.sync.get(OSCB_STORAGE_KEY_BLOCK_LIST, function(result){
		var list = result[OSCB_STORAGE_KEY_BLOCK_LIST] || [];

		var flag = false;
		for (var i = 0; i < list.length; i++) {
			if (list[i][0] == id) {
				flag = true;
			} 
		}

		callback(flag);
	});
}

function unblock(id, callback) {
	callback = callback || function(){};

	chrome.storage.sync.get(OSCB_STORAGE_KEY_BLOCK_LIST, function(result){
		var list = result[OSCB_STORAGE_KEY_BLOCK_LIST] || [];
		var _list = [];

		for (var i = 0; i < list.length; i++) {
			if (list[i][0] != id) {
				_list.push(list[i]);
			} 
		}

		var data = {};
		data[OSCB_STORAGE_KEY_BLOCK_LIST] = _list;
		chrome.storage.sync.set(data, function(){
			callback();				
		});
	});
}

function clear(callback) {
	callback = callback || function(){};

	var data = {};
	data[OSCB_STORAGE_KEY_BLOCK_LIST] = [];
	chrome.storage.sync.set(data, function(){
		callback();
	});
}

function isOn(callback) {
	callback = callback || function(){};

	chrome.storage.local.get(OSCB_STORAGE_KEY_SWITCH, function(result) {
		var flag = result[OSCB_STORAGE_KEY_SWITCH];

		callback(!!flag);
	})
}