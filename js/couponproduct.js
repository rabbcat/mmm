$(function () {



    //初始化
    var Data = {};
    getresult();
  
  
    //点击回到主页
    $("#goindex").on("click",function () {
        window.open("index.html","_self")
    });
    //点击回到优惠券主页
    $(".gocoupon").on("click",function () {
        window.open("coupon.html","_self")
    });

    //获取url是否有参数，判断加载什么内容v
    var URL = window.location.search;
    if(URL.split(":")[1] != undefined){
        getresult(URL.split(":")[1]);
        if(URL.split(":")[1] == 1){
            $("#shopname").text("必胜客优惠券");
        }else if(URL.split(":")[1] == 2){
            $("#shopname").text("棒约翰优惠券");
        }else if(URL.split(":")[1] == 3){
            $("#shopname").text("哈根达斯优惠券");
        }
    }else{
        //没有传参 默认获取肯德基数据
        getresult(0);
    }


    //获取ajax初始数据
    function getresult(couponid) {
        $.ajax({
            type: "get",
            url: "http://139.199.157.195:9090/api/getcouponproduct",
            data: {"couponid": couponid},
            success: function (res) {
                Data = res;
                change();
            }
        });
    }

    //封装模板引擎生成页面结构函数
    function change() {
        var newData = {result: []};
        var length = 6;
        if(Data.result.length <= 6){
            length = Data.result.length;
        }
        for (var i = 0; i < length; i++) {
            newData.result.push(Data.result.shift());
        }
        var html = template("couponProduct", newData);
        $(".couponProduct").append(html);
    }

    //判断当前盒子距离底部的距离
    $(window).scroll(function () {
        var height = $(".couponProduct").height() + $(".couponProduct").offset().top;
        var scrolltop = $(window).height() +  $(window).scrollTop();
        var distance = height - scrolltop;
        if(distance <= 100){
            change();
        }
    });


    //设置点击li标签，图片显示在中间
    $(".couponProduct").on("click", "li", function () {
        var imgsrc = $(this).children("a").children("img").attr("src");
        $(".bigImg").html("<img src=" + imgsrc + ">").fadeIn();
    });

    //点击关闭遮罩图片
    $(".bigImg").on("click", function () {
        $(this).hide();
    });

    //回到顶部
    $(".gotop").on("click", function () {
        $('body,html').animate({scrollTop: 0}, 500);
        return false;
    });
});