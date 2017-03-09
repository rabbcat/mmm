$(function () {
    /*===================函数调用==================*/
    var obj={ brandtitleid: getQueryString("brandtitleid") };
    getResult( {
        url: "http://139.199.157.195:9090/api/getbrand",
        tplId: "pp_top10",
        obj: ".pp_list",
        data : obj,
        complete: function () {
            $('.pp_list>h3').html( getQueryString("fenlei")+'哪个品牌好' );
            var str = $('.pp_list>h3').html();
            $('.pp_title').append('&gt;'+'<span>'+ str +'</span>')
            getResult({
                url: "http://139.199.157.195:9090/api/getbrandproductlist",
                tplId: "product_tpl",
                obj: ".product",
                data: {brandtitleid: getQueryString("brandtitleid"),pagesize:4},
                complete: function () {
                    $('.product>h3').html( getQueryString("fenlei")+'产品销量排行' );
                    getResult({
                        url: "http://139.199.157.195:9090/api/getproductcom",
                        tplId: "pl_tpl",
                        obj: ".pinglun",
                        data: {productid: $(".product_list").attr("productId")},
                        complete: function () {
                            $('.pinglun>h3').html( getQueryString("fenlei")+'最新评论' );
                            $(".pl_tit img").attr("src",$(".product_list>a>img").attr("src")).next().html($(".product_list>a>.info_box>p").html());
                        }
                    });
                }
            });
        }
    } );
});