$(document).ready(function() {
		    $("#pww-cookie").css("display","none");			   
	
			$('a').bind({
				
				click: function(event) {
					
					setclickedaction();
				}
					
			});	
			
			$('input').bind({
				
				click: function(event) {
					
					setclickedaction(); 
				}
						
			});
			
	function setclickedaction()
	{
		
			if(!$.cookie('global_allow_cookie'))
			            {
				
					         var seconds = new Date().getTime();
			                 var cookievals ="st="+seconds+"&perm=true&et=0&ul="+escape(window.location.href);
                               $.cookie('global_allow_cookie', cookievals,{ expires:360,path:'/' });
						}
						
						else
						{
							
							    cvalue     =  $.cookie('global_allow_cookie');
									var sttime   = (getUrlVars(cvalue)["st"]);
									var perm      = (getUrlVars(cvalue)["perm"]);
									var ettime   = (getUrlVars(cvalue)["et"]);
									var ul       = (getUrlVars(cvalue)["ul"]);
									if(ettime =="" || ettime ==null || ettime =="undefined")
									{
										ettime = new Date().getTime();
									}
									
										var cookievals ="st="+sttime+"&perm=true&et="+ettime+"&ul="+escape(window.location.href);
										$.cookie('global_allow_cookie',cookievals,{ expires:360,path:'/' });
						}
	    
	}

 
        $(window).load(function () {
            // run code
		
			if(!$.cookie('global_allow_cookie'))
			{
				
			     var seconds = new Date().getTime();
			     var cookievals ="st="+seconds+"&perm=false&et=0&ul="+escape(window.location.href);
                 $.cookie('global_allow_cookie', cookievals,{ expires:360,path:'/' });
				 $("#pww-cookie").css("display","block");
				
			}else{
			    cvalue     =  $.cookie('global_allow_cookie');
			  	var sttime   = (getUrlVars(cvalue)["st"]);
		        var perm      = (getUrlVars(cvalue)["perm"]);
			    var ettime   = (getUrlVars(cvalue)["et"]);
				var ul       = (getUrlVars(cvalue)["ul"]);
				

			    if(perm=="true" || perm ==true)
				{
					
					 $("#pww-cookie").css("display","none");
				   	 return true;
				}else
				  {
					   var ctimes = new Date().getTime();
					
					 if(ettime ==0)
					  {
						    var exptime_other = 5*60*1000;
						    var tdiff = ctimes-sttime;
						    if(tdiff > exptime_other)
					        {
									$("#pww-cookie").css("display","block");
						           	 return true; 
							}else
							{  
							    $("#pww-cookie").css("display","none");
								setclickedaction();
								return true; 
							}

						  
					  }
				
					    var exptime = 5*1000;
					    var tdiff = ctimes-ettime;

				     eurl = escape(window.location.href);
					
					if(document.referrer  && document.referrer !="undefined" && document.referrer !="" && document.referrer !=null)
					{
					         
							   ref = escape(document.referrer); 
							 
								if(eurl == ref)
								{
									 
										   $("#pww-cookie").css("display","block");
							               return true; 
								}else
								{
										
										$("#pww-cookie").css("display","none");
										var cookievals ="st="+sttime+"&perm=true&et="+ettime+"&ul="+escape(window.location.href);
										$.cookie('global_allow_cookie',cookievals,{ expires:360,path:'/' });
										return true; 
								}
					
					}else
					{
							  
								if(ul == eurl)
								{
									 
										   $("#pww-cookie").css("display","block");
							               return true; 
								}else
								{
								    	eurl_host      = window.location.host;
										eurl_pathname  = window.location.pathname;
									    var pathArray = eurl_pathname.split( 'https://www.sc.com/' );
										if(pathArray.length > 0)
										{
											if(pathArray[0] == "" || pathArray[0] == null)
											{
												paths = pathArray[1];
											}else
											{
												paths = pathArray[0];
											}
											chkstring = eurl_host+"/"+paths;
											
											 if(ul.indexOf(chkstring) != -1)
											 {
												 
												  $("#pww-cookie").css("display","none");
													var cookievals ="st="+sttime+"&perm=true&et="+ettime+"&ul="+escape(window.location.href);
													$.cookie('global_allow_cookie',cookievals,{ expires:360,path:'/' });
													return true; 
												 
											 }
										}
								}
					}
					
					
	
					
					
				}
			}
			
        });


  $(window).unload(function() {
							
		unloadhappen(); 
     });
  
  window.onbeforeunload = function()   { unloadhappen();}
  function unloadhappen()
  {
	
	          ucvalue =  $.cookie('global_allow_cookie');
			  var seconds = new Date().getTime();
			  var sttime = (getUrlVars(ucvalue)["st"]);
		      var perm = (getUrlVars(ucvalue)["perm"]);
			  var ettime = (getUrlVars(ucvalue)["et"]);
			  var ul = (getUrlVars(ucvalue)["ul"]);

			    if(perm=="true" || perm ==true)
				{
					return true;
				}
				
			    var ucookievals ="st="+sttime+"&perm="+perm+"&et="+seconds+"&ul="+ul;
			    $.cookie('global_allow_cookie',ucookievals,{ expires:360,path:'/' });
			    return true; 
  }


function getUrlVars(strings)
{
    var vars = [], hash;
    var hashes = strings.split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

});