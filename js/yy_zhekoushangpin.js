
//Created by puss on 2017/2/17.

$(function(){

    request();

    gotop('.gotop');

    returnFir('.glyphicon')

    //获取详情页列表
    function request(){
        var  productId = getNum(window.location.search);
        console.log(productId);
        $.ajax({
            url:"http://139.199.157.195:9090/api/getmoneyctrlproduct?productid="+productId,
            success:function(info){
                //详情模板
                tpl(info,"introduceTpl","introduce");
                //有货模板
                tpl(info,"criticismTpl","criticism");
                //评论模板
                tpl(info,"somewhereTpl","somewhere");
            }
        })
    }
    //获取数字
    function getNum(str) {
        return str.replace(/[^0-9]+/g, '');
    }
    //模板函数
    function tpl(info,modelId,elementId){
        var html = template(modelId,info);
        //console.log(html);
        $("#"+elementId).html(html);
    }
    //跳转到上一页
    function returnFir( q ){
        var q=document.querySelector(q);
        q.onclick= function () {
            window.history.go(-1);
        }
    }
    //回到顶部
    function gotop(sel){
        $(sel).on("click", function () {
            $("body,html").animate({scrollTop:0},1000);
            return false;
        });
    }
})