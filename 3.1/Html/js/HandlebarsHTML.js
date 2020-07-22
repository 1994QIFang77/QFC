(function($){
    $.ajax({
        type: "get",
        url:'http://127.0.0.1:8888/api',
        dataType:'json',
        success:function(data){
            var group = data.result.item; 
            var tpl = $("#cr-template").html();
            var template = Handlebars.compile(tpl);
            var html = template(group);
             $(".center_list").html(html); 
        },
        error:function(error){
            console.log("error");
        }
    });
})(jQuery)




