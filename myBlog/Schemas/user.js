var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var UserSchema = new Schema({
    name: String,
    age: Number,
    email: String,
    pwd: String,
    articles: [{
        type: Schema.ObjectId,
        ref: 'Articles'
    }]
})

var User = mongoose.model('User', UserSchema);

/*User.create({
    name: 'zhangsan',
    age: 12,
    email: '123@qq.com'
}, function(err, doc) {
    if (err) {
        console.log(err);
    }
    console.log(doc)
})*/


module.exports = User;
