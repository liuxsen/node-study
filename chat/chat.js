/**
 * Created by liusen on 2016/11/29.
 */
var express = require('express');
var app = express();

app.use(express.static('public'));
app.set('view engine','ejs');
app.get('/',function(req,res){
    res.render('index');
});

var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection',function(socket){
    console.log('a user connected');
    socket.emit('huanying',{msg:'hello'});
    socket.on('chat message',function(msg){
        console.log('服务端接受到数据'+msg);
        io.emit('back',{msg:msg});
    })
});

http.listen(3000,function(){
    console.log('listen on 3000')
});
