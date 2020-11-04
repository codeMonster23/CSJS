jQuery||require("jquery")
$(function(){
    var addr='http://10.170.128.150:8005';
        //addr=window.location.host;
    var username = $('#username'),
        psw = $('#psw'),
        repsw = $('#repsw'),
        email = $('#email'),
        phonenum = $('#phonenum'),
        company = $('#company'),
        province = $('#province'),
        city = $('.city'),
        area = $('.area'),
        org = $('#org'),
        rbtn = $('.r-btn'),
        pswequal = 0,
        companyTrue = 0,
        areaTrue=0;
    
        //验证用户名格式
       // 返回值 -1 为空，0 格式不正确，1 正确
       function verifyUserName(UserName) {
            if (!UserName) {
                return -1;
            } 
            else if ((/^[0-9_a-zA-Z@.]{6,64}$/.test(UserName))) {
                return 1;
            } 
            // else if((/^([a-zA-Z0-9])+([a-zA-Z0-9.-])@[A-Za-z0-9]+([-.][A-Za-z0-9]+).[A-Za-z0-9]+([-.][A-Za-z0-9]+)$/.test(UserName)) ){
            //     return 1;
            // }
            else if((/^\d$/).test(UserName)){
                return 0;
            }
            else {
                return 0;
            }
        }
        //验证密码格式
       // 返回值 -1 为空，0 格式不正确，1 正确
       function verifyPsw(psw) {
            if (!psw) {
                return -1;
            } else if (!(/^([a-z0-9A-Z-~!@#$%^&*()/\|,.<>?"'();:_+=\[\]{}]){6,20}$/).test(psw)) {
                return 0;
            } else {
                return 1;
            }
        }
        //验证邮箱格式
        // 返回值 -1 为空，0 格式不正确，1 正确
        function verifyEmail(email) {
            if (!email) {
                return -1;
            } else if (!(/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(email))) {
                return 0;
            } else {
                return 1;
            }
        }
        // 验证手机号格式
        // 返回值 -1 为空，0 格式不正确，1 正确
        function verifyPhoneNum(phoneNum) {
            if (!phoneNum) {
                return -1;
            } else if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(phoneNum))) {
                return 0;
            } else {
                return 1;
            }
        }
        // 输入框获取焦点去掉报错样式
         $('.register input').focus(function(){
             $(this).removeClass('error')
             if($(this).attr('id')=='username'){
                $(this).parent().next('.tip-error').html('请输入6-64位字符，支持字母、数字及“_” 组合').removeClass('color')
             }
             else if($(this).attr('id')=='psw'){
                $(this).parent().next('.tip-error').html('请输入6-20位数字、字母或常用符号，字母区分大小写').removeClass('color')
             }
             else{
                 $(this).parent().next('.tip-error').html('').removeClass('color')
             }
         })
        //填写完成验证
        // 用户名
        username.blur(function(){
            var usernameInput= $(this).val().trim();
               if(verifyUserName(usernameInput)==-1) {
                username.addClass('error')
                username.parent().next('.tip-error').html('用户名不能为空').addClass('color')
               }
               if(verifyUserName(usernameInput)==0) {
                username.addClass('error')
                username.parent().next('.tip-error').html('用户名格式错误').addClass('color')
               }
               if(verifyUserName(usernameInput)==1){
                username.parent().next('.tip-error').html('')
               }
        })
        //密码
        psw.blur(function(){
            var pswInput= $(this).val().trim();
               if(verifyPsw(pswInput)==-1) {
                psw.addClass('error')
                psw.parent().next('.tip-error').html('密码不能为空').addClass('color')
               }
               if(verifyPsw(pswInput)==0) {
                psw.addClass('error')
                psw.parent().next('.tip-error').html('密码格式错误').addClass('color')
               }
               if(verifyPsw(pswInput)==1){
                psw.parent().next('.tip-error').html('')
               }
               console.log(pswInput)
        })
        //验证两次密码是否一致
        repsw.blur(function(){
            pswequal=0;
            var pswInput= psw.val().trim();
            var repswInput= $(this).val().trim();
            if(!repswInput){
                repsw.addClass('error')
                repsw.parent().next('.tip-error').html('确认密码不能为空').addClass('color') 
            }
            else if(repswInput != pswInput){
                repsw.addClass('error')
                repsw.parent().next('.tip-error').html('两次密码输入不一致').addClass('color')
            }
            else{
                pswequal=1;
                repsw.parent().next('.tip-error').html('')
            }

        })
        //邮箱
        email.blur(function(){
            var emailInput= $(this).val().trim();
               if(verifyEmail(emailInput)==-1) {
                email.addClass('error')
                email.parent().next('.tip-error').html('邮箱不能为空').addClass('color')
               }
               if(verifyEmail(emailInput)==0) {
                email.addClass('error')
                email.parent().next('.tip-error').html('邮箱格式错误').addClass('color')
               }
               if(verifyEmail(emailInput)==1){
                email.parent().next('.tip-error').html('')
               }
        })
        //手机号
        phonenum.blur(function(){
            var phonenumInput= $(this).val().trim();
               if(verifyPhoneNum(phonenumInput)==-1) {
                phonenum.addClass('error')
                phonenum.parent().next('.tip-error').html('手机号不能为空').addClass('color')
               }
               if(verifyPhoneNum(phonenumInput)==0) {
                phonenum.addClass('error')
                phonenum.parent().next('.tip-error').html('手机号格式错误').addClass('color')
               }
               if(verifyPhoneNum(phonenumInput)==1){
                phonenum.parent().next('.tip-error').html('')
               }
        })
        //所在单位
        company.blur(function(){
            companyTrue=0;
            var companyInput= $(this).val().trim();
            if(!companyInput){
                company.addClass('error');
                company.parents('.row').next('.tip-error').html('所在单位不能为空').addClass('color')
            }
            else{
                company.removeClass('error');
                company.parents('.row').next('.tip-error').html('');
                companyTrue=1;
            }

        })
        //选择省
        province.change(function(){
            areaTrue=0;
            province.removeClass('error')
            var provinceVal = province.val().trim()
            var orgInput= org.val().trim();
            if(!provinceVal){
             province.addClass('error')
             province.parents('.row').next('.tip-error').html('省不能为空').addClass('color')
            }
            if(provinceVal){
                province.removeClass('error')
                province.parents('.row').next('.tip-error').html('')
            }
            if(provinceVal && orgInput){
                org.removeClass('error')
                province.removeClass('error')
                org.parents('.row').next('.tip-error').html('')
                areaTrue=1;
            }
         })
        //组织单位
        org.blur(function(){
            areaTrue=0;
            var orgInput= $(this).val().trim();
            var provinceVal = province.val().trim()
            if(!orgInput && !provinceVal){
                org.addClass('error')
                province.addClass('error')
                org.parents('.row').next('.tip-error').html('省和组织单位不能为空').addClass('color')
            }
            else if(!orgInput){
                org.addClass('error')
                org.parents('.row').next('.tip-error').html('省和组织单位不能为空').addClass('color')
            }
            else if(!provinceVal){
                province.addClass('error')
                province.parents('.row').next('.tip-error').html('省和组织单位不能为空').addClass('color')
            }
            else{
                org.removeClass('error')
                province.removeClass('error')
                org.parents('.row').next('.tip-error').html('')
                areaTrue=1;
            }
        })
       //点击完成注册
       rbtn.click(function(){
           var usernameInput = username.val().trim(),
               pswInput = psw.val().trim(),
               repswInput = repsw.val().trim(),
               emailInput = email.val().trim(),
               phonenumInput = phonenum.val().trim(),
               companyInput = company.val().trim(),
               provinceVal = province.val().trim(),
               cityInput = city.val().trim(),
               areaInput =area.val().trim(),
               orgInput = org.val().trim();
               console.log(verifyUserName(usernameInput),verifyPsw(pswInput),pswequal,verifyEmail(emailInput),verifyPhoneNum(phonenumInput),areaTrue,companyTrue)
            if(verifyUserName(usernameInput)==1 && verifyPsw(pswInput)==1 && pswequal==1 && verifyEmail(emailInput)==1 && verifyPhoneNum(phonenumInput)==1 && areaTrue==1 && companyTrue==1){
                $('.r-btn').addClass('r-unclick').removeClass('r-btn')
                var formData={
                    "username":usernameInput,
                    "email":emailInput,
                    "password":pswInput,
                    "telephone":phonenumInput,
                    "unit":companyInput,
                    "organization":orgInput,
                    "province": provinceVal,
                    "city":cityInput,
                    "county":areaInput
                }
                console.log(formData);
                $.ajax({
                        type: "post",
                        url: addr+"/api/user/",
                        data: formData,
                        dataType: "json",
                        //contentType:"application/json",
                        success: function (response) {
                            //console.log(response.username)
                            window.location.href = '/users/login_by_cnki/csjs/'; 
                            $('.r-unclick').addClass('r-btn').removeClass('r-unclick')                            
                            
                        },
                        error: function(error) {
                            //请求出错处理
                            console.log(error)
                            console.log(error.responseJSON);
                            console.log(error.status);
                            console.log(error.responseJSON.username);
                            console.log(error.responseJSON.telephone);
                            if(error.status=='400'){
                                if(error.responseJSON.username){
                                username.addClass('error')
                                username.parent().next('.tip-error').html(error.responseJSON.username).addClass('color')                                
                                }
                                if(error.responseJSON.telephone){   
                                phonenum.addClass('error')
                                phonenum.parent().next('.tip-error').html(error.responseJSON.telephone).addClass('color')  
                                }
                                $('.r-unclick').addClass('r-btn').removeClass('r-unclick')
                            }
                        }
                    });
                    
                     
            }
            else{
                if(!usernameInput){
                    username.addClass('error')
                    username.parent().next('.tip-error').html('用户名不能为空').addClass('color')
                }
                if(!pswInput){
                    psw.addClass('error')
                    psw.parent().next('.tip-error').html('密码不能为空').addClass('color')
                }
                if(!repswInput){
                    repsw.addClass('error')
                    repsw.parent().next('.tip-error').html('确认密码不能为空').addClass('color')
                }
                if(!emailInput){
                    email.addClass('error')
                    email.parent().next('.tip-error').html('邮箱不能为空').addClass('color')
                }
                if(!phonenumInput){
                    phonenum.addClass('error')
                    phonenum.parent().next('.tip-error').html('手机号不能为空').addClass('color')
                }
                if(!provinceVal){
                    province.addClass('error')
                    province.parents('.row').next('.tip-error').html('省和组织单位不能为空').addClass('color')
                }
                if(!orgInput){
                    org.addClass('error')
                    org.parents('.row').next('.tip-error').html('省和组织单位不能为空').addClass('color')
                }
            }

       }) 

})