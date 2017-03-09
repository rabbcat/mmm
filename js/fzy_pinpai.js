$(function () {

    var data = {};
    $.get("http://139.199.157.195:9090/api/getbrandtitle",
        function (res) {
            data = res;
            render();
    });

    var rendering = false;
    window.onscroll = function () {
        console.log("数据剩余"+data.result.length+"条");
        if ( data.result.length==0 || rendering ){
            return;
        }
        var distance = $(".pp_list").offset().top + $(".pp_list").innerHeight() + $(".footer").innerHeight() - $(document.body).height();
        var scrollTop = $(window).scrollTop();
        console.log("多余高度"+distance);
        console.log("卷曲高度"+scrollTop);
        if ( (distance - scrollTop ) < 50 ) {
            console.log("加载");
            rendering = true;
            render();
        }
    }

    function render() {
        var newData = { result:[] };
        var len = 8;
        if ( data.result.length <= 8) {
            len = data.result.length;
        }
        for (var i = 0; i <len; i++ ) {
            newData.result.push(data.result.shift());
        }
        var html = template("pp_list_tpl",newData);
        $(".pp_list").append( html );
        rendering = false;
    }

});