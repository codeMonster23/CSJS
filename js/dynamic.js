jQuery||require("jquery")
$(function(){
    tabPage({
        pageMain: '.content ul',
        pageNav: '.pageNav',
        pagePrev: '.prev',
        pageNext: '.next',
        curNum: 10, /*每页显示的条数*/        
        ini: 0/*初始化显示的页面*/
    });
    function tabPage(tabPage) {
        var pageMain = $(tabPage.pageMain);
        /*获取内容列表*/
        var pageNav = $(tabPage.pageNav);
        /*获取分页*/
        var pagePrev = $(tabPage.pagePrev);
        /*上一页*/
        var pageNext = $(tabPage.pageNext);
        /*下一页*/
        var curNum = tabPage.curNum;
        /*每页显示数*/
        var len = Math.ceil(pageMain.find("li").length / curNum);
        $('.total').text(len)
        /*计算总页数*/
        console.log(len);
        var iNum = 0; 
        $('.current').text(iNum+1)       
        /*当前的索引值*/
        $(pageMain).find("li").hide();
            /************首页的显示*********/
        for (var i = 0; i < curNum; i++) {
           $(pageMain).find("li").eq(i).show()
        }
         /*下一页*/
         pageNext.click(function () {
            $(pageMain).find("li").hide();
            if (iNum == len - 1) {
                for (var i = (len - 1) * curNum; i < len * curNum; i++) {
                    $(pageMain).find("li").eq(i).show()
                }
                $('.current').text(iNum+1)
                return false;
            } 
            else {
                
                iNum++;
                $('.current').text(iNum+1)
                for (var i = iNum * curNum; i < (iNum + 1) * curNum; i++) {
                    $(pageMain).find("li").eq(i).show()
                }
            }

        });
         /*上一页*/
         pagePrev.click(function () {
            $(pageMain).find("li").hide();
            if (iNum == 0) {
                for (var i = 0; i < curNum; i++) {
                    $(pageMain).find("li").eq(i).show()
                }
                $('.current').text(iNum+1)
                return false;
            } else {
                iNum--;
                $('.current').text(iNum+1)
                for (var i = iNum * curNum; i < (iNum + 1) * curNum; i++) {
                    $(pageMain).find("li").eq(i).show()
                }
            }
        })

}
})