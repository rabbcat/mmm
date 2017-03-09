$(function () {
    //回到顶部
    $(".gotop").on("click", function () {
        $("body,html").animate({scrollTop:0},500);
        return false;
    });

    //渲染页面
    $.get("http://139.199.157.195:9090/api/getcoupon",function (res) {
        var html = "";
        html += template("coupon",res);
        $(".coupon").html(html);
    });

    //点击回到主页
    $(".goindex").on("click",function () {
        window.open("index.html","_self");
    });

    //点击商铺名跳转响应页面
    $(".coupon").on("click","li",function () {
        var couponId = $(this).children("a").children("p").data("couponid");
        window.open("couponproduct.html?couponid:" + couponId,"_self");
    })
});