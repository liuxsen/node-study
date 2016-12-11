var request = require('request');
var cheerio = require('cheerio');
var async = require('async');

var getArticleList = require('./article_list');
var getArticleDetail = require('./article_detail');
/**
 * 获取文章分类下面的所有的文章详情
 * @param  {[type]}   url      [分类文章列表页连接]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
function getArticleAll(url, callback) {
    // 获取所有的文章列表
    getArticleList(url, function(err, classList) {
        // console.log(classList);
        async.eachSeries(classList, function(article, next) {
            console.log(article);
            getArticleDetail(article.url, function(err, res) {
                console.log(res);
                next();
            })
        })
    })
}

getArticleAll('http://blog.sina.com.cn/s/articlelist_1776757314_13_1.html')
