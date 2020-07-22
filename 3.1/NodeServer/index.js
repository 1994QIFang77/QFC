
// 入口文件
// 服务模块：负责启动服务
var express = require('express'); //express框架模块
var path = require('path'); //系统路径模块
var fs = require('fs'); //文件模块
var bodyParser = require('body-parser'); //对post请求的请求体进行解析模块
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');                                               //访问控制允许来源：所有
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); //访问控制允许报头 X-Requested-With: xhr请求
    res.header('Access-Control-Allow-Metheds', 'PUT, POST, GET, DELETE, OPTIONS');                //访问控制允许方法
    res.header('X-Powered-By', 'nodejs');                                                         //自定义头信息，表示服务端用nodejs
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});

app.get('/api', function (req, res) {
    var file = path.join(__dirname, 'data', 'List.json'); //文件路径，__dirname为当前运行js文件的目录

    //读取json文件
    fs.readFile(file, 'utf-8', function (err, data) {
        if (err) {
            res.send('文件读取失败');
        } else {
            res.send(data);
        }
    });
});

var hostName = '127.0.0.1'; //ip
var port = 8888; //端口
app.listen(port, hostName, function () {

    console.log(`服务器运行在http://${hostName}:${port}`);

});

