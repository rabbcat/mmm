    /*===================函数定义==================*/
function getResult( opt ) {
    $.ajax({
        // url: "http://139.199.157.195:9090/api/getbrandtitle",
        url: opt.url,
        data: opt.data||{},
        success: function ( info ) {
            var html = template( opt.tplId, info );
            $(opt.obj).html( html );
            // opt.callback&&opt.callback();
        },
        complete: opt.complete||''
    });
}
//获取url参数中的值--方法一
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]); return null;
}
//获取url参数中的值--方法二
function request(paras){ 
    var paraString = location.search.substring(1).split("&");
    var paraObj = {};
    //讲参数保存成对象的k:v形式
    for (var i=0; j=paraString[i]; i++){  
        paraObj[j.substring(0,j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=")+1);
    }
    var returnValue = paraObj[paras.toLowerCase()];
    if (typeof(returnValue)=="undefined") return ""; return decodeURI(returnValue);
}
//模板引擎注册方法
template.helper("getFenlei", getFenlei);
function getFenlei( str ) {
    return str.slice(0,-4);//start stop(都可负数)
    // return str.substring(0,str.length-4);//start stop
    // return str.substr(0,str.length-4);//start length
}