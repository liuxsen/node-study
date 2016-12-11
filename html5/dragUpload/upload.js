var express = require('express');

var formidable = require('formidable');
var util = require('util');
var path = require('path');

var app = express();
app.set('view engine', 'ejs');

app.get('/', function(req, res, next) {
    res.render('drag')
})

app.post('/uplodDargImg', function(req, res, next) {
    var form = new formidable.IncomingForm();
    form.uploadDir = path.join(__dirname, './public')
    console.log(path.join(__dirname, './public'))
    form.parse(req, function(err, fields, files) {
        res.writeHead(200, { 'content-type': 'text/json' });
        res.write('received upload:\n\n');
        res.end(util.inspect({ fields: fields, files: files }));
    });

    return;
})


app.listen('3000')
