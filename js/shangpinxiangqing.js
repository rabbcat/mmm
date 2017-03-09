$(function () {
    getXiangQing();
    getPingJia();
});
/*=================函数定义==================*/
/*function setTitle() {
    var html = '<a href="index.html">首页</a>&gt;<a href="productlist.html?categoryid='+getQueryString("categoryid")+'&category='+getQueryString("category")+'">'+getQueryString("category")+'</a>';
    $(".pp_title").html(html);
}*/

function getXiangQing() {
    $.get("http://139.199.157.195:9090/api/getproduct",{productid:getQueryString("productId")},function (res) {
        var html = template("xiangqing_tpl",res);
        $(".product").html(html);
        $(".pd_name").html(res.result[0].productName.split(" ")[0]);
    });
}
function getPingJia() {
    $.get("http://139.199.157.195:9090/api/getproductcom",{
        productid:getQueryString("productId")
    },
    function (res) {
        var html = template("pinglun_tpl",res);
        $(".pingjia").append(html);

    })
}
template.helper("getQueryString",getQueryString);