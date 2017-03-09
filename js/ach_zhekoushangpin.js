$(function(){

    request();

    function request(){
        console.log(window.location.search);
        //调用函数获取到url中的数字
       var  productId = getNum(window.location.search);
        console.log(productId);
        $.ajax({
            //将获取到的数字传递给后台 请求对应的数据
            url:"http://139.199.157.195:9090/api/getdiscountproduct?productid="+productId,
            success:function(info){
                //console.log(info);
                //调用模板函数来完成对详情介绍的渲染
                tpl(info,"introduceTpl","introduce");
                //调用模板函数完成对评论部分的渲染
                tpl(info,"criticismTpl","criticism");
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
    // 点击返回顶部的动画效果
    $("#backTop").on("click",function(){
        // console.log("成功");
        $(document.body).animate({"scrollTop": "0px"},1500);
    })
})