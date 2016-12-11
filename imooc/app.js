/**
 * Created by Administrator on 2016/12/10.
 */
var express = require('express');
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/movie');

var routers = require('./router/routers');

var app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.set('view engine', 'ejs');
app.use(express.static('./bower_components'))
app.use(express.static('./public'))

app.get('/', routers.showIndex);
app.get('/movie/:id', routers.showidInfo);
app.get('/addNew', routers.showAdd)
app.post('/admin/movie/new', routers.addNew);

app.listen(port)
console.log('server is start')
