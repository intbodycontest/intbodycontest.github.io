$(document).ready(function(){

	$('div.panel').each(function(i){
		if($(this).children('div[class="fbfeed_scb"]').length !=0){
		$(this).removeAttr("style");
		}
	});
});

function output(obj) {
	if(obj.constructor == Object) {
		for(is in obj);
		{
			
			if(is == 'content')
			{
			
			   awskey = obj[is];
			   get_feeds(awskey);
			   return true;
			}
		}
		
	}
	
		  get_feeds_error(obj);
		  return true;
}

function get_feeds_error(obj)
{
	 $('#fbfeeds01').empty();
msg_error = "<div class='fbfeed-item'><div class='fbholder-fix cf'><font size='3'  color='black'><strong>Access Denied</strong></font><br/><br/><p>Access to facebook.com has been denied. This can be due to the following reasons.<br/><br/> <ol><dl>1. There might be some access restriction implemented in your organization's network as per it's internet usage policy. If your request to access this web site was explicitly approved earlier, please contact your system administrator.</dl> <dl>2. Your internet connection lost while loading the content from facebook.com. In this case please refresh the page after trouble shooting your internet connection.</dl></ol></p></div></div>";
    $('#fbfeeds01').html(msg_error);
	return false;
}
function getprofile(pdata)
{
	totlikes = 0;
	if(pdata.constructor == Object) {
		if(pdata.likes !="undefined")
		{
		   pictures = pdata.picture;
		   plink    = pdata.link;
		   plikes   = pdata.likes;
		   $('body').data('fbprofile', { likes: plikes, links: plink,pict:pictures });
	       totlikes =plikes;
	           
		}  
	}
	
	 $('#tlikes').html(totlikes+" people like <strong>Standard Chartered</strong>.");
}


function findUrls( text )
{
    var source = (text || '').toString();
    var urlArray = [];
    var url;
    var matchArray;

    // Regular expression to find FTP, HTTP(S) and email URLs.
    var regexToken = /(((ftp|https?):\/\/)[\-\w@:%_\+.~#?,&\/\/=]+)|((mailto:)?[_.\w-]+@([\w][\w\-]+\.)+[a-zA-Z]{2,3})/g;

    // Iterate through any URLs in the text.
    while( (matchArray = regexToken.exec( source )) !== null )
    {
        var token = matchArray[0];
        urlArray.push( token );
    }

    return urlArray;
}



String.prototype.zf = function(l) { return '0'.string(l - this.length) + this; }
String.prototype.string = function(l) { var s = '', i = 0; while (i++ < l) { s += this; } return s; }
Number.prototype.zf = function(l) { return this.toString().zf(l); }
Date.prototype.formats = function(f)
{
		var gsMonthNames = new Array(
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
		);
	var gsDayNames = new Array(
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday'
  );

    if (!this.valueOf())
        return ' ';

    var d = this;

       return f.replace(/(yyyy|mmmm|mmm|mm|dddd|ddd|dd|hh|nn|ss|a\/p)/gi,
        function($1)
        {

            switch ($1.toLowerCase())
            {
            case 'yyyy': return d.getFullYear();
            case 'mmmm': return gsMonthNames[d.getMonth()+1];
            case 'mmm':  return gsMonthNames[d.getMonth()+1].substr(0, 3);
            case 'mm':   return (d.getMonth() + 1).zf(2);
            case 'dddd': return gsDayNames[d.getDay()];
            case 'ddd':  return gsDayNames[d.getDay()].substr(0, 3);
            case 'dd':   return d.getDate().zf(2);
            case 'hh':   return ((h = d.getHours() % 12) ? h : 12).zf(2);
            case 'nn':   return d.getMinutes().zf(2);
            case 'ss':   return d.getSeconds().zf(2);
            case 'a/p':  return d.getHours() < 12 ? 'am' : 'pm';
            }
        }
    );
}
Date.prototype.setISO8601 = function (string) {
	 // var regexp = "([0-9]{4})(-([0-9]{2})(-([0-9]{2})" +
       // "(T([0-9]{2}):([0-9]{2})(:([0-9]{2})(\.([0-9]+))?)?" +
       // "(Z|(([-+])([0-9]{2}):([0-9]{2})))?)?)?)?"; 
    var d = string.match(new RegExp(regexp));
    var regexp = "([0-9]{4})(-([0-9]{2})(-([0-9]{2})" +
        "(T([0-9]{2}):([0-9]{2})(:([0-9]{2}))?" +
        "(Z|(([-+])([0-9]{4})))?)?)?)?";
    var d = string.match(new RegExp(regexp));
    var offset = 0;
    var date = new Date(d[1], 0, 1);

    if (d[3]) { date.setMonth(d[3] - 1); }
    if (d[5]) { date.setDate(d[5]); }
    if (d[7]) { date.setHours(d[7]); }
    if (d[8]) { date.setMinutes(d[8]); }
    if (d[10]) { date.setSeconds(d[10]); }
    if (d[14]) {
        offset = Number(d[14]);
        offset *= ((d[13] == '-') ? 1 : -1);
    }

    offset -= date.getTimezoneOffset();
    time = (Number(date) + (offset * 60 * 1000));

    this.setTime(Number(time));
}

$(document).ready(function(){
			   
	jsonlib.fetch('https://graph.facebook.com/oauth/access_token?type=client_cred&amp;client_id=149169311831203&amp;client_secret=3b213531736a81288bab810902b0a8c5', function(m) { output(m); });
	
	var img = $('#facebookimg');
$(img).bind({
    load: function() {
        //alert('Image loaded.');
    },
    error: function() {
        get_feeds_error(this);
    }
});

    $(img).attr('src','../../profile.ak.fbcdn.net/hprofile-ak-snc4/211123_155725841111588_3516643_q.jpg');

 });

function getquestions(qid,sbid)
{
	
	 if(qid =="")
	 {
		 return;
	 }
	 jQuery.getJSON("https://graph.facebook.com/"+qid+"?"+$('body').data('token')+"&callback=?",
     function(qfeeds) {
		 var spans = "<div class='que-text-fb-feed'>"+qfeeds.question+"</div>";
		 if(qfeeds.options !=undefined)
		 {
	
			 for(qkeys in qfeeds.options.data)
			 {
				
				  qoptions = qfeeds.options.data[qkeys];
				  if(qoptions)
				   if(typeof qoptions.name  != "undefined")
				    {
				    spans += "<div class='option-text-fb-feed cf'>"+qoptions.name+"<span>"+qoptions.vote_count+"</span></div>";
				    }  
			     }
		 }
	       $("#"+sbid).html(spans);
	});
	
}

function getfeeds(rtndata ) {

   if($('#fbpagining01').length <= 0)
   {
	   	     $('#fbfeeds01').empty();

   }else
   {
	        $('#fbpagining01').remove();
   }
 
	 

	for(keys in rtndata.data)
	{

			  links_bind = "";
			  links_bind_end = "";
			  img_bind = "";
			   divs  ="";
			   cption ="";
		      cpt_desc="";
			  cpt_name="";
			  var showComment = true;
			  var showlikes  = true;
		      indiv_feeds =  rtndata.data[keys];
               if(jQuery.isEmptyObject(indiv_feeds))
				{
                    continue;
				}
			   if(indiv_feeds.type == "status")
			   {
				   continue;
			   }
		      var hrids = "feedkey"+keys;
		      divs       = ' <div class="fbfeed-item"><div class="fbholder-fix cf"><div class="fbfeed-story"><h6>';
              divs +=  '<a target="_blank" href="http://www.facebook.com/StandardChartered">'
			  
			  if(!jQuery.isEmptyObject(indiv_feeds.from))
			  {
				    divs += '<span class="fbfeed-passiveName">'+indiv_feeds.from.name+'</span>' 
			  }else
			  {
				    divs += '<span class="fbfeed-passiveName">Standard Chartered</span>' 
			  }
              divs +=  '</a>';
			   if(indiv_feeds.type == "question")
			   {
				   showlikes = false;
				   showComment = false;
				   
				    // alert(indiv_feeds.story);
					    var quest = '<div id="'+hrids+'">'+ indiv_feeds.story+'</div>';
				       divs +=quest;
					   if(!jQuery.isEmptyObject(indiv_feeds.object_id))
					   {
						   if(indiv_feeds.object_id != undefined)
						   {
							  var  questionid=indiv_feeds.object_id;
							   getquestions(questionid,hrids);
						   }
					   }
			   }
			   else
			   {
					  if(indiv_feeds.message != undefined)
					  {
							  msg =  indiv_feeds.message;
							  urls = findUrls(msg);
				
							  if(urls.length > 0)
							  {
									for(surl in  urls){
									   single_url = urls[surl];
									  msg =   msg.replace(single_url,"<a href='"+single_url+"' target='_blank' >"+single_url+"</a>")
									}
							  }
							
							  divs += msg ;
								urls="";
							  msg ="";
						}
				
			   }
			    divs +=  '</h6>';
			 if(indiv_feeds.link !=undefined) 
			  {
				   links_bind = '<a class="fbfeed-photoThumb" href="'+indiv_feeds.link+'">';
				   links_bind_end = "</a>";
			  }
			   if(indiv_feeds.picture !=undefined) 
			  {
				  img_bind = '<span class="fb-span-img"><img  alt="" src="'+indiv_feeds.picture+'" class="fbfeed-stImg" /></span>';
			  }
			  
			   if(indiv_feeds.name !=undefined) 
			  {
				  cpt_name = '<span class="fb-fdname-inner">'+indiv_feeds.name+'</span>';
			  }
			  
			    if(indiv_feeds.caption !=undefined) 
			   {
				  cption = '<span class="fb-fdcapt-inner">'+indiv_feeds.caption+'</span>';
			   }
			   
			    if(indiv_feeds.description !=undefined) 
			   {
				  cpt_desc = '<span class="fb-fddesc-inner">'+indiv_feeds.description+'</span>';
			   }
				
				
				
 			 divs +=links_bind +img_bind+cpt_name+cption+cpt_desc+links_bind_end;
			 dte = indiv_feeds.created_time;
			 dates = new Date();
             dates.setISO8601(dte);
             s = dates.formats('mmm dd, yyyy at hh:nn a/p');
			  like_count = 0;
			    comment_count = 0;
				
             divs += '<span class="fbfeed-passiveName cf"><img  alt="" src="'+indiv_feeds.icon+'" style=""/> '+s+'</span>' ;
			 divs += '<div class="fbfeed-countsBox cf">';
			 if(typeof indiv_feeds.likes  != "undefined" && showlikes)
			 {
				  like_count = indiv_feeds.likes.count;
				   divs +='<span class="likes-countsBox">'+like_count+'</span>'
			 }
			  if(typeof indiv_feeds.comments  != "undefined" && showComment)
			 {
				  comment_count = indiv_feeds.comments.count;
				  divs +='<span class="comment-countsBox">'+comment_count+'</span>';
			 }
			 
		   
		    divs += '</div>' ;
		    divs +=  '</div></div></div>';
           $('#fbfeeds01').append(divs);

	}
 
	
	 if(rtndata.paging.next)
	 { 
		 outer_div = '<div class="show-more-fbfd cf" id="fbpagining01"><a href="javascript:loadmore(\''+rtndata.paging.next+'\')">show more</a></div>';
		 $('#fbfeeds01').append(outer_div);
	 }
	



}

function loadmore(urls)
{
	
	$.ajax({
		url: urls,
		dataType: "jsonp",
		jsonp : "callback",
		jsonpCallback: "getfeeds",
		crossDomain:true
		});
}

function get_feeds(token)
{
	$('body').data('token',token);

 urls= "https://graph.facebook.com/155725841111588/feed?"+token+"&limit=10";
	$.ajax({
		url: urls,
		dataType: "jsonp",
		jsonp : "callback",
		jsonpCallback: "getfeeds",
		crossDomain:true
		});


 profileurl = 	"https://graph.facebook.com/155725841111588";
 $.ajax({
		url: profileurl,
		dataType: "jsonp",
		jsonp : "callback",
		jsonpCallback: "getprofile",
		crossDomain:true
		});
	
}


