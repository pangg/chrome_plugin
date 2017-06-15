
var turl = chrome.extension.getURL("rakuten_20170510-180223_tianxi.csv");
//var turl = chrome.extension.getURL("test.csv");
		 Papa.parse(turl, {
			 download: true,
			 complete: function(results) {
				 
				 console.log(results.data)
				 window.tdata = results.data;
				 
			 }
		 });
		 
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
    if(message == 'getCSVData'){
        sendResponse(window.tdata);
    }
});