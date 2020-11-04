jQuery||require("jquery")
$(function(){
    var //addr='http://10.170.128.150:8005';
        addr=window.location.host;
    var name=$('#name'),
        tel=$('#tel'),
        unit=$('#unit'),
        fc=$('#fc'),
        sc=$('#sc'),
        tc=$('#tc'),
        prize=$('.prize'),
        home=$('.home'),
        disable=$('.disable'),
        test =$('.test'),
        times=$('#times');
        // 跳转链接
        prize.attr('href','https://csjs.cnki.net/good_luck');
        home.attr('href',addr+'/');
        test.attr('href',addr+'/exam');
        $.ajax({
            type: "get",
            url: "/api/user/homeinfo/",
            dataType: "json",
            success: function (response) {
                var rname=response.nickname;
                var rtel=response.telephone;
                var runit=response.unit;
                var rjson=response.user_score;
                name.text(rname);
                tel.text(rtel);
                unit.text(runit);
                //获取答题次数
                var arr=Object.keys(rjson);
                var stimes=arr.length;
                if(stimes==1){
                    fc.text(rjson[0])
                }
                else if(stimes==2){
                    fc.text(rjson[0]);
                    sc.text(rjson[1])
                }
                else{
                    fc.text(rjson[0]);
                    sc.text(rjson[1])
                    tc.text(rjson[2])
                }
                // 抽奖次数
                var timesText=0;
                for(var i=0;i<stimes;i++){
                    if(rjson[i]=='100'){
                        timesText++;
                        return timesText;
                    }
                }
                // times.text(timesText)
                // 判断显示的按钮
                if(timesText==0 && stimes<3){
                    prize.hide();
                    home.hide();
                    disable.show();
                    test.show()
                }
                else if(timesText==0 && stimes==3){
                    prize.hide();
                    home.show();
                    disable.show();
                    test.hdie()
                }
                else if(timesText>0 && stimes<3){
                    prize.show();
                    home.hide();
                    disable.hide();
                    test.show()
                }
                else if(timesText>0 && stimes==3){
                    prize.show();
                    home.show();
                    disable.hide();
                    test.hide()
                }
                
            },
            error: function(error) {

            }

        });
        
})