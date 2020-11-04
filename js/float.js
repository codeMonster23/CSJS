jQuery||require("jquery")
$(function () {
    $('.fixFloat .close').click(function(){
        $(this).parent().fadeOut(200)
    })
})