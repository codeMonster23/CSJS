$(function(){
    // 答题
	var $answer = $('.answer');
    $answer.on('click','input[type=radio],.btn-confirm', function() {
		$(this).parents('li').addClass('on').siblings('li').removeClass('on');//竞赛入口答题 单选选中

        var selectIndex = $(this).parents('li').index();
        var selectLetter = null,
            selectText = null;
        switch(selectIndex){
            case 0:
                selectLetter = 'A';
                selectText = '正确';
                break;
            case 1:
                selectLetter = 'B';
                selectText = '错误';
                break;
            case 2:
                selectLetter = 'C';
                break;
            case 3:
                selectLetter = 'D';
                break;
        }
        answerSpan = $(this).parents('.ask-list').siblings('.answer-list').find('.answer-yours span');
        if($(this).parents(".ask-box").hasClass("multiple")){
            answerSpan.text(answerStr);
        }else if($(this).parents(".ask-box").hasClass("judge")) {
            answerSpan.text(selectText);
        }else {
            answerSpan.text(selectLetter);
        }

        var askList = $(this).parents('.ask-list');
        //当为多选时，需要选择两个及以上
        // if($(this).parents(".ask-box").hasClass("multiple")&&$(this).siblings(".list").children("li.on").length < 2) {
        //     // 弹窗提示至少需要选择两个
        //     $('.down').fadeTo(300,0.3);
        //     $('.up_tips').fadeIn(300);
        //     return;
        // }

        // if (askList.next().html() !== undefined) {//当不是该模块最后一题的时候
        //     askList.slideUp().next().slideDown();

        //     var _index= askList.index();
        //     $(this).parents('.main-box').find('.process .on .order-num').text(_index+2);

        // }else{//当是该模块最后一题的时候,进入下一模块第一题
        //     var askBox = $(this).parents('.ask-box');
        //     //askList.slideUp();
        //     //askBox.next().children().eq(0).slideDown();

        //     var _ord = askList.parent().index();
        //     var ProcessLi = $(this).parents('.main-box').find('.process li');
        //     ProcessLi.eq(_ord).removeClass("on").addClass("complete");
        //     ProcessLi.eq(_ord+1).addClass("on");
        //     $(this).parents('.main-box').find('.process .on .order-num').text(1);
        // }

	});
    
    //竞赛入口答题 多选选中效果
    var answerAry = ['','','',''];
    $('.main-box').on('click','input[type=checkbox]', function() {
        $(this).parents('li').toggleClass('on');
        var selectIndex = $(this).parents('li').index();
        var selectLetter = null;
        switch(selectIndex){
            case 0:
                selectLetter = 'A';
                break;
            case 1:
                selectLetter = 'B';
                break;
            case 2:
                selectLetter = 'C';
                break;
            case 3:
                selectLetter = 'D';
                break;
        }
        $(this).parents('li').hasClass('on')?answerAry.splice(selectIndex,1,selectLetter): answerAry.splice(selectIndex,1,'');
        return answerStr = answerAry.join(' ');
    });
    
    //查看我的奖品弹窗
    $('.score-table').on('click','.remarks a', function() {
        $('.down').fadeTo(300,0.3);
        $('.up_award').fadeIn(300);
    });

    //未登录时点击竞赛入口或者成绩查询
    $('.nologin').on('click', function() {
        $('.down').fadeTo(300,0.3);
        $('.up_sign').fadeIn(300);
    });

    // 弹窗关闭
    function popupClose(el,mask,close) {
        // 点击关闭按钮，弹窗消失
        $(el).on("click",close,function(event){
            initPop(el,mask);
        });

        //点击蒙版区域，弹窗消失
        $(mask).on("click",function(event){
            initPop(el,mask);
        });

        function initPop(el,mask){ //关闭弹出框,恢复初始状态
            $(mask).fadeOut(300);
            $(el).fadeOut(300);
        }
    }
    popupClose('.up_tips','.down','.close_btn');//答题页 提示至少选择两项
    popupClose('.up_award','.down','.close_btn');//成绩查询页 查看我的奖品弹窗
    popupClose('.up_prize','.down','.close_btn');//抽奖页面 点击红包抽奖弹窗
    popupClose('.up_sign','.down','.close_btn');//登录框


    
    //成绩查询 折叠
    $('.fold-box').on('click','.fold-btn', function() {
        $(this).toggleClass('close').parent().siblings().toggle();
        if($(this).hasClass('close')){
            $(this).children('span').text('展开')
        }else{
            $(this).children('span').text('折叠')
        }
    });
   

})
