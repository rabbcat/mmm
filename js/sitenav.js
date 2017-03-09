$(function () {
    //回到顶部
    $(".gotop").on("click", function () {
        $('body,html').animate({scrollTop: 0}, 500);
        return false;
    });

    //渲染页面
    $.get("http://139.199.157.195:9090/api/getsitenav",function (res) {
        var html = "";
        html += template("linksName",res);
        $(".linksName").html(html);
    });


    //点击回到主页
    $(".goindex").on("click",function () {
        window.open("index.html","_self");
    });
});