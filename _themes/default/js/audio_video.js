/**
 * Created by IntelliJ IDEA.
 *
 */
//category list need to display
var category_list = ["Our brand", "Financials", "Research and reports", "Liverpool Football Club", "Marathons", "Sustainability"];
 
// NOTE:this is the audio_video details page directory path. please change this when deploying to the testing/production environment
var audio_video_dir = "";
// NOTE: this is the flash play file "flvplayer.swf" directory path. this file is needed for playing fla format media files.
var flvplayer_dir = "";
//NOTE:init pager. to facilitate testing. the initial page limit is 3. you should change this to the required limit before deploying.
var pager = {pageNumber:1,paramMap:{}};
// global tag value variable
//var tag = "";
 
// change this variable to your DWR domain.
var dwrHome = APP_PATH;
 
var keyValue = [];

var paraObj = {};
paraObj["sortBy"] = "0";
paraObj["byAudio"] = true;
paraObj["byVideo"] = true;
paraObj["category"] = "All Audio and Video";
paraObj["perPage"] = "15";
paraObj["pageNumber"] = 1;
paraObj["tag"] = "";

function parseHashLocation(){
    var hash = location.hash.replace('#', '');
	var paraString = hash.split("$");		
    for(i = 0; i< paraString.length; i++){
	    var para = paraString[i].split("=");
		if(para[0]){
			paraObj[para[0]] = para[1];
		}
	}
	return paraString.length;
}

function resetHashLocation(){
	location.hash = "sortBy="+paraObj["sortBy"]+"$perPage="+paraObj["perPage"]+"$category="+paraObj["category"]+"$pageNumber="+paraObj["pageNumber"]+"$tag="+paraObj["tag"]+"$byAudio="+paraObj["byAudio"]+"$byVideo="+paraObj["byVideo"];
}

// init function after page is loaded
function dwrInit() {
    //DWREngine.setMethod(DWREngine.ScriptTag);
    d_AudioVideoService._path = dwrHome;
    var paraLength = parseHashLocation();

	$("#search-avl-byCategory").empty();
	$("#search-avl-byCategory").append("<option value=''>All Audio and Video</option>");
	
	if(paraLength == 1 && unescape(paraObj["category"]) == "All Audio and Video"){//the first time to load the news listing page
		document.getElementById("search-avl-byAudio").checked = true;
		document.getElementById("search-avl-byVideo").checked = true;
		d_AudioVideoService.getAudioVideoCategory({callback:_loadCategoriesCallBack});
		loadPage();
	}else if(paraLength == 7){//user click the back to results link 
		initToLoadingPage();
	}else{//user click the category in the news detail page
	     //loadpage until get category list 
		 if(paraObj["tag"] != ""){//user click the category in the news detail page
			document.getElementById("search-avl-byAudio").checked = true;
			document.getElementById("search-avl-byVideo").checked = true;
			d_AudioVideoService.getAudioVideoCategory({callback:_loadCategoriesCallBackV2});
		 }else{  //just use default
		 }
	} 
	
	
	
	



   initPageFields();
   // loadCategories();

   /* keyValue = getUrlVar();
    if(keyValue.length == 2){
    }else{
	loadPage();
    } */    
}

function initToLoadingPage(){
    
    DWRUtil.setValue("filter-avl-sort", paraObj["sortBy"]);
    DWRUtil.setValue("filter-avl-display", paraObj["perPage"]);
    document.getElementById("search-avl-byAudio").checked = (paraObj["byAudio"] == "true");
	document.getElementById("search-avl-byVideo").checked = (paraObj["byVideo"] == "true");
	d_AudioVideoService.getAudioVideoCategory({callback:_loadCategoriesCallBackV2});
}

function _loadCategoriesCallBackV2(categoryArray) {
    if (categoryArray != null || categoryArray.length != 0) {
        for (var i = 1; i <= category_list.length; i++) {
			for (var j = 1; j <= categoryArray.length; j++) {
				if(categoryArray[j - 1].name.toLowerCase() === category_list[i - 1].toLowerCase()){
					DWRUtil.addOptions("search-avl-byCategory", [{id: categoryArray[j - 1].id , name:category_list[i - 1]}], "id", "name");
				}
			}
        }
    }

	var ele = document.getElementById("search-avl-byCategory");
    for (i = 0; i < ele.options.length; i++) {
      if (ele.options[i].text.toLowerCase() == unescape(paraObj["category"].toLowerCase())) {
         DWRUtil.setValue("search-avl-byCategory", ele.options[i].value);
         //foundCategory = true;
         break;
      }
    } 
    
    if(isIE6OR7()){
    }else{
       $("#search-avl-byCategory").resetSS();
    }
   
	
	loadPage();
}

function isIE6OR7(){
   if(typeof IE_VERSION === 'undefined'){
   }else{
   return IE_VERSION == "IE6" || IE_VERSION == "IE7";    
   }
   return false;
}


function getUrlVar(){
   return window.location.href.slice(window.location.href.indexOf('?')+1).split('=');
}

function initPageFields() {
    
    $('#search-avl-byAudio').change(function() {
		paraObj["byAudio"] = document.getElementById("search-avl-byAudio").checked;
		paraObj["pageNumber"] = 1;
		resetHashLocation();		
        pager.pageNumber = 1;
        loadPage();
    });
    $('#search-avl-byVideo').change(function() {
		paraObj["byVideo"] = document.getElementById("search-avl-byVideo").checked;
		paraObj["pageNumber"] = 1;
		resetHashLocation();		
        pager.pageNumber = 1;
        loadPage();
    });
    $('#search-avl-byCategory').change(function() {
	    paraObj["category"] = $("#search-avl-byCategory option:selected").text();
		paraObj["pageNumber"] = 1;
		paraObj["tag"] = "";
		resetHashLocation();		
        pager.pageNumber = 1;
        loadPage();
    });
   
    $('#filter-avl-sort').change(function() {
		paraObj["sortBy"] = $("#filter-avl-sort").val();
		paraObj["pageNumber"] = 1;
		resetHashLocation();		
        pager.pageNumber = 1;
        loadPage();
    });
    $('#filter-avl-display').change(function() {
		paraObj["perPage"] = $("#filter-avl-display").val();
		paraObj["pageNumber"] = 1;
		resetHashLocation();		
        pager.pageNumber = 1;
        loadPage();
    });
}

function loadPage() {
    var isByAudio = document.getElementById("search-avl-byAudio").checked;
    var isByVideo = document.getElementById("search-avl-byVideo").checked;
    var sortBy = $("#filter-avl-sort").val();
    var recordsPerPage = $("#filter-avl-display").val();
    var category = $("#search-avl-byCategory").val();

    var subCategory = "";

    pager.limit = recordsPerPage;
    pager.paramMap.isByAudio = isByAudio;
    pager.paramMap.isByVideo = isByVideo;
    pager.paramMap.sortBy = sortBy;
    pager.paramMap.category = category;
    pager.paramMap.subCategory = subCategory;
    pager.paramMap.tag = paraObj["tag"];
    pager.list = [];
    d_AudioVideoService.getAudioVideoPager(pager, {callback:_pageLoadCallback});
}
function tags(_name) {
    tag = _name;
    loadPage();
}

function loadCategories() {
    $("#search-avl-byCategory").empty();
    $("#search-avl-byCategory").append("<option value=''>All Audio and Video</option>");
    d_AudioVideoService.getAudioVideoCategory({callback:_loadCategoriesCallBack});
}

function loadSubCategories() {
    $("#search-avl-bySubcategory").empty();
    $("#search-avl-bySubcategory").append("<option value=''>Sub category</option>");
    $('#search-avl-bySubcategory').resetSS();
}

function _loadCategoriesCallBack(categoryArray) {
    if (categoryArray != null || categoryArray.length != 0) {
        for (var i = 1; i <= category_list.length; i++) {
			for (var j = 1; j <= categoryArray.length; j++) {
				if(categoryArray[j - 1].name.toLowerCase() === category_list[i - 1].toLowerCase()){
					DWRUtil.addOptions("search-avl-byCategory", [{id: categoryArray[j - 1].id , name:category_list[i - 1]}], "id", "name");
				}
			}
        }
    }

    if(isIE6OR7()){
    }else{
       $("#search-avl-byCategory").resetSS();
    }
   /* if(keyValue.length == 2){
       if(keyValue[0] == "category"){
	     _byCategory(unescape(keyValue[1]));
	 }
    } */  
}


function _byCategory(categoryName){
    var ele = document.getElementById("search-avl-byCategory");
    var foundCategory = false;
    for (i = 0; i < ele.options.length; i++) {
      if (ele.options[i].text.toLowerCase() == categoryName.toLowerCase()) {
         DWRUtil.setValue("search-avl-byCategory", ele.options[i].value);
         foundCategory = true;
         break;
      }
    }

    if(!foundCategory){
        tag = categoryName;
    }
  
    if(isIE6OR7()){
    }else{
      $("#search-avl-byCategory").resetSS();
    }

    loadPage();
}




function onCategoryChange() {
    var categoryId = $("#search-avl-byCategory").val();
    if (categoryId == "") {
        $("#search-avl-bySubcategory").empty();
        $("#search-avl-bySubcategory").append("<option value=''>Sub category</option>");
        $('#search-avl-bySubcategory').resetSS();
        return;
    }
    d_AudioVideoService.getSubCategorysByCategoryId(categoryId, {callback:_onCategoryChangeCallBack});
}

function _onCategoryChangeCallBack(subCategoryArray) {

    $("#search-avl-bySubcategory").empty();
    $("#search-avl-bySubcategory").append("<option value=''>Sub category</option>");
    if (subCategoryArray != null || subCategoryArray.length != 0) {
        for (var i = 0; i < subCategoryArray.length; i++) {
            $("#search-avl-bySubcategory").append("<option value='" + subCategoryArray[i].id + "'>" + subCategoryArray[i].name + "</option>");
        }
    }

    $("#search-avl-bySubcategory").resetSS();

}

function _pageLoadCallback(tempPage) {
    pager = tempPage;
    generatePageBar();
    generateContent();
}
function generateContent() {
    var audioVideoList = pager.list;
    $("#returned_count").empty();
    $("#returned_count").append("[" + pager.total + "] [Audio &amp; Video] returned");
    $("#av-library").empty();
    var contentHtml = "<ul class='grid'>";
    for (var i = 0; i < audioVideoList.length; i++) {
        var tagStr = audioVideoList[i].tag;
        var tagArray = new Array();
        if (tagStr != null && tagStr != "") {
            tagArray = tagStr.split(",");
        }
        if (i % 3 == 0) {
            contentHtml += "<li class='clear'>";
        } else if (i % 3 == 1) {
            contentHtml += "<li>";
        } else {
            contentHtml += "<li class='last'>";
        }
        //contentHtml+=generateAudioVideoHtml(audioVideoList[i]);

        if(typeof(audioVideoList[i].thumbnail) === "undefined"){
		contentHtml += "<a href = '" + audio_video_dir + audioVideoList[i].dcrPath.replace(/.xml/, ".html") + "'><img src='/en/resources/global-en/placeholders/placeholder_168x95.gif' width='168' height='95'></a>";
	  }else{
            contentHtml += "<a href = '" + audio_video_dir + audioVideoList[i].dcrPath.replace(/.xml/, ".html") + "'><img src='"+audioVideoList[i].thumbnail+"' width='168' height='95' alt='" + audioVideoList[i].title + "' title='" + audioVideoList[i].title + "'></a>";
        }

        contentHtml += "<h3>" + audioVideoList[i].title + "</h3>";
	contentHtml += "<p>";  
	if(audioVideoList[i].publishDate.getDate() <=9){
		contentHtml += "0"+audioVideoList[i].publishDate.getDate()+"/";
	}
	else{
		contentHtml += audioVideoList[i].publishDate.getDate()+"/";
	}
	if((audioVideoList[i].publishDate.getMonth()+1)<10){
	contentHtml +="0"+(audioVideoList[i].publishDate.getMonth()+1) +"/"+audioVideoList[i].publishDate.getFullYear()+ "</p>";
	}
	else{
	contentHtml +=(audioVideoList[i].publishDate.getMonth()+1) +"/"+audioVideoList[i].publishDate.getFullYear()+ "</p>";
	}

        contentHtml += "<p><a href='" + audio_video_dir + audioVideoList[i].dcrPath.replace(/.xml/, ".html") + "' class='cta'>View video details</a></p>";
	contentHtml += "<p>";
       contentHtml += "Found in: ";
        
        for (var j = 0; j < tagArray.length; j++) {
            if (j == tagArray.length - 1) {
                contentHtml += '<a href="#" onclick="onTagClick(\'' + tagArray[j] + '\');return false;">' + tagArray[j] + '</a>';
            } else {
                contentHtml += '<a href="#" onclick="onTagClick(\'' + tagArray[j] + '\');return false;">' + tagArray[j] + '</a> | ';
            }
        }
        contentHtml += "</p>";

       
        contentHtml += "</li>";
    }
    contentHtml += "</ul>";
    $("#av-library").append(contentHtml);
}
function generateAudioVideoHtml(audioVideoObj) {
    var html = "";
    var url = audioVideoObj.url;
    if (audioVideoObj.type == "V") {
        html += '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" id="playerSWF" width="168" height="95">';
        html += '<param name="movie" value="http://www.standardchartered.tv/BluePlayer/SCBStandAloneVideoPlayer.swf"></param>';
        html += '<param name="allowFullScreen" value="true"></param>';
        html += '<param name="allowscriptaccess" value="always"></param>';
        html += '<param name="wmode" value="transparent"></param>';
        html += '<param name="FlashVars" value="contextType=rss&mediaURL=' + url + '&mediaType=video"></param>';
        html += '<embed name="playerSWF" src="http://www.standardchartered.tv/BluePlayer/SCBStandAloneVideoPlayer.swf" type="application/x-shockwave-flash"  allowscriptaccess="sameDomain" allowfullscreen="true" wmode="transparent" FlashVars="contextType=rss&mediaURL=' + url + '&mediaType=video" pluginspage="http://get.adobe.com/flashplayer/" width="168" height="95"/>';
        html += '</object>';

    } else {
        html += '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" id="playerSWF" width="168" height="95">';
        html += '<param name="movie" value="http://www.standardchartered.tv/BluePlayer/SCBStandAloneVideoPlayer.swf"></param>';
        html += '<param name="allowFullScreen" value="true"></param>';
        html += '<param name="allowscriptaccess" value="always"></param>';
        html += '<param name="wmode" value="transparent"></param>';
        html += '<param name="FlashVars" value="contextType=rss&mediaURL=' + url + '&mediaType=video"></param>';
        html += '<embed name="playerSWF" src="http://www.standardchartered.tv/BluePlayer/SCBStandAloneVideoPlayer.swf" type="application/x-shockwave-flash"  allowscriptaccess="sameDomain" allowfullscreen="true" wmode="transparent" FlashVars="contextType=rss&mediaURL=' + url + '&mediaType=video" pluginspage="http://get.adobe.com/flashplayer/" width="168" height="95"/>';
        html += '</object>';
    }
    return  html;
}

function generatePageBar() {
    var navigatePageNumbers = pager.navigatePageNumbers;
    var navigatePageNumbersLi = "";
    for (var i = 0; i < navigatePageNumbers.length; i++) {
        if (navigatePageNumbers[i] == pager.pageNumber) {
            navigatePageNumbersLi = navigatePageNumbersLi + "<li class='selected'><a href='#' onclick='gotoNextPage(" + navigatePageNumbers[i] + ");return false;'>" + navigatePageNumbers[i] + "</a></li> "
        } else if (i == navigatePageNumbers.length - 1) {
            navigatePageNumbersLi = navigatePageNumbersLi + "<li class='last'><a href='#' onclick='gotoNextPage(" + navigatePageNumbers[i] + ");return false;'>" + navigatePageNumbers[i] + "</a></li> "
        } else {
            navigatePageNumbersLi = navigatePageNumbersLi + "<li><a href='#' onclick='gotoNextPage(" + navigatePageNumbers[i] + ");return false;'>" + navigatePageNumbers[i] + "</a></li> "
        }
    }
    appendPageBar($("#content_pagination1"), navigatePageNumbersLi);
    appendPageBar($("#content_pagination2"), navigatePageNumbersLi);
}


function appendPageBar(elmentToAppend, navigatePageNumbersLi) {
    elmentToAppend.empty();
    elmentToAppend.append(
            "<ul class='pagination-nav'>" +
            "<li class='prev-page'><a href='#' onclick='gotoNextPage(" + (pager.pageNumber - 1) + ");return false;'>&lt;</a></li> " +
            "<li class='index'>" +
            "<ul>" + navigatePageNumbersLi +

            "</ul>" +
            "</li>" +
            "<li class='next-page'><a href='#' onclick='gotoNextPage(" + (pager.pageNumber + 1) + ");return false;'>&gt;</a></li>" +
            "<li class='first-page'><a href='#' onclick='gotoNextPage(" + 1 + ");return false;'>|&lt;</a></li>" +
            "<li class='last-page'><a href='#' onclick='gotoNextPage(" + pager.pages + ");return false;'>&gt;|</a></li>" +
            "</ul>" +
            "<p class='pagination-range'>Displaying <span id='range-min'>" +
            (pager.total > 0 ? ((pager.pageNumber - 1) * pager.limit + 1): 0)  +
            "</span> to  <span id='range-max'>" +
            (pager.total < pager.pageNumber * pager.limit ? pager.total : pager.pageNumber * pager.limit) +
            "</span> of " +
            "<span id='total-set'>" +
            pager.total +
            "</span> matches " +
            "</p>");
}

function gotoNextPage(page) {

    if (page > pager.pages || page < 1) {
        return;
    }
	paraObj["pageNumber"] = page;
	resetHashLocation();	
    pager.pageNumber = page;
    loadPage();
}

function onTagClick(tagVal) {
  //  document.getElementById("search-avl-byAudio").checked = true;
  //  document.getElementById("search-avl-byVideo").checked = true;
  //  document.getElementById("search-avl-byCategory").value = "";
  //  $('#search-avl-bySubcategory').empty();


   /*var ele = document.getElementById("search-avl-byCategory");
   for (i = 0; i < ele.options.length; i++) {
      if (ele.options[i].text.toLowerCase() == tagVal.toLowerCase()) {
        DWRUtil.setValue("search-avl-byCategory", ele.options[i].value);
      }
    }
 

    if(isIE6OR7()){
    }else{
       $('#search-avl-bySubcategory').resetSS();
       $('#search-avl-byCategory').resetSS();
    }*/
    
    pager.pageNumber = 1;
	paraObj["pageNumber"] = 1;
    //tag = tagVal;
	  
	if(tagVal.indexOf(' ') > 0){
		tagVal = tagVal.substring(0, tagVal.indexOf(' '));
	}
	     
	paraObj["tag"] = tagVal;
	resetHashLocation();	
    loadPage();
}