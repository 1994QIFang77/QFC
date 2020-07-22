
var cheerio = require('cheerio');
var iconv = require('iconv-lite');

// Cheerio 是一个Node.js的库， 能够从html的片断中构建DOM结构
// 然后提供像jquery一样的css选择器查询

module.exports = {
    filterHtmlList: function(html,falg) {
        if (html) {
            // 沿用JQuery风格，定义$
            var $ =cheerio.load(html,{decodeEntities: false}) ;
            // 根据id列表信息
            var board = {
                // 版块标题
                title:'',
                // 版块文章，里面是作者信息和文章标题，和链接
                Articles:''
             }
        // 获取标题
       board.title =  $('div.LEFT h1').text();
       var linksDom = $('div.content-article p.one-p')
       // 遍历dom集数组
       linksDom.each((index, item) => {
        //  取出文字
         board.Articles += $(item).text();
       });
       return board;
    }   
    else {
        console.log("无数据传入！");
    }
},
    strlenLength: function(title,str) {
        regCh = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
        regEn = /[a-zA-Z]/; 
        // regSymbol = /[0-9]|["',，.。/、\]|[【】\！!?？——_<>%;‘’；:：)《（）》(&+=`“”·*#@@]/;
        let length_ch = 0;
        let length_en = 0;
        let length_symbol = 0;
        let length_count = 0;
        for(let i = 0; i < str.length; ){
           if(str[i] === '\n'||str[i] ===' ') {i++;continue;}
            else if(regCh.test(str[i])) {
                length_ch++;
                i++;
            }
            else if(regEn.test(str[i])) {
                length_en++;
                i++
            }
            else {
                length_symbol++;
                i++
            }
        }
        length_count = length_ch+length_en+length_symbol;
        var str_Length = {
            title:title,
            length_ch:length_ch,
            length_en:length_en,
            length_symbol:length_symbol,
            length_count:length_count
        }
        return str_Length; 
    }
};
