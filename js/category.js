/**
 * Created by 不高兴 on 2017/2/17.
 */
$(function(){
    $("#close").on("click",function(){
        $("#foot").fadeOut(2000);
    });
    $(".textarea").on("blur",function(){
        $(this).text("请通过购买App中使用分享或浏览器打开商品页面获取商品连接").css({ "color": "#ccc" });
    }).on("focus",function(){
        $(this).text("").css({ "color": "#000" });
    })
})