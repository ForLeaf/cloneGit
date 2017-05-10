require(['config'],function(){
    // 这里不能保证jquery,gdszoom,common的加载顺序
    require(['jquery'],function($){
        //加载尾部
        $('.foot').load('../../src/html/foot.html .bottomlist');
        
        //点击切换页面
        $('.erwei_btn').click(function(){
            $('.main_login').css('display','none');
            $('.main_login_shadow').css('display','block');
        })
        $('.pc_btn').click(function () {
            $('.main_login_shadow').css('display','none');
            $('.main_login').css('display','block');
        })
        
        //生成随机验证码
        //验证码的cal方法
        var cal,randomNum1,randomNum2;
    
        //初始化验证码
        $('.verCode').html(createVerCode());
    
        //验证码生成函数
        function  createVerCode() {
            var arr = ['+','-','*'];
            var num = Math.floor(Math.random()*3);
            cal = arr[num];
            randomNum1 = Math.floor(Math.random()*10);
            randomNum2 = Math.floor(Math.random()*10);
            return randomNum1 +' '+ cal +' '+ randomNum2;
        }
    
        //点击获取验证码
        $('.verCode').click(function(){
            var res = createVerCode();
            $(this).html(res);
        
        });
        
        //
    });
});