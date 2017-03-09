$(function () {
    getResult({
        url:"http://139.199.157.195:9090/api/getcategorytitle",
        obj: ".fenglei",
        tplId: "tit_tpl",
        complete: function () {
            $.each($(".fl_tit_link"),function (i,v) {
                $.get( "http://139.199.157.195:9090/api/getcategory",{titleid:$(v).attr("titleid")},function (data){
                        var html = template('tit_con_tpl',data);
                        console.log(html);
                        $(v).parent().append(html);
                    }
                );
            })
        }
    });
    $(".fenglei").on("click",".fl_tit",function (e) {
        $(e.target).next(".fl_list").slideToggle(500);
        $(e.target).parent(".fl_tit").siblings(".fl_tit").find('.fl_list').slideUp(500);
    });
})