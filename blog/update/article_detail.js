var request = require('request');
var cheerio = require('cheerio');

function getArticleDetail(url, callback) {
    request(url, function(err, res, body) {
        if (err) {
            console.log(err);
            callback(err);
        }
        var $ = cheerio.load(body);
        var tags = [];
        $(".blog_tag h3 a").each(function(index, a) {
            var tag = $(a).text();
            tags.push(tag)
        })
        var articleDetail = {
            tags: tags,
            contents: $("#sina_keyword_ad_area2").html().trim()
        }
        callback(null, articleDetail)
    })
}

// getArticleDetail("http://blog.sina.com.cn/s/blog_69e72a420100z99n.html", function(err, res) {
//     console.log(res);
// })

module.exports = getArticleDetail;
