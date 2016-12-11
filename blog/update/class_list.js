var request = require('request');
var cheerio = require('cheerio');

/**
 * 获取文章分类列表
 * @param  {[String]}   url [首页地址]
 * @param  {Function} cb  [description]
 * @return {[type]}       [description]
 */
function getClassList(url, cb) {
    request(url, function(err, res, body) {
        if (err) {
            console.log(err);
            cb(err);
        }
        var $ = cheerio.load(body);
        var classList = [];
        $('.classList li a').each(function() {
            var $me = $(this);
            // http://blog.sina.com.cn/s/articlelist_1776757314_6_1.html
            var url = $me.attr('href');
            var reg = /articlelist_\d+_(\d+)_\d\.html/;
            var class_id = url.match(reg)[1];
            var item = {
                name: $me.text().trim(),
                url: url,
                id: class_id
            }
            classList.push(item);
        })
        cb(null, classList)
    })
}

// getClassList('http://blog.sina.com.cn/u/1776757314', function(err, classList) {
//     console.log(classList)
// })

module.exports = getClassList;
