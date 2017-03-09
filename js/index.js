/**
 * Created by rabbcat on 2017/2/15.
 */
$(function () {
    //数据删选函数
    function getNum(str){
        return str.replace(/[^0-9]+/g,'');
    }
    //请求菜单部分数据
    $.ajax({
        type: 'get',
        url: 'http://139.199.157.195:9090/api/getindexmenu',
        data: {},
        dataType: 'jsonp',
        beforeSend: function () {
            //console.log('1111');
        },
        success: function (info) {
            //console.log('2222');
            //console.log(info);
            var html = template('tmp', info);
//            console.log(html);
            $('.row').append(html);
        },
        complete: function () {
            //console.log('3333');
        }
    });
    //请求折扣部分数据
    $.ajax({
        type: 'get',
        url: 'http://139.199.157.195:9090/api/getmoneyctrl',
        data: {},
        dataType: 'jsonp',
        beforeSend: function () {
            console.log('1111');
        },
        success: function (info) {
            template.helper('getNum',getNum);
            console.log(info);
            var html=template('model',info);
            $('ul').append(html);
        },
        complete: function () {
            console.log('3333');

        }
    });
//    点击更多菜单伸缩
    console.log($('div:nth-child(8)').nextAll('div'));
    $('#menu .row').on('click','div:nth-child(8)', function () {
    $('div:nth-child(8)').nextAll('div').slideToggle('slow');
    console.log('1111');
    });
    //返回顶部
    $('.back').on('click', function () {
        $('html,body').animate({scrollTop: '0px'}, 800);
    });

});