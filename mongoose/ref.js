/**
 * Created by Administrator on 2016/12/10.
 */
/*
* dbref
* 在一个文档中可以引用另一个文档
* */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/part10');

var User = mongoose.model('User',{
    username: String
})

var News = mongoose.model('News',{
    title: String,
    author:{
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }
})

var user = new User({
    username: 'sid'
})

var news = new News({
    title: 'haha',
    author: user
})

user.save(function(err){
    if(err) console.log('faild',err)
    news.save(function(err,doc){
        if(err) console.log(err)
        //填充作者字段
        // poplate
        console.log(doc)
    })

})