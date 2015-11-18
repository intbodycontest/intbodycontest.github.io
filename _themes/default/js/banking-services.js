$(function () {
    var rssURL = "";
    switch (document.location.origin) {
        case "https://www.sc.com":
            rssURL = "https://apps.standardchartered.com/RSSGenerator/RSS";
            break;
        case "http://www.standardchartered.com":
            rssURL = "https://apps.standardchartered.com/RSSGenerator/RSS";
            break;
        case "http://preview.standardchartered.com":
            rssURL = "https://apps.standardchartered.com/RSSGenerator/RSS";
            break;
        default:
            rssURL = "https://apps.standardchartered.com/RSSGenerator/RSS";
            break;
    }
    rmbNews(rssURL);
    insightsResources(rssURL);
});

function insightsResources(rssURL) {
    //Do not remove the next comment or minify it.
    var itemTemplate = hereDoc(function () {
        /*!
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
    */
    });

    //Do not remove the next comment or minify it.
    var categoryTemplate = hereDoc(function () { /*!<a href="{categoryURL}">{categoryName}</a>*/
    });

    parseTwoRSS(rssURL + "?category=RMB%20Insights", rssURL + "?category=RMB%20Research", function (entries) {
        $.each(entries, function (index, value) {
            if (index >= 3) {
                return;
            }
            var categoryHTMLArray = [];
            $.each(value.categories, function (i, v) {
                var url = "insights-resources/index.html#$category=Research$pageNumber=1";
                var categoryHTML = nano(categoryTemplate, {
                    categoryURL: url,
                    categoryName: v
                });
                categoryHTMLArray.push(categoryHTML);
            });

            value.categories = categoryHTMLArray.join()
            var publishedDate = new Date(value.publishedDate.toString());
            value.publishedDate = dateToDMY(publishedDate);
            var itemHTML = nano(itemTemplate, value);
            $("#insights-resources-list").append(itemHTML.replace(/http:/, 'https:').replace(/standardchartered/, 'sc'));
        });
    });
};

function rmbNews(rssURL) {
    //Do not remove the next comment or minify it.
    var itemTemplate = hereDoc(function () {
        /*!
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
    */
    });

    //Do not remove the next comment or minify it.
    var categoryTemplate = hereDoc(function () { /*!<a href="{categoryURL}">{categoryName}</a>*/
    });

    parseRSS(rssURL + "?category=RMB%20News", function (feed) {
        $.each(feed.entries, function (index, value) {
            if (index >= 3) {
                return;
            }
            var categoryHTMLArray = [];
            $.each(value.categories, function (i, v) {
                var url = "insights-resources/index.html#$category=News$pageNumber=1";
                var categoryHTML = nano(categoryTemplate, {
                    categoryURL: url,
                    categoryName: v
                });
                categoryHTMLArray.push(categoryHTML);
            });

            value.categories = categoryHTMLArray.join()
            var publishedDate = new Date(value.publishedDate.toString());
            value.publishedDate = dateToDMY(publishedDate);
            var itemHTML = nano(itemTemplate, value);
            $("#rmb-news-list").append(itemHTML.replace(/http:/, 'https:').replace(/standardchartered/, 'sc'));
        });
    });
};

function parseRSS(url, callback) {
    $.ajax({
        url: document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent(url),
        dataType: 'json',
        success: function (data) {
            callback(data.responseData.feed);
        }
    });
}

function parseTwoRSS(urlA, urlB, callback) {
    $.when(
    $.ajax({
        url: document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent(urlA),
        dataType: 'json'
    }),
    $.ajax({
        url: document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent(urlB),
        dataType: 'json'
    })).done(function (a, b) {
        var data = a[0].responseData.feed.entries.concat(b[0].responseData.feed.entries);
        callback(data);
    });
}

function nano(template, data) {
    return template.replace(/\{([\w\.]*)\}/g, function (str, key) {
        var keys = key.split("."),
            v = data[keys.shift()];
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

