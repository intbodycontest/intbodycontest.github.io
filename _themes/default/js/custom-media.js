var element = document.createElement("div");
element.setAttribute("id" , "notice");
element.innerHTML="";


 var defSearch = "Search";
 var eleSearch = document.getElementById("q");

 $(document).ready(function() {
		$('body').prepend('<div id="notice">');
		$('#notice').load('_themes/default/js/cookie.html');

		var externalLinkFeature1 = "index.html";
		var externalLinkFeature2 = "index.html";
		var externalLinkFeature3 = "www.";
		var investorsFeature = "http://investors./";
        var extension;
		$('a').each( function(){
		var attr = jQuery(this).attr('target');
		if (typeof attr !== 'undefined' && attr !== false && attr !="") {
		}
		else{
		  var value = jQuery(this).attr('href');
           
		  if (typeof value !== 'undefined' && value !== false && value !="") {
 			extension = value.substring(value.lastIndexOf(".")+1).toLowerCase();
		     if (value.indexOf(externalLinkFeature1)>=0 | value.indexOf(externalLinkFeature2)>=0 | value.indexOf(externalLinkFeature3)>=0 ){
				 if (value.indexOf(investorsFeature)<0){
		      jQuery(this).attr('target','_blank');}
		     }
		    else if(checkExtension(extension)){
		      jQuery(this).attr('target','_blank');}
		  }
		}

		});
		//adjust image alt
		$('img').each( function(){
		var alt_attr = jQuery(this).attr('alt');
		if (typeof alt_attr !== 'undefined' && alt_attr !== false) {
			if (alt_attr!=''){jQuery(this).attr('title', alt_attr);}
		}

		});
		//used by search
		$("#q").val(defSearch);
		//share module
		var appName = navigator.appName
		var image = new Image();
		var myurl="";
		var myRand=parseInt(Math.random()*99999999);
		if(appName == "Microsoft Internet Explorer"){
			myurl = "../../www.addthis.com/images/addthis-logo0a6d.gif?rand="+myRand;
		}else{
			myurl = "https://www.facebook.com/favicon.ico?rand="+myRand;
		}
		image.src = myurl;
		image.onload = function(){
			// The user can access addthis
			$.getScript('../../s7.addthis.com/js/250/addthis_widget.js#pubid=ra-4e1d167e73acaa0d?rand='+myRand, function(data, textStatus){
				//loading the file using jquery
			});
		}
		image.onerror = function(){
			// The user can't access addthis
			//alert("cannot load JS");

				$(".addthis_button_facebook").attr('href','https://www.addthis.com/bookmark.php?v=250&amp;winname=addthis&amp;pub=unknown&amp;source=tbx-250&amp;lng=en-US&amp;s=facebook&amp;url=http%3A%2F%2Fwww.standardchartered.com%2Fen%2F&amp;title=Standard%20Chartered%20Bank&amp;ate=AT-unknown/-/-/4ed8865ec7fab036/10/4d34f267fb24144e&amp;frommenu=1&amp;ips=1&amp;uid=4d34f267fb24144e&amp;ufbl=1&amp;ct=1&amp;pre=http%3A%2F%2Fwww.standardchartered.com%2Fen%2F&amp;tt=0');
				$(".addthis_button_twitter").attr('href','https://www.addthis.com/bookmark.php?v=250&amp;winname=addthis&amp;pub=unknown&amp;source=tbx-250&amp;lng=en-US&amp;s=twitter&amp;url=http%3A%2F%2Fwww.standardchartered.com%2Fen%2F&amp;title=Standard%20Chartered%20Bank&amp;ate=AT-unknown/-/-/4ed8865ec7fab036/11/4d34f267fb24144e&amp;frommenu=1&amp;ips=1&amp;uid=4d34f267fb24144e&amp;ufbl=1&amp;ct=1&amp;template=%7B%7Btitle%7D%7D%3A%20%7B%7Burl%7D%7D%20via%20%40AddThis&amp;pre=http%3A%2F%2Fwww.standardchartered.com%2Fen%2F&amp;tt=0');
				$(".addthis_button_google").attr('href','https://www.addthis.com/bookmark.php?v=250&amp;winname=addthis&amp;pub=unknown&amp;source=tbx-250&amp;lng=en-US&amp;s=google&amp;url=http%3A%2F%2Fwww.standardchartered.com%2Fen%2F&amp;title=Standard%20Chartered%20Bank&amp;ate=AT-unknown/-/-/4ed8865ec7fab036/1&amp;frommenu=1&amp;uid=4ed8865eb7805f59&amp;ct=1&amp;pre=http%3A%2F%2Fwww.standardchartered.com%2Fen%2F&amp;tt=0');
				$(".addthis_button_kaixin").attr('href','https://www.addthis.com/bookmark.php?v=250&amp;winname=addthis&amp;pub=unknown&amp;source=tbx-250&amp;lng=en-US&amp;s=kaixin&amp;url=http%3A%2F%2Fwww.standardchartered.com%2Fen%2F&amp;title=Standard%20Chartered%20Bank&amp;ate=AT-unknown/-/-/4ed8865ec7fab036/2&amp;frommenu=1&amp;uid=4ed8865e7e2c28b9&amp;ct=1&amp;pre=http%3A%2F%2Fwww.standardchartered.com%2Fen%2F&amp;tt=0');
				$(".addthis_button_email").attr('href','mailto:');
				$(".addthis_button_print").attr('href','javascript:print()');
				$(".addthis_button_compact").attr('href','http://addthis.com/');

		}
 });
function checkExtension(extension){
   var document = ["pdf","doc","docx","ppt","pptx","xls","xlsx"];
    for(var i=0; i<document.length;i++){
        if(document[i]==extension){
            return true;
        }
    }
     return false;
}
function videoLoad(video_src){
var swf_width=517;
var swf_height=354;
//var video_src='http://www.standardchartered.tv/video/sandra_tvc.flv';
var videoObject = "";
if(video_src.indexOf('.flv') != -1){
    videoObject = '<div style="padding-left:10px"><object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" id="playerSWF" width="'+ swf_width +'" height="'+ swf_height +'">';
    videoObject += '<param name="movie" value="http://www.standardchartered.tv/BluePlayer/SCBStandAloneVideoPlayer.swf"></param>';
    videoObject += '<param name="allowFullScreen" value="true"></param>';
    videoObject += '<param name="allowscriptaccess" value="sameDomain"></param>';
    videoObject += '<param name="wmode" value="transparent"></param>';
    videoObject += '<param name="FlashVars" value="contextType=rss&mediaURL='+video_src+'&mediaType=video"></param>';
    videoObject += '<embed name="playerSWF" src="http://www.standardchartered.tv/BluePlayer/SCBStandAloneVideoPlayer.swf" type="application/x-shockwave-flash"  allowscriptaccess="sameDomain" allowfullscreen="true" wmode="transparent" FlashVars="contextType=rss&mediaURL='+video_src+'&mediaType=video" pluginspage="http://get.adobe.com/flashplayer/" width="'+ swf_width +'" height="'+ swf_height +'"/>';
    videoObject += '</object></div><p></p>';
}
else{
    videoObject = '<div style="padding-left:60px"><embed type="application/x-shockwave-flash" flashvars="audioUrl=' + video_src + '" src="http://www.google.com/reader/ui/3523697345-audio-player.swf" width="400" height="27" quality="best"></embed>';
    videoObject += '</div><p></p>';
}
$(videoObject).insertBefore('#video');
}

function goToLocalSite(websiteURL){
	if (websiteURL!=0 && websiteURL!=""){
    //window.location=websiteURL;
	window.open(websiteURL);
	}
}

function goToServicePage(regionCountry){
	if (regionCountry!=0 && regionCountry!=""){
    var siteUrl = "http://preview.standardchartered.com/en/about-us/standard-chartered-worldwide/";
    window.location=siteUrl + regionCountry.toLowerCase() + ".html";
    }
}

//career landing page pagination implementation
/*********************all tab******************************/
function goToPageAll(pageIndex){
var elements = jQuery( '#AllGrid li' );
for ( var i = 0; i < elements.length; i ++ )
{
   if ( jQuery( elements[i] ).hasClass( pageIndex ) ){
    jQuery(elements[i]).show();
   }else{
    //jQuery(elements[i]).hide();
	elements[i].style.display="none";
   }
}

var paginationElements = jQuery( '#AllPagination li' );
for ( var i = 0; i < paginationElements.length; i ++ )
{
   if (jQuery( paginationElements[i]).hasClass( pageIndex ) ){
    jQuery(paginationElements[i]).addClass("selected");
   }else{
    if (jQuery(paginationElements[i]).hasClass("selected")){
		jQuery(paginationElements[i]).removeClass("selected");
		}
   }
}

}

function goToPrePageAll(){
var pageIndex;
//get Current PageIndex
var paginationElements = jQuery( '#AllPagination li' );
for ( var i = 0; i < paginationElements.length; i ++ )
{
	if (jQuery(paginationElements[i]).hasClass("selected")){pageIndex=i;}
	if (i==0) pageIndex = 1;
	}

//show corresponding layout
	var elements = jQuery( '#AllGrid li' );
for ( var i = 0; i < elements.length; i ++ )
{
   if ( jQuery( elements[i] ).hasClass( pageIndex ) ){
    jQuery(elements[i]).show();
   }else{
    //jQuery(elements[i]).hide();
	elements[i].style.display="none";
   }
}
//update selected index
for ( var i = 0; i < paginationElements.length; i ++ )
{
   if (jQuery( paginationElements[i]).hasClass( pageIndex ) ){
    jQuery(paginationElements[i]).addClass("selected");
   }else{
    if (jQuery(paginationElements[i]).hasClass("selected")){
		jQuery(paginationElements[i]).removeClass("selected");
		}
   }
}

}

function goToNexPageAll(){
var pageIndex;
//get Current PageIndex
var paginationElements = jQuery( '#AllPagination li' );
for ( var i = 0; i < paginationElements.length; i ++ )
{
	if (jQuery(paginationElements[i]).hasClass("selected")){pageIndex=i+2;}
	if (pageIndex>paginationElements.length) pageIndex = paginationElements.length;
	}

//show corresponding layout
	var elements = jQuery( '#AllGrid li' );
for ( var i = 0; i < elements.length; i ++ )
{
   if ( jQuery( elements[i] ).hasClass( pageIndex ) ){
    jQuery(elements[i]).show();
   }else{
    //jQuery(elements[i]).hide();
	elements[i].style.display="none";
   }
}
//update selected index
for ( var i = 0; i < paginationElements.length; i ++ )
{
   if (jQuery( paginationElements[i]).hasClass( pageIndex ) ){
    jQuery(paginationElements[i]).addClass("selected");
   }else{
    if (jQuery(paginationElements[i]).hasClass("selected")){
		jQuery(paginationElements[i]).removeClass("selected");
		}
   }
}
	}

/*********************professionals tab******************************/
function goToPagePro(pageIndex){
var elements = jQuery( '#ProGrid li' );
for ( var i = 0; i < elements.length; i ++ )
{
   if ( jQuery( elements[i] ).hasClass( pageIndex ) ){
    jQuery(elements[i]).show();
   }else{
    //jQuery(elements[i]).hide();
	elements[i].style.display="none";
   }
}

var paginationElements = jQuery( '#ProPagination li' );
for ( var i = 0; i < paginationElements.length; i ++ )
{
   if (jQuery( paginationElements[i]).hasClass( pageIndex ) ){
    jQuery(paginationElements[i]).addClass("selected");
   }else{
    if (jQuery(paginationElements[i]).hasClass("selected")){
		jQuery(paginationElements[i]).removeClass("selected");
		}
   }
}

}

function goToPrePagePro(){
var pageIndex;
//get Current PageIndex
var paginationElements = jQuery( '#ProPagination li' );
for ( var i = 0; i < paginationElements.length; i ++ )
{
	if (jQuery(paginationElements[i]).hasClass("selected")){pageIndex=i;}
	if (i==0) pageIndex = 1;
	}

//show corresponding layout
	var elements = jQuery( '#ProGrid li' );
for ( var i = 0; i < elements.length; i ++ )
{
   if ( jQuery( elements[i] ).hasClass( pageIndex ) ){
    jQuery(elements[i]).show();
   }else{
    //jQuery(elements[i]).hide();
	elements[i].style.display="none";
   }
}
//update selected index
for ( var i = 0; i < paginationElements.length; i ++ )
{
   if (jQuery( paginationElements[i]).hasClass( pageIndex ) ){
    jQuery(paginationElements[i]).addClass("selected");
   }else{
    if (jQuery(paginationElements[i]).hasClass("selected")){
		jQuery(paginationElements[i]).removeClass("selected");
		}
   }
}

}

function goToNexPagePro(){
var pageIndex;
//get Current PageIndex
var paginationElements = jQuery( '#ProPagination li' );
for ( var i = 0; i < paginationElements.length; i ++ )
{
	if (jQuery(paginationElements[i]).hasClass("selected")){pageIndex=i+2;}
	if (pageIndex>paginationElements.length) pageIndex = paginationElements.length;
	}

//show corresponding layout
	var elements = jQuery( '#ProGrid li' );
for ( var i = 0; i < elements.length; i ++ )
{
   if ( jQuery( elements[i] ).hasClass( pageIndex ) ){
    jQuery(elements[i]).show();
   }else{
    //jQuery(elements[i]).hide();
	elements[i].style.display="none";
   }
}
//update selected index
for ( var i = 0; i < paginationElements.length; i ++ )
{
   if (jQuery( paginationElements[i]).hasClass( pageIndex ) ){
    jQuery(paginationElements[i]).addClass("selected");
   }else{
    if (jQuery(paginationElements[i]).hasClass("selected")){
		jQuery(paginationElements[i]).removeClass("selected");
		}
   }
}
	}
/*********************associates tab******************************/
function goToPageAss(pageIndex){
var elements = jQuery( '#AssGrid li' );
for ( var i = 0; i < elements.length; i ++ )
{
   if ( jQuery( elements[i] ).hasClass( pageIndex ) ){
    jQuery(elements[i]).show();
   }else{
    //jQuery(elements[i]).hide();
	elements[i].style.display="none";
   }
}

var paginationElements = jQuery( '#AssPagination li' );
for ( var i = 0; i < paginationElements.length; i ++ )
{
   if (jQuery( paginationElements[i]).hasClass( pageIndex ) ){
    jQuery(paginationElements[i]).addClass("selected");
   }else{
    if (jQuery(paginationElements[i]).hasClass("selected")){
		jQuery(paginationElements[i]).removeClass("selected");
		}
   }
}

}

function goToPrePageAss(){
var pageIndex;
//get Current PageIndex
var paginationElements = jQuery( '#AssPagination li' );
for ( var i = 0; i < paginationElements.length; i ++ )
{
	if (jQuery(paginationElements[i]).hasClass("selected")){pageIndex=i;}
	if (i==0) pageIndex = 1;
	}

//show corresponding layout
	var elements = jQuery( '#AssGrid li' );
for ( var i = 0; i < elements.length; i ++ )
{
   if ( jQuery( elements[i] ).hasClass( pageIndex ) ){
    jQuery(elements[i]).show();
   }else{
    //jQuery(elements[i]).hide();
	elements[i].style.display="none";
   }
}
//update selected index
for ( var i = 0; i < paginationElements.length; i ++ )
{
   if (jQuery( paginationElements[i]).hasClass( pageIndex ) ){
    jQuery(paginationElements[i]).addClass("selected");
   }else{
    if (jQuery(paginationElements[i]).hasClass("selected")){
		jQuery(paginationElements[i]).removeClass("selected");
		}
   }
}

}

function goToNexPageAss(){
var pageIndex;
//get Current PageIndex
var paginationElements = jQuery( '#AssPagination li' );
for ( var i = 0; i < paginationElements.length; i ++ )
{
	if (jQuery(paginationElements[i]).hasClass("selected")){pageIndex=i+2;}
	if (pageIndex>paginationElements.length) pageIndex = paginationElements.length;
	}

//show corresponding layout
	var elements = jQuery( '#AssGrid li' );
for ( var i = 0; i < elements.length; i ++ )
{
   if ( jQuery( elements[i] ).hasClass( pageIndex ) ){
    jQuery(elements[i]).show();
   }else{
    //jQuery(elements[i]).hide();
	elements[i].style.display="none";
   }
}
//update selected index
for ( var i = 0; i < paginationElements.length; i ++ )
{
   if (jQuery( paginationElements[i]).hasClass( pageIndex ) ){
    jQuery(paginationElements[i]).addClass("selected");
   }else{
    if (jQuery(paginationElements[i]).hasClass("selected")){
		jQuery(paginationElements[i]).removeClass("selected");
		}
   }
}
	}
/*********************graduates tab******************************/
function goToPageGra(pageIndex){
var elements = jQuery( '#GraGrid li' );
for ( var i = 0; i < elements.length; i ++ )
{
   if ( jQuery( elements[i] ).hasClass( pageIndex ) ){
    jQuery(elements[i]).show();
   }else{
    //jQuery(elements[i]).hide();
	elements[i].style.display="none";
   }
}

var paginationElements = jQuery( '#GraPagination li' );
for ( var i = 0; i < paginationElements.length; i ++ )
{
   if (jQuery( paginationElements[i]).hasClass( pageIndex ) ){
    jQuery(paginationElements[i]).addClass("selected");
   }else{
    if (jQuery(paginationElements[i]).hasClass("selected")){
		jQuery(paginationElements[i]).removeClass("selected");
		}
   }
}

}

function goToPrePageGra(){
var pageIndex;
//get Current PageIndex
var paginationElements = jQuery( '#GraPagination li' );
for ( var i = 0; i < paginationElements.length; i ++ )
{
	if (jQuery(paginationElements[i]).hasClass("selected")){pageIndex=i;}
	if (i==0) pageIndex = 1;
	}

//show corresponding layout
	var elements = jQuery( '#GraGrid li' );
for ( var i = 0; i < elements.length; i ++ )
{
   if ( jQuery( elements[i] ).hasClass( pageIndex ) ){
    jQuery(elements[i]).show();
   }else{
    //jQuery(elements[i]).hide();
	elements[i].style.display="none";
   }
}
//update selected index
for ( var i = 0; i < paginationElements.length; i ++ )
{
   if (jQuery( paginationElements[i]).hasClass( pageIndex ) ){
    jQuery(paginationElements[i]).addClass("selected");
   }else{
    if (jQuery(paginationElements[i]).hasClass("selected")){
		jQuery(paginationElements[i]).removeClass("selected");
		}
   }
}

}

function goToNexPageGra(){
var pageIndex;
//get Current PageIndex
var paginationElements = jQuery( '#GraPagination li' );
for ( var i = 0; i < paginationElements.length; i ++ )
{
	if (jQuery(paginationElements[i]).hasClass("selected")){pageIndex=i+2;}
	if (pageIndex>paginationElements.length) pageIndex = paginationElements.length;
	}

//show corresponding layout
	var elements = jQuery( '#GraGrid li' );
for ( var i = 0; i < elements.length; i ++ )
{
   if ( jQuery( elements[i] ).hasClass( pageIndex ) ){
    jQuery(elements[i]).show();
   }else{
    //jQuery(elements[i]).hide();
	elements[i].style.display="none";
   }
}
//update selected index
for ( var i = 0; i < paginationElements.length; i ++ )
{
   if (jQuery( paginationElements[i]).hasClass( pageIndex ) ){
    jQuery(paginationElements[i]).addClass("selected");
   }else{
    if (jQuery(paginationElements[i]).hasClass("selected")){
		jQuery(paginationElements[i]).removeClass("selected");
		}
   }
}
	}

/*********************LPFC pagination implementation******************************/
function goToPageLpf(pageIndex){
var elements = jQuery( '#LpfGrid li' );
for ( var i = 0; i < elements.length; i ++ )
{
   if ( jQuery( elements[i] ).hasClass( pageIndex ) ){
    jQuery(elements[i]).show();
   }else{
    //jQuery(elements[i]).hide();
	elements[i].style.display="none";
   }
}

var paginationElements = jQuery( '#LpfPagination li' );
for ( var i = 0; i < paginationElements.length; i ++ )
{
   if (jQuery( paginationElements[i]).hasClass( pageIndex ) ){
    jQuery(paginationElements[i]).addClass("selected");
   }else{
    if (jQuery(paginationElements[i]).hasClass("selected")){
		jQuery(paginationElements[i]).removeClass("selected");
		}
   }
}

}

function goToPrePageLpf(){
var pageIndex;
//get Current PageIndex
var paginationElements = jQuery( '#LpfPagination li' );
for ( var i = 0; i < paginationElements.length; i ++ )
{
	if (jQuery(paginationElements[i]).hasClass("selected")){pageIndex=i;}
	if (i==0) pageIndex = 1;
	}

//show corresponding layout
	var elements = jQuery( '#LpfGrid li' );
for ( var i = 0; i < elements.length; i ++ )
{
   if ( jQuery( elements[i] ).hasClass( pageIndex ) ){
    jQuery(elements[i]).show();
   }else{
    //jQuery(elements[i]).hide();
	elements[i].style.display="none";
   }
}
//update selected index
for ( var i = 0; i < paginationElements.length; i ++ )
{
   if (jQuery( paginationElements[i]).hasClass( pageIndex ) ){
    jQuery(paginationElements[i]).addClass("selected");
   }else{
    if (jQuery(paginationElements[i]).hasClass("selected")){
		jQuery(paginationElements[i]).removeClass("selected");
		}
   }
}

}

function goToNexPageLpf(){
var pageIndex;
//get Current PageIndex
var paginationElements = jQuery( '#LpfPagination li' );
for ( var i = 0; i < paginationElements.length; i ++ )
{
	if (jQuery(paginationElements[i]).hasClass("selected")){pageIndex=i+2;}
	if (pageIndex>paginationElements.length) pageIndex = paginationElements.length;
	}

//show corresponding layout
	var elements = jQuery( '#LpfGrid li' );
for ( var i = 0; i < elements.length; i ++ )
{
   if ( jQuery( elements[i] ).hasClass( pageIndex ) ){
    jQuery(elements[i]).show();
   }else{
    //jQuery(elements[i]).hide();
	elements[i].style.display="none";
   }
}
//update selected index
for ( var i = 0; i < paginationElements.length; i ++ )
{
   if (jQuery( paginationElements[i]).hasClass( pageIndex ) ){
    jQuery(paginationElements[i]).addClass("selected");
   }else{
    if (jQuery(paginationElements[i]).hasClass("selected")){
		jQuery(paginationElements[i]).removeClass("selected");
		}
   }
}
	}

/*************************************search*******************************************/
/*******************search*************************/
			function clearSearchText(ele) {
				if (ele == eleSearch) {
					if (ele.value == defSearch) { ele.value = ""; }
				}
			}

			function resetSearchText(ele) {
				if (ele == eleSearch) {
					if (ele.value == "") { ele.value = defSearch; }
				}
			}

            function checkval() {
						 var eleSearch = document.getElementById("q");
						 var qval = eleSearch.value;
						 qval = qval.replace(/<script>/gi,"");
						 qval = qval.replace(/<\/script>/gi,"");
						 qval = qval.replace(/<script\/>/gi,"");
                         qval = qval.replace(/[();<>+'"&?]/gi,"");
						 document.getElementById("q").value = qval;
                         document.gs.submit();
			}