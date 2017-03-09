/**
 * Created by rabbcat on 2017/2/15.
 */
$(function () {

    //用户名提示
    $('.userName').on('blur', function () {
        var userName=$(this).val();
        var regName=/^[\u4e00-\u9fa5]{2,4}$/;
        console.log(regName.test(userName));
        if(userName==''){
            $(this).next('p').html('用户名不能为空，请输入！').show(400);
        }
        else if (!regName.test(userName)) {
            $(this).next('p').html('请输入有效的用户名').show(400);
        }
        else{
            $(this).next('p').hide(400);
        }


    });
    //密码提示
    $('.passWord').on('blur', function () {
        var regWord=/^(\w){6,20}$/;
        var passWord=$(this).val()
        if(passWord==''){
            $(this).next('p').html('密码不能为空，请输入！').show(400);
        }
        else if (!regWord.test(passWord)) {
            $(this).next('p').html('请输入有效的密码').show(400);
        }
        else{
            $(this).next('p').hide(400);
        }
    });
    //获取验证码,点击发起请求
    $('.get_code').on('click', function () {
        // console.log($(this));
        var _this=$(this);
        var _mobile=$('.mobile').val();
        if(_mobile==''){
            $(this).next('p').show(400);
            return false;
        }
        $.ajax({
            type:'post',
            url:'get_code.php',
            data:{mobile: _mobile},
            beforeSend: function () {
                var regMobile = /^1\d{10}$/;
                console.log("111");
                if (!regMobile.test(_mobile)) {
                    alert('手机号码格式错误');
                    return false;
                };
                var sec=5;
                var timer=setInterval(function(){
                    _this.val(sec--+"秒后重新获取");
                    if (sec<0) {
                        clearInterval(timer);
                        _this.val(' 获取手机验证码');
                    };
                },1000);


            },
            success: function (info) {
                console.log(info);
                console.log('222');

            },
            complete: function() {
                // code
                console.log('不好好学习就去富土康');
            }
        });


    });
    //再次输入验证码
    $('.re_code').on('blur', function () {
        if($('.code').val()==''){
            $(this).next('p').show(400);
        }
        else{
            $(this).next('p').show(400).html('正在检测验证码是否有效');
        }
    });
    //邮箱提示
    $('.email').on('blur', function () {
        var email=$(this).val();
        var regEmail= /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
        if(email==''){
            $(this).next('p').html('邮箱不能为空，请输入！').show(400);
        }
        else if (!regEmail.test(email)) {
            $(this).next('p').html('邮箱格式错误').show(400);
        }
        else{
            $(this).next('p').hide(400);
        }
    });
    //app推广点击消失
    $('.remove_icon').on('click', function () {
        $('#app_promotion').slideUp('slow');
    });
    //点击注册,发起请求

    $('#register').on('click', function () {
        var formData = $('#ajaxForm').serialize();
        $.ajax({
            type:'post',
            url:'register.php',
            data:formData,
            beforSend:function(){
                console.log('111');
            },
            success:function(info){
                console.log(info);
                window.location.href=info.result;
            },
            complete:function(){
                console.log('333');
            }
        });
    });
    $('.back').on('click', function () {
        $('html,body').animate({scrollTop: '0px'}, 800);
    });
});