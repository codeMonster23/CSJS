/* 功能：红包抽奖 */
$(function () {
    var addr='http://10.170.128.150:8005';
    //addr=window.location.host;
    var bShake = false;
    var tipText=$('.up_prize_text')
	var shakeFn = function () {
        bShake = !bShake; //防止连续点击
        //txt=(txt=='谢谢参与')? txt:('恭喜您获得'+txt+' !');
        //$('.up_prize_text').text(txt);
        $.ajax({
            type: "get",
            url: addr+"/lottery",
            dataType: "json",
            success: function (response) {
                console.log(response)
                var prizeid = response.prize_id;
                switch(prizeid){
                    case 0:                            
                        tipText.text('谢谢参与!');
                        break;
                    case 1:
                        tipText.text('恭喜您获得100元知网检索卡，奖品号为：'+response.cid+'，奖品兑换密码为：'+response.pwd_card);
                        break;
                    case 2:
                        tipText.text('恭喜您获得100元知网检索卡，奖品号为：'+response.cid+'，奖品兑换密码为：'+response.pwd_card);
                        break;
                    case 3:
                        tipText.text('恭喜您获得蓝牙耳机!');
                        break;
                    case 4:
                        tipText.text('恭喜您获得便携式料理机!');
                        break;
                    case 5:
                        tipText.text('恭喜您获得车载加湿器!');
                        break;
                    case 6:
                        tipText.text('恭喜您获得蓝牙音箱!');
                        break;
                    case 7:
                        tipText.text('恭喜您获得无线鼠标!');
                        break;
                    case 8:
                        tipText.text('恭喜您获得笔记本套装!');
                        break;
                    case 9999:
                        tipText.text('对不起，您无抽奖权限!');
                        
                }
            }
        });
        setTimeout(function(){
            $(".red").removeClass("shake");
            $(".up_prize").fadeIn(500);
            $(".down").fadeTo(500,0.3);
            bShake = !bShake;
        },1500);

	};

    $(document).ready(function(){
        $('.red').click(function () {
            if (bShake) return;
            $(this).addClass("shake");//给红包添加shake抖动
            //var awardIndex = rnd(0, 9);//随机获取奖品的索引
            shakeFn();
            //console.log(awardIndex,awards[awardIndex]);
        });
    });
    //获奖名单
    var prizeList=$('#prizeList')
    $.ajax({
        type: "get",
        url: addr+"/api/get_luck_guy_list/",
        dataType: "json",
        success: function (response) {
            console.log(response)
            var length=response.length;
            var str='';
            for(var i=0;i<length;i++){
                str='<li>恭喜&nbsp;&nbsp;'+response[i].user+'&nbsp;&nbsp;获得'+response[i].prize+'</li>'
                prizeList.append(str)
            }

        },
        error:function (error) {
            console.log(error)
        }
    });
});
function rnd(n, m) {
	return Math.floor(Math.random() * (m - n + 1) + n)
}
