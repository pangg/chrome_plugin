/*alert("I Love Flutter");
document.getElementById("user[login]").value="xiaoma";
document.getElementById("user[email]").value="hacker_ma@163.com";
document.getElementById("user[password]").value="123456";*/

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
		//response 所有商铺信息数组
		var shopNameArr = [];
		for(var key in response){
			shopNameArr[key] = $.trim(response[key][0]);
		}
		
		//获取当前链接参数 区分列表页样式展示模板 tpl=0列表页样式  3格子样式
		var tpl = GetQueryString('v');
		
		//获取搜索关键词
		var keywords = $('#ri-cmn-hdr-sitem').val()
		keywords = $.trim(keywords);
		var keywordsArr = keywords.split(' ');
		var rps = '';
		console.log(keywordsArr)
		
		$('#adsDisplayArea .rsrSResultSectPr').each(function(){
			//获取店铺名称
			var shopName = $(this).find('.txtIconShopName').text()
			shopName = $.trim(shopName);
			//console.log(shopName, tt)
			//插入样式
			var html = '';
			var space = '';
			
			//获取当前店铺是否存在，若存在返回位置（键值）
			var site = $.inArray(shopName, shopNameArr);
			console.log(site, bb)
			if(site != -1){
				space += '<th>採点:</th><td>'+response[site][2]+'</td><th>売上げ:</th><td>'+response[site][5]+'件</td><th>開店日:</th><td>'+response[site][8]+'</td>';
				html = '<div class="everyAddDiv fonts"><table><tr>'+space+'</tr></table></div>';
				//如果店铺存在，则插入数据
				$(this).find('.rsrSResultItemTxt').append(html)
			}
			
			//匹配标题中的关键词并做出标记
			var titles = $(this).find('.rsrSResultItemTxt h2 a').html()
			console.log(titles)
			for(var ks in keywordsArr){
				rps = '<span style="color:red">'+keywordsArr[ks]+'</span>';
				titles = titles.replace(keywordsArr[ks], rps)
			}
			$(this).find('.rsrSResultItemTxt h2 a').html(titles)
			
		})
		
		
		$('#ratArea .rsrSResultSect').each(function(){
			//获取店铺名称 txtIconShopName
			var shopNameL = $(this).find('.txtIconShopName').text()
			shopNameL = $.trim(shopNameL);
			//console.log(shopNameL)
			//插入样式
			var htmlL = '';
			var spaceL = '';
			
			//获取当前店铺是否存在，若存在返回位置（键值）
			var siteL = $.inArray(shopNameL, shopNameArr);
			//console.log(siteL)
			if(siteL != -1){
				spaceL += '<th>採点:</th><td>'+response[siteL][2]+'</td><th>売上げ:</th><td>'+response[siteL][5]+'件</td><th>開店日:</th><td>'+response[siteL][8]+'</td>';
				htmlL = '<div class="everyAddDiv fonts"><table><tr>'+spaceL+'</tr></table></div>';
				//如果店铺存在，则插入数据
				$(this).find('.rsrSResultItemTxt').append(htmlL)
			}
			
			
			//匹配标题中的关键词并做出标记
			var titlesL = $(this).find('.rsrSResultItemTxt h2 a').html()
			console.log(titlesL)
			for(var ksl in keywordsArr){
				rps = '<span style="color:red">'+keywordsArr[ksl]+'</span>';
				titlesL = titlesL.replace(keywordsArr[ksl], rps)
			}
			$(this).find('.rsrSResultItemTxt h2 a').html(titlesL)
		})
		
		//九宫格样式
		if(tpl){
			//获取搜索关键词
			var keyword = $('#ri-cmn-hdr-sitem').val()
			keyword = $.trim(keyword);
			var keywordArr = keyword.split(' ');
			console.log(keywordArr, 'tpl')
			
			var rep = '';
			
			$('#rsrWSArea .rsrWSSect').each(function(){
				//获取店铺名称 txtIconShopName
				var shopNameTpl = $(this).find('.shopName a').text()
				shopNameTpl = $.trim(shopNameTpl);
				//插入样式
				var htmlTpl = '';
				var spaceTpl = '';
				//获取当前店铺是否存在，若存在返回位置（键值）
				var siteTpl = $.inArray(shopNameTpl, shopNameArr);
				if(siteTpl != -1){
					spaceTpl = '<tr><th>採点:</th><td>'+response[siteTpl][2]+'</td></tr><tr><th>売上げ:</th><td>'+response[siteTpl][5]+'</td></tr><tr><th>開店日:</th><td>'+response[siteTpl][8]+'</td></tr>';
					htmlTpl += '<div class="tplEveryAddDiv tplFonts"><table>'+spaceTpl+'</table></div>';
					
					$(this).find('.rsrWSBelowItemPicture').append(htmlTpl)
				}
				
				
				//匹配标题中的关键词并做出标记
				var titleTpl = $(this).find('.rsrWSBelowItemPicture h2 a').html()
				console.log(titleTpl)
				for(var k in keywordArr){
					rep = '<span style="color:red">'+keywordArr[k]+'</span>';
					titleTpl = titleTpl.replace(keywordArr[k], rep)
				}
				$(this).find('.rsrWSBelowItemPicture h2 a').html(titleTpl)
				
				
			})
		}
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
	
	//$('<div class="fonts rekutenItemList">店铺昵称'+window.tg+'</div>').appendTo('.b-item .b-mod-item-vertical');
	
	
	
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

function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
	 
     if(r!=null)return  unescape(r[2]); return null;
}