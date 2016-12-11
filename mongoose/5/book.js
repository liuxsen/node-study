/**
 * Created by liuxsen on 2016/12/10.
 */

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:/book');
/*
* 原型 Schema
* 模型 model
* 文档 doc 实例化对象
* */

var bookSchema = new mongoose.Schema({
    name: String
})
bookSchema.statics.speak = function () {
    this.model('Book').findById('584bacadebc50437a89fa182',function(err,doc){
        console.log(doc)
    })
};

var Book = mongoose.model('Book',bookSchema);



/*
* 模型方法
* model.create(data,function(err,doc){})
* model.remove(query,[callback(err)])
* model.find(query,[fields],[options],[callback(err)])
* model.update(query.update,[options],callback(err,affectedCount,raw));
* model.populate(docs,options,[callback(err,doc)])
* model.findeOne(query,[fields],[options],[callback(err,doc)]);
* model.findById(id,[fields],[options],[callback(err,doc)])
* model.findOneAndUpdate([query],[update],[options],[callback(err,doc)])
* model.findOneAndRemove(query,callback(err,doc));
* model.findByIdAndUpdate(id,[updata],callback(err,doc))
* model.findByIdAndRemove(id,callback(err,doc));
* */





//Book.create({
//    name: 'h2hw'
//},function(err,doc){
//    if(err){
//        console.log(err)
//    }
//    console.log(doc)
//})

//
//Book.remove({name:'h2hw'},function(err,doc){
//    if(err) return console.log(err);
//    console.log(doc)
//})

//Book.update({name:'h2hw'},{name:'haha'},function(err,doc){
//    if(err) console.log(err)
//    console.log(doc);
//})

Book.find({},function(err,doc){
    if(err) console.log(err);
    console.log(doc);
})

