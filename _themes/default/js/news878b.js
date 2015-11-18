/**
 * Created by IntelliJ IDEA.
 * Date: 9/1/11
 * Time: 12:58 PM
 * To change this template use File | Settings | File Templates.
 */
var pager = {total:0,limit:5,pageNumber:1,paramMap:{regionId:"0",newsCategoryId:"0",publishPeriodType:"0"}};

var category_list = ["Corporate", "Financial", "Business", "Research", "Sustainability", "Sponsorship", "Careers"];

var keyValue = [];

var paraObj = {};
paraObj["region"] = "All regions";
paraObj["date"] = "All dates";
paraObj["category"] = "All";
paraObj["pageNumber"] = 1;

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
	location.hash = "region="+paraObj["region"]+"$date="+paraObj["date"]+"$category="+paraObj["category"]+"$pageNumber="+paraObj["pageNumber"];
}

function dwrInit() {
    d_NewsService._path = APP_PATH;
	var paraLength = parseHashLocation();
	if(paraLength == 1 && unescape(paraObj["region"]) == "All regions" && paraObj["category"] == "All"){//the first time to view the news listing page
		 d_NewsService.getNewsCategoryList({callback:_newsCategoryCallBack});
		 d_NewsService.getRegionList({callback:_regionCallBack});
		 d_NewsService.getYearList({callback:_yearListCallBack});
		 loadPage();
	}else if(paraLength == 4){//user click the back to results link 
		initToLoadingPage();
	}else{//user click the category in the news detail page
	     //loadpage until get category list 
		 if(unescape(paraObj["region"]) != "All regions"){//user click the category in the news detail page
			d_NewsService.getNewsCategoryList({callback:_newsCategoryCallBack});
			d_NewsService.getRegionList({callback:_regionCallBack_loadPage});
			d_NewsService.getYearList({callback:_yearListCallBack});
		 }else if(paraObj["category"] != "All"){//user click the category in the news detail page
			d_NewsService.getNewsCategoryList({callback:_newsCategoryCallBack_loadPage});
			d_NewsService.getRegionList({callback:_regionCallBack});
			d_NewsService.getYearList({callback:_yearListCallBack});
		 }else{  //just use default
		 }
	}
	 


    $("#search-news-byRegion").change(function() {   
	    paraObj["region"] = $("#search-news-byRegion option:selected").text();
		paraObj["pageNumber"] = "1";
		resetHashLocation();		
        pager.pageNumber = 1;
        pager.paramMap.regionId = $("#search-news-byRegion").val();
        pager.paramMap.newsCategoryId = getNewCategoryId();
        pager.paramMap.publishPeriodType = $("#filter-news-date-top").val();
        loadPage();
    });

    $("#newsCategory").change(function() {
		paraObj["category"] = getNewCategoryText();
		paraObj["pageNumber"] = "1";
		resetHashLocation();			
        pager.pageNumber = 1;
        pager.paramMap.regionId = $("#search-news-byRegion").val();
        pager.paramMap.newsCategoryId = getNewCategoryId();
        pager.paramMap.publishPeriodType = $("#filter-news-date-top").val();
        loadPage();
    });

    $("#filter-news-date-top").change(function() {

	    paraObj["date"] = $("#filter-news-date-top option:selected").text();
		paraObj["pageNumber"] = "1";
		resetHashLocation();	
        DWRUtil.setValue("filter-news-date-bottom", DWRUtil.getValue("filter-news-date-top"));
        
        if(isIE6OR7()){
        }else{
          $("#filter-news-date-bottom").resetSS();
        }
         
        pager.paramMap.regionId = $("#search-news-byRegion").val();
		paraObj["pageNumber"] = "1";
		pager.pageNumber = 1;
        pager.paramMap.newsCategoryId = getNewCategoryId();
        pager.paramMap.publishPeriodType = $("#filter-news-date-top").val();
        loadPage();
    });

    $("#filter-news-date-bottom").change(function() {

	    paraObj["date"] = $("#filter-news-date-bottom option:selected").text();
		paraObj["pageNumber"] = "1";
		resetHashLocation();	
        DWRUtil.setValue("filter-news-date-top", DWRUtil.getValue("filter-news-date-bottom"));
        if(isIE6OR7()){
        }else{
           $("#filter-news-date-top").resetSS();
        }

        pager.pageNumber = 1;
        pager.paramMap.regionId = $("#search-news-byRegion").val();
        pager.paramMap.newsCategoryId = getNewCategoryId();
        pager.paramMap.publishPeriodType = $("#filter-news-date-bottom").val();
        loadPage();
    });
}

function initToLoadingPage(){
	d_NewsService.getNewsCategoryList({callback:_newsCategoryCallBackV2});
		//d_NewsService.getRegionList({callback:_regionCallBack});
		//d_NewsService.getYearList({callback:_yearListCallBack});


}

function _newsCategoryCallBackV2(newsCategoryList) {
	
    $("#newsCategory").empty();

            radionActive = "radio active selected";
            $("#newsCategory").append("<li class='" + radionActive + "'>" +
                                      "<input type='radio' id='search-news-category-0' name='grp-news-category' checked='checked' value='0'>" +
                                      "<label for='search-news-category-0'> All </label></li>");


	for (var i = 1; i <= category_list.length; i++) {
   		for (var j = 1; j <= newsCategoryList.length; j++) {
			if(newsCategoryList[j - 1].name == category_list[i - 1]){
	 			radionActive = "radio";
                $("#newsCategory").append("<li class='" + radionActive + "'>" +
                                      "<input type='radio' id='search-news-category-" + i + "' name='grp-news-category' value='" + newsCategoryList[j - 1].id + "'>" +
                                      "<label for='search-news-category-" + i + "'> " + newsCategoryList[j - 1].name + " </label></li>");
 
				 break;	
			}
		}
   	}
 
	var ele = document.getElementsByName("grp-news-category");
	for (i = 0; i < ele.length; i++) {
	  if (Utils.trim(ele[i].nextSibling.innerHTML) == unescape(paraObj["category"])) {
         DWRUtil.setValue(ele[i].id, true);
      }
    }
 
	d_NewsService.getRegionList({callback:_regionCallBackV2});
    Forms.initFormNavV2($("#form-carousel"));
}


function _regionCallBackV2(regionList) {  
	 
    DWRUtil.removeAllOptions("search-news-byRegion");
    DWRUtil.addOptions("search-news-byRegion", [{id:0, name:"All regions"}], "id", "name");
    DWRUtil.addOptions("search-news-byRegion", regionList, "id", "name");
	
	var ele = document.getElementById("search-news-byRegion");
	for (i = 0; i < ele.options.length; i++) {
      if (ele.options[i].text == unescape(paraObj["region"])) {
        DWRUtil.setValue("search-news-byRegion", ele.options[i].value);
      }
    }
	
	d_NewsService.getYearList({callback:_yearListCallBackV2});
   
   if(isIE6OR7()){
    }else{
       $("#search-news-byRegion").resetSS();
    }
	
}

function _yearListCallBackV2(yearList){
    DWRUtil.removeAllOptions("filter-news-date-top");
    DWRUtil.addOptions("filter-news-date-top", [{id:0, name:"All dates"}], "id", "name");
    DWRUtil.addOptions("filter-news-date-top", yearList);
    
	var ele = document.getElementById("filter-news-date-top");
	for (i = 0; i < ele.options.length; i++) {
      if (ele.options[i].text == unescape(paraObj["date"])) {
        DWRUtil.setValue("filter-news-date-top", ele.options[i].value);
      }
    }
	
	
    if(isIE6OR7()){
    }else{
      $("#filter-news-date-top").resetSS();
    } 
	
    DWRUtil.removeAllOptions("filter-news-date-bottom");
    DWRUtil.addOptions("filter-news-date-bottom", [{id:0, name:"All dates"}], "id", "name");
    DWRUtil.addOptions("filter-news-date-bottom", yearList);
	
	var ele = document.getElementById("filter-news-date-bottom");
	for (i = 0; i < ele.options.length; i++) {
      if (ele.options[i].text == paraObj["date"]) {
        DWRUtil.setValue("filter-news-date-bottom", ele.options[i].value);
      }
    }
	
    if(isIE6OR7()){
    }else{
      $("#filter-news-date-bottom").resetSS(); 
    }
	
	 pager.pageNumber = paraObj["pageNumber"];
     pager.paramMap.regionId = $("#search-news-byRegion").val();
     pager.paramMap.newsCategoryId = getNewCategoryId();
     pager.paramMap.publishPeriodType = $("#filter-news-date-bottom").val();
     loadPage();

} 

function getUrlVar(){
    return window.location.href.slice(window.location.href.indexOf('?')+1).split('=');
 }

function getNewCategoryId() {
    $carousel = $("#form-carousel").find(".viewport").children();
    $selected = $carousel.find("input[name='grp-news-category']:checked");
    return $selected.val();
}

function getNewCategoryText() {
    $carousel = $("#form-carousel").find(".viewport").children();
    $selected = $carousel.find("input[name='grp-news-category']:checked");
    return Utils.trim($selected[0].nextSibling.innerHTML);
}

function loadPage() {
    pager.list = [];
    d_NewsService.getPager(pager, {callback:_newsCallback});
}

function _newsCategoryCallBack(newsCategoryList) {
    $("#newsCategory").empty();

            radionActive = "radio active selected";
            $("#newsCategory").append("<li class='" + radionActive + "'>" +
                                      "<input type='radio' id='search-news-category-0' name='grp-news-category' checked='checked' value='0'>" +
                                      "<label for='search-news-category-0'> All </label></li>");


	for (var i = 1; i <= category_list.length; i++) {
   		for (var j = 1; j <= newsCategoryList.length; j++) {
			if(newsCategoryList[j - 1].name == category_list[i - 1]){
	 			radionActive = "radio";
                $("#newsCategory").append("<li class='" + radionActive + "'>" +
                                      "<input type='radio' id='search-news-category-" + i + "' name='grp-news-category' value='" + newsCategoryList[j - 1].id + "'>" +
                                      "<label for='search-news-category-" + i + "'> " + newsCategoryList[j - 1].name + " </label></li>");
 
				 break;	
			}
		}
   	}
 
    Forms.initFormNavV2($("#form-carousel"));
}
 
function _newsCategoryCallBack_loadPage(newsCategoryList) {
    $("#newsCategory").empty();

            radionActive = "radio active selected";
            $("#newsCategory").append("<li class='" + radionActive + "'>" +
                                      "<input type='radio' id='search-news-category-0' name='grp-news-category' checked='checked' value='0'>" +
                                      "<label for='search-news-category-0'> All </label></li>");


	for (var i = 1; i <= category_list.length; i++) {
   		for (var j = 1; j <= newsCategoryList.length; j++) {
			if(newsCategoryList[j - 1].name == category_list[i - 1]){
	 			radionActive = "radio";
                $("#newsCategory").append("<li class='" + radionActive + "'>" +
                                      "<input type='radio' id='search-news-category-" + i + "' name='grp-news-category' value='" + newsCategoryList[j - 1].id + "'>" +
                                      "<label for='search-news-category-" + i + "'> " + newsCategoryList[j - 1].name + " </label></li>");
 
				 break;	
			}
		}
   	}
 
    Forms.initFormNavV2($("#form-carousel"));
 
	_byCategory(unescape(paraObj["category"]));
	 

}


function _regionCallBack(regionList) {
    /*$("#search-news-byRegion").empty();
     $("#search-news-byRegion").append("<option value='0'>Global</option>");
     for (var i = 0; i < regionList.length; i++) {
     $("#search-news-byRegion").append("<option value='" + regionList[i].id + "'>");
     $("#search-news-byRegion").append(regionList[i].name + "</option>");
     }
     $("#search-news-byRegion").resetSS();*/

    DWRUtil.removeAllOptions("search-news-byRegion");
    DWRUtil.addOptions("search-news-byRegion", [{id:0, name:"All regions"}], "id", "name");
    DWRUtil.addOptions("search-news-byRegion", regionList, "id", "name");
    

    if(isIE6OR7()){
    }else{
       $("#search-news-byRegion").resetSS();
    }
} 

function _regionCallBack_loadPage(regionList) {
    /*$("#search-news-byRegion").empty();
     $("#search-news-byRegion").append("<option value='0'>Global</option>");
     for (var i = 0; i < regionList.length; i++) {
     $("#search-news-byRegion").append("<option value='" + regionList[i].id + "'>");
     $("#search-news-byRegion").append(regionList[i].name + "</option>");
     }
     $("#search-news-byRegion").resetSS();*/

    DWRUtil.removeAllOptions("search-news-byRegion");
    DWRUtil.addOptions("search-news-byRegion", [{id:0, name:"All regions"}], "id", "name");
    DWRUtil.addOptions("search-news-byRegion", regionList, "id", "name");
    

    if(isIE6OR7()){
    }else{
       $("#search-news-byRegion").resetSS();
    }
    
	_byRegion(unescape(paraObj["region"]));

}


function _yearListCallBack(yearList){
    DWRUtil.removeAllOptions("filter-news-date-top");
    DWRUtil.addOptions("filter-news-date-top", [{id:0, name:"All dates"}], "id", "name");
    DWRUtil.addOptions("filter-news-date-top", yearList);
    
    if(isIE6OR7()){
    }else{
      $("#filter-news-date-top").resetSS();
    }
    

    DWRUtil.removeAllOptions("filter-news-date-bottom");
    DWRUtil.addOptions("filter-news-date-bottom", [{id:0, name:"All dates"}], "id", "name");
    DWRUtil.addOptions("filter-news-date-bottom", yearList);
    if(isIE6OR7()){
    }else{
      $("#filter-news-date-bottom").resetSS(); 
    }

} 

function isIE6OR7(){
   if(typeof IE_VERSION === 'undefined'){
   }else{
   return IE_VERSION == "IE6" || IE_VERSION == "IE7";    
   }
   return false;
}

function _newsCallback(newsPager) {
    newsPagerList = newsPager.list;
    pager = newsPager;
    $("#news").empty();
    for (i = 0; i < newsPagerList.length; i++) {
        newsVO = newsPagerList[i];
        for (j = 0; j < newsVO.newsCategory.length; j++){
            if(j == 0){
                categoryDisplay = "<a href='#' onclick='_byCategory(\"" + newsVO.newsCategory[j].name + "\");return false;'>"+ newsVO.newsCategory[j].name + "</a>";
            }else{
                categoryDisplay = categoryDisplay +", <a href='#' onclick='_byCategory(\"" + newsVO.newsCategory[j].name + "\");return false;'>"+ newsVO.newsCategory[j].name + "</a>";;
            }
        }

		if( i == 0){
			$("#news").append("<li class='item first' style='padding-right: 0px;'> " +
                          "<h3><a href='"+newsVO.dcrPath.replace(/.xml/, ".html")+"' >"+newsVO.title+"</a></h3>" +
                          "<div class='item-detail'>" +
                          "<p class='time-stamp'><span class='date'>" + dateFormatConvert(newsVO.publishDate) + "</span>" + categoryDisplay + " / <a href='#' onclick='_byRegion(\"" + newsVO.region + "\");return false;'>" + newsVO.region + "</a></p>" +
                          "</div>" +
                          "<p>" + newsVO.listingSummary + "<a href='"+newsVO.dcrPath.replace(/.xml/, ".html")+"' class='cta'>&nbsp;</a></p>" +
                          "</li>");
		
		}else{
			$("#news").append("<li class='item first' style='padding-right: 0px;'><p></p>" +
                          "<h3><a href='"+newsVO.dcrPath.replace(/.xml/, ".html")+"' >"+newsVO.title+"</a></h3>" +
                          "<div class='item-detail'>" +
                          "<p class='time-stamp'><span class='date'>" + dateFormatConvert(newsVO.publishDate) + "</span>" + categoryDisplay + " / <a href='#' onclick='_byRegion(\"" + newsVO.region + "\");return false;'>" + newsVO.region + "</a></p>" +
                          "</div>" +
                          "<p>" + newsVO.listingSummary + "<a href='"+newsVO.dcrPath.replace(/.xml/, ".html")+"' class='cta'>&nbsp;</a></p>" +
                          "</li>");
		}
		 
    }

    _generatePageBar();

}

function _byCategory(categoryName){
 
	var ele = document.getElementsByName("grp-news-category");
	for (i = 0; i < ele.length; i++) {
	  if (Utils.trim(ele[i].nextSibling.innerHTML) == categoryName) {
         DWRUtil.setValue(ele[i].id, true);
      }
    }
	Forms.initFormNavV2($("#form-carousel"));

	if(categoryName != paraObj["category"]){ //click the region link in one item in the listing page
		paraObj["category"] = categoryName;
		resetHashLocation();
		pager.pageNumber = 1;
	}else{
	    pager.pageNumber = paraObj["pageNumber"];
	}	
	
	
	pager.paramMap.regionId = $("#search-news-byRegion").val();
	pager.paramMap.newsCategoryId = getNewCategoryId();
	pager.paramMap.publishPeriodType = $("#filter-news-date-top").val();
	loadPage();
}

function _byRegion(regionName){
	var ele = document.getElementById("search-news-byRegion");
	for (i = 0; i < ele.options.length; i++) {
      if (ele.options[i].text == regionName) {
        DWRUtil.setValue("search-news-byRegion", ele.options[i].value);
      }
    }
         
    if(isIE6OR7()){
    }else{
      $("#search-news-byRegion").resetSS();
    }

	if(regionName != paraObj["region"]){  //click the region link in one item in the listing page
		paraObj["region"] = regionName;
		resetHashLocation();
		pager.pageNumber = 1; 
	}else{
	    pager.pageNumber = paraObj["pageNumber"];
	} 
	 
	pager.paramMap.regionId = $("#search-news-byRegion").val();
	pager.paramMap.newsCategoryId = getNewCategoryId();
	pager.paramMap.publishPeriodType = $("#filter-news-date-top").val();
	loadPage();
}

function _gotoNextPage(pager, page) {
    pager.pageNumber = page;
    loadPage();
}

function _generatePageBar() {
    var navigatePageNumbers = pager.navigatePageNumbers;
    var navigatePageNumbersLi = "";
    for (var i = 0; i < navigatePageNumbers.length; i++) {
        if (navigatePageNumbers[i] == pager.pageNumber) {
            navigatePageNumbersLi = navigatePageNumbersLi + "<li class='selected'><a href='#' onClick='gotoNextPage("+navigatePageNumbers[i] + ");return false;'>" + navigatePageNumbers[i] + "</a></li> "
        } else if (i == navigatePageNumbers.length - 1) {
            navigatePageNumbersLi = navigatePageNumbersLi + "<li class='last'><a href='#' onClick='gotoNextPage("+navigatePageNumbers[i] + ");return false;'>" + navigatePageNumbers[i] + "</a></li> "
        } else {
            navigatePageNumbersLi = navigatePageNumbersLi + "<li><a href='#' onClick='gotoNextPage("+navigatePageNumbers[i] + ");return false;'>" + navigatePageNumbers[i] + "</a></li> "
        }
    }
    _appendPageBar($("#pagination-nav-top"), navigatePageNumbersLi);
    _appendPageBar($("#pagination-nav-bottom"), navigatePageNumbersLi);
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

function dateFormatConvert(str){ //convert str from yyyy-dd-mm to dd/mm/yyyy
	var ele = str.split("-");
	if(ele.length == 3){
		return ele[2]+"/"+ele[1]+"/"+ele[0];
	}
	return str;
}

function _appendPageBar(elmentToAppend, navigatePageNumbersLi) {
    elmentToAppend.empty();
    elmentToAppend.append(
            "<ul class='pagination-nav'>" +
            "<li class='prev-page'><a href='#' onClick='gotoNextPage(" + (pager.pageNumber - 1) + ");return false;'>&lt;</a></li> " +
            "<li class='index'>" +
            "<ul>" + navigatePageNumbersLi +

            "</ul>" +
            "</li>" +
            "<li class='next-page'><a href='#' onClick='gotoNextPage(" + (pager.pageNumber + 1) + ");return false;'>&gt;</a></li>" +
            "<li class='first-page'><a href='#' onClick='gotoNextPage(" + 1 + ");return false;'>|&lt;</a></li>" +
            "<li class='last-page'><a href='#' onClick='gotoNextPage(" + pager.pages + ");return false;'>&gt;|</a></li>" +
            "</ul>" +
            "<p class='pagination-range'>Displaying <span id='range-min'>" +
            (pager.total > 0 ? ((pager.pageNumber - 1) * pager.limit + 1): 0) +
            "</span> to  <span id='range-max'>" +
            (pager.total < pager.pageNumber * pager.limit ? pager.total : pager.pageNumber * pager.limit) +
            "</span> of " +
            "<span id='total-set'>" +
            pager.total +
            "</span> matches " +
            "</p>");
}
