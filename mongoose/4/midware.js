/**
 * Created by Administrator on 2016/12/10.
 */
/*
* 文档中间件
* init/validate/save/remove
* 查询中间件
* count/find/findOne/findOneAndRemove/findOneAndUpadate/update
*
* 预处理中间件
* 后置处理中间件
* */

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/part10');

var PersonSchema = new mongoose.Schema({
    address: String
})
//后置处理中间件
PersonSchema.post('save',function(next){
    console.log('this is resellerSchema post save middleware');
})
//预处理中间件
PersonSchema.pre('save',true,function(next,done){
    console.log('this is resellerSchema pre save middleware');
    next();
    done();
})

var Person = mongoose.model('Person',PersonSchema);
var person = new Person({
    name: 'sdfsdf'
})

person.save()

