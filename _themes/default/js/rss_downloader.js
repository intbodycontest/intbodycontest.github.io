$(function () {
    //Do not remove the next comment or minify it.
    var itemTemplate = hereDoc(function () {/*!
        <li class="item">
            <h3>
                <a href="{link}">{title}</a>
            </h3>
        
            <div style="overflow:hidden" class="item-detail">
                <p class="time-stamp">
                    <span class="date">{publishedDate}</span>
                    {categories}
                </p>
            </div>
            <p>{contentSnippet}</p>
        </li>
    */});
    
    //Do not remove the next comment or minify it.
    var categoryTemplate = hereDoc(function () {/*!&nbsp;<a href="{categoryURL}">{categoryName}</a>*/});

    parseRSS("https://www.sc.com/BeyondBorders/feed/", function (feed) {
        $.each(feed.entries, function (index, value) {
            if(index >= 3) {
                return;
            }
            var categoryHTMLArray = [];
            $.each(value.categories, function(i, v) {
                var url = "";
                if(i === 0) {
                    if(v.split(" ").length === 1 && v !== "sustainability") {
                        url = "https://www.sc.com/BeyondBorders/category/subjects/" + v.toLowerCase() + "-subjects/"
                    } else {
                        url = "https://www.sc.com/BeyondBorders/category/subjects/" + v.toLowerCase().replace(/ /g, "-") + "/"
                    }
                } else {
                    url = "https://www.sc.com/BeyondBorders/tag/"+ v.replace(/ /g, "-")
                }
                
                var categoryHTML = nano(categoryTemplate, {categoryURL: url, categoryName: v});
                categoryHTMLArray.push(categoryHTML);
            });
            
            value.categories = categoryHTMLArray.join()
            var publishedDate = new Date(value.publishedDate.toString());
            value.publishedDate = dateToDMY(publishedDate);
            var itemHTML = nano(itemTemplate, value).replace(/The post/, '');
            $("#rss-list").append(itemHTML);
        });
    });
    parseRSS1("https://apps.standardchartered.com/RSSGenerator/RSS", function (feed) {
        $.each(feed.entries, function (index, value) {
            if(index >= 3) {
                return;
            }
            
            value.categories = 'News'
            var publishedDate = new Date(value.publishedDate.toString());
            value.publishedDate = dateToDMY(publishedDate);
            var itemHTML = nano(itemTemplate, value);
            $("#rss-list1").append(itemHTML.replace(/http:/,'https:').replace(/standardchartered/,'sc'));
        });
    });
});

function parseRSS(url, callback) {
    $.ajax({
        url: document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent(url),
        dataType: 'json',
        success: function (data) {
            callback(data.responseData.feed);
        }
    });
}
function parseRSS1(url, callback) {
    $.ajax({
        url: document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent(url),
        dataType: 'json',
        success: function (data) {
            callback(data.responseData.feed);
        }
    });
}
function nano(template, data) {
  return template.replace(/\{([\w\.]*)\}/g, function(str, key) {
    var keys = key.split("."), v = data[keys.shift()];
    for (var i = 0, l = keys.length; i < l; i++) v = v[keys[i]];
    return (typeof v !== "undefined" && v !== null) ? v : "";
  });
}

function hereDoc(f) {
    return f.toString().
    replace(/^[^\/]+\/\*!?/, '').
    replace(/\*\/[^\/]+$/, '');
}

function dateToDMY(date) {
    var d = date.getDate();
    var m = date.getMonth() + 1;
    var y = date.getFullYear();
    return '' + (d <= 9 ? '0' + d : d) + '/' + (m <= 9 ? '0' + m : m) + '/' + y;
}

