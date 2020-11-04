$(function(){

    if(window.localStorage.getItem("phone") == undefined){
        $('.verify-phone').show().siblings().hide();

        $('.next-step').click(function () {
            var errorTip = $('.error-tips');
            var phoneNumber = document.getElementById('phone').value;
            var reg = /^1[3|4|5|7|8][0-9]{9}$/;

            if(!(reg.test(phoneNumber))){
                errorTip.show();
                return;
            }
            errorTip.hide();
            $('.verify-phone').hide().siblings().show();
            $('.header').show().find('.login_name span').text(phoneNumber);

            if(!window.localStorage){
                console("浏览器不支持localstorage");
                return false;
            }else{
                window.localStorage.setItem("phone", phoneNumber);
            }
        });

    }else{
        $('.verify-phone').hide().siblings().show();
        var myPhoneNumber = window.localStorage.getItem("phone");
        $('.header').show().find('.login_name span').text(myPhoneNumber);
    }


    $('.cancel').click(function () {
        window.localStorage.removeItem("phone");
        $('.header').hide();
        $('.verify-phone').show().siblings().hide();
    });

});
