var express = require('express');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/my_blog');
var session = require('express-session')

var router = require('./router/routers');
var bodyParser = require('body-parser');
var app = express();

app.use(session({ secret: 'my_blog', cookie: { maxAge: 600000 } }));

app.use(bodyParser());
app.use(express.static('./public'));
app.use(express.static('./bower_components'));
app.use(express.static('./avatar'));
app.set('view engine', 'ejs');

app.get('/', router.showIndex);
app.get('/login', router.login);
app.get('/reg', router.reg);

app.post('/doreg', router.doreg);
app.post('/dologin', router.dologin);

app.get('/addArticle', router.edit);
app.post('/articel/doEdit', router.doEdit);

// 文章详情页
app.get('/article/detail/:id', router.articleDetail);

// 登出请求
app.post('/logout', router.logout);

// 用户信息页
app.get('/user/detail/:name', router.userDatail)

app.post('/article/comment', router.comment)

app.listen(3000);
console.log('server is start');
