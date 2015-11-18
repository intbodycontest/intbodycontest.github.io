/**
 * Date: 11-8-29
 * Time: PM 10:17
 */
var pager = {limit:15, pageNumber:1, navigatePages:1, paramMap:{}};

var category_list = ["Financials", "Liverpool Football Club", "Marathons", "Our brand", "Our offices","People","Policies", "Research and reports", "Sustainability","Standard Chartered Explains"];

var paraObj = {};
paraObj["category"] = "Please select a category";
paraObj["sortBy"] = "Newest first";
paraObj["perPage"] = 15;
paraObj["audio"] = false;
paraObj["video"] = false;
paraObj["image"] = false;
paraObj["document"] =false;
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
	location.hash = "category="+paraObj["category"]+"$sortBy="+paraObj["sortBy"]+"$perPage="+paraObj["perPage"]+"$audio="+paraObj["audio"]+"$video="+paraObj["video"]+"$image="+paraObj["image"]+"$document="+paraObj["document"]+"$pageNumber="+paraObj["pageNumber"];
}

function dwrInit(){
    d_DownloadService._path=APP_PATH;
	var paraLength = parseHashLocation();
	if(paraLength == 1 && unescape(paraObj["category"]) == "Please select a category"){
		initPageFields();
		loadCategory();
	}else if(paraLength == 8){//user click the back to results link 
		initPageFieldsV2();
		initToLoadingPage();
	}
	
	
   
}

function initToLoadingPage(){


	DWRUtil.setValue("filter-dl-sort", paraObj["sortBy"]);
	DWRUtil.setValue("filter-dl-show", paraObj["perPage"]);
	
    document.getElementById("type-audio").checked = (paraObj["audio"] == "true");
	document.getElementById("type-video").checked = (paraObj["video"] == "true");
	document.getElementById("type-image").checked = (paraObj["image"] == "true");
	document.getElementById("type-document").checked = (paraObj["document"] == "true");
	 
	d_DownloadService.getCategoryList({callback:categoryCallBackV2});
}

function categoryCallBackV2(categoryList){
    DWRUtil.removeAllOptions("search-byCategory");
    DWRUtil.addOptions("search-byCategory",[{id:-1, name:"Please select a category"},{id: -2, name:"All"}], "id", "name");
	for (var i = 1; i <= category_list.length; i++) {
   		for (var j = 1; j <= categoryList.length; j++) {
			if(categoryList[j - 1].name.toLowerCase() === category_list[i - 1].toLowerCase()){
	 		    DWRUtil.addOptions("search-byCategory", [{id: categoryList[j - 1].id , name:category_list[i - 1]}], "id", "name");
			}
		}
   	}
 
 
	var ele = document.getElementById("search-byCategory");
	for (i = 0; i < ele.options.length; i++) {
      if (ele.options[i].text == unescape(paraObj["category"])) {
        DWRUtil.setValue("search-byCategory", ele.options[i].value);
      }
    } 
	
    if(isIE6OR7()){
    }else{
       $("#search-byCategory").resetSS();
    } 
	
	 pager.pageNumber = paraObj["pageNumber"];
     pager.paramMap.newsCategoryId = $("#search-byCategory").val();
     loadPage();

     
}


function isIE6OR7(){
   if(typeof IE_VERSION === 'undefined'){
   }else{
   return IE_VERSION == "IE6" || IE_VERSION == "IE7";    
   }
   return false;
}

function _byCategory(categoryName){
	    
		//hide the feature section using css
		$("#featureDiv").hide();
		$("#searchResultDiv").show();
		
		pager.pageNumber = 1;
		
		var ele = document.getElementById("search-byCategory");
        for (i = 0; i < ele.options.length; i++) {
           if (ele.options[i].text.toLowerCase() == categoryName.toLowerCase()) {
              pager.paramMap.categoryId = ele.options[i].value;
			  break;
           }
        }
		 
		
		document.getElementById("type-document").checked = true;		
		wrapResetHashLocation(); 	
		
        pager.paramMap.subCategoryId = "-2";//DWRUtil.getValue("search-bySubcategory");
        pager.paramMap.tagName = "";

         var filterType = "D,";
         
         pager.paramMap.objectType = filterType;
         pager.paramMap.order = DWRUtil.getValue("filter-dl-sort");
         pager.limit = DWRUtil.getValue("filter-dl-show");
		 
         loadPage();
	
}

function loadCategory(){
    d_DownloadService.getCategoryList({callback:categoryCallBack});
}

function categoryCallBack(categoryList){
    DWRUtil.removeAllOptions("search-byCategory");
    DWRUtil.addOptions("search-byCategory",[{id:-1, name:"Please select a category"},{id: -2, name:"All"}], "id", "name");
    


	for (var i = 1; i <= category_list.length; i++) {
   		for (var j = 1; j <= categoryList.length; j++) {
			if(categoryList[j - 1].name.toLowerCase() === category_list[i - 1].toLowerCase()){
	 		    DWRUtil.addOptions("search-byCategory", [{id: categoryList[j - 1].id , name:category_list[i - 1]}], "id", "name");
			}
		}
   	}


    //DWRUtil.addOptions("search-byCategory",categoryList, "id", "name");
    

    if(isIE6OR7()){
    }else{
       $("#search-byCategory").resetSS();
    }
     
}

function initPageFields(){


   //reset filters..

   $("#filter_list").empty();
   $("#filter_list").append("<p class='faux-label'>Filter by type</p>" +
"<p class='field inline checkbox icn_audio first'>" +
"<input value='1' name='type-audio' id='type-audio' type='checkbox'><label class='first' for='type-audio'>Audio</label>" +
"</p>" +
"<p class='field inline checkbox icn_video'>" +
"<input value='2' name='type-video' id='type-video' type='checkbox'><label for='type-video'>Video</label>" +
"</p>" +
"<p class='field inline checkbox icn_image'>" +
"<input value='3' name='type-image' id='type-image' type='checkbox'><label for='type-image'>Image</label>" +
"</p>" +
"<p class='field inline checkbox icn_document last'>" +
"<input value='4' name='type-document' id='type-document' type='checkbox'><label for='type-document'>Document</label>" +
"</p>")

        DWRUtil.removeAllOptions("filter-dl-show");
        DWRUtil.addOptions("filter-dl-show",[{id:15,name:"15"},{id: 30, name:"30"},{id: 50, name:"50"}], "id", "name");

        DWRUtil.removeAllOptions("filter-dl-sort");
        DWRUtil.addOptions("filter-dl-sort", [{id:0, name:"Newest first"},{id: 1, name:"Oldest first"}], "id", "name");



    
  /*  $("#search-byCategory").change(function(){
         loadDownloadPageList(); 
    });
	
	$("#type-audio").change(function(){
         loadDownloadPageList(); 
    });
	
	$("#type-video").change(function(){
         loadDownloadPageList(); 
    });
	
	$("#type-image").change(function(){
         loadDownloadPageList(); 
    });
	
	$("#type-document").change(function(){
         loadDownloadPageList(); 
    });*/
	

	$("#filter-dl-sort").change(function(){
		 wrapResetHashLocation(); 	
         loadDownloadPageList(); 
    });
	

	$("#filter-dl-show").change(function(){
		wrapResetHashLocation(); 	
		loadDownloadPageList(); 
    });
	




	
   /* $("search-bySubcategory").change(function(){
        pager.pageNumber = 1;
        pager.paramMap.subCategoryId = $("search-bySubcategory").val();
        pager.paramMap.tagName = "";
       // loadPage();
    });*/
   /* $('p[class="field inline radio"] > label').click(function(){
        var tag = $(this).text();
        //loadCategory();
        setPagerTagName(tag);
       // loadPage();
    });*/

     $("#submitSearch").click(function(){
		
		//hide the feature section using css
		$("#featureDiv").hide();
		$("#searchResultDiv").show();
		wrapResetHashLocation(); 							   
        pager.pageNumber = 1;
        pager.paramMap.categoryId = DWRUtil.getValue("search-byCategory");
        pager.paramMap.subCategoryId = "-2";//DWRUtil.getValue("search-bySubcategory");
        pager.paramMap.tagName = "";

         var filterType = "";
         if (DWRUtil.getValue("type-audio")) {
             filterType = filterType + "A,";
         }
         if (DWRUtil.getValue("type-video")) {
             filterType = filterType + "V,";
         }
         if (DWRUtil.getValue("type-image")) {
             filterType = filterType + "I,";
         }
         if (DWRUtil.getValue("type-document")) {
             filterType = filterType + "D,";
         }
         pager.paramMap.objectType = filterType;
         pager.paramMap.order = DWRUtil.getValue("filter-dl-sort");
         pager.limit = DWRUtil.getValue("filter-dl-show");

         loadPage();
     })

}

function wrapResetHashLocation(){
		paraObj["category"] = $("#search-byCategory option:selected").text();
		paraObj["audio"] = document.getElementById("type-audio").checked;    
		paraObj["video"] = document.getElementById("type-video").checked; 
		paraObj["image"] = document.getElementById("type-image").checked; 
		paraObj["document"] = document.getElementById("type-document").checked; 
	    paraObj["sortBy"] = $("#filter-dl-sort").val();
	    paraObj["perPage"] = $("#filter-dl-show").val(); 
		paraObj["pageNumber"] = 1;
		resetHashLocation();	
}

function initPageFieldsV2(){


   //reset filters..
	$("#featureDiv").hide();
		$("#searchResultDiv").show();
   $("#filter_list").empty();
   $("#filter_list").append("<p class='faux-label'>Filter by type</p>" +
"<p class='field inline checkbox icn_audio first'>" +
"<input value='1' name='type-audio' id='type-audio' type='checkbox'><label class='first' for='type-audio'>Audio</label>" +
"</p>" +
"<p class='field inline checkbox icn_video'>" +
"<input value='2' name='type-video' id='type-video' type='checkbox'><label for='type-video'>Video</label>" +
"</p>" +
"<p class='field inline checkbox icn_image'>" +
"<input value='3' name='type-image' id='type-image' type='checkbox'><label for='type-image'>Image</label>" +
"</p>" +
"<p class='field inline checkbox icn_document last'>" +
"<input value='4' name='type-document' id='type-document' type='checkbox'><label for='type-document'>Document</label>" +
"</p>")

        DWRUtil.removeAllOptions("filter-dl-show");
        DWRUtil.addOptions("filter-dl-show",[{id:15,name:"15"},{id: 30, name:"30"},{id: 50, name:"50"}], "id", "name");

        DWRUtil.removeAllOptions("filter-dl-sort");
        DWRUtil.addOptions("filter-dl-sort", [{id:0, name:"Newest first"},{id: 1, name:"Oldest first"}], "id", "name");
 

	$("#filter-dl-sort").change(function(){
		wrapResetHashLocation(); 	
        loadDownloadPageList(); 
    });
	

	$("#filter-dl-show").change(function(){
		 wrapResetHashLocation(); 	
         loadDownloadPageList(); 
    });
	 

     $("#submitSearch").click(function(){
		
		//hide the feature section using css
		$("#featureDiv").hide();
		$("#searchResultDiv").show();
		 
		wrapResetHashLocation(); 	
									   
        pager.pageNumber = 1;
        pager.paramMap.categoryId = DWRUtil.getValue("search-byCategory");
        pager.paramMap.subCategoryId = "-2";//DWRUtil.getValue("search-bySubcategory");
        pager.paramMap.tagName = "";

         var filterType = "";
         if (DWRUtil.getValue("type-audio")) {
             filterType = filterType + "A,";
         }
         if (DWRUtil.getValue("type-video")) {
             filterType = filterType + "V,";
         }
         if (DWRUtil.getValue("type-image")) {
             filterType = filterType + "I,";
         }
         if (DWRUtil.getValue("type-document")) {
             filterType = filterType + "D,";
         }
         pager.paramMap.objectType = filterType;
         pager.paramMap.order = DWRUtil.getValue("filter-dl-sort");
         pager.limit = DWRUtil.getValue("filter-dl-show");

         loadPage();
     })

}

function loadDownloadPageList(){
	     pager.pageNumber = 1;
         pager.paramMap.categoryId = DWRUtil.getValue("search-byCategory");
         pager.paramMap.subCategoryId = "-2";//DWRUtil.getValue("search-bySubcategory");
         pager.paramMap.tagName = "";

         var filterType = "";
         if (DWRUtil.getValue("type-audio")) {
             filterType = filterType + "A,";
         }
         if (DWRUtil.getValue("type-video")) {
             filterType = filterType + "V,";
         }
         if (DWRUtil.getValue("type-image")) {
             filterType = filterType + "I,";
         }
         if (DWRUtil.getValue("type-document")) {
             filterType = filterType + "D,";
         }
         pager.paramMap.objectType = filterType;
         pager.paramMap.order = DWRUtil.getValue("filter-dl-sort");
         pager.limit = DWRUtil.getValue("filter-dl-show");

         loadPage();
}

function categoryChange(){
   /* var categoryId = DWRUtil.getValue("search-byCategory");
    if (categoryId == "-1" || categoryId == "-2") { //please select a category
        DWRUtil.removeAllOptions("search-bySubcategory");
        DWRUtil.addOptions("search-bySubcategory", [{id:-1, name:"Please select a sub category"},{id: -2, name:"All"}], "id", "name");
        $("#search-bySubcategory").resetSS();
    } else {
        d_DownloadService.getSubCategoryList(categoryId, {callback:subCategoryCallBack});
    }*/


 /*  var cid = $("#search-byCategory").val();
   if(cid == ""){
        $("search-bySubcategory").empty();
        $("search-bySubcategory").append("<option value=''>Please select a collection</option>");
        $("search-bySubcategory").append("<option value=''>All images</option>");
        $("search-bySubcategory").resetSS();
   }else{
       d_DownloadService.getSubCategoryList(cid, {callback:subCategoryCallBack});
   }*/
}

function subCategoryCallBack(subCategoryList){
    DWRUtil.removeAllOptions("search-bySubcategory");
    DWRUtil.addOptions("search-bySubcategory",[{id:-1, name:"Please select a sub category"},{id: -2, name:"All"}], "id", "name");
    DWRUtil.addOptions("search-bySubcategory",subCategoryList, "id", "name");
    $("#search-bySubcategory").resetSS();
}

function setPagerTagName(tag){
    pager.paramMap.tagName = tag;
    pager.paramMap.categoryId = "";
    pager.paramMap.subCategoryId = "";
    pager.pageNumber = 1;
}

function loadPage(){
    pager.list = [];
    d_DownloadService.getPager(pager, {callback:pageLoadCallback});
}

function pageLoadCallback(tempPage){
       pager = tempPage;
       generatePageBar();
       generateContent();
}

function generateContent(){
    var list = pager.list;
    $("#paginationtop").empty();
    $("#downloadcentre-results").empty();
    $("#paginationbottom").empty();
    $("#filterdlsort").show();
    $("#filterdlshow").show();

        

    if(isIE6OR7()){
    }else{
       $("#filter-dl-sort").resetSS();
 	 $("#filter-dl-show").resetSS();
    }


    if(list.length == 0){
        $("#filterdlsort").hide();
        $("#filterdlshow").hide();
        $("#paginationtop").append("<p class='faux-label'>Sorry, no results have been found.</p> "+
							"<p>Please change your filter options and search again.</p> "+
						    "</p>");
    }else{
        //var vo = null;
        generatePageBar();
        $("#downloadcentre-results").append("<ul id='downloadcentre_listing' class='listing'>");
        for(var i = 0; i < list.length; i++){
            vo = list[i];
            if( i == 0){
                itemClass = "item article first";
            }else if( i == list.length -1 ){
                itemClass = "item article last";
            }else{
                itemClass = "item article";
            }

	    var summary = "";
            var paddingTop = isIE6OR7() ? "8px;" : "6px;";
	    if(vo.summary != null){
                 if(vo.summary.indexOf('<p>') != -1){
                     summary = "<div style='padding-top:"+ paddingTop +"'>"+ (vo.summary !=null?vo.summary:"&nbsp;") +"</div>";
		 }
                 else{
                     summary = "<p style='padding-top:"+ paddingTop +"'>"+ (vo.summary !=null?vo.summary:"&nbsp;") +"</p>";
                 }
            }
            else{
                     summary = "<p style='padding-top:"+ paddingTop +"'>"+ (vo.summary !=null?vo.summary:"&nbsp;") +"</p>";
            } 

            if(vo.objectType == 'D'){
                                 $("#downloadcentre_listing").append("<li class= '"+itemClass+"' style='padding-bottom:1.2727em'>" + "<a target='_blank' href = '"+vo.filePath+"'><img src='" + vo.imageUrl + "' width='73' height='58' title='PDF' alt='PDF'></a>" +
                                                    "<div class='right' style='width:125px;margin-bottom:1px;'>" +
                                                    "<ul class='links' style='margin-bottom:1px;line-height:1em;'>" +
                                                    "<li ><a target='_blank' href='"+vo.filePath+"'><span>Download document</span></a></li>" +
                                                    "</ul>" +
                                                    "</div>" +
                                                    "<h3>"+vo.heading+"</h3>" + summary +
                                                    "</li>");
            }else if(vo.objectType == 'I' || vo.objectType == 'A' || vo.objectType == 'V'){
				if(vo.objectType == 'I'){//image
				 $("#downloadcentre_listing").append("<li class= '"+itemClass+"' style='padding-bottom:1.2727em'>" + "<a href = 'news-and-media/image-library/"+vo.downloadId.dcrPath.replace(/.xml/, ".html")+"'><img src='" + vo.imageUrl + "' width='73' height='58' title='" + vo.heading + "' alt='" + vo.heading + "'></a>" +
                                                    "<div class='right' style='width:75px;margin-bottom:1px;'>" +
                                                    "<ul class='links' style='margin-bottom:1px;line-height:1em;'>" +
                                                    "<ul class='links'>" +
                                                    "<li><a href='news-and-media/image-library/"+vo.downloadId.dcrPath.replace(/.xml/, ".html")+"'><span>View image</span></a></li>" +
                                                    "</ul>" +
                                                    "</div>" +
                                                    "<h3>"+vo.heading+"</h3>" + summary +
                                                    "</li>");
				
				}else if(vo.objectType == 'V'){//video
				 $("#downloadcentre_listing").append("<li class= '"+itemClass+"' style='padding-bottom:1.2727em'>" + "<a href = 'news-and-media/audio-video-library/"+vo.downloadId.dcrPath.replace(/.xml/, ".html")+"'><img src='" + vo.imageUrl + "' width='73' height='58' title='" + vo.heading + "' alt='" + vo.heading + "'></a>" +
                                                    "<div class='right' style='width:76px;margin-bottom:1px;'>" +
                                                    "<ul class='links' style='margin-bottom:1px;line-height:1em;'>" +
                                                    "<li><a href='news-and-media/audio-video-library/"+vo.downloadId.dcrPath.replace(/.xml/, ".html")+"'><span>Watch video</span></a></li>" +
                                                    "</ul>" +
                                                    "</div>" +
                                                    "<h3>"+vo.heading+"</h3>" + summary +
                                                    "</li>");
				
				}else{ //audio

				 $("#downloadcentre_listing").append("<li class= '"+itemClass+"' style='padding-bottom:1.2727em'>" + "<a href = 'news-and-media/audio-video-library/"+vo.downloadId.dcrPath.replace(/.xml/, ".html")+"'><img src='" + vo.imageUrl + "' width='73' height='58' title='" + vo.heading + "' alt='" + vo.heading + "'></a>" +
                                                    "<div class='right' style='width:125px;margin-bottom:1px;text-align:right;'>" +
                                                    "<ul class='links' style='margin-bottom:1px;line-height:1em;'>" +
                                                    "<li><a href='news-and-media/audio-video-library/"+vo.downloadId.dcrPath.replace(/.xml/, ".html")+"'><span>Listen to audio</span></a></li>" +
                                                    "</ul>" +
                                                    "</div>" +
                                                    "<h3>"+vo.heading+"</h3>" + summary +
                                                    "</li>");
				
				}
				 
            }
        }
        $("#downloadcentre-results").append("</ul>");
    }
}

function generatePageBar(){
    var navigatePageNumbers =   pager.navigatePageNumbers;
    var navigatePageNumbersLi = "";
    for (var i = 0; i < navigatePageNumbers.length; i++) {
        if (navigatePageNumbers[i] == pager.pageNumber) {
            navigatePageNumbersLi = navigatePageNumbersLi + "<li class='selected'><a href='#' onclick='gotoNextPage("+navigatePageNumbers[i]+");return false;'>" + navigatePageNumbers[i] + "</a></li> "
        }  else if (i == navigatePageNumbers.length - 1) {
            navigatePageNumbersLi = navigatePageNumbersLi + "<li class='last'><a href='#' onclick='gotoNextPage("+navigatePageNumbers[i]+");return false;'>" + navigatePageNumbers[i] + "</a></li> "
        }   else{
             navigatePageNumbersLi = navigatePageNumbersLi + "<li><a href='#' onclick='gotoNextPage( "+navigatePageNumbers[i]+");return false;'>" + navigatePageNumbers[i] + "</a></li> "
        }
    }
     appendPageBar($("#paginationtop"),navigatePageNumbersLi) ;
     appendPageBar($("#paginationbottom"),navigatePageNumbersLi) ;
}

function gotoNextPage(page){

    if (page > pager.pages || page < 1) {
        return;
    }
	paraObj["pageNumber"] = page;
	resetHashLocation();	
    pager.pageNumber = page;
    loadPage();
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
            ((pager.pageNumber - 1) * pager.limit + 1) +
            "</span> to  <span id='range-max'>" +
            (pager.total < pager.pageNumber * pager.limit ? pager.total : pager.pageNumber * pager.limit) +
            "</span> of " +
            "<span id='total-set'>" +
            pager.total +
            "</span> matches " +
            "</p>");
}
