

$(document).ready(function () {
    if (!login()) {
        $(".main").append("暂无记录");
    }
    $("button").click(function () {
        var val = ($("#searchString_id").val());
        if (val !== '') {
            $("#searchString_id").val('');
            addData(val);
        }
        else {
            alert("请输入文章链接...");
        }

    });
});

// 从数据库获取数据，渲染页面
function login() {
    $.ajax({
        type: "GET",
        url: 'http://127.0.0.1:8889/login',
        dataType: 'json',
        success: function (data) {
            console.log("获取成功");
            var res = data;
            console.log(res.length);
            if (res.length === 0) return 0;
            else TableHtml(res, 1);
        },
        error: function (error) {
            console.log("error");
        }
    });
}

// 发送post请求，请求url的内容
function addData(val_url) {
    $.ajax({
        type: "POST",
        url: "http://127.0.0.1:8889/",
        dataType: 'json',
        data: val_url,
        success: function (data) {
            console.log("添加成功");
            res = data;
            DeleteHtml();
            TableHtml(res, 1);
        },
        error: function (error) {
            console.log("error");
        }
    });
}

// 将请求到的url内容在页面上进行渲染
function TableHtml(data, pagecount) {

    DeleteHtml();
    var result = [];
    for (var i = 0, len = data.length; i < len; i += 5) {
        result.push(data.slice(i, i + 5));
    }
    console.log(result);
    if (pagecount == 1) {
        var dataFirst = result[0];
        console.log(dataFirst);
        var html = ''
        for (var i = 0; i < dataFirst.length; i++) {
            html += '<tr><th>' + dataFirst[i].title + '</th><th>' + dataFirst[i].length_count + '</th><th>' + dataFirst[i].length_ch + '</th><th>' + dataFirst[i].length_en + '</th><th>' + dataFirst[i].length_symbol + '</th></tr>'
        }
        $(".main").append(html);
    }
    $("#page").Page({
        totalPages: result.length,//分页总数          
        liNums: result.length,//分页的数字按钮数  
        activeClass: 'activP', //active 类样式定义         
        callBack: function (page) {
            console.log(page)
            pagecount = page
            var arr = result[page - 1]
            console.log(arr)
            $(".main").empty()
            var html = ''
            for (var i = 0; i < arr.length; i++) {
                html += '<tr><th>' + arr[i].title + '</th><th>' + arr[i].length_count + '</th><th>' + arr[i].length_ch + '</th><th>' + arr[i].length_en + '</th><th>' + arr[i].length_symbol + '</th></tr>'
            }
            $(".main").append(html);
        }
    });
}

// 清空之前table里面的内容
function DeleteHtml() {
    $(".main").html("");
}




