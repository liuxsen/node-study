/**
 * Created by liuxsen on 2016/12/5.
 */

var express = require('express');
var app = express();
app.get('/',function(req,res,next){
    res.send('hello-promise')
});

app.listen(3000,'127.0.0.1');