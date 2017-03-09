$(function () {

    //设置点击返回回到主页
    $("#openindex").on("click",function () {
        window.open("index.html","_self");
    });

    //渲染下拉框内容
    $.ajax({
        type: "get",
        url: "http://139.199.157.195:9090/api/getgsshop",
        data:{},
        success:function (res) {
            var html = "";
            html += template("shopName",res);
            $(".shopName").append(html);
        }
    });

    $.get("http://139.199.157.195:9090/api/getgsshoparea",function (res) {
        var html = "";
        html += template("areaName",res);
        $(".areaName").append(html);
    });

    template.helper("sum",function (i) {
        return i + 1;
    });
    template.helper("name",function (str) {
        str = str.slice(0,2);
        return str;
    });

    //设置点击input关闭按钮清空输入内容
    $(".numclose").on("click",function () {
        $(".input>input").val("");
    });

    console.log($(".shopName>option:selected").innerText);
    //点击凑一下获取输入信息内容跳转到相应界面
    $(".sublime").on("click",function () {
        var shopid = $(".shopName>option:selected").val() - 1;
        var areaid = $(".areaName>option:selected").val() - 1;
        window.sessionStorage.shopName = $(".shopName>option").get(shopid).innerText;
        window.sessionStorage.areaName = $(".areaName>option").get(areaid).innerText;
        window.open("gsproduct.html?shopid:" + shopid +"&areaid:" + areaid,"_self");
    })
});