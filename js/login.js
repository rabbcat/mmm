/**
 * Created by rabbcat on 2017/2/17.
 */
$(function () {
    $('.userName').on('blur', function () {
        if($(this).val()==''){
            $(this).next('p').show(400);
        }

    });
    $('.passWord').on('blur', function () {
        if($(this).val()==''){
            $(this).next('p').show(400);
        }
    });
    $('.remove_icon').on('click', function () {
        console.log('aaa');
        $('#app_promotion').slideUp('slow');
    });
    $('#login_cli').on('click', function () {
        var formData = $('#ajaxForm').serialize();
        console.log(formData);
        $.ajax({
            type:'post',
            url:'http://192.168.21.72/wxy1/login.php',
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