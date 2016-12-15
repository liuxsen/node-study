var crypto = require('crypto');
var User = require('../Schemas/user.js');
var Article = require('../Schemas/articles.js');
var Comment = require('../Schemas/Comment.js');
var _ = require('underscore');
var markdown = require("markdown").markdown;
// 时间格式化
require('date-utils');

function dateFormat(docs) {
    var arr = [];
    for (var i = 0; i < docs.length; i++) {
        var create_At = new Date(docs[i].create_At).toFormat("YYYY-MM-DD HH24:MI:SS");
        var update_At = new Date(docs[i].update_At).toFormat("YYYY-MM-DD HH24:MI:SS");
        var obj = {
                create_At: create_At,
                update_At: update_At,
                _id: docs[i]._id,
                content: docs[i].content,
                title: docs[i].title,
                author: docs[i].author
            }
            // console.log(i, docs[i].create_At, create_At);
        arr.push(obj)
    }
    console.log('------');
    // console.log(arr);
    return arr;
}


// 显示首页
exports.showIndex = function(req, res, next) {
    var name = req.session.name;
    // 展示出所有的文章页,按照时间倒序排列;
    Article.find({})
        .sort({ update_At: -1 })
        .exec(function(err, doc) {
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

// 登陆
exports.login = function(req, res, next) {
        res.render('login', {
            login: req.session.login
        });
    }
    // 注册页面
exports.reg = function(req, res, next) {
    res.render('reg', {
        login: req.session.login,
        name: req.session.name
    });
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


// 添加文章
exports.doEdit = function(req, res, next) {
    var name = req.session.name;
    var content = markdown.toHTML(req.body.content);
    var article = {
        title: req.body.title,
        content: content,
        author: req.session.name
    }
    var newArticle = new Article(article);

    User.findOne({ name: name }, function(err, user) {
        if (err) {
            console.log(err);
            res.send('-1');
            return;
        }
        user.articles.push(newArticle);
        user.save();
        newArticle.save();
        res.send('1');
    })
}

// 文章详情
exports.articleDetail = function(req, res, next) {
    var id = req.params.id;
    Article.findById(id)
        .populate('commemts')
        .exec(function(err, doc) {
            if (err) console.log(err);
            console.log(doc);
            res.render('articleDatail', {
                doc: doc,
                login: req.session.login,
                name: req.session.name,
                id: id
            })
        })
}

// 登出
exports.logout = function(req, res, next) {
    req.session.login = false;
    req.session.name = '';
    res.send('1')
}

// 用户信息 显示 文章列表
exports.userDatail = function(req, res) {
    var name = req.params.name;
    console.log(name)
    User.findOne({ name: name })
        .populate('articles')
        .exec(function(err, doc) {
            if (err) console.log(err);
            console.log(doc);
            res.render('userdetail', {
                login: req.session.login,
                articles: doc.articles,
                name: doc.name
            })
        })
}

// 添加文章评论;
exports.comment = function(req, res, next) {
    var obj = {
        username: req.session.name,
        content: req.body.content,
    }
    var comment = new Comment(obj);
    comment.save(function(err, doc) {
        if (err) console.log(err);
        console.log(doc);
        Article.findOne({ _id: req.body.id }, function(err, article) {
            if (err) {
                console.log(err);
                res.send('-1');
                return;
            }
            article.commemts.push(comment);
            article.save();
            res.send('1');
        })
    })
}


exports.settingInfo = function(req, res, next) {
    res.render('usersettingpage', {
        login: req.session.login,
        name: req.session.name
    });
}
