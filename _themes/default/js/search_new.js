  var gcseDiv = document.getElementById('gsearch');
  gcseDiv.innerHTML = '<gcse:searchbox-only resultsUrl="/en/search-result.html"  enableAutoComplete="true"></gcse:searchbox-only>';
  
  (function() {
    var cx = '015670123397949381671:8q6yuo1vyji';
    var gcse = document.createElement('script');
    gcse.type = 'text/javascript';
    gcse.async = true;
    gcse.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') +
        '//www.google.com/cse/cse.js?cx=' + cx;
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(gcse, s);
  })();