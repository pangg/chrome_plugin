//$(document).ready(function(){
	/*chrome.runtime.csvDatas(){
		
	}*/
	
//});
var turl = chrome.extension.getURL("test.csv");
		 Papa.parse(turl, {
			 download: true,
			 complete: function(results) {
				 window.tdata = results.data;
				 
			 }
		 });
		 
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
    if(message == 'getCSVData'){
        sendResponse(window.tdata);
    }
});