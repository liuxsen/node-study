var request = require('request');
var cheerio = require('cheerio');

/**
 * 获取文章列表
 * @param  {[type]}   url      [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
function getArticleList(url, callback) {
    request(url, function(err, res, body) {
        if (err) {
            console.log(err);
            callback(err);
        }
        var $ = cheerio.load(body);
        var article_list = [];
        $(".articleList .articleCell").each(function() {
                var $me = $(this);
                // http://blog.sina.com.cn/s/blog_69e72a420102xew9.html
                var url = $me.find('.atc_title a').attr('href');
                var reg = /blog_([a-zA-Z0-9]+)\.html/
                var id = url.match(reg)[1];
                var article = {
                    title: $me.find('.atc_title').text().trim(),
                    url: url,
                    create_at: $me.find(".atc_info .atc_tm").text(),
                    id: id
                }
                article_list.push(article);


            })
            // 检查时候还有下一页
        var nextUrl = $('.SG_pgnext a').attr('href');
        console.log(nextUrl)
        if (nextUrl) {
            getArticleList(nextUrl, function(err, article_list2) {
                if (err) {
                    console.log(err);
                    callback(err);
                }
                callback(null, article_list.concat(article_list2))
            })
        } else {
            callback(null, article_list)
        }
    })
}


// getArticleList('http://blog.sina.com.cn/s/articlelist_1776757314_0_1.html', function(err, res) {
//     console.log(res);
// })


module.exports = getArticleList;
