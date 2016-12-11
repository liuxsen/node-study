var api = require('NeteaseCloudMusicApi').api



exports.showIndex = function(req, res, next) {
    res.render('index')
}
exports.getsongList = function(req, res, next) {
    var name = req.query.name;
    console.log(name);
    // api.search(name:String,[callback:function,onlySong:Boolean default:true,limit:Number default:3, offset:Number default:0])
    api.search(name, data => {
        console.log("################Search API#################")
        console.log(data);
        res.send(JSON.parse(data));
    }, true, 10)
}
