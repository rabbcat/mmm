$(function () {
    //调用方法

    productList();

    //定义方法

    //获取ajax请求
    function productList() {
        $.ajax({
            url: "http://139.199.157.195:9090/api/getinlanddiscount",
            success: function (data) {
                //console.log(data);//测试是否接收到了数据
                tpl(lazy(data));
                //console.log(data);
                //添加滚轮滚动事件
                $(window).on("scroll",function(){
                    //进行判断 当数组中没有值了就停止加载
                    if(data.result.length < 0){
                        return;
                    }
                   var height = $(".main").height()+$(".head").height();
                   var top = $(window).height()+ $(document).scrollTop();
                   //console.log(top);
                   //console.log(height);
                   //console.log(top);
                   //console.log(height - top);
                   if(height - top < 100){
                       tpl(lazy(data));
                       //    console.log(data);
                   }
               });
            }
        });
    }

    //获取到请求回来数据中一段字符串中的数字
    function getNum(str) {
        return str.replace(/[^0-9]+/g, '');
    }

    //将获取到的数据通过模板引擎添加到页面上
    function tpl(info) {
        //给模板引擎添加方法
        template.helper("getNum", getNum);
        var html = template("productListTpl", info);
        //console.log(html);//测试利用模板生成的数据
        $("#productBox").append(html);//前面使用的是html方法 后面发现在做懒加载的时候会出现问题
    }
    //根据页面上是否有li标签来判断要加载的图片的张数
    function lazy(data){
        //if(data.result.length <= 0){
        //    return ;
        //}
        //创建一个新的对象用来存放要添加到页面上的
        var info = {
            result:[]
        }
        //创建一个变量来存放要在页面上添加几个文件
        var a = 4;
        //判断传过来的数据是否还有
        if(data.result.length > 0){
            //判断如果最后剩下的不够四个那么a就等于剩下的个数
            data.result.length < 4? a = data.result.length:"";
            //判断页面上是否是第一次添加
            if($("#productBox  li").length == 0){
                a = 8;
            }
            //console.log($("#productBox  li").length);
            //将需要的内容添加到新的对象中 将原对象上的删除
            for(var i = 0;i < a;i++){
                info.result.push(data.result.shift());
                //console.log(info);
            }
        }
        //console.log(info);
        //返回新的对象
        return info;
    }
    // 点击返回顶部的动画效果
    $("#backTop").on("click",function(){
        // console.log("成功");
       $(document.body).animate({"scrollTop": "0px"},1500);
    })
});
