jQuery||require("jquery")
var jsondata={};
var flag=true; 
var addr='http://10.170.128.150:8005';
//addr=window.location.host;
$(function(){    
    //遍历ID
    $('.ask-list').each(function(){
        var qId=$(this).find('.questionId').val()       
        jsondata[qId]=''      
    });
       
    //点击答案
    $('.ask-list').on('click','.list li', function(e) {
        var qId=$(this).parents('.ask-list').find('.questionId').val();
        var index=$(this).index();
        $(this).addClass('selected').siblings('li').removeClass('selected')
        var ky='';
        if(index==0){
            ky='a'
        }
        if(index==1){
            ky='b'
        }
        if(index==2){
            ky='c'
        }
        if(index==3){
            ky='d'
        }
        jsondata[qId]=ky
        console.log(jsondata) 
        var thisAskList = $(this).parents('.ask-list');
        if(thisAskList.next('div').hasClass('ask-list')){
            thisAskList.slideUp().next('.ask-list').slideDown()
        }else{
            //alert('已经是最后一题啦。')
            flag=false;
            $.ajax({
                type: "post",
                url: "/submit_exam_answer/",
                data: jsondata,
                dataType: "json",
                headers:{ "X-CSRFtoken":$.cookie("csrftoken")},
                success: function (response) {
                    console.log(response)
                    var score = response.user_score;
                    var errorquestion=response.mistake_question_dict;
                    var qlength=$('.ask-list').length
                    console.log(errorquestion,qlength)
                    if(score==100){
                        $('.showBox1').hide()
                        $('.showBox2').show()
                    }
                    else{                       
                        $('.showBox1 .score span').text(score)
                        //判断继续答题是否可点击
                        $.ajax({
                            type: "get",
                            url: "/api/user/homeinfo/",
                            dataType: "json",
                            success: function (data) {
                                var rjson=data.user_score;
                                if(JSON.stringify(rjson) != "{}"){
                                var arr=Object.keys(rjson);
                                var stimes=arr.length;
                                if(stimes<3){
                                 $('.showBox1 .again').attr('href',addr+'/exam')
                                 $('.details .again').attr('href',addr+'/exam')
                                }
                                else{
                                    $('.btns .again').addClass('disable')
                                    $('.showBox1 .again').attr('href','')
                                    $('.details .again').attr('href','')                                    
                                }
                              }
                            },
                            error: function(error) {

                            }
                        });                        
                        $('.showBox1').show()
                        $('.showBox2').hide()
                    }
                    
                    $('.showBox .look').click(function(){
                       $('.showBox').hide()
                       $('.details').show()
                    })
                    $('.btns .again.disable').click(function(){
                        alert('每个人最多三次答题机会,您已全部使用！');
                        return false;
                    })
                    for(var i=0;i<qlength;i++){
                        var qid=$('.ask-list').eq(i).find('.questionId').val();
                        for(var prop in errorquestion){
                            if(prop==qid){                                
                                $('.ask-list').eq(i).addClass('error')
                                $('.ask-list').eq(i).find('li').removeClass('selected')
                                if(errorquestion[prop]=='a'){                                    
                                    $('.ask-list').eq(i).find('li').eq(0).addClass('selected')
                                }
                                if(errorquestion[prop]=='b'){
                                    $('.ask-list').eq(i).find('li').eq(1).addClass('selected')
                                }
                                if(errorquestion[prop]=='c'){
                                    $('.ask-list').eq(i).find('li').eq(2).addClass('selected')
                                }
                                if(errorquestion[prop]=='d'){
                                    $('.ask-list').eq(i).find('li').eq(3).addClass('selected')
                                }
                                break;
                            }
                        }

                    }
                    for(var j=0;j<qlength;j++){
                        var qtitle=$('.ask-list').eq(j).find('.ask-qus').text();
                        var qanswer=$('.ask-list').eq(j).find('.selected').text();
                        //console.log(qtitle,qanswer)
                        var str='';
                        if($('.ask-list').eq(j).hasClass('error')){
                            if(j<9){
                                str='<div class="answer-list error"><p class="askName"><i class="order">0'+(j+1)+'</i><span class="ask-qus">'+qtitle+'</span></p><ul class="list"><li><h5 class="answer-right">正确答案</h5><label>'+qanswer+'</label></li></ul></div>'
                            }
                            else{
                                str='<div class="answer-list error"><p class="askName"><i class="order">'+(j+1)+'</i><span class="ask-qus">'+qtitle+'</span></p><ul class="list"><li><h5 class="answer-right">正确答案</h5><label>'+qanswer+'</label></li></ul></div>'
                            }    
                        }
                        else{
                            if(j<9){
                            str='<div class="answer-list"><p class="askName"><i class="order">0'+(j+1)+'</i><span class="ask-qus">'+qtitle+'</span></p><ul class="list"><li><h5 class="answer-right">正确答案</h5><label>'+qanswer+'</label></li></ul></div>'}
                            else{
                                str='<div class="answer-list"><p class="askName"><i class="order">'+(j+1)+'</i><span class="ask-qus">'+qtitle+'</span></p><ul class="list"><li><h5 class="answer-right">正确答案</h5><label>'+qanswer+'</label></li></ul></div>'
                            }  

                    }
                        $('.details .ask-box').append(str)
                    }
                },
                error:function(error){
                    console.log(error)
                }
            });
            $(this).parents('.answer').slideUp()
            $('.countTime').hide()
        }        
        return false;
        
    });
    
})
// 答题倒计时
//setCountDown_time();        
        var idt = setInterval("ls();", 1000);       
        var sec = 60,min = 59;
        var format = function(str) {
            if(parseInt(str) < 10) {
                return "0" + str;
            }
            return str;
        };
        // function setCountDown_time(){
        //     idt;
        // }
        function ls() {
            if(sec == 0 && min!= 0) {
                min--;        
                sec = 59;        	
            }
            if(parseInt(min) == 0 && parseInt(sec) == 0) {
                clearInterval(idt);
                if(flag){
                    $.ajax({
                        type: "post",
                        url: addr+"/submit_exam_answer/",
                        data: jsondata,
                        dataType: "json",
                        success: function (response) {
                            console.log(response)
                            var score = response.user_score;
                            var errorquestion=response.mistake_question_dict;
                            var qlength=$('.ask-list').length
                            console.log(errorquestion,qlength)
                            if(score==100){
                                $('.showBox1').hide()
                                $('.showBox2').show()
                            }
                            else{
                                $('.showBox1 .score span').text(score)
                                //判断继续答题是否可点击
                            $.ajax({
                                type: "get",
                                url: "/api/user/homeinfo/",
                                dataType: "json",
                                success: function (data) {
                                    var rjson=data.user_score;
                                    var arr=Object.keys(rjson);
                                    var stimes=arr.length;
                                    if(times<3){
                                    $('.showBox1 .again').attr('href',addr+'/exam')
                                    $('.details .again').attr('href',addr+'/exam')
                                    }
                                    else{
                                        $('.btns .again').addClass('disable')
                                        $('.showBox1 .again').attr('href','')
                                        $('.details .again').attr('href','')                                    
                                    }
                                },
                                error: function(error) {

                                }
                            });
                            }
                            $('.showBox1 .again').attr('href',addr+'/exam')
                            $('.details .again').attr('href',addr+'/exam')
                            $('.showBox .look').click(function(){
                            $('.showBox').hide()
                            $('.details').show()
                            })
                            for(var i=0;i<qlength;i++){
                                var qid=$('.ask-list').eq(i).find('.questionId').val();
                                for(var prop in errorquestion){
                                    if(prop==qid){                                
                                        $('.ask-list').eq(i).addClass('error')
                                        $('.ask-list').eq(i).find('li').removeClass('selected')
                                        if(errorquestion[prop]=='a'){                                    
                                            $('.ask-list').eq(i).find('li').eq(0).addClass('selected')
                                        }
                                        if(errorquestion[prop]=='b'){
                                            $('.ask-list').eq(i).find('li').eq(1).addClass('selected')
                                        }
                                        if(errorquestion[prop]=='c'){
                                            $('.ask-list').eq(i).find('li').eq(2).addClass('selected')
                                        }
                                        if(errorquestion[prop]=='d'){
                                            $('.ask-list').eq(i).find('li').eq(3).addClass('selected')
                                        }
                                        break;
                                    }
                                }
        
                            }
                            for(var j=0;j<qlength;j++){
                                var qtitle=$('.ask-list').eq(j).find('.ask-qus').text();
                                var qanswer=$('.ask-list').eq(j).find('.selected').text();
                                console.log(qtitle,qanswer)
                                var str='';
                                if($('.ask-list').eq(j).hasClass('error')){
                                    if(j<9){
                                        str='<div class="answer-list error"><p class="askName"><i class="order">0'+(j+1)+'</i><span class="ask-qus">'+qtitle+'</span></p><ul class="list"><li><h5 class="answer-right">正确答案</h5><label>'+qanswer+'</label></li></ul></div>'
                                    }
                                    else{
                                        str='<div class="answer-list error"><p class="askName"><i class="order">'+(j+1)+'</i><span class="ask-qus">'+qtitle+'</span></p><ul class="list"><li><h5 class="answer-right">正确答案</h5><label>'+qanswer+'</label></li></ul></div>'
                                    }    
                                }
                                else{
                                    if(j<9){
                                    str='<div class="answer-list"><p class="askName"><i class="order">0'+(j+1)+'</i><span class="ask-qus">'+qtitle+'</span></p><ul class="list"><li><h5 class="answer-right">正确答案</h5><label>'+qanswer+'</label></li></ul></div>'}
                                    else{
                                        str='<div class="answer-list"><p class="askName"><i class="order">'+(j+1)+'</i><span class="ask-qus">'+qtitle+'</span></p><ul class="list"><li><h5 class="answer-right">正确答案</h5><label>'+qanswer+'</label></li></ul></div>'
                                    }  
        
                            }
                                $('.details .ask-box').append(str)
                            }
                        },
                        error:function(error){
                            console.log(error)
                        }
                    });
                }
                $('.main-box .answer').slideUp()
                $('.main-box .showBox').slideDown()
                $('.countTime').hide()                
                return false;        
            }
            sec--;	
            $("#countdown_time").html(format(min) + ":" + format(sec));
            //console.log(min,sec)
            
} 