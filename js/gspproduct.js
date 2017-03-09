$(function () {

    //设置点击返回回到凑一下
    $("#opencouyixia").on("click", function () {
        window.open("gsproduct_couyixia.html", "_self");
    });


    //获取url是否传入参数
    var search = window.location.search;
    var idvalue = getidname(search);
    console.log(idvalue);
    //进入页面判断有参数根据参数加载商品信息，没有参数加载默认商品信息
    if (idvalue[0] != undefined) {
        GetGoodsBody(idvalue[0], idvalue[1]);
        $(".shopName").siblings("span").text(window.sessionStorage.shopName);
        $(".areaName").siblings("span").text(window.sessionStorage.areaName);
    } else {
        GetGoodsBody("0", "0");
    }

    //获取url中shop和area的id值
    function getidname(search) {
        if (search.split("?")[1]) {
            search = search.split("?")[1].split("&");
        }
        var num = [];
        for (var i = 0; i < search.length; i++) {
            num[i] = search[i].split(":")[1];
        }
        return num;
    }


    //  导航栏下拉页单动态生成数据
    $.get("http://139.199.157.195:9090/api/getgsshop", function (res) {
            var html = "";
            html += template("shop", res);
            $(".shopName").html(html);
        }
    );
    $.get("http://139.199.157.195:9090/api/getgsshoparea", function (res) {
            var html = "";
            html += template("shoparea", res);
            $(".areaName").html(html);
        }
    );

    //点击导航栏名称li标签显示详情div，标签小箭头切换
    $(".hd-nav > ul > li").click(function () {
        $(this).children().toggleClass("on");
        $(this).siblings("li").children().removeClass("on");
        $(".search-body").removeClass("on");
    });

    //设置导航栏任务按钮，显示任务选项，隐藏旁边商铺等选项
    $(".search").click(function () {
        $(this).toggleClass("on");
        $(".search-body").toggleClass("on");
        $(".hd-nav > ul > li").children().removeClass("on");
    });

    //设置任务栏排序按钮，当前高亮
    $(".sort>.con>a").each(function () {
        $(this).click(function () {
            $(".sort>.con>a").removeClass("on");
            $(this).addClass("on");
        });
    });
    //设置任务栏分类按钮，当前高亮
    $(".classify>.con>a").each(function () {
        $(this).click(function () {
            $(".classify>.con>a").removeClass("on");
            $(this).addClass("on");
        });
    });


    //设置店铺选项shopName里面选项的点击事件
    $(".shopName").on("click", ">ul>li", function () {
        $(this).children("i").addClass("selected");
        $(this).siblings("li").children("i").removeClass("selected");
        //点击店铺名加载相应店铺商品内容
        var shopid = $(this).data("shopid");
        shopid.toString();
        GetGoodsBody(shopid, "0");
        var shopname = $(this).children("a").text();
        $(".shopName").siblings("span").html(shopname);
    });

    //设置地区选项areaName里面选项的点击事件
    $(".areaName").on("click", ">ul>li", function () {
        $(this).children("i").addClass("selected");
        $(this).siblings("li").children("i").removeClass("selected");
        //点击地区加载相应地区商品内容
        var areaid = $(this).data("areaid");
        areaid.toString();
        GetGoodsBody("0", areaid);
        var areaname = $(this).children("a").text();
        areaname = areaname.split("（")[0];
        $(".areaName").siblings("span").html(areaname);
    });

    //设置金额里面选项的点击事件
    $(".Amount").on("click", ">ul>li", function () {
        $(this).children("i").addClass("selected");
        $(this).siblings("li").children("i").removeClass("selected");
        var amount = $(this).children("a").text();
        $(".Amount").siblings("span").html(amount);
    });


    //加载信息的函数封装
    function GetGoodsBody(shopid, areaid) {
        $.ajax({
            type: "get",
            url: "http://139.199.157.195:9090/api/getgsproduct",
            data: {
                shopid: shopid,
                areaid: areaid
            },
            success: function (res) {
                var html = "";
                html += template("doodsBody", res);
                $(".goods-box").html(html);
            }
        });

    }

    //设置获取金额只获取数字
    template.helper('GetYen', function (str) {
        str = str.replace(/¥/g, "");
        return str;
    });

});
