/**
 * Created by IntelliJ IDEA.
 * Date: 9/1/11
 * Time: 12:58 PM
 * To change this template use File | Settings | File Templates.
 */
var pager = {total:0,limit:5,pageNumber:1,paramMap:{regionId:"0",newsCategoryId:"0",publishPeriodType:"0"}};

var category_list = ["Corporate", "Financial", "Business", "Research", "Sustainability", "Sponsorship", "Careers"];

var paraObj = {};
paraObj["region"] = "All regions";
paraObj["category"] = "All";

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
	location.hash = "region="+paraObj["region"]+"$category="+paraObj["category"];
}


function dwrInit() {

    d_NewsService._path = APP_PATH;
   
    var paraLength = parseHashLocation();
    if(paraLength == 1 && unescape(paraObj["region"]) == "All regions" && paraObj["category"] == "All"){//the first time to load the news-media listing page
		d_NewsService.getNewsCategoryList({callback:_newsCategoryCallBack});
		d_NewsService.getRegionList({callback:_regionCallBack});
		loadPage();
	}else if(paraLength == 2){//user click the back to results link 
		initToLoadingPage();
	}else{
	}	
	
    $("#search-news-byRegion").change(function() {
		paraObj["region"] = $("#search-news-byRegion option:selected").text();
		resetHashLocation();		
        pager.pageNumber = 1;
        pager.paramMap.regionId = $("#search-news-byRegion").val();
        pager.paramMap.newsCategoryId = getNewCategoryId();
        loadPage();
    });

    $("#newsCategory").change(function() {
	    paraObj["category"] = getNewCategoryText();
		resetHashLocation();	
        pager.pageNumber = 1;
        pager.paramMap.regionId = $("#search-news-byRegion").val();
        pager.paramMap.newsCategoryId = getNewCategoryId();
        loadPage();
    });
	    
 }
 
 function getNewCategoryText() {
    $carousel = $("#form-carousel").find(".viewport").children();
    $selected = $carousel.find("input[name='grp-news-category']:checked");
    return Utils.trim($selected[0].nextSibling.innerHTML);
}
 
 function initToLoadingPage(){
	 d_NewsService.getNewsCategoryList({callback:_newsCategoryCallBackV2}); 
}

function _newsCategoryCallBackV2(newsCategoryList) {
    $("#newsCategory").empty();
    $("#newsCategory").append("<li class='radio active selected'>" +
                                      "<input type='radio' id='search-news-category-0' name='grp-news-category' checked='checked' value='0'>" +
                                      "<label for='search-news-category-0'>All</label></li>");
   
   for (var i = 1; i <= category_list.length; i++) {
   		for (var j = 1; j <= newsCategoryList.length; j++) {
			if(newsCategoryList[j - 1].name == category_list[i - 1]){
				 $("#newsCategory").append("<li class='radio'>" +
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
	
	 
    pager.paramMap.regionId = $("#search-news-byRegion").val();
    pager.paramMap.newsCategoryId = getNewCategoryId();
    loadPage();

	
    if(isIE6OR7()){
    }else{
      $("#search-news-byRegion").resetSS();
    }
    
}


function isIE6OR7(){
   if(typeof IE_VERSION === 'undefined'){
   }else{
   return IE_VERSION == "IE6" || IE_VERSION == "IE7";    
   }
   return false;
}


function getNewCategoryId() {
    $carousel = $("#form-carousel").find(".viewport").children();
    $selected = $carousel.find("input[name='grp-news-category']:checked");
    return $selected.val();
}

function loadPage() {
    pager.list = [];
    d_NewsService.getNewsMediaPager(pager, {callback:_newsCallback});
}

function _newsCategoryCallBack(newsCategoryList) {
    $("#newsCategory").empty();
    $("#newsCategory").append("<li class='radio active selected'>" +
                                      "<input type='radio' id='search-news-category-0' name='grp-news-category' checked='checked' value='0'>" +
                                      "<label for='search-news-category-0'>All</label></li>");
   
   for (var i = 1; i <= category_list.length; i++) {
   		for (var j = 1; j <= newsCategoryList.length; j++) {
			if(newsCategoryList[j - 1].name == category_list[i - 1]){
				 $("#newsCategory").append("<li class='radio'>" +
                                  "<input type='radio' id='search-news-category-" + i + "' name='grp-news-category' value='" + newsCategoryList[j - 1].id + "'>" +
                                  "<label for='search-news-category-" + i + "'> " + newsCategoryList[j - 1].name + " </label></li>");
				  break;	
			}
		}
   }
   
   Forms.initFormNavV2($("#form-carousel"));
}

function _regionCallBack(regionList) {
    DWRUtil.removeAllOptions("search-news-byRegion");
    DWRUtil.addOptions("search-news-byRegion", [{id:0, name:"All regions"}], "id", "name");
    DWRUtil.addOptions("search-news-byRegion", regionList, "id", "name");

    if(isIE6OR7()){
    }else{
      $("#search-news-byRegion").resetSS();
    }
    
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
	}

	pager.pageNumber = 1;
	pager.paramMap.regionId = $("#search-news-byRegion").val();
	pager.paramMap.newsCategoryId = getNewCategoryId();
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
	}

	pager.pageNumber = 1;
	pager.paramMap.regionId = $("#search-news-byRegion").val();
	pager.paramMap.newsCategoryId = getNewCategoryId();
	loadPage();
}


function _newsCallback(newsPager) {
    newsPagerList = newsPager.list;
    pager = newsPager;
    $("#featured-news").empty();
    $("#recent-news").empty();
	 
	var sizeOfFeatureNews = 0; 
	var sizeOfRecentNews = 0; 
	 
    for (i = 0; i < newsPagerList.length; i++) {
        newsVO = newsPagerList[i];
        for (j = 0; j < newsVO.newsCategory.length; j++){
           /* if(j == 0){
                categoryDisplay = newsVO.newsCategory[j].name;
            }else{
                categoryDisplay = categoryDisplay +", "+ newsVO.newsCategory[j].name;
            }*/

		if(j == 0){
                categoryDisplay = "<a href='javascript:void(0)' onclick='_byCategory(\"" + newsVO.newsCategory[j].name + "\")'>"+ newsVO.newsCategory[j].name + "</a>";
            }else{
                categoryDisplay = categoryDisplay +", <a href='javascript:void(0)' onclick='_byCategory(\"" + newsVO.newsCategory[j].name + "\")'>"+ newsVO.newsCategory[j].name + "</a>";;
            }

        }

            var title = newsVO.title.replace("\"", "&#34;").replace("\'", "&#39;");
        if(newsVO.featured == '1'){
		    sizeOfFeatureNews = sizeOfFeatureNews + 1;

            $("#featured-news").append("<li class='item article' style='padding-right:0px;'>"+
									"<a href='news/"+newsVO.dcrPath.replace(/.xml/, ".html")+"' ><img src='"+newsVO.listingImage+"' width='168' height='95' alt='"+title+"' + title='"+title+"' /></a> "+
									"<h4><a href='news/"+newsVO.dcrPath.replace(/.xml/, ".html")+"' >"+title+"</a></h4>"+
									"<p class='date'>"+newsVO.publishDate+"</p> "+
									"<p>"+newsVO.listingSummary+"</p>"+
								    "</li>");
        }else{
			sizeOfRecentNews = sizeOfRecentNews + 1; 
            $("#recent-news").append("<li class='item' style='padding-right:0px;'>"+
                                    "<h3><a href='news/"+newsVO.dcrPath.replace(/.xml/, ".html")+"' >"+title+"</a></h3>"+
                                    "<div class='item-detail'>"+
                                        "<p class='time-stamp'><span class='date'>"+newsVO.publishDate+"</span>"+categoryDisplay+" / <a href='javascript:void(0)' onclick='_byRegion(\"" + newsVO.region + "\")'>" + newsVO.region+"</a></p>"+
                                     "</div>"+
									"<p>"+newsVO.listingSummary+"</p>"+
								    "</li>");
        }

		$("#featured-news").removeClass();
		if(sizeOfFeatureNews == 0){ //reset css, hide the line...	
		}else{
			$("#featured-news").addClass("listing");
		}
		
		$("#recent-news").removeClass();
		if(sizeOfRecentNews == 0){ //reset css, hide the line...	
		}else{
			$("#recent-news").addClass("listing");
		}
    }
}
