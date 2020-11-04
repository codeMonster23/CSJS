jQuery||require("jquery")
$(function(){
    var addr='http://10.170.128.150:8005';
        //addr=window.location.host;
    var name = $('#name'),        
        phonenum = $('#phonenum'),
        company = $('#company'),
        province = $('#province'),
        city = $('.city'),
        area = $('.area'),
        org = $('#org'),
        rbtn = $('.r-btn'),
        userId= $('#userId').val()
        nameTrue = 0,
        companyTrue = 0,
        areaTrue=0;       
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
        //姓名
        name.blur(function(){
            nameTrue=0;
            var nameInput= $(this).val().trim();
            if(!nameInput){
                name.addClass('error');
                name.parents('.row').next('.tip-error').html('姓名不能为空').addClass('color')
            }
            else{
                name.removeClass('error');
                name.parents('.row').next('.tip-error').html('');
                nameTrue=1;
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
       //点击完成信息
       rbtn.click(function(){
           var nameInput =name.val().trim(),              
               phonenumInput = phonenum.val().trim(),
               companyInput = company.val().trim(),
               provinceVal = province.val().trim(),
               cityInput = city.val().trim(),
               areaInput =area.val().trim(),
               orgInput = org.val().trim();
               console.log(nameTrue,verifyPhoneNum(phonenumInput),areaTrue,companyTrue)
            if(nameTrue==1 && verifyPhoneNum(phonenumInput)==1 && areaTrue==1 && companyTrue==1){
                var formData={
                    "nickname":nameInput,                   
                    "telephone":phonenumInput,
                    "unit":companyInput,
                    "organization":orgInput,
                    "province": provinceVal,
                    "city":cityInput,
                    "county":areaInput
                }
                console.log(formData);
                $.ajax({
                        type: "put",
                        url: addr+"/api/complate/"+userId+"/",
                        data: formData,
                        dataType: "json",
                        headers:{ "X-CSRFtoken":$.cookie("csrftoken")},
                        // $.cookie('name')
                        // xhrFields: {withCredentials: true},
                        // beforeSend: function (xhr) {xhr.withCredentials = true},
                        //contentType:"application/json",
                        success: function (response) {
                            console.log(response)                                
                            
                            window.location.href = addr+'/exam'; 
                        },
                        error: function(error) {
                            //请求出错处理
                            console.log(error);
                            console.log(error.status);
                            console.log(error.responseJSON.telephone);
                            if(error.responseJSON.telephone){   
                                phonenum.addClass('error')
                                phonenum.parent().next('.tip-error').html(error.responseJSON.telephone).addClass('color')  
                                }
                        }
                    });
                    
                     
            }
            else{
                if(!nameInput){
                    name.addClass('error')
                    name.parent().next('.tip-error').html('姓名不能为空').addClass('color')
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