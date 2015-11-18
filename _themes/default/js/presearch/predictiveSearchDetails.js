// JavaScript Document

var totalCount = 0;
var categoryCount = 0;
var category = new Array("grp_about-us","grp_investorRelations","grp_mediaCentre","grp_bankingServices","grp_sustainability","grp_careersCol");
var categoryNavId = new Array("#abtLink","#invLink","#mediaLink","#bankLink","#susLink","#careerLink");
var group = jQuery.query.get("site");
if(group == "null")
	group = 'grp';
 

var encoded = jQuery.query.get("q");
	
	encoded = encoded.replace(/<script>/gi,"");
	encoded = encoded.replace(/<\/script>/gi,"");
	encoded = encoded.replace(/<script\/>/gi,"");
	encoded = encoded.replace(/[();<>+'"&?]/gi,"");
	
	if(encoded.match(/%3C/)){
	   encoded = encoded.replace(/%3C/gi,"");
	}
	if(encoded.match(/%3E/)){
	  encoded = encoded.replace(/%3E/gi,"");
	};
		  
	if(encoded.match(/&lt/)){
	   encoded = encoded.replace(/&lt/gi,"");
	}
	if(encoded.match(/&gt/)){
	  encoded = encoded.replace(/&gt/gi,"");
	};
   if(encoded.match(/&quot/)){
	  encoded = encoded.replace(/&quot/gi,"");
	};
	if(encoded.match(/&amp/)){
	  encoded = encoded.replace(/&amp/gi,"");
	};
	 if(encoded.match(/&#40/)){
	  encoded = encoded.replace(/&#40/gi,"");
	};
	 if(encoded.match(/&#41/)){
	  encoded = encoded.replace(/&#41/gi,"");
	};
			   
	if(encoded.match(/%3Cscript%3E/)){
		encoded = encoded.replace(/%3Cscript%3E/gi,"");
	}
	if(encoded.match(/script/)){
		encoded = encoded.replace(/script/gi,"");
	}

var searchtxt = encoded;

var resultURL = "https://token.labsls.com:8443/Proxy_SCB.jsp?"; 
var pageNo = jQuery.query.get("pageNo");
var recordPerPage = 10;
var totalRecords = 100;

jQuery(document).ready(function () {
	$.ajaxSetup({
		timeout: 100000
	    }); 
	var resultURL =  jQuery.extend({
		//resultURL: 'SearchDetails.php'
		resultURL: 'https://token.labsls.com:8443/Proxy_SCB.jsp?'
	});	
	//console.log(['inside is Need count']);
	$('#hasresults').hide();
	$('#noresults').hide();		
	$('#paginationrange').hide();
	
	$('#zall').hide();
    $('#zabt').hide();
	$('#zinv').hide();
	$('#zmedia').hide();
	$('#zbank').hide();
	$('#zsus').hide();
	$('#zcareer').hide(); 
	
	  addCookies(searchtxt);
	  checkCookies();
	//loadSearchDetailsByPage(0);
	//loadSearchCount();
	
    //enable back the search count
	//formatLinks();            
		
});


function loadSearchCount(haveResults)
{
	if(categoryCount < category.length && haveResults) {
			var resultURL =  jQuery.extend({
				//resultURL: 'SearchDetails.php'
				resultURL: 'https://token.labsls.com:8443/Proxy_SCB.jsp?'
			});
			//use jsonp call instead
			/*$.getJSON(jQuery.resultURL+"output=xml_no_dtd&oe=UTF-8&ie=UTF-8&client=result_only&site="+category[categoryCount++]+"&num=1&q="+searchtxt+"&proxystylesheet=result_catgCount_11"+"&jsonp=callbackCatgCount&jsoncallback=?",
				    function(data){
				        // do nothing
				    });*/
			
	}else{
		//console.log(["can do query --- "]);
		//$(totalCount).appendTo('#all');
		//KORN: move this call to on ready
		//loadSearchDetailsByPage(0);
		/*replace this count in the loadSearchDetailsByPage call
		if(totalCount > 0){
			$('#all').removeClass('searchSpinnergreen');				
			$(totalCount).appendTo('#all');
			$('#zall').hide();
		}else{
			$('#zall').show();											
			$('#all').hide();
		}
		*/
		if(!haveResults) {

			$('#zabt').show();											
			$('#abt').hide();
			$('#zinv').show();											
			$('#inv').hide();
			$('#zmedia').show();											
			$('#mediacnt').hide();
			$('#zbank').show();											
			$('#bank').hide();
			$('#zsus').show();											
			$('#sus').hide();
			$('#zcareer').show();											
			$('#career').hide();
			$('#zall').show();											
			$('#all').hide();
			$('#paginationrange').hide();
		}
		$('#allLink').attr( "href","javascript:loadSearchDetailsByGroup('grp')");		
		
	}
}

// use this function after we disabled the load search count
function formatLinks() {
	$('#allLink').attr( "href","javascript:loadSearchDetailsByGroup('grp')");
	$('#abtLink').attr( "href","javascript:loadSearchDetailsByGroup('"+category[0]+"')");
	$('#invLink').attr( "href","javascript:loadSearchDetailsByGroup('"+category[1]+"')");
	$('#mediaLink').attr( "href","javascript:loadSearchDetailsByGroup('"+category[2]+"')");
	$('#bankLink').attr( "href","javascript:loadSearchDetailsByGroup('"+category[3]+"')");
	$('#susLink').attr( "href","javascript:loadSearchDetailsByGroup('"+category[4]+"')");
	$('#careerLink').attr( "href","javascript:loadSearchDetailsByGroup('"+category[5]+"')");
}

function callbackCatgCount(data) {
	var JSONData = data;
	var indvCount = 0;

	//if(JSONData['RES'] != undefined){
	if(JSONData != undefined){
		indvCount = parseInt(JSONData.count);
	}	

		//alert(JSONData['RES']);
		//console.log(['test :',JSONData['RES']]);\
		var strCnt = "";
		if((categoryCount - 1) == 0)
		{
			//console.log(['categoryCount --- ',categoryCount]);
			//console.log(["JSONDATA 1 ---- " , indvCount]);																				
			if(indvCount > 0){
				$(indvCount).appendTo('#abt');
				$('#abt').removeClass('searchSpinnergreen');
				$('#zabt').hide();
			}else{
				$('#zabt').show();											
				$('#abt').hide();
			}
			//console.log(["JSONDATA  2 ---- " , JSONData['RES']]);
			$('#abtLink').attr( "href","javascript:loadSearchDetailsByGroup('"+category[categoryCount - 1]+"')");
			//console.log(["JSONDATA  3 ---- " , JSONData['RES']]);										
		}else if((categoryCount - 1) == 1){
			if(indvCount > 0){
				$(indvCount).appendTo('#inv');			
				$('#inv').removeClass('searchSpinnergreen');											
				$('#zinv').hide();
			}else{
				$('#zinv').show();											
				$('#inv').hide();
			}
			$('#invLink').attr( "href","javascript:loadSearchDetailsByGroup('"+category[categoryCount - 1]+"')");									
		}else if((categoryCount - 1) == 2){
			if(indvCount > 0){
				$(indvCount).appendTo('#mediacnt');
				$('#mediacnt').removeClass('searchSpinnergreen');												
				$('#zmedia').hide();
			}else{
				$('#zmedia').show();											
				$('#mediacnt').hide();
			}
			//$(indvCount).appendTo('#media');
			$('#mediaLink').attr( "href","javascript:loadSearchDetailsByGroup('"+category[categoryCount - 1]+"')");									
		}else if((categoryCount - 1) == 3){
			if(indvCount > 0){
				$(indvCount).appendTo('#bank');					
				$('#bank').removeClass('searchSpinnergreen');												
				$('#zbank').hide();
			}else{
				$('#zbank').show();											
				$('#bank').hide();
			}										
			//$(indvCount).appendTo('#bank');
			$('#bankLink').attr( "href","javascript:loadSearchDetailsByGroup('"+category[categoryCount - 1]+"')");									
		}else if((categoryCount - 1) == 4){
			if(indvCount > 0){
				$(indvCount).appendTo('#sus');					
				$('#sus').removeClass('searchSpinnergreen');												
				$('#zsus').hide();
			}else{
				$('#zsus').show();											
				$('#sus').hide();
			}										
			//$(indvCount).appendTo('#sus');
			$('#susLink').attr( "href","javascript:loadSearchDetailsByGroup('"+category[categoryCount - 1]+"')");									
		}else if((categoryCount - 1)== 5){
			if(indvCount > 0){
				$(indvCount).appendTo('#career');						
				$('#career').removeClass('searchSpinnergreen');												
				$('#zcareer').hide();
			}else{
				$('#zcareer').show();											
				$('#career').hide();
			}										
			//$(indvCount).appendTo('#career');
			$('#careerLink').attr( "href","javascript:loadSearchDetailsByGroup('"+category[categoryCount - 1]+"')");									
		}
		totalCount += indvCount;
		loadSearchCount(true);
		
}

var stPg = 0;
var edPg = 0;
var curPg = 0;
function loadSearchDetailsByPage(pg)
{	
	curPg = pg;
		
	//use jsonp call instead
	/*$.getJSON(jQuery.resultURL+"output=xml_no_dtd&oe=UTF-8&ie=UTF-8&client=result_only&site="+group+"&start="+pg+"&num=10&q="+searchtxt+"&filter=0&proxystylesheet=result_jsonResultsByPage_10&jsonp=callbackResultsByPage&jsoncallback=?",
		    function(data){
		        // do nothing
		    });*/
}

function callbackResultsByPage(data) {
	//var JSONData = jQuery.xml2json(data);
	var JSONData = data;
	if(JSONData.RES != undefined && JSONData.RES.R.length > 0){
	
		//$('#searchDetailsResult').removeClass('searchSpinnerIcon');
		$('#paginationrange').show();
		$('#hasresults').show();
		$('#noresults').hide();			
		var stPage = parseInt(JSONData.RES.SN);
		//console.log(['st page ---- ',JSONData['RES']['SN']]);
		var endPage = parseInt(JSONData.RES.EN);
		//console.log(['end page ---- ',JSONData['RES']['EN']]);		
		var timeTaken = JSONData.TM;
			timeTaken = ""+timeTaken.substring(0,4);
		//console.log(['timeTaken ---- ',timeTaken]);			
		var ttlPg = parseInt(JSONData.RES.M);
		if(group == "grp"){
			$('#all').empty();
			$(ttlPg).appendTo('#all');
			$('#all').removeClass('searchSpinnergreen');	
			$('#zall').hide();	
			$('#all').show();
		} 
		//console.log(['total page ---- ',JSONData['RES']['M']]);
		//$('#paginationrange').show();	
		$('#pagenumber').text("");
		$('#pagenumber').text(stPage);
		$('#total').text("");		
		$('#total').text(endPage);
		$('#totalPage').text("");		
		$('#totalPage').text(ttlPg);
		$('#timetaken').text("");		
		$('#timetaken').text(timeTaken);		
		$('#searchStr').text("");		
		$('#searchStr').text(searchtxt);
		var str = "";

	
		jQuery.each(JSONData.RES.R,function(i,item){
        	$("#searchDetailsResult").empty();
            $('#showSpinner').hide();
			var patt1=/\.pdf$/gi;
			var isPdf = item.U.match(patt1);
			
			str += "<div class='searchdeails'>";
			
			str += "<h3>"+ "<a href='" + item.U + "'>" + item.T+ "</a>" + "</h3>";
			if(isPdf != null) {
				str += "<a href='" + item.U + "' class='pdfClick'><img class='pdfArea' src='/en/_themes/default/img/icons/icn_pdf.gif'></img></a>";
			}
			str += "<p>" + item.S+"</p>";
			
			//str += "<p><a href='"+ item.U+"'>"+item.UE+"</a></p>";
			str += "</div>";

			$(str).appendTo('#searchDetailsResult');

		});
	
	
		if(curPg % totalRecords  == 0)
		{
			if(stPage > totalRecords)
			{
				stPg = parseInt((stPage / recordPerPage))+1;
				edPg = (stPg-1)+recordPerPage;				
			}else{
				stPg = stPage;
				edPg = endPage;
			}
		}	
		
		var actualPage = ttlPg / recordPerPage;
		var remPg = ttlPg % recordPerPage;
		
		if(remPg != 0)
		{
			actualPage = Math.floor(actualPage) + 1;
		}else{
			actualPage = Math.floor(actualPage);
		}		
		
		$("#pagination").empty();	
		$("#pagination2").empty();				  
		//$('#paginationrange').show();
		var nav = "";
		//nav += "<p class='pagination-range'>Displaying <span id='range-min'>"+(actualPage * recordPerPage)+"</span> to <span id='range-max'>"+((actualPage * recordPerPage)+recordPerPage)+"</span> of <span id='total-set'>400</span> matches</p>";
		if(curPg == 0){
		   nav += "<a href='javascript:void(0)'><img src='/en/_themes/default/img/icons/icn_cta-back_blue.gif' width='4' height='11'  id='left_arrow' /></a>";		
		}else{
			nav += "<a href='javascript:loadSearchDetailsByPage("+(stPage - 1)+")'><img src='/en/_themes/default/img/icons/icn_cta-back_blue.gif' width='4' height='11' id='left_arrow' /></a>";	
		}
		//console.log(['stPage --- ' ,stPg]);
		//console.log(['end Page ---- ' , edPg]);
		//console.log(['acutalPage ----- ' ,actualPage]);
		for(j=stPg;j<=edPg;j++)
		{
			if(j <= actualPage){
				//console.log(['end page ---- ' , stPg]);
				//console.log(['end page ---- ' , j]);
					if(Math.ceil(endPage / recordPerPage) == j && j == stPg)
						nav += "  <span id=\"selectedPage\">" + (j) + "</span>";
				else if(Math.ceil(endPage / recordPerPage) == j)
						nav += " | <span id=\"selectedPage\">" + (j) + "</span>";
				else{	
					if(j > recordPerPage)
						if(j == stPg)
							nav += "<a href='javascript:loadSearchDetailsByPage("+ ((j-1)*recordPerPage) +")'>"+(j)+"</a>";
						else	
							nav += " | <a href='javascript:loadSearchDetailsByPage("+ ((j-1)*recordPerPage) +")'>"+(j)+"</a>";
					else{
						if(j == stPg)
							nav += " <a href='javascript:loadSearchDetailsByPage("+ ((j-1)*edPg) +")'>"+(j)+"</a>";
						 else 	
							nav += " | <a href='javascript:loadSearchDetailsByPage("+ ((j-1)*edPg) +")'>"+(j)+"</a>";
					}
				}
			}
		}

		//console.log(['end page ---- ' , endPage]);
		//console.log(['ttl page ---- ' , ttlPg]);
		
		if(endPage >= ttlPg)
		{
	      	nav += "<img src='/en/_themes/default/img/icons/icn_cta_blue.gif' width='4' height='11'  id='right_arrow'/>";
		}else{
		   nav += "<a href='javascript:loadSearchDetailsByPage("+(endPage)+")' class='right_arrow'><img src='/en/_themes/default/img/icons/icn_cta_blue.gif' width='4' height='11'  id='right_arrow'/></a>";
		}
		
		$(nav).appendTo('#pagination');
		$(nav).appendTo('#pagination2');
		//enable all search catg count
		loadSearchCount(true);
	

	}else{
		//$('#searchDetailsResult').removeClass('searchSpinnerIcon');
		
		$('#hasresults').hide();
		$('#noresults').show();	
		$("#searchDetailsResult").empty();	
		$("#pagination").empty();
		$('#showSpinner').hide();
		$('#all').removeClass('searchSpinnergreen');	
		$('#all').hide();	
		$('#zall').show();
		//enable all search catg count
		loadSearchCount(false);
	}
	
	
	
}


function changeSelection(grp)
{
	for(i=0;i<category.length;i++)
	{
		if(category[i] == grp)
		{
			$(categoryNavId[i]).attr("class","pageFramework21aSelected");
		}else{
			$(categoryNavId[i]).removeAttr("class");
		}
	}
	if(grp == 'grp')
	{
		$('#allLink').attr("class","pageFramework21aSelected");
	}else{
		$('#allLink').removeAttr("class");
	}
}

function loadSearchDetailsByGroup(grp)
{
	stPg = 0;
	edPg = 0;	
	group = grp;
	
	/*$.getJSON(jQuery.resultURL+"output=xml_no_dtd&oe=UTF-8&ie=UTF-8&client=result_only&site="+grp+"&start=0&num=10&q="+searchtxt+"&filter=0&proxystylesheet=result_jsonResultsByGroup_10&jsonp=callbackResultsByGroup&jsoncallback=?",
		    function(data){
		        // do nothing
		    });*/

	/*
	jQuery.ajax({type:"GET",url:jQuery.resultURL,data:"q="+searchtxt+"&group="+grp+"&start=0",timeout:10000000,dataType:"xml",error:function(xhr, statusText, errorThrown){
		alert("Error --" + 		statusText);
	},success:function(data){
		
			var JSONData = jQuery.xml2json(data);
			if(JSONData['RES'] != undefined){
				//$('#searchDetailsResult').removeClass('searchSpinnerIcon');
				$('#hasresults').show();
				$('#noresults').hide();				
				var stPage = parseInt(JSONData['RES']['SN']);
				//console.log(['st page ---- ',JSONData['RES']['SN']]);
				var endPage = parseInt(JSONData['RES']['EN']);
				//console.log(['end page ---- ',JSONData['RES']['EN']]);		
				var timeTaken = JSONData['TM'];
					timeTaken = ""+timeTaken.substring(0,4);
				//console.log(['timeTaken ---- ',timeTaken]);			
				var ttlPg = parseInt(JSONData['RES']['M']);
				//console.log(['total page ---- ',JSONData['RES']['M']]);	
				$('#page').text("");
				$('#page').text(stPage);
				$('#total').text("");		
				$('#total').text(endPage);
				$('#totalPage').text("");		
				$('#totalPage').text(ttlPg);
				$('#timetaken').text("");		
				$('#timetaken').text(timeTaken);		
				$('#searchStr').text("");		
				$('#searchStr').text(searchtxt);
				var str = "";
				var actualPage = ttlPg / recordPerPage;
				var remPg = ttlPg % recordPerPage;
				
				if(remPg != 0)
				{
					actualPage = Math.floor(actualPage) + 1;
				}else{
					actualPage = Math.floor(actualPage);
				}
				
				//console.log(["actual Page" , actualPage]);
				
				jQuery.each(JSONData['RES']['R'],function(i,item){		
					$("#searchDetailsResult").empty();									  
					str += "<div class='searchdeails'>";
					str += "<h3>"+ "<a href='" + item.U + "'>" + item.T+ "</a>" + "</h3>";
					str += "<p>" + item.S+"</p>";
					//str += "<p><a href='"+ item.U+"'>"+item.UE+"</a></p>";
					str += "</div>";
					$(str).appendTo('#searchDetailsResult');
				});
							
				$("#pagination").empty();									  
						stPg = stPage;
						edPg = endPage;		
				var nav = "";
					nav += "<a href='javascript:void(0)'><img src='/en/_themes/default/img/icons/icn_cta-back_blue.gif' width='4' height='11'  /></a>";	
					
				//console.log(['stPage loadSearchDetailsByGroup --- ' ,stPage]);
				//console.log(['end Page loadSearchDetailsByGroup ---- ' , endPage]);
				//console.log(['acutalPage loadSearchDetailsByGroup ----- ' ,actualPage]);	
				
				for(j=stPage;j<=endPage;j++)
				{
					if(j <= actualPage){
						//console.log(['end page1 ---- ' , stPg]);
						//console.log(['end page1 ---- ' , j]);						
						if(Math.ceil(endPage / recordPerPage) == j && j == stPage)
							nav += " <span id=\"selectedPage\">" + (j) + "</span>";
						else if(Math.ceil(endPage / recordPerPage) == j)
							nav += " | <span id=\"selectedPage\">" + (j) + "</span>";
						else{
								if(j == stPage)
									nav += " <a href='javascript:loadSearchDetailsByPage("+ ((j-1)*edPg) +")'>"+(j)+"</a>";
								 else 	
									nav += " | <a href='javascript:loadSearchDetailsByPage("+ ((j-1)*edPg) +")'>"+(j)+"</a>";
									
								//nav += " | <a href='javascript:loadSearchDetailsByPage("+ ((j-1)*endPage) +")'>"+(j)+"</a>";
						}
					}else{
						break;
					}
				}
		
				//console.log(['end page ---- ' , endPage]);
				//console.log(['ttl page ---- ' , ttlPg]);
				
				if(endPage >= ttlPg)
				{
					nav += "<img src='/en/_themes/default/img/icons/icn_cta_blue.gif' width='4' height='11' />";
				}else{
					nav += "<a href='javascript:loadSearchDetailsByPage("+(endPage)+")'><img src='/en/_themes/default/img/icons/icn_cta_blue.gif' width='4' height='11' class='right_arrow' /></a>";
				}
				
				$(nav).appendTo('#pagination');
				changeSelection(grp);			
			}else{
				//$('#searchDetailsResult').removeClass('searchSpinnerIcon');
				$('#hasresults').hide();
				$('#noresults').show();
				$("#searchDetailsResult").empty();	
				$("#pagination").empty();	
				changeSelection(grp);
			}
		}
	});
	*/
}

function callbackResultsByGroup(data) {
	//var JSONData = jQuery.xml2json(data);
	var JSONData = data;
	if(JSONData.RES != undefined && JSONData.RES.R.length > 0){
		//$('#searchDetailsResult').removeClass('searchSpinnerIcon');
		$('#hasresults').show();
		$('#noresults').hide();				
		var stPage = parseInt(JSONData.RES.SN);
		//console.log(['st page ---- ',JSONData['RES']['SN']]);
		var endPage = parseInt(JSONData.RES.EN);
		//console.log(['end page ---- ',JSONData['RES']['EN']]);		
		var timeTaken = JSONData.TM;
			timeTaken = ""+timeTaken.substring(0,4);
		//console.log(['timeTaken ---- ',timeTaken]);			
		var ttlPg = parseInt(JSONData.RES.M);
		//console.log(['total page ---- ',JSONData['RES']['M']]);	
		$('#page').text("");
		$('#page').text(stPage);
		$('#total').text("");		
		$('#total').text(endPage);
		$('#totalPage').text("");		
		$('#totalPage').text(ttlPg);
		$('#timetaken').text("");		
		$('#timetaken').text(timeTaken);		
		$('#searchStr').text("");		
		$('#searchStr').text(searchtxt);
		var str = "";
		var actualPage = ttlPg / recordPerPage;
		var remPg = ttlPg % recordPerPage;
		
		if(remPg != 0)
		{
			actualPage = Math.floor(actualPage) + 1;
		}else{
			actualPage = Math.floor(actualPage);
		}
		
		//console.log(["actual Page" , actualPage]);
		
		jQuery.each(JSONData.RES.R,function(i,item){		
			$("#searchDetailsResult").empty();
			var patt1=/\.pdf$/gi;
			var isPdf = item.U.match(patt1);
			str += "<div class='searchdeails'>";
			if(isPdf != null) {
				str += "<a href='" + item.U + "' class='pdfClick'><img class='pdfArea' src='/en/_themes/default/img/icons/icn_pdf.gif'></img></a>";
			}
			str += "<h3>"+ "<a href='" + item.U + "'>" + item.T+ "</a>" + "</h3>";
			str += "<p>" + item.S+"</p>";
			
			/*str += "<p><a href='"+ item.U+"'>"+item.UE+"</a></p>";*/
			str += "</div>";
			$(str).appendTo('#searchDetailsResult');
		});
					
		$("#pagination").empty();									  
				stPg = stPage;
				edPg = endPage;		
		var nav = "";
			nav += "<a href='javascript:void(0)'><img src='/en/_themes/default/img/icons/icn_cta-back_blue.gif' width='4' height='11'  id='left_arrow' /></a>";	
			
		//console.log(['stPage loadSearchDetailsByGroup --- ' ,stPage]);
		//console.log(['end Page loadSearchDetailsByGroup ---- ' , endPage]);
		//console.log(['acutalPage loadSearchDetailsByGroup ----- ' ,actualPage]);	
		
		for(j=stPage;j<=endPage;j++)
		{
			if(j <= actualPage){
				//console.log(['end page1 ---- ' , stPg]);
				//console.log(['end page1 ---- ' , j]);						
				if(Math.ceil(endPage / recordPerPage) == j && j == stPage)
					nav += " <span id=\"selectedPage\">" + (j) + "</span>";
				else if(Math.ceil(endPage / recordPerPage) == j)
					nav += " | <span id=\"selectedPage\">" + (j) + "</span>";
				else{
						if(j == stPage)
							nav += " <a href='javascript:loadSearchDetailsByPage("+ ((j-1)*edPg) +")'>"+(j)+"</a>";
						 else 	
							nav += " | <a href='javascript:loadSearchDetailsByPage("+ ((j-1)*edPg) +")'>"+(j)+"</a>";
							
						//nav += " | <a href='javascript:loadSearchDetailsByPage("+ ((j-1)*endPage) +")'>"+(j)+"</a>";
				}
			}else{
				break;
			}
		}

		//console.log(['end page ---- ' , endPage]);
		//console.log(['ttl page ---- ' , ttlPg]);
		
		if(endPage >= ttlPg)
		{
			nav += "<img src='/en/_themes/default/img/icons/icn_cta_blue.gif' width='4' height='11' id='right_arrow' />";
		}else{
			nav += "<a href='javascript:loadSearchDetailsByPage("+(endPage)+")'><img src='/en/_themes/default/img/icons/icn_cta_blue.gif' width='4' height='11' id='right_arrow' /></a>";
		}
		
		$(nav).appendTo('#pagination');
		changeSelection(group);			
	}else{
		//$('#searchDetailsResult').removeClass('searchSpinnerIcon');
		$('#hasresults').hide();
		$('#noresults').show();
		$("#searchDetailsResult").empty();	
		$("#pagination").empty();	
		changeSelection(group);
	}
}

function deleteCookies()
{
	$.cookie("scbpredictivesearch",null);
}

function isDuplicate(values)
{
	var cook = getCookie("scbpredictivesearch");
	var cookSplit = cook.split("|");
	var found = false;
	for(var j=0;j<cookSplit.length;j++)
	{
		if(cookSplit[j] == values)
		{
			found = true;
			break;
		}
	}
	return found;
}

function addCookies(values)
{
	var cook = getCookie("scbpredictivesearch");
	if(cook != null){
		if(!isDuplicate(values)){
			$.cookie("scbpredictivesearch",null);
			cook = cook + "|" + values;
			$.cookie("scbpredictivesearch",cook);
		}
	}else{
		cook = values + "|" ;
		$.cookie("scbpredictivesearch",cook);
	}
}

function checkCookies()
{
	var cook = getCookie("scbpredictivesearch");
	if(cook == null || cook == "")
	{
		var str = "<h1>My Recent Search</h1>";
			str = str + "<ul><li style='color:white'>No Search Found</li></ul>";
		str = str + "<p><a href='javascript:deleteCookies();'>[Clear My Search]</a></p>";
		$(str).appendTo('#recentsearch');
	}else{
		var cookArr = cook.split("|");
		var str = "<h1>My Recent Search</h1>";
			str = str + "<ul>";
		for(var i=0;i<cookArr.length;i++)
		{
			str = str + "<li><a href='search_results.html?q="+cookArr[i]+"'>" + cookArr[i] + "</li>"; 
		}
		
		str = str + "</ul>";
		str = str + "<p><a href='javascript:deleteCookies();'>[Clear My Search]</a></p>"
		$(str).appendTo('#recentsearch');
	}
	
}
function getCookie(c_name)
{
if (document.cookie.length>0)
  {
  c_start=document.cookie.indexOf(c_name + "=");
  if (c_start!=-1)
    {
    c_start=c_start + c_name.length+1;
    c_end=document.cookie.indexOf(";",c_start);
    if (c_end==-1) c_end=document.cookie.length;
    return unescape(document.cookie.substring(c_start,c_end));
    }
  }
return "";
}

