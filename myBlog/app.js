var express = require('express');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/my_blog');
var session = require('express-session')

var router = require('./router/routers');
var bodyParser = require('body-parser');
var app = express();

app.use(session({ secret: 'my_blog', cookie: { maxAge: 60000 } }));

app.use(bodyParser());
app.use(express.static('./public'));
app.use(express.static('./bower_components'));
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

app.post('/logout', router.logout);

app.listen(3000);
console.log('server is start');
