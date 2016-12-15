/**
 * 评论表
 */

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var CommentsSchema = new Schema({
    username: String,
    content: String,
    create_At: {
        type: Date,
        default: Date.now
    }
})

var Comment = mongoose.model('Comment', CommentsSchema);

/*Comments.create({
    username: 'haha',
    content: '我评论了'
}, function(err, doc) {
    if (err) console.log(err);
    console.log(doc)
})*/


module.exports = Comment;
