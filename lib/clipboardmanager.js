/**
 * Phonegap ClipboardManager plugin
 * Omer Saatcioglu 2011
 * Guillaume Charhon - Smart Mobile Software 2011
 * Jacob Robbins - Phonegap 2.0 port 2013
 */


window.clipboardManagerCopy = function(str, success, fail) {
	console.log("plugin!!!!");
	Cordova.exec(success, fail, "ClipboardManagerPlugin", "copy", [str]);
};

window.clipboardManagerPaste = function(success, fail) {
	Cordova.exec(success, fail, "ClipboardManagerPlugin", "copy", []);
};

//(function(){
//	var cordovaRef = window.PhoneGap || window.Cordova || window.cordova;
//	var clipboardmananger() {};
//	
//	
//	clipboardmananger.prototype.copy = function(success, fail, str) {
//		console.log("clipboardmanager.js!!!!");
//        return cordovaRef.exec(success, fail, 'ClipboardManagerPlugin', 'copy', str);
//    };
//    
//    clipboardmananger.prototype.paste = function(success, fail) {
//    	return cordovaRef.exec(success, fail, 'ClipboardManagerPlugin', 'copy', []);
//    };
//    
//    cordovaRef.addConstructor(function() {
//        if(!window.plugins) {
//            window.plugins = {};
//        }
//        if(!window.plugins.clipboardPlugin) {
//            window.plugins.clipboardPlugin = new clipboardmananger();
//        }
//    });
//    
//})();