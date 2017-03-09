$(function () {
    //导航动态获取

    var data = 0;
    getGoods(0);
    function getTietle() {
        $.get('http://139.199.157.195:9090/api/getbaicaijiatitle', function (res) {
            var html = template("tpl", res);
            $(".con>.mynav>.parent>ul").html(html);
            Swipe();
            //动态获取到数据后才能进行操作
            //点击改变样式
            var ul = document.getElementById('togglel');
            var lis = ul.children;
            for (var i = 0; i < lis.length; i++) {
                lis[0].className = "add";
                lis[i].onclick = function () {
                    //干掉所有人
                    for (var i = 0; i < lis.length; i++) {
                        lis[i].className = "";
                    }
                    //记录当前li所对应titleID
                    var data = this.getAttribute('pronav');

                    this.className = "add";
                    $('.part ul').html('');
                   // console.log(data);
                    getGoods(data);
                }
            }

        });

        //关闭窗口切换
        var flag = true;
        $('#closec').on('click', function () {
            $('.check').toggle(0, function () {
                if (flag) {
                    $('#closec > img').eq(0).hide();
                    $('#closec > img').eq(1).show();
                    flag = false;
                } else {
                    $('#closec > img').eq(0).show();
                    $('#closec > img').eq(1).hide();
                    flag = true;
                }

            });
        });

    }

    //console.log(data);
    getTietle();

    //分析：当手指触摸屏幕时，有一个touchstart事件 记录当前鼠标的位置
    //让文字跟着鼠标走 touchmove 设置diance= startX-endX  distance有方向问题
    //touch事件 鼠标停止后记录位置
    //滑动区间的问题：当滑动区间大于150时就不能滑动了
    //点击数据跟着手指移动
    // 获取所用的数据
    function Swipe() {
        var ul = document.getElementById('togglel');
        var lis = ul.children;
        //console.log(lis);
        var w = 0;
        for (var i = 0; j = lis[i]; i++) {
            w += j.offsetWidth;
        }
        $(ul).css('width', w);
        var parentBox = document.querySelector('.parent');
        var childBox = parentBox.querySelector('ul');
        //console.log(parentBox);
        //console.log(childBox);
        var parentwidth = parentBox.offsetWidth

        var childwidth = childBox.offsetWidth;
        var maxX = 0;
        var minX = parentwidth - childwidth;
        var distance = 100;
        var maxSwipe = maxX + distance;
        var minSwipe = minX - distance;
        var startX = 0;
        var moveX = 0;
        var distanceX = 0;
        var isMove = false;
        var currX = 0;
        /*公用方法*/
        /*加过渡*/
        var addTransition = function () {
            childBox.style.transition = "all 0.3s";
            childBox.style.webkitTransition = "all 0.3s";
            /*做兼容*/
        };
        /*清除过渡*/
        var removeTransition = function () {
            childBox.style.transition = "none";
            childBox.style.webkitTransition = "none";
        }
        /*定位*/
        var setTranslateX = function (translateX) {
            childBox.style.transform = "translateX(" + translateX + "px)";
            childBox.style.webkitTransform = "translateX(" + translateX + "px)";
        }
        childBox.addEventListener('touchstart', function (e) {
            startX = e.touches[0].clientX;
        });
        childBox.addEventListener('touchmove', function (e) {
            moveX = e.touches[0].clientX;
            distanceX = moveX - startX;
            removeTransition();
            //2.在滑动区间范围移动
            if ((currX + distanceX) < maxSwipe && (currX + distanceX) > minSwipe) {
                setTranslateX(currX + distanceX);
            }
            isMove = true;
        });
        window.addEventListener('touchend', function (e) {
            /*3.在定位区间范围内  定位*/
            if ((currX + distanceX ) > maxX) {
                currX = maxX;
                /*吸附效果  过渡的形式定位回去*/
                /*加过渡*/
                addTransition();
                /*做定位*/
                setTranslateX(currX);
            } else if ((currX + distanceX) < minX) {
                currX = minX;
                /*吸附效果  过渡的形式定位回去*/
                /*加过渡*/
                addTransition();
                /*做定位*/
                setTranslateX(currX);
            } else {
                /*正常情况*/
                currX = currX + distanceX;
            }
            /*重置参数*/
            startX = 0;
            moveX = 0;
            distanceX = 0;
            isMove = false;
        });

    }


    // 内容动态获取
    function getGoods(data) {
        $.get('http://139.199.157.195:9090/api/getbaicaijiaproduct', {titleid: data}, function (good) {
            //var h=template('goods',good);
            // console.log(good);
            tpll(lazy(good));
            //$('.part>ul').html(h);
            //添加滚轮滚动事件
            $(window).on('scroll', function () {
                var height = $('.myhead').height() + $('.con').height();
                var top = $(window).height() + $(document).scrollTop();
                if (height - top < 100) {
                  //  tpll(lazy(good));
                    tpll(lazy(good));
                }

            })
        });
    }

    //将获取到的数据添加方法
    function tpll(info) {
       // var html = template('goods', info);
        var h=template('goods', info);
        //console.log(h);
        $('.part>ul').append(h);

       // $('.part>ul').append(html);
    }

    function lazy(data) {
        var info = {
            result: []
        }
        var a = 4;
        if (data.result.length > 0) {
            data.result.length < 4 ? a = data.result.length : "";
            if ($('.part>ul li').length == 0) {
                a = 8;
            }
            for (var i = 0; i < a; i++) {
                info.result.push(data.result.shift());
            }
        }
        return info;
    }


});

