var mongoose = require('mongoose');
var _ = require('underscore');
mongoose.connect('mongodb://localhost/blog')

var classListSchema = new mongoose.Schema({
    name: String,
    url: String,
    id: String
})

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

/**
 * 保存文章分类
 * @param  {[type]}   id       [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
classListSchema.statics.saveClassItem = function(data, callback) {
    /*  title: $me.find('.atc_title').text().trim(),
        url: url,
        create_at: $me.find(".atc_info .atc_tm").text(),
        id: id
    */
    var that = this;
    var id = data.id;
    that.find({ id: id }, function(err, classItem) {
        if (err) {
            console.log(err)
        }
        // console.log(classItem)
        if (Array.isArray(classItem) && classItem.length >= 1) {
            // 文章分类已经存在
            var newClassItem = _.extend(classItem[0], data)
            that.update({ id: id }, newClassItem, function(err, doc) {
                if (err) {
                    console.log(err)
                }
                console.log(doc)
            })
        } else {
            // 文章分类不存在
            that.create(data, function(err, doc) {
                if (err) {
                    console.log(err);
                }
                console.log(doc);
            })
        }
    })
}

// 模型
var ClassList = mongoose.model('ClassList', classListSchema);
/*
name: $me.text().trim(),
url: url,
id: class_id
 */

ClassList.saveClassItem({
    name: 'hah',
    url: 'www.baidu.com',
    id: '2'
});
// ClassList.create({
//     title: 'hah',
//     url: '1',
//     id: '1'
// }, function(err, doc) {
//     if (err) console.log(err);
//     console.log(doc);
// })

module.exports = ClassList;
