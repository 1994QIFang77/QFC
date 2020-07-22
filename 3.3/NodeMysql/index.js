
var iconv = require('iconv-lite');
var http = require('http');
var https = require('https');
const db = require('./dbhelper');
const spider = require('./spider');

let server = http.createServer(function(req, res) {
    // login....
    if(req.url == '/login'){
        res.setHeader('Content-Type','text/plain; charset=UTF-8');
        res.writeHead(200,{"Content-Type":'text/plain','charset':'UTF-8','Access-Control-Allow-Origin':'*'});//可以解决跨域的请求
        var  sql = 'SELECT * FROM articles_count';
        db.query(sql,[],function(result,fields){
            res.write(JSON.stringify(result));
            res.end();
       });
    }
    else {
        // 添加
        let url = ''; 
        req.on('data', function(data) {
            url += data; // 所接受的Json数据
        });
        req.on('end', function() {
            res.writeHead(200,{"Content-Type":'text/plain','charset':'UTF-8','Access-Control-Allow-Origin':'*'});//可以解决跨域的请求
            https.get(url, function (ress) {
                var flag, re =/omn/;
                if(!re.test(url)){
                    var datas = '';
                    //  获取页面数据
                    flag = 0;
                    ress.on('data', function (data) {
                        datas+=data;
                    });
                }
                else {
                    var datas = [];
                    // 获取页面数
                    flag = 1;
                    ress.on('data', function (data) {
                        datas.push(data);
                        
                    }); 
                }
                   // 数据获取结束
                ress.on('end', function () {
                     if(flag) {
                         var chunk = iconv.decode(Buffer.concat(datas), 'gbk');
                         var htmlListData = spider.filterHtmlList(chunk,);
                     }
                     else {
                         var htmlListData = spider.filterHtmlList(datas);
                     }
                     var  strLength = spider.strlenLength(htmlListData.title,htmlListData.Articles);
                     print(htmlListData)
                     var  addSql = 'INSERT INTO articles_count(id,title,length_count,length_ch,length_en,length_symbol) VALUES(0,?,?,?,?,?)';
                     var  addSqlParams = [strLength.title, strLength.length_count,strLength.length_ch, strLength.length_en,strLength.length_symbol];
                     //存入数据库
                     db.query(addSql,addSqlParams,function (result, fields) {
                         console.log('添加成功');
                         Find();
                     }); 
                });
            
            }).on('error', function () {
                 console.log('获取数据出错！');
               });

            /* 查找数据库中最新添加的，返回给前端 */
            function Find(){
                // var  usql = 'SELECT * FROM articles_count order by id DESC limit 1';
                var  usql = 'SELECT * FROM articles_count';
                db.query(usql,[],function (result, fields) {
                    res.write(JSON.stringify(result));
                    res.end();
                });
            }
        });
    }
});

function print(htmlListData){
    console.log(htmlListData.title);
    console.log("\n");
    console.log(htmlListData.Articles);
}


var hostName = '127.0.0.1'; //ip
var port = 8889; //端口
server.listen(port, hostName, function () {

    console.log(`服务器运行在http://${hostName}:${port}`);

});