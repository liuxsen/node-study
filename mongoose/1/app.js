/**
 * Created by liuxsen on 2016/12/10.
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/my_database');
//模式Schema
var UserSchema = new mongoose.Schema({
    nickname:{
        type: String,
        default: 'new user',
    },
    regtime: {
        type: Date,
        default: Date.now
    }
})
//模型 model
var User = mongoose.model('User',UserSchema);
//实例
var user = new User();

console.log(user);