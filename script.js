/*alert("I Love Flutter");
document.getElementById("user[login]").value="xiaoma";
document.getElementById("user[email]").value="hacker_ma@163.com";
document.getElementById("user[password]").value="123456";*/

/*function httpRequest(url, callback){
		var xhr = new XMLHttpRequest();
		xhr.open("GET", url, true);
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4) {
				callback(xhr.responseText);
			}
		}
		xhr.send();
	}*/

$(document).ready(function(){
	//alert('乐天插件测试');
	/*var turl = chrome.extension.getURL("test.csv");
	 Papa.parse(turl, {
         download: true,
         complete: function(results) {
             window.tdata = results.data;
             

         }
     });*/
	 //background 与 content_script 之间的通信
	chrome.runtime.sendMessage('getCSVData', function(response){
		//document.write(response);
		console.log(response);
	});
	
	

	/*chrome.tabs.onUpdated.addListener(function(tabId , info) {
		if (info.status == "complete") {
			chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
				var url = tabs[0].url;
				console.log(url+'321123')
				if(url=="http://global.rakuten.com/zh-cn/search/?k=test&l-id=search_regular&vm=0"){
					//chrome.tabs.executeScript(null,{code:"alert(window.tdata)"});
					$('<div class="fonts rekutenItemList">店铺昵称</div>').appendTo('.b-item .b-mod-item-vertical');
					console.log(window.tdata);
				}
			});
		}
	});*/
	
	$('<div class="fonts rekutenItemList">店铺昵称</div>').appendTo('.b-item .b-mod-item-vertical');
	
	
	
	//$("#user[login]").val("tesst");
	//$('<div class="fonts rekutenItemList">店铺昵称</div>').appendTo('.b-item .b-mod-item-vertical');
	
	//console.log($('.b-item .b-mod-item-vertical .b-text .b-text-overflow a').text());
	
	//jquery获取当前页数据显示到指定位置
	/*$('.b-item .b-mod-item-vertical .b-text .b-text-overflow').each(function(){
		//console.log($(this).find('a').text());
		var blackDiv = $(this).parent().parent().find('.rekutenItemList');
		var ht = $(this).find('a').clone();
		blackDiv.append(ht);
		var title = $(this).parent().find('.b-fix-2lines a').html();
		blackDiv.append('<br/>'+title);
		//console.log(title);
		//$(ht).appendTo('.rekutenItemList');
	});*/
	
	//遍历当前页面商品，通过ajax获取其详情页信息
	/*$('.b-item .b-mod-item-vertical').each(function(){
		var host = 'http://global.rakuten.com';
		//var getId = $(this).parent().find('.b-mod-item-vertical').attr('id');
		var getItemUrl = $(this).find('.b-img a').attr('href');
		var url = host + getItemUrl;
		var byInsertObj = $(this).find('.rekutenItemList');
		//console.log(byInsertObj);
		$.post(url, {}, function (data, textStatus) { 
			var rest = $(data).find('#cart-form .m-price').find('strong');
			
			byInsertObj.append(rest);
		}, 'html');
		
	});*/
	
	//jquery通过ajax获取其他页面html，并转换成dom对象获取需求数据显示到指定位置
	/*var url = 'http://global.rakuten.com/zh-cn/store/shirohato/item/05t758493/';
	$.post(url, {}, function (data) { 
	
			//reg = /\<div[^\>]+\>[\r\n.]*\<\/div\>/gi;
			//var reg = /\<div class=\"b-product-main b-section-bordered-normal\"[^\>]+\>[\r\n.]*\<\/div\>/gi;
			//var res = data.match(reg);
			var rest = $(data).find('#cart-form .m-price').find('strong');
			//$(".rekutenItemList").append(rest);

			console.log(rest);
		}, 'html');*/
	
});