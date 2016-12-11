/**
 * Created by liuxsen on 2016/12/6.
 */

var express = require('express');
var app = express();
var router = require('./router/router');


app.use(express.static('public'));
app.set('view engine', 'ejs');
app.get('/', router.showIndex);
app.get('/getsongList', router.getsongList)
app.listen(3000)
