jQuery||require("jquery")
$(function(){
    var //addr='http://10.170.128.150:8005';
    addr=window.location.host;
    var start=$('.start')
    $.ajax({
        type: "get",
        url: "/api/user/homeinfo/",
        dataType: "json",
        success: function (data) {
            var rjson=data.user_score;
            var arr=Object.keys(rjson);
            var stimes=arr.length;
            if(stimes<3){
                start.attr('href',addr+'/exam')
                start.removeClass('disable')
            }
            else{
                start.addClass('disable')
                                   
            }
        },
        error: function(error) {

        }
    });
    $('.start.disable').click(function(){
        alert('每个人最多三次答题机会,您已全部使用！');
        return false;
    })
})