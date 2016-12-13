var crypto = require('crypto');
var User = require('../Schemas/user.js');
var Article = require('../Schemas/articles.js');
var _ = require('underscore');
// 时间格式化
require('date-utils');

function dateFormat(docs) {
    var arr = [];
    for (var i = 0; i < docs.length; i++) {
        var create_At = new Date(docs[i].create_At).toFormat("YYYY-MM-DD HH24:MI:SS");
        var update_At = new Date(docs[i].update_At).toFormat("YYYY-MM-DD HH24:MI:SS");
        // console.log(docs[i].create_At, create_At);
        docs[i].create_At = create_At;
        docs[i].update_At = update_At;
        console.log(i, docs[i].create_At, create_At)
        arr[i] = docs[i];
    }
    console.log('------');
    // console.log(arr);
    return arr;
}


// 显示首页
exports.showIndex = function(req, res, next) {
    var name = req.session.name;
    // 展示出所有的文章页
    Article.find({}, function(err, doc) {
        if (err) console.log(err);
        var docs = dateFormat(doc);
        console.log(docs)
        res.render('index', {
            login: req.session.login,
            articles: docs,
            name: name
        })
    })
}

exports.login = function(req, res, next) {
    res.render('login', {
        login: req.session.login
    });
}

exports.reg = function(req, res, next) {
    res.render('reg');
}

// 注册
exports.doreg = function(req, res, next) {
    var name = req.body.name;
    var pwd = req.body.pwd;
    var age = req.body.age;
    var email = req.body.email;
    var hash = crypto.createHash('sha256');
    hash.update(pwd);

    // user
    var user = {
        name: req.body.name,
        pwd: hash.digest('hex'),
        age: req.body.age,
        email: req.body.email,

    };
    // console.log(hash.digest('hex'));
    // console.log(name, hash.digest('hex'), age, email);

    User.create(user, function(err, doc) {
        if (err) console.log(err);
        console.log(doc);
        res.send('1')
    })
}

// 登陆
exports.dologin = function(req, res, next) {
    var name = req.body.name;
    var pwd = req.body.pwd;
    var hash = crypto.createHash('sha256');
    hash.update(pwd);
    var userpwd = hash.digest('hex');
    console.log(name, pwd, userpwd);
    User.findOne({ name: name, pwd: userpwd }, function(err, doc) {
        if (err) {
            console.log(err);
        }
        if (doc) {
            // 登陆成功
            req.session.login = true;
            req.session.name = doc.name;
            res.send('1')
        } else {
            res.send('-1')
        }
    })
};
// 文章页
exports.edit = function(req, res, next) {
    var name = req.session.name;
    res.render('edit', {
        name: name,
        login: req.session.login
    });
};
// 提交文章
exports.doEdit = function(req, res, next) {
    var name = req.session.name;
    var article = {
        title: req.body.title,
        content: req.body.content,
        author: name
    }
    console.log(article, name)
    var newArticle = new Article(article);
    newArticle.save(function(err, articledoc) {
        if (err) {
            console.log(err);
            return;
        }

        User.findOne({ name: name }, function(err, user) {
            if (err) console.log(err);
            console.log(user);
            user.articles.push(newArticle);
            user.save();
            /*newArticle.author.push(user);
            newArticle.save();*/
            res.send('1');
            return;
        })
    })
}


exports.articleDetail = function(req, res, next) {
    var id = req.params.id;
    Article.findById(id, function(err, doc) {
        if (err) console.log(doc);
        res.render('articleDatail', {
            doc: doc,
            login: req.session.login
        })
    })
}

exports.logout = function(req, res, next) {
    req.session.login = false;
    req.session.name = '';
    res.send('1')
}
