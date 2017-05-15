require(['config'],function(){
    // 这里不能保证jquery,gdszoom,common的加载顺序
    require(['jquery','common'],function($,com){
        $(function () {
            //加载尾部
            $('.foot').load('../../src/html/foot.html .bottomlist');

            //点击切换页面
            $('.erwei_btn').click(function(){
                $('.main_login').css('display','none');
                $('.main_login_shadow').css('display','block');
            });
            $('.pc_btn').click(function () {
                $('.main_login_shadow').css('display','none');
                $('.main_login').css('display','block');
            });

            //初始化
            var $errorMsg = $('.login_error_msg');
            var left = window.innerWidth/2 - $errorMsg.outerWidth()/2;
            var top = window.innerHeight/2 - $errorMsg.outerHeight()/2;
            $errorMsg.css({left:left,top:top});

            //生成随机验证码
            //验证码的cal方法
            var cal,randomNum1,randomNum2;

            //初始化验证码
            $('.cal').html(createVerCode());

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
            $('.cal').click(function(){
                var res = createVerCode();
                $(this).html(res);

            });

            //验证用户名是否符合格式
            $('#username').on('blur',function () {
                var $next = $(this).parents('.same_name_text').next('.same_name_msg');
                var reg = /^1[34578]\d{9}$/g;
                var istrue = reg.test($(this).val());
                if(!istrue){
                    $next.html('请输入手机号');
                    $next.css('color','#f00');
                }else{
                    $next.html('');
                }
            });
            //登录
            $('.sub').click(function(){
                var sum;
                switch(cal){
                    case '+':
                        sum = randomNum1 + randomNum2;
                        break;
                    case '-':
                        sum = randomNum1 - randomNum2;
                        break;
                    case '*':
                        sum = randomNum1 * randomNum2;
                }
                if($('.res').val() == sum) {
                    $.post('../../src/php/login.php',{
                        elephone: $('#username').val(),
                        password: $('#pwd').val()
                    }, function(response){
                        var $obj = eval('(' + response + ')');
                        if($obj.state){
                            $errorMsg.css('display','block');
                            $errorMsg.html('登陆成功');
                            console.log(666);
                            //生成cookie
                            var uName = $('#username').val();
                            com.setCookie('login',uName);

                            setTimeout(function () {
                                $errorMsg.css('display','none');
                                window.location.href = 'http://localhost/git/src/index.html';
                            },2000);
                        } else {
                            $errorMsg.html('用户名/密码不正确');
                            $errorMsg.css('display','block');
                            setTimeout(function () {
                                $errorMsg.css('display','none');
                            },2000);
                        }
                    })
                }else if($('.res').val() == ''){
                    $errorMsg.html('请输入验证码');
                    $errorMsg.css('display','block');
                    setTimeout(function () {
                        $errorMsg.css('display','none');
                    },2000);
                }else{
                    $errorMsg.html('验证码不正确');
                    $errorMsg.css('display','block');
                    setTimeout(function () {
                        $errorMsg.css('display','none');
                    },2000);
                }

            });
        })

    });
});