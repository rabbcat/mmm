$(function () {

    /*初始化*/
    /*总页数*/
    var total = 0;
    /*加载的页数*/
    var page = 1;
    /*传递的参数*/
    var data = {};
    /*标记，阻止用户快速连点*/
    var canSend = true;
    /*缓存响应数据，避免重复请求，减少请求次数*/
    var allData=[];
    /*==================函数调用====================*/
    /*页面第一次加载请求产品列表*/
    firstGetProductList(page);
    /*监听下拉框变化，去请求数据*/
    $('.page').on('change','select',function () {
        if (!canSend) return;
        page = this.value;
        if (allData[page-1]) {
            chonggou();
            return;
        }
        getProductList(page);
    });
    /*监听点击上一页*/
    $('.page').on('click','.prev',function () {
        if (!canSend) return;
        page--;
        if(page<1){
            page=1;
            return;
        }
        if (allData[page-1]) {
            chonggou();
            return;
        }
        getProductList(page);
    });
    /*监听点击下一页*/
    $('.page').on('click','.next',function () {
        if (!canSend) return;
        page++;
        if(page>total){
            page=total;
            return;
        }
        if (allData[page-1]) {
            chonggou();
            return;
        }
        getProductList(page);
    })

    /*=======================函数定义=========================*/

    function firstGetProductList(page) {
        $.ajax({
            url:"http://139.199.157.195:9090/api/getproductlist",
            data:{
                categoryid: getQueryString("categoryid"),
                pageid: page
            },
            beforeSend: function () {
                canSend=false;
            },
            success: function (res) {
                data = res;
                allData[page-1]={result:res.result};
                var html = template("product_tpl", allData[page-1]);
                $(".product").html(html);
                howManyPage();
                setPage(page);
                /*第一次加载更新标题*/
                $('.pp_title').append('&gt;<a href="#">'+getQueryString("category")+'</a>');
            },
            complete: function () {

                canSend=true;
            }
        });
    }
    /*根据返回数据动态生成下拉框*/
    function howManyPage() {
        total = Math.ceil(data.totalCount / data.pagesize);
        var pageData = {result:[]};
        pageData.result.length = total;
        var html = template("fanye", pageData);
        $(".page").html(html);
    }
    /*获取产品列表*/
    function getProductList(page) {
        $.ajax({
            url:"http://139.199.157.195:9090/api/getproductlist",
            data:{
                categoryid: getQueryString("categoryid"),
                pageid: page
            },
            beforeSend: function () {
                /*发送之前改变标记，防止请求慢的时候用户多次点击发送多次请求*/
                canSend=false;
            },
            success: function (res) {
                data = res;
                /*每次请求到的数据都缓存到allData中*/
                allData[page-1]={result:res.result};
                console.log(allData);
                var html = template("product_tpl", allData[page-1]);
                $(".product").html(html);
                window.scrollTo(0,0);
                setPage();
            },
            complete: function () {
                /*响应完成后标记改变回来*/
                canSend=true;
            }
        });
    }
    function chonggou() {
        var html = template("product_tpl", allData[page-1]);
        $(".product").html(html);
        window.scrollTo(0,0);
        setPage(page);
    }
    /*改变当前页数*/
    function setPage() {
        $('.page select').find('option')[page-1].selected=true;
    }
});
/*模板引擎注册方法*/
template.helper("getQueryString",getQueryString);

