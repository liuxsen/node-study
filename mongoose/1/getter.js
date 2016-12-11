/**
 * Created by liuxsen on 2016/12/10.
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/my_database');

var User = mongoose.model('User',{
    blog:{
        type: String,
        get:function(url){
            if(!url) return url;
            if(url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0){
                url = 'http://'+url
            }
            return url;
        }
    }
})

var user = new User({
    blog: 'bb.com'
})

console.log(user);
user.save()
    .then(function(user){
        console.log(user)
    })
    .catch(function(err){
        console.log(err)
    })