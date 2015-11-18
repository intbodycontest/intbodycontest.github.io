// JavaScript Document

jQuery(document).ready(function($) {

	textboxes = $("input:text");


	if ($.browser.mozilla) {

		$(textboxes).keypress(checkForEnter);

	} else {

		$(textboxes).keydown(checkForEnter);

	}



	function checkForEnter(event) {

		if (event.keyCode == 13) {

			currentTextboxNumber = textboxes.index(this);



			if (textboxes[currentTextboxNumber + 1] != null) {

				nextTextbox = textboxes[currentTextboxNumber + 1];

				nextTextbox.select();

			}



			event.preventDefault();
			checkval()
			return false;

		}

	}

});



var totalData;

var options = jQuery.extend({

    googleOptions: "&entqr=0&ud=1&sort=date:D:L:d1&output=xml_no_dtd&oe=UTF-8&ie=UTF-8&client=result_only&proxystylesheet=result_only&site=grp&tid=psearch_all",

    googleurl: "https://token.labsls.com:8443/Proxy_SCB.jsp?q=",

    googleJsonOptions: "&entqr=0&ud=1&sort=date:D:L:d1&output=xml_no_dtd&oe=UTF-8&ie=UTF-8&client=result_only&proxystylesheet=result_psearch_151&site=grp&num=6&callback=?",

    googleJsonOptions2icons: "&entqr=0&ud=1&sort=date:D:L:d1&output=xml_no_dtd&oe=UTF-8&ie=UTF-8&client=result_only&proxystylesheet=result_psearch_151_1&site=grp&num=6&callback=?",

    googleJsonOptions1icon: "&entqr=0&ud=1&sort=date:D:L:d1&output=xml_no_dtd&oe=UTF-8&ie=UTF-8&client=result_only&proxystylesheet=result_psearch_151_2&site=grp&num=6&callback=?",

    googleJsonOptions0icon: "&entqr=0&ud=1&sort=date:D:L:d1&output=xml_no_dtd&oe=UTF-8&ie=UTF-8&client=result_only&proxystylesheet=result_psearch_151_3&site=grp&num=6&callback=?"

    

}); 

    

function callback(adddata) {

	//this.callGoogle = true;

	for (var i=0;i<adddata.results.length;i++) {

        totalData.results.push(adddata.results[i]);

    }

    formatOutput(totalData);

}



function handleAjaxResponse(data) {

	totalData = data;

	$.ajaxSetup({

      async: false

    }); 

	

    // handle if pre-defined keyword return only one result

    if (data.results.length == 0) {

    	//jQuery.getJSON(options.googleurl+data.query+options.googleJsonOptions);
		var path = '';
		var url = '' + window.location;
		url = url.replace(/https:\/\//gi,"") ;
		url = url.replace(/http:\/\//gi,"") ;
		if(url.indexOf("?")>-1){
		var arr = url.split("?");
		url = arr[0];
		var arr = url.split("https://www.sc.com/");
		var count = arr.length ;
		for(var i=0;i<=count-1;i++){
		path += arr[i]+"/" ;
		}
		if(url.indexOf("search-result.html")>-1){
		path = "https://"+path.substring(0,path.length -1);
		}else{
		path = "https://"+path.substring(0,path.length -1)+'search-result.html';
		}
		}else{
		var arr = url.split("https://www.sc.com/");
		var count = arr.length ;
		for(var i=0;i<=count-1;i++){
		path += arr[i]+"/" ;
		}
		if(url.indexOf("search-result.html")>-1){
		path = "https://"+path.substring(0,path.length -1);
		}else{
		path = "https://"+path.substring(0,path.length -1)+'search-result.html';
		}
		}
		path = path+"?q=" ;
		var str = "<p style='margin:5px;'><span style='float:left;'>No immediate results found. Try a wider <a style='display:inline;padding:0px;color:#3F94BC;' href='"+path+data.query+options.googleOptions+"'>search</a>...</span></p>";
		$('.loading').html(str);		

    } else if (data.results.length == 1) {

        //jQuery.getJSON(options.googleurl+data.query+options.googleJsonOptions2icons);
		formatOutput(totalData);

    } else if (data.results.length == 2) {

    	//jQuery.getJSON(options.googleurl+data.query+options.googleJsonOptions1icon);
		formatOutput(totalData);

    } else if (data.results.length == 3) {

    	//jQuery.getJSON(options.googleurl+data.query+options.googleJsonOptions0icon);
		formatOutput(totalData);

    } else {

    	formatOutput(totalData);

    }

}



function formatOutput(data)

{

    //console.log(["inside getJSON" , data]);

		

	$('#searchBox input').removeClass('searchSpinner');

	$("#searchResults").empty();

	$('#searchResults').hide();

	

	//issue for live site z-index issue

	$('#pageOnlineBanking, #pageLocalSites').css({'z-index':'1'});

	$('#pageMenu').css({'z-index':'5'});

	

	if(jQuery.browser.msie && jQuery.browser.version.substr(0,1)=="6"){

		var windowWidth = document.documentElement.clientWidth;

		var windowHeight = document.documentElement.clientHeight;

		$('#backgroundPopup').width(windowWidth);

		$('#backgroundPopup').height(windowHeight+30);

	}

	

	this.isLoading = false;

	this.showResult = false;

	//disablePopup();

	this.groupedResult = groupByCategory(data);

	var num = this.groupedResult.length;

	

	if(num > 6)

		num = 6;						

		

	if(num > 0)

	{

		addCacheValue(data.query,data);	

	}

						

	for(var i=0;i<num;i++)

	{

		this.showResult = true;

		this.type = this.groupedResult[i]["type"];

		//alert(this.type);

		this.groupedResultDetails = this.groupedResult[i];

		var ulStr = "";

		if(i == 0){

			ulStr = "<ul class='searchCategory'><li class='firstTitle'><!--img src=images/"+ getCategoryIcon((this.type).toLowerCase()) + " /--><span>" + this.type + "</span></li>";

		}else{

			ulStr = "<ul class='searchCategory'><li class='midTitle'><!--img src=images/"+ getCategoryIcon((this.type).toLowerCase()) + " /--><span>" + this.type + "</span></li>";																

		}

		for(var j=0;j<this.groupedResultDetails.length;j++)

		{

			var moreURL = this.groupedResultDetails[j]["moreURL"];

			var content = this.groupedResultDetails[j]["content"];

			var name = this.groupedResultDetails[j]["name"];								

			var icon = this.groupedResultDetails[j]["icon"];
			

			moreURL = addOmniture(moreURL);

			

			if(j < getNumberofItemsToDisplay(num))

			{		

				if(icon==""){

						ulStr += "<li><a href='" + moreURL  + "' target='_blank' ><span class='sContent' style='margin-left: 0px'><b>"+ name + "</b><br>" + content + "</span></a></li>";											

				}else{

						icon = "https://www.sc.com" + icon;
						ulStr += "<li><a href='" + moreURL  + "' target='_blank' ><span class='imgIcon' style='padding-right: 0px;'><img width='1' height='1' src='"+icon+"' /></span><span class='sContent'><b>"+ name + "</b><br>" + content + "</span></a></li>";	

				}

				

			}else{

				break;

			}

		}

		if(i < num - 1){

			ulStr += "</ul>";

			$(ulStr).appendTo('#searchResults');								

		}	else{

			ulStr += "<li class='lastSearch'><a href='https://www.sc.com/en/search-result.html?q="+data.query+options.googleOptions+"'><span class='lastSearchSpan'>View all search results&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></a></li></ul>";

			$(ulStr).appendTo('#searchResults');								

		}

		

	}

	

	//alert(this.showResult);	

	//console.log(["this.showResult" , this.showResult]);

	if(this.showResult  && jQuery.trim($('#q').val()) != "" ){

		//console.log(["inside the show result",jQuery.trim($('#q').val())]);

		// resset call google

		//this.callGoogle = false;

		loadPopup();

		$('#searchResults').show();

	}

	// move this section back to top

	//else if(jQuery.trim($('#q').val()) != "" && !this.callGoogle){

        

        // call google mini to get more results

		//jQuery.getJSON(options.googleurl+data.query+options.googleJsonOptions);

		//this.callGoogle = true;

	//}		

	else if(jQuery.trim($('#q').val()) != ""){

        // resset call google

        //this.callGoogle = false;

        this.isLoading = false;

        loadPopup();

        ulStr = "<ul class='searchCategory'><li class='firstTitle'><span>No shortcut found</span></li><li class='noResult'>Try another search or click this <a href='https://www.sc.com/en/search-result.html?q="+data.query+options.googleOptions+"'>link</a> to see all results for '"+data.query+"'.</li><li class='lastSearch' style='height: 20px; *margin-top: 5px; *height: 15px'></li></ul>";

        $(ulStr).appendTo('#searchResults');

        $('#searchResults').show();

            

    }else if(jQuery.trim($('#q').val()) == ""){

		$('#searchResults').hide();

	}

}



function doPredictiveSearch ()

{

	var config = jQuery.extend({
        //searchURL: 'http://service2.standardchartered.com:81/presearch/getBox.action'

		searchURL: 'https://token.labsls.com:8443/predictive_search.jsp'

		//searchURL: 'SearchResultInt.php'

	});

	

	var isLoading = false;

	var lastValue = "";

	//var callGoogle = false;

	

	jQuery('body').click(function(event){

		if(!this.isLoading && !(jQuery(event.target).is ('#q')) ){

			clearCache();

			//$('#q').val("search");			

			disablePopup();

			$("#searchResults").empty();	

			lastValue = "";

		}

	});

	

	



	$('#q').keyup(function(event) {

	    

	 if(event.keyCode != 27 ){					   

		if(jQuery.trim($('#q').val()) != "" && $('#q').val().length > 2){

			

			if($('#q').val() != lastValue) {

				

                var input = jQuery(this);
				var q = jQuery.trim(this.value);
				
				q = q.replace(/<script>/gi,"");
				q = q.replace(/<\/script>/gi,"");
				q = q.replace(/<script\/>/gi,"");
				q = q.replace(/[();<>+'"&?]/gi,"");	
				if(q.match(/%3C/)){
				   q = q.replace(/%3C/gi,"");
				}
				if(q.match(/%3E/)){
				  q = q.replace(/%3E/gi,"");
				};
					  
				if(q.match(/&lt/)){
				   q = q.replace(/&lt/gi,"");
				}
				if(q.match(/&gt/)){
				  q = q.replace(/&gt/gi,"");
				};
			   if(q.match(/&quot/)){
				  q = q.replace(/&quot/gi,"");
				};
				if(q.match(/&amp/)){
				  q = q.replace(/&amp/gi,"");
				};
				 if(q.match(/&#40/)){
				  q = q.replace(/&#40/gi,"");
				};
				 if(q.match(/&#41/)){
				  q = q.replace(/&#41/gi,"");
				};
						   
				if(q.match(/%3Cscript%3E/)){
					q = q.replace(/%3Cscript%3E/gi,"");
				}
				if(q.match(/script/)){
					q = q.replace(/script/gi,"");
				}
				
				if(this.timer) {

					clearTimeout(this.timer);

				}

				

				//display loading search box //////////////

				openLoadingBox();

				$('#searchBox input').addClass('searchSpinner');



				this.isLoading = true;

				this.timer = setTimeout(function() {

				

				//disable caching

				//if(!hasValue(q)){

				if(true){

					

					

					$.ajaxSetup({

		              async: false

		            }); 

					jQuery.getJSON(config.searchURL + "?query="+q+"&jsonp=handleAjaxResponse&jsoncallback=?",function(data)

					{

						/*console.log(["inside getJSON" , data]);

						

						$('#searchBox input').removeClass('searchSpinner');

						$("#searchResults").empty();

						$('#searchResults').hide();

						this.isLoading = false;

						this.showResult = false;

						//disablePopup();

						this.groupedResult = groupByCategory(data);

						var numTotal = this.groupedResult.length;

						if(numTotal > 0)

						{

							addCacheValue(q,data);	

						}

						

						for(var i=0;i<numTotal;i++)

						{

							this.showResult = true;

							this.type = this.groupedResult[i]["type"];

							//alert(this.type);

							this.groupedResultDetails = this.groupedResult[i];

							var ulStr = "";

							if(i == 0){

								ulStr = "<ul class='searchCategory'><li class='firstTitle'><!--img src=images/"+ getCategoryIcon((this.type).toLowerCase()) + " /--><span>" + this.type + "</span></li>";

							}else{

								ulStr = "<ul class='searchCategory'><li class='midTitle'><!--img src=images/"+ getCategoryIcon((this.type).toLowerCase()) + " /--><span>" + this.type + "</span></li>";																

							}

							for(var j=0;j<this.groupedResultDetails.length;j++)

							{

								var moreURL = this.groupedResultDetails[j]["moreURL"];

								var content = this.groupedResultDetails[j]["content"];

								var name = this.groupedResultDetails[j]["name"];								

								var icon = this.groupedResultDetails[j]["icon"];

								

								if(j < getNumberofItemsToDisplay(numTotal))

								{		

									ulStr += "<li><a href='" + moreURL  + "' target='_blank' ><span class='imgIcon'><img width='40' height='40' src='"+icon+"' /></span><span class='sContent'><b>"+ name + "</b><br>" + content + "</span></a></li>";

									

								}else{

									break;

								}

							}

							if(i < numTotal - 1){

								ulStr += "</ul>";

								$(ulStr).appendTo('#searchResults');								

							}	else{

								ulStr += "<li class='lastSearch'><a href='/search/en/index.html?q="+q+"'>view all search results ></a></li></ul>";

								$(ulStr).appendTo('#searchResults');								

							}

							

						}

							//alert(this.showResult);	

							//console.log(["this.showResult" , this.showResult]);

							if(this.showResult  && jQuery.trim($('#q').val()) != "" ){

								//console.log(["inside the show result",jQuery.trim($('#q').val())]);

								loadPopup();

								$('#searchResults').show();

							}else if(jQuery.trim($('#q').val()) != ""){

									this.isLoading = false;

									loadPopup();

									ulStr = "<p style='background:#FFFFFF;margin:0px;padding:10px'><br> No shortcut found. Try another search.<br><br></p>";

									$(ulStr).appendTo('#searchResults');

									$('#searchResults').show();

							}else if(jQuery.trim($('#q').val()) == ""){

									$('#searchResults').hide();

							}*/

						});

				  }else{//if has value # this else section have been disable

						$('#searchBox input').removeClass('searchSpinner');

						$("#searchResults").empty();

						$('#searchResults').hide();

						this.isLoading = false;

						this.showResult = false;

						//disablePopup();

						this.groupedResult = groupByCategory(getCachedValue(q));

						var numTotal = this.groupedResult.length;

						

						if(numTotal > 6)

							numTotal = 6;

							

							for(var i=0;i<numTotal;i++)

							{

								this.showResult = true;

								this.type = this.groupedResult[i]["type"];

								//alert(this.type);

								this.groupedResultDetails = this.groupedResult[i];

								var ulStr = "";

								if(i == 0){

									ulStr = "<ul class='searchCategory'><li class='firstTitle'><!--img src=images/"+ getCategoryIcon((this.type).toLowerCase()) + " /--><span>" + this.type + "</span></li>";

								}else{

									ulStr = "<ul class='searchCategory'><li class='midTitle'><!--img src=images/"+ getCategoryIcon((this.type).toLowerCase()) + " /--><span>" + this.type + "</span></li>";																

								}

								for(var j=0;j<this.groupedResultDetails.length;j++)

								{

									var moreURL = this.groupedResultDetails[j]["moreURL"];

									var content = this.groupedResultDetails[j]["content"];

									var name = this.groupedResultDetails[j]["name"];								

									var icon = this.groupedResultDetails[j]["icon"];

									

									if(j < getNumberofItemsToDisplay(numTotal))

									{	

									

										if(icon==""){

											ulStr += "<li><a href='" + moreURL  + "' target='_blank' ><span class='sContent' style='margin-left: 0px'><b>"+ name + "</b><br>" + content + "</span></a></li>";											

										}else{
												icon = "https://www.sc.com" + icon;
												ulStr += "<li><a href='" + moreURL  + "' target='_blank' ><span class='imgIcon' style='padding-right: 0px;'><img width='1' height='1' src='"+icon+"' /></span><span class='sContent'><b>"+ name + "</b><br>" + content + "</span></a></li>";	

										}

		

									}else{

										break;

									}

								}

								if(i < numTotal - 1){

									ulStr += "</ul>";

									$(ulStr).appendTo('#searchResults');								

								}	else{

									ulStr += "<li class='lastSearch'><a href='https://www.sc.com/en/search-result.html?q="+q+options.googleOptions+"'>view all search results ></a></li></ul>";

									$(ulStr).appendTo('#searchResults');								

								}

								

							}

								//alert(this.showResult);	

								//console.log(["this.showResult" , this.showResult]);

								if(this.showResult && jQuery.trim($('#q').val()) != "" ){

									//console.log(["inside the show result",jQuery.trim($('#q').val())]);

									loadPopup();

									$('#searchResults').show();

								}else if(jQuery.trim($('#q').val()) != ""){

										this.isLoading = false;

										loadPopup();

									ulStr = "<ul class='searchCategory'><li class='firstTitle'><span>No shortcut found</span></li><li class='noResult'>Try another search or click this <a href='https://www.sc.com/en/search-result.html?q="+q+options.googleOptions+"'>link</a> to see all results for '"+q+"'.</li><li class='lastSearch' style='height: 20px; *margin-top: 5px; *height: 15px'></li></ul>";

										$(ulStr).appendTo('#searchResults');

										$('#searchResults').show();

								}else if(jQuery.trim($('#q').val()) == ""){

										$('#searchResults').hide();

								}				  	

				  }

				},300);

				

				lastValue = this.value;

			}	

		}else{

			clearCache()

			lastValue = "";

			disablePopup();

			$("#searchResults").empty();

			$("#searchResults").hide();

		}

	 }else{

		 	//$('body').focus();

			clearCache();

			//document.frm.hid.focus();

			$("#btn").focus();

			$('#q').val("search");

			lastValue = "";

			disablePopup();

			$("#searchResults").empty();			

	 }

	});

		

}



function openLoadingBox() {

	

	if ($("#searchResults").is(':hidden')) {

		$("#searchResults").empty();



		//issue for live site z-index issue

		$('#pageOnlineBanking, #pageLocalSites').css({'z-index':'1'});

		$('#pageMenu').css({'z-index':'5'});

		

		if(jQuery.browser.msie && jQuery.browser.version.substr(0,1)=="6"){

			var windowWidth = document.documentElement.clientWidth;

			var windowHeight = document.documentElement.clientHeight;

			$('#backgroundPopup').width(windowWidth);

			$('#backgroundPopup').height(windowHeight+30);

		}

		

		var ulStr = "";

		ulStr = "<ul class='searchCategory'><li class='firstTitle'><span>Searching ...</span></li>";

		ulStr += "<li class='loading'><span class='imgIcon loadingImg'><img width='20' height='20' src='_themes/default/img/presearch/loading.gif' /></span><span class='sContent'><b></b><br></span></li>";	

		ulStr += "<li class='lastSearch'><span class='lastSearchSpan'>&nbsp;</span></li></ul>";

		$(ulStr).appendTo('#searchResults');

		loadPopup();

		$('#searchResults').show();

	}

}



function groupByCategory(data)

{

	var prevCategory = "";

	var countCategory = -1;

	var cnt = 0;

	var searchTypeResult = new Array();	

		searchTypeResult[countCategory] = new Array();

	//var searchTypeResult[countCategory] = new Array();

	jQuery.each(data.results,function(i,item){

		var searchValues = new Array();	

		var type = item.type;



		if(prevCategory	!= item.type )

		{	

			

			cnt = 0;			

			countCategory++;	

			searchTypeResult[countCategory] = new Array();

			searchTypeResult[countCategory]["type"] = item.type;

			//searchValues["name"] = item.name;

			searchValues["name"] = trimItem(item.name, 45);

			searchValues["content"] = trimItem(item.content, 100);

			searchValues["moreURL"] = item.moreDetailsUrl;

			searchValues["icon"] = item.iconPath;

			searchTypeResult[countCategory][cnt] = searchValues;							

			//alert(item.type + " category " + countCategory + " count " + cnt) ;

		}else{

			cnt = cnt + 1;

			//alert(item.type + " category " + countCategory + " count " + cnt) ;

			//searchValues["name"] = item.name;

            searchValues["name"] = trimItem(item.name, 45);

			searchValues["content"] = trimItem(item.content, 100);

			searchValues["moreURL"] = item.moreDetailsUrl;

			searchValues["icon"] = item.iconPath;			

			searchTypeResult[countCategory][cnt] = searchValues;				

		}

		prevCategory = item.type;

	});

	return searchTypeResult;

}



function trimItem(itemName, itemLength) {

	$("#tempItem").append(itemName);

	itemName = $("#tempItem").text();

	$("#tempItem").empty();

	

	if (itemName.length > itemLength) {

		while (itemName.length > itemLength) {

            var words = "";

            words = itemName.split(' ');

            words.pop();

            var wordsLength = words.length;

            --wordsLength;

            var newTitle = "";

            for (var i = 0; i < wordsLength ; i++) {

                newTitle += words[i]+" ";

            }

            itemName = newTitle;

        }

        itemName = itemName+" ..."

	}

    return itemName;

}



function getNumberofItemsToDisplay(numberOfCategory)

{

	var cnt = numberOfCategory;

	var numberOfItem = 0;

	if(cnt == 1)

		numberOfItem = 6;

	else if(cnt == 2)

		numberOfItem = 5;

	else if(cnt == 3)

		numberOfItem = 3;

	else if(cnt == 4)

		numberOfItem = 3;

	else if(cnt == 5)

		numberOfItem = 3;

	else if(cnt == 6)

		numberOfItem = 3;

	else if(cnt == 7)

		numberOfItem = 3;		

		

	return numberOfItem;	

}



var cacheObject;

function addCacheValue(key,value)

{

	if(cacheObject == null)

		cacheObject = new Array();

		

	cacheObject[key] = value;

}



function hasValue(key)

{

	var hasVal = false;

	if(cacheObject != null){

			if(cacheObject[key] != null)

			{

				hasVal = true;

			}

	}

	return hasVal;

}



function getCachedValue(key)

{

	var cachedResult;	

		if(cacheObject[key] != null)

		{

			cachedResult = cacheObject[key];

		}

	return cachedResult;

}



function clearCache()

{

	cacheObject = new Array();

}



function getCategoryIcon(catname)

{

	var icon = "";

	switch(catname)

	{

		

		case "product":

		icon = "icon_search1.html";

		break;

		case "creditcard":

		icon = "icon_search2.html";

		break;

		case "about us":

		icon = "icon_search1.html";

		break;

		case "jobs":

		icon = "icon_search2.html";

		break;	

		default:

		icon = "icon_search2.html";

		break;

		

	}

	return icon;

}



//Clear search field

function clearSearchField(q)

{

	if(q.value == 'search'){

	   q.value='';

	}

}



function fillSearchField(q)

{	

	$('#hid').val(q.value);

	if(q.value == ''){

	   q.value='search';

	}

}



var popupStatus = 0;



//loading popup with jQuery magic!

function loadPopup(){

	//loads popup only if it is disabled

	//alert("load");

	if(popupStatus==0){

		$("#backgroundPopup").css({

			"opacity": "0.6"

		});

		$("#backgroundPopup").fadeIn("normal");

		popupStatus = 1;

	}

}



//disabling popup with jQuery magic!

function disablePopup(){

	//disables popup only if it is enabled

	//alert("unload");

	if(popupStatus==1){

		$("#backgroundPopup").fadeOut("normal");

		popupStatus = 0;

		//location.reload();

		setTimeout(function(){

			$('#pageMenu').css({'z-index':'11'});

			$('#pageOnlineBanking').css({'z-index':'15'});

			$('#pageLocalSites').css({'z-index':'16'});

		},500);

	}						 

}



function addOmniture(url) {

	if (url.match(/\?/)) {

		url += "&tid=psearch_option";

	} else {

		url += "?tid=psearch_option";

	}

	return url;

}



	

