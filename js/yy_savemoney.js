$(function(){

    clickJump();
    gotop('.gotop');
    gotop('.up');

    var flag=true;
    var page=1;

    //如果有记录的页码则把此页码作为参数传进去。
    if(window.sessionStorage.page){
        page=window.sessionStorage.page;
    }

    //设置一个sStorage来储存页码和位置
    var sStorage=window.sessionStorage;

    //调用封装的ajax动态获取获取函数
    getList(page);

    //select框选择跳转事件
    $('#yyChoose').on("change",function () {
        page = this.value;
        flag=false;
        getList(page);
        late('#yyChoose');
        sStorage.page=page;
    })

    //点击上一页
    $(".previous").on("click",function () {
        page--;
        if (page<1) {
            page=1;
        }
        flag=false;
        getList(page);
        //改变选择框value值设置了延时器。
        late('#yyChoose');
        sStorage.page=page;
    })

    //点击下一页
    $(".next").on("click",function () {
        page++;
        if (page>15) {
            page=15;
        }
        flag=false;
        getList(page);
        late('#yyChoose');
        sStorage.page=page;
    })

    //获取位置
    $(window).scroll(function () {
        sStorage.scroll=$(this).scrollTop()
    })

    //封装利用ajax动态渲染的函数
    function getList( page ) {
        $.ajax({
            url:"http://139.199.157.195:9090/api/getmoneyctrl",
            data: {pageid : page},
            success: function (res) {
                var html = '';
                html += template("savaMoneyTpl", res);
                $("#container>#listdiv>ul").html(html);
                if(flag){
                    window.scrollTo(0,window.sessionStorage.scroll)
                }else{
                    window.scrollTo(0,0)
                }
                $('#yyChoose').prop('selectedIndex',window.sessionStorage.page-1)
                flag = true;
            }
        })
    }

    //封装延时1秒改变页码的函数
    function late(lat){
        setTimeout(function () {
            $(lat).val(page);
        },1000)
    }


    //点击跳转页面 动态设置选页栏
    function clickJump(pageid){
            $.ajax({
                type:'get',
                url:"http://139.199.157.195:9090/api/getmoneyctrl",
                data:{'pageid':pageid},
                success:function (res) {
                    //动态设置选页栏
                    var html='';
                    var num=Math.ceil(res.totalCount /res.pagesize);
                    for(var i=0;i<num;i++){
                        html+='<option value=' +(i+1)+'>'
                            +(i+1)+' /'+num
                            +'</option>'
                    }
                    $('#yyChoose').html(html);
                }
            });

    }

    //添加模板函数中的方法 获取日期 并以 2017/2/16 的格式返回
    template.helper('getDate',function getDate(){
        var d=new Date();
        var year= d.getFullYear();
        var month= d.getMonth()+1;
        month = month < 10 ? '0' + month : month;
        var day= d.getDay();
        return year+'/'+month+'/'+day;

    });

    //添加模板函数中的方法 获取数字
    template.helper('getNum',function getNum(str){
        return str.replace(/[^0-9]+/g, '')
    });

    //获取数字
    function getNum(str) {
        return str.replace(/[^0-9]+/g, '');
    }

    //回到顶部
    function gotop(sel){
        $(sel).on("click", function () {
            $("body,html").animate({scrollTop:0},1000);
            return false;
        });
    }
    //动态加载数据 （基础版）
    //function getSaveMoneyMenu(pageid ) {
    //    //不传参就默认第一页
    //    if(pageid==""){
    //        pageid=0;
    //    }
    //    $.ajax({
    //        type:'get',
    //        url:"http://139.199.157.195:9090/api/getmoneyctrl",
    //        data:{'pageid':pageid},
    //        success:function (res) {
    //            //使用模板函数
    //            tpl(res,'savaMoneyTpl','#container>#listdiv>ul');
    //
    //
    //        }
    //    });
    //}

    //模板函数
    //    function tpl(res,modelId,elementId){
    //        var html = template(modelId,res);
    //        //console.log(html);
    //        $(elementId).html(html);
    //    }
});