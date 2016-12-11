var mongoose = require('mongoose');

var MovieSchema = mongoose.Schema({
    doctor: String,
    languge: String,
    country: String,
    summary: String, //简介
    flash: String, //falsh地址
    poster: String, //海报
    year: Number, //
    meta: { // 录入时间记录
        createAt: {
            type: Date,
            default: Date.now
        },
        updateAt: {
            type: Date,
            default: Date.now
        }

    }
})

MovieSchema.pre('save', function(next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now;
    } else {
        this.meta.updateAt = Date.now;
    }
    next()
})

MovieSchema.statics = {
    // 查询所有的数据
    fetch: function(cb) {
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb)
    },
    // 查询单条数据
    fetchId: function(id, cb) {
        return this
            .findOne({ _id: id })
            .exec(cb)
    }
}

var Movie = mongoose.model("movie", MovieSchema);
// Movie.create({
//     doctor: '张三',
//     languge: 'en',
//     country: 'china',
//     summary: 'hahahahhahaha', //简介
//     flash: 'http://sdfsdfsfd', //falsh地址
//     poster: 'http://sdfsdf', //海报
//     year: 2016, //
// }, function(err, doc) {
//     if (err) return console.log(err);
//     console.log(doc)
// })

// Movie.fetch(function(err, doc) {
//     if (err) console.log(err);
//     console.log(doc);
// })

module.exports = MovieSchema;
