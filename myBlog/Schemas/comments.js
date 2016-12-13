/**
 * 评论表
 */

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/my_blog');

var Schema = mongoose.Schema;
var CommentsSchema = new Schema({
    username: String,
    content: String,
})

var Comments = mongoose.model('Commets', CommentsSchema);

/*Comments.create({
    username: 'haha',
    content: '我评论了'
}, function(err, doc) {
    if (err) console.log(err);
    console.log(doc)
})*/


module.exports = Comments;
