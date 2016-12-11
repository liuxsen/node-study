/**
 * Created by liuxsen on 2016/12/10.
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/my_database');


/*
* trim 去掉字符串首尾空格
* set 修饰符
*
*
*
* */


var User = mongoose.model('User',{
    nickname: {
        type: String,
        trim: true
    },
    blog: {
        type: String,
        set: function(url){
            //if(!url) return url;
            if(url.indexOf('http://' !== 0) && url.indexOf('https://')){
                url = 'http://'+url
            }
            return url;
        }
    }
})

var user = new User({
    nickname: ' sdf  ',
    blog: 'http://www.baidu.com'
})

console.log(user)