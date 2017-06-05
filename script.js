/*alert("I Love Flutter");
document.getElementById("user[login]").value="xiaoma";
document.getElementById("user[email]").value="hacker_ma@163.com";
document.getElementById("user[password]").value="123456";*/

$(document).ready(function(){
	alert('乐天插件测试');
	
	//$("#user[login]").val("tesst");
	$('<div class="fonts rekutenItemList">店铺昵称</div>').appendTo('.b-item .b-mod-item-vertical');
	
	//console.log($('.b-item .b-mod-item-vertical .b-text .b-text-overflow a').text());
	
	//jquery获取当前页数据显示到指定位置
	$('.b-item .b-mod-item-vertical .b-text .b-text-overflow').each(function(){
		//console.log($(this).find('a').text());
		var blackDiv = $(this).parent().parent().find('.rekutenItemList');
		var ht = $(this).find('a').clone();
		blackDiv.append(ht);
		var title = $(this).parent().find('.b-fix-2lines a').html();
		blackDiv.append('<br/>'+title);
		//console.log(title);
		//$(ht).appendTo('.rekutenItemList');
	});
	
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