/**
 * Created by Administrator on 2016/12/10.
 */
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/part10');

/*
* required: true,
*  max: 1000,
* min: 10
*enum: ['success','fail'] 其中的一个
* match 正则验证要求 /book/g 要求字符串中有book
* validate 自定义验证规则
* */

var orderSchema = new mongoose.Schema({
    count: {
        type: Number,
        required: true,
        max: 1000,
        min: 10
    },
    status:{
        type: String,
        enum: ['success','fail']
    },
    desc:{
        type: String,
        match: /book/g,
        validate: function(desc){
            return desc.length >= 10;
        }
    }
})

var Order = mongoose.model('Order',orderSchema);

var order = new Order({
    count: 333,
    status: 'success',
    desc: 'th       book'
})

order.save(function(err,doc){
    if(err) console.log(err)
    console.log(doc)
})