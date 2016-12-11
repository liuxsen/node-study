var Movie = require('../models/movie');

exports.showIndex = function(req, res, next) {
    Movie.fetch(function(err, doc) {
        if (err) console.log(err);
        console.log(doc);
        res.render('index', {
            title: 'imooc 首页',
            movies: doc
        })
    })
}

exports.showidInfo = function(req, res, next) {
    var id = req.params.id;

    Movie.findById(id, function(err, movie) {
        res.render('detail', {
            title: 'imooc 详情',
            movie: movie
        })
    })
}

exports.showAdd = function(req, res, next) {
    res.render('new', {
        title: '添加'
    })
}
exports.addNew = function(req, res, next) {
    console.log(req.body);
    Movie.create(req.body, function(err, doc) {
        if (err) {
            console.log(err)
            res.send('-1');
            return;
        }
        res.send('1')

    })
}
