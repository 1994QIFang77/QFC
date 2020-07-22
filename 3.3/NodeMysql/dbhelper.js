

const mysql = require('mysql'); // 引入mysql模块
const databaseConfig = require('./db'); // 引入数据库配置模块中的数据

module.exports = {
    query: function(sql, params, callback){
        let connection = mysql.createConnection(databaseConfig); 
          
          connection.connect(function(err){
              if(err){
                  console.log('数据库链接失败');
                  throw err;
              }
          });
          connection.query(sql,params,function (err, result,fields) {
            if(err){
                console.log('[SELECT ERROR] - ',err.message);
                throw err;
            }
            console.log('--------------------------SELECT----------------------------');
            console.log(result);
            console.log('------------------------------------------------------------\n\n');  
            callback && callback(result, fields);
            connection.end(function(err) {
                if(err) {
                    console.log('关闭数据库连接失败！');
                    throw err;
                }
            });
          });
    }
};


