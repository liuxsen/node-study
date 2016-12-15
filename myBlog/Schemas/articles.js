/**
 * 文章模型
 */

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var articleSchema = new Schema({
    title: String,
    content: String,
    create_At: {
        type: Date,
        default: Date.now
    },
    update_At: { //文章更新时间
        type: Date,
        default: Date.now
    },
    author: { // 作者
        type: String
    },
    commemts: [ //评论
        {
            type: Schema.ObjectId,
            ref: 'Comment' //评论表
        }
    ]
})

var Article = mongoose.model('Article', articleSchema);

/*Article.create({
    title: '哈哈',
    content: 'hh'
}, function(err, doc) {
    if (err) console.log(err);
    console.log(doc)
})*/

module.exports = Article;
