$(document).ready(function(){
	
	chrome.runtime.sendMessage('getCSVData', function(response){
		var reviewNumArr = [] //当前页评价数数组
		var itemTitleArr = [] //当前页商品标题数组
		var itemDescriptionArr = [] //当前页商品描述数组
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
			if(site != -1){
				space += '<th>採点:</th><td>'+response[site][2]+'</td><th>評価:</th><td>'+response[site][5]+'件</td><th>開店日:</th><td>'+response[site][8]+'</td>';
				html = '<div class="everyAddDiv fonts"><table><tr>'+space+'</tr></table></div>';
				//如果店铺存在，则插入数据
				$(this).find('.rsrSResultItemTxt').append(html)
			}
			
			//匹配标题中的关键词并做出标记
			var titles = $(this).find('.rsrSResultItemTxt h2 a').html()
			var discriptions =  $(this).find('.rsrSResultItemTxt .copyTxt').html()
			discriptions = $.trim(discriptions);
			console.log(discriptions)
			for(var ks in keywordsArr){
				rps = '<span style="color:red">'+keywordsArr[ks]+'</span>';
				titles = titles.replace(keywordsArr[ks], rps)
				discriptions = discriptions.replace(keywordsArr[ks], rps)
			}
			$(this).find('.rsrSResultItemTxt h2 a').html(titles)
			$(this).find('.rsrSResultItemTxt .copyTxt').html(discriptions)
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
				spaceL += '<th>採点:</th><td>'+response[siteL][2]+'</td><th>評価:</th><td>'+response[siteL][5]+'件</td><th>開店日:</th><td>'+response[siteL][8]+'</td>';
				htmlL = '<div class="everyAddDiv fonts"><table><tr>'+spaceL+'</tr></table></div>';
				//如果店铺存在，则插入数据
				$(this).find('.rsrSResultItemTxt').append(htmlL)
			}
			
			
			//匹配标题中的关键词并做出标记
			var titlesL = $(this).find('.rsrSResultItemTxt h2 a').html()

			//商品数组
			itemTitleArr.push(titlesL)
			var descriptionL = $(this).find('.rsrSResultItemTxt .copyTxt').html()
			descriptionL = $.trim(descriptionL);
			itemDescriptionArr.push(descriptionL)

			for(var ksl in keywordsArr){
				rps = '<span style="color:red">'+keywordsArr[ksl]+'</span>';
				titlesL = titlesL.replace(keywordsArr[ksl], rps)
				descriptionL = descriptionL.replace(keywordsArr[ksl], rps)
			}
			$(this).find('.rsrSResultItemTxt h2 a').html(titlesL)
			$(this).find('.rsrSResultItemTxt .copyTxt').html(descriptionL)


			//获取各个商品的评价数
			var reviewStr = $(this).find('.txtIconReviewNum a').text()
			reviewStr = reviewStr.replace(',', '')
			reviewStr = reviewStr ? reviewStr : 0
			var everyReviewNum = parseInt(reviewStr)
			reviewNumArr.push(everyReviewNum)



		})


		/*
		 *	Feedback Related Summary*/
		//Average_Feedback_Count
		var itemCount = 45
		var reviewSum = 0
		for(var rk in reviewNumArr){
			reviewSum += reviewNumArr[rk]
		}
		var averageCount = (reviewSum / itemCount).toFixed(2)

		//Average_Top_10_Feedback_Count
		//数组降序
		var reviewNumArrDec = reviewNumArr.sort(function(a,b){return b - a});
		var topTenArr = [] //排序前十
		var topTenSum = 0
		for(var rdk in reviewNumArrDec){
			if(rdk < 10){
				topTenArr.push(reviewNumArrDec[rdk])
				topTenSum += reviewNumArrDec[rdk]
			}else{
				break
			}
		}
		var averageTopTen = (topTenSum / 10).toFixed(2)
		console.log(reviewNumArrDec)
		//Min_Feedback_Count   最小反馈数
		var feedbackMin = reviewNumArrDec.pop()

		//Min_Feedback_Position   最小反馈位置
		var minPosition = reviewNumArrDec.indexOf(feedbackMin) + 1

		//Less_Than_100_Top_Position
		var lessThan100TopP = 0
		for(var rdk in reviewNumArrDec){
			if(reviewNumArrDec[rdk] < 100){
				lessThan100TopP = parseInt(rdk) + 1
				break
			}
		}

		//Less_Than_10_Top_Position
		var lessThan10TopP = 0
		for(var rdl0k in reviewNumArrDec){
			if(reviewNumArrDec[rdl0k] < 10){
				lessThan10TopP = parseInt(rdl0k) + 1
				break
			}
		}

		//No_Feedback_Position
		//最小反馈数是0即为没有反馈，否则，当前不存在无反馈
		var noFeedbackPosition = ''
		if(feedbackMin == 0){
			noFeedbackPosition = reviewNumArrDec.indexOf(feedbackMin) + 1
		}

		//Less_Than_100_Count
		var lessTan100Arr = []
		for (var lta in reviewNumArrDec){
			if(reviewNumArrDec[lta] < 100){
				lessTan100Arr.push(reviewNumArrDec[lta])
			}
		}
		var lessThan100Count = lessTan100Arr.length

		//Less_Than_10_Count
		var lessThan10Arr = []
		for(var lt10a in reviewNumArrDec){
			if(reviewNumArrDec[lt10a] < 10){
				lessThan10Arr.push(reviewNumArrDec[lt10a])
			}
		}
		var lessThan10Count = lessThan10Arr.length

		//No_Feedback_Count
		var noFeedbackArr = []
		for(var nofk in reviewNumArrDec){
			if(reviewNumArrDec[nofk] == 0){
				noFeedbackArr.push(reviewNumArrDec[nofk])
			}
		}
		var noFeedbackCount = noFeedbackArr.length

		var rowOne = '<tr><th>Average_Feedback_Count</th><td>'+averageCount+'件</td><th>Average_Top_10_Feedback_Count</th><td>'+averageTopTen+'件</td><th>Min_Feedback_Count</th><td>'+feedbackMin+'件</td></tr>';
		var rowTwo = '<tr><th>Min_Feedback_Position </th><td>'+minPosition+'</td><th>Less_Than_100_Top_Position</th><td>'+lessThan100TopP+'</td><th>Less_Than_10_Top_Position</th><td>'+lessThan10TopP+'</td></tr>';
		var rowThree = '<tr><th>No_Feedback_Position</th><td>'+noFeedbackPosition+'</td><th>Less_Than_100_Count</th><td>'+lessThan100Count+'</td><th>Less_Than_10_Count</th><td>'+lessThan10Count+'</td></tr>';
		var roeFour = '<tr><th>No_Feedback_Count</th><td>'+noFeedbackCount+'</td><th></th><td></td><th></th><td></td></tr>';
		var fbHtml = '<div id="fb_related_summary"><h3><strong>Feedback Related Summary</strong></h3><table id="frs_table" class="frs_table">'+rowOne+rowTwo+rowThree+roeFour+'</table></div>';
		$('#ratArea').prepend(fbHtml)


		/*keywords 关键词字符串  keywordsArr 关键词按照空格拆分数组   keywordArray
		*itemTitleArr  itemDescriptionArr
		* */
		//删除关键词数组中的空元素
		var keywordArray = []
		for(var ka in keywordsArr){
			if(keywordsArr[ka]){
				keywordArray.push(keywordsArr[ka])
			}
		}
		//Title_Exact_Count
		var titleExactCount = 0
		var tpms = 0
		for(var teck in itemTitleArr){
			tpms = itemTitleArr[teck].indexOf(keywords)
			if(tpms != -1){
				titleExactCount += 1
			}
		}

		//Title_Broad_Count
		var titleBroadCount = 0
		for(var tbck in itemTitleArr){
			for (var ksk in keywordArray){
				tpms = itemTitleArr[tbck].indexOf(keywordArray[ksk])
				if(tpms != -1){
					titleBroadCount += 1
					break
				}
			}
		}

		//Title_Exact_Count_Top10
		var titleTop10Arr = itemTitleArr.slice(0, 10)
		var titleExactCountTop10 = 0
		for(var tect10k in titleTop10Arr){
			tpms = titleTop10Arr[tect10k].indexOf(keywords)
			if(tpms != -1){
				titleExactCountTop10 += 1
			}
		}

		//Title_Broad_Count_Top10
		var titleBroadCountTop10 = 0
		for(var tbct10k in titleTop10Arr){
			for (ksk in keywordArray){
				tpms = titleTop10Arr[tbct10k].indexOf(keywordArray[ksk])
				if(tpms != -1){
					titleBroadCountTop10 += 1
					break
				}
			}
		}

		//Description_Exact_Count   itemDescriptionArr
		var despExactCount = 0
		for(var deck in itemDescriptionArr){
			tpms = itemDescriptionArr[deck].indexOf(keywords)
			if(tpms != -1){
				despExactCount += 1
			}
		}

		//Description_Broad_Count
		var despBroadCount = 0
		for(var dbck in itemDescriptionArr){
			for (ksk in keywordArray){
				tpms = itemDescriptionArr[dbck].indexOf(keywordArray[ksk])
				if(tpms != -1){
					despBroadCount += 1
					break
				}
			}
		}

		//Description_Exact_Count_Top10
		var despTop10Arr = itemTitleArr.slice(0, 10)
		var despExactCountTop10 = 0
		for(var dect10k in despTop10Arr){
			tpms = despTop10Arr[dect10k].indexOf(keywords)
			if(tpms != -1){
				despExactCountTop10 += 1
			}
		}

		//Description_Broad_Count_Top10
		var despBroadCountTop10 = 0
		for(var dbctTenk in despTop10Arr){
			for (ksk in keywordArray){
				tpms = despTop10Arr[dbctTenk].indexOf(keywordArray[ksk])
				if(tpms != -1){
					despBroadCountTop10 += 1
					break
				}
			}
		}

		console.log(despBroadCountTop10)
		//console.log(despTop10Arr)

		var keyRowOne = '<tr><th>Title_Exact_Count</th><td>'+titleExactCount+'</td><th>Title_Broad_Count</th><td>'+titleBroadCount+'</td><th>Title_Exact_Count_Top10</th><td>'+titleExactCountTop10+'</td></tr>';
		var keyRowTwo = '<tr><th>Title_Broad_Count_Top10</th><td>'+titleBroadCountTop10+'</td><th>Description_Exact_Count</th><td>'+despExactCount+'</td><th>Description_Broad_Count</th><td>'+despBroadCount+'</td></tr>';
		var keyRowThree = '<tr><th>Description_Exact_Count_Top10</th><td>'+despExactCountTop10+'</td><th>Description_Broad_Count_Top10</th><td>'+despBroadCountTop10+'</td><th>Both_Exact_Count</th><td></td></tr>';
		var keyRowFour = '<tr><th>Both_Broad_Count</th><td></td><th>Both_Exact_Count_Top10</th><td></td><th>Both_Broad_Count_Top10</th><td></td></tr>';
		var keyRowFive = '<tr><th>Non_Max</th><td></td><th>Both_Min</th><td></td><th></th><td></td></tr>';
		var keyHtml = '<h3><strong>Keywords Related Summary</strong></h3><table id="key_table" class="key_table">'+keyRowOne+keyRowTwo+keyRowThree+keyRowFour+keyRowFive+'</table>';
		$('#fb_related_summary').append(keyHtml)

		//九宫格样式页  
		/*if(tpl){
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
					spaceTpl = '<tr><th>採点:</th><td>'+response[siteTpl][2]+'</td></tr><tr><th>評価:</th><td>'+response[siteTpl][5]+'</td></tr><tr><th>開店日:</th><td>'+response[siteTpl][8]+'</td></tr>';
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
		}*/
		
		
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