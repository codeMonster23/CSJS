jQuery||require("jquery")
$(function(){

    var csrs=$('.csrs');
    var csdw=$('.csdw')
    var ktsy=$('.ktsy')
    //参赛人数
    $.ajax({
        type: "get",
        url: '/api/user/sum/',
        dataType: "json",
        success: function (response) {
           var csrsText=response.user_sum;
           csrs.text(csrsText) 
        },
        error:function(error){

        }
    });
    //参赛单位
    $.ajax({
        type: "get",
        url: '/api/user/org_sum/',
        dataType: "json",
        success: function (response) {
           var csdwText=response.org_num;
           csdw.text(csdwText) 
        },
        error:function(error){

        }
    });
    //开通试用
    $.ajax({
        type: "get",
        url: '/trial_sum',
        dataType: "json",
        success: function (response) {
           var ktsyText=response.nums;
           ktsy.text(ktsyText) 
        },
        error:function(error){

        }
    });
    //判断是否可进入答题
    var exam=$('.exam')
    $.ajax({
        type: "get",
        url: "/api/user/homeinfo/",
        dataType: "json",
        success: function (data) {
            var rjson=data.user_score;
            var arr=Object.keys(rjson);
            var stimes=arr.length;
            if(stimes<3){
                exam.removeClass('disable')
            }
            else{
                exam.addClass('disable')
                                   
            }
        },
        error: function(error) {

        }
    });
    $('.exam.disable').click(function(){
        alert('每个人最多三次答题机会,您已全部使用！');
        return false;
    })
    // 答题竞赛
    //省级排行榜
    var rsProvince=$('#rsProvince')
    $.ajax({
        type: "get",
        url: '/api/province_list/',
        dataType: "json",
        success: function (response) {
           var length= response.length
           for(var i=0;i<length;i++){            
                if(i<3){
                    var str='<p class="row"><span class="colorOrange">0'+(i+1)+'</span><i class="text" title="'+response[i].province+'">'+response[i].province+'</i><i class="num">'+response[i].user_num+'</i></p>'
                    rsProvince.append(str)
                }
                else if(i>=3 && i<9){
                    var str='<p class="row"><span>0'+(i+1)+'</span><i class="text" title="'+response[i].province+'">'+response[i].province+'</i><i class="num">'+response[i].user_num+'</i></p>'
                    rsProvince.append(str)
                }
                else{
                    var str='<p class="row"><span>'+(i+1)+'</span><i class="text" title="'+response[i].province+'">'+response[i].province+'</i><i class="num">'+response[i].user_num+'</i></p>'
                    rsProvince.append(str)
                }
           }
        },
        error:function(error){

        }
    });
    //区级排行榜
    var rsCity=$('#rsCity')
    $.ajax({
        type: "get",
        url: '/api/city_list/',
        dataType: "json",
        success: function (response) {
           var length= response.length
           for(var i=0;i<length;i++){            
                if(i<3){
                    var str='<p class="row"><span class="colorOrange">0'+(i+1)+'</span><i class="text" title="'+response[i].city+'">'+response[i].city+'</i><i class="num">'+response[i].user_num+'</i></p>'
                    rsCity.append(str)
                }
                else if(i>=3 && i<9){
                    var str='<p class="row"><span>0'+(i+1)+'</span><i class="text" title="'+response[i].city+'">'+response[i].city+'</i><i class="num">'+response[i].user_num+'</i></p>'
                    rsCity.append(str)
                }
                else{
                    var str='<p class="row"><span>'+(i+1)+'</span><i class="text" title="'+response[i].city+'">'+response[i].city+'</i><i class="num">'+response[i].user_num+'</i></p>'
                    rsCity.append(str)
                }
           }
        },
        error:function(error){

        }
    });
    //区县级排行榜
    var rsArea=$('#rsArea')
    $.ajax({
        type: "get",
        url: '/api/area_list/',
        dataType: "json",
        success: function (response) {
           var length= response.length
           for(var i=0;i<length;i++){            
                if(i<3){
                    var str='<p class="row"><span class="colorOrange">0'+(i+1)+'</span><i class="text" title="'+response[i].area+'">'+response[i].area+'</i><i class="num">'+response[i].user_num+'</i></p>'
                    rsArea.append(str)
                }
                else if(i>=3 && i<9){
                    var str='<p class="row"><span>0'+(i+1)+'</span><i class="text" title="'+response[i].area+'">'+response[i].area+'</i><i class="num">'+response[i].user_num+'</i></p>'
                    rsArea.append(str)
                }
                else{
                    var str='<p class="row"><span>'+(i+1)+'</span><i class="text" title="'+response[i].area+'">'+response[i].area+'</i><i class="num">'+response[i].user_num+'</i></p>'
                    rsArea.append(str)
                }
           }
        },
        error:function(error){

        }
    });
    
    //总积分排行榜
    //省级
    var sProvince=$('#scoreProvince')
    $.ajax({
        type: "get",
        url: 'https://csjs.cnki.net/api-provinces-ranking',
        dataType: "json",
        success: function (response) {
           var length= response.length
           for(var i=0;i<length;i++){            
                if(i<3){
                    var str='<p class="row"><span class="colorOrange">0'+(i+1)+'</span>'+response[i]+'</p>'
                    sProvince.append(str)
                }
                 else if(i>=3 && i<9){
                    var str='<p class="row"><span>0'+(i+1)+'</span>'+response[i]+'</p>'
                    sProvince.append(str)
                }
                else{
                    var str='<p class="row"><span>'+(i+1)+'</span>'+response[i]+'</p>'
                    sProvince.append(str)
                }
           }
        },
        error:function(error){

        }
    });
    //市级
    var sCity=$('#scoreCity')
    $.ajax({
        type: "get",
        url: 'https://csjs.cnki.net/api-cities-ranking',
        dataType: "json",
        success: function (response) {
           var length= response.length
           for(var i=0;i<length;i++){            
                if(i<3){
                    var str='<p class="row"><span class="colorOrange">0'+(i+1)+'</span>'+response[i]+'</p>'
                    sCity.append(str)
                }
                 else if(i>=3 && i<9){
                    var str='<p class="row"><span>0'+(i+1)+'</span>'+response[i]+'</p>'
                    sCity.append(str)
                }
                else{
                    var str='<p class="row"><span>'+(i+1)+'</span>'+response[i]+'</p>'
                    sCity.append(str)
                }
           }
        },
        error:function(error){

        }
    });
     //市级
     var sArea=$('#scoreArea')
     $.ajax({
         type: "get",
         url: 'https://csjs.cnki.net/api-areas-ranking',
         dataType: "json",
         success: function (response) {
            var length= response.length
            for(var i=0;i<length;i++){            
                 if(i<3){
                     var str='<p class="row"><span class="colorOrange">0'+(i+1)+'</span>'+response[i]+'</p>'
                     sArea.append(str)
                 }
                  else if(i>=3 && i<9){
                     var str='<p class="row"><span>0'+(i+1)+'</span>'+response[i]+'</p>'
                     sArea.append(str)
                 }
                 else{
                     var str='<p class="row"><span>'+(i+1)+'</span>'+response[i]+'</p>'
                     sArea.append(str)
                 }
            }
         },
         error:function(error){
 
         }
     });
    //活动动态
    $.ajax({
        type: "get",
        url: '/api/related_documents/',
        dataType: "json",
        success: function (response) {
           console.log(response.length)
           var length= response.length;
           for(var i=0;i<length;i++){
             if(response[i].file_file){
             var str=' <p><a href=" media/'+response[i].file_file+'" target="_blank">'+response[i].file_name+'</a></p>'
             $('.home-part1 .box2 .wrap').append(str)
            }
            else{
                var str=' <p><a href="'+response[i].news_link+'" target="_blank">'+response[i].file_name+'</a></p>'
                $('.home-part1 .box2 .wrap').append(str)
            }
             
           }
           
        },
        error:function(error){
            console.log(error)
        }
    });
})