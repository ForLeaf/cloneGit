require(['config'],function(){
    // 这里不能保证jquery,gdszoom,common的加载顺序
    require(['jquery'],function($){
        $(function(){
            
            //加载尾部
            $('.foot').load('../../src/html/foot.html .bottomlist');
            //设置变量

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

            //手机验证 倒计时函数
            function countDown() {
                var i = 60;
                var timer = setInterval(function () {
                    --i;
                    $(this).html(i);
                    $(this).off('click');
                    if($(this).html() == 0){
                        clearInterval(timer);
                        $(this).html('获取验证码');
                        $(this).click(countDown);
                    }
                }.bind(this),100);
            }
            //点击手机验证 倒计时
            $('.noteCode').click(countDown);
    
    
            var check1,check2,check3,check4;
            //事件委托
            $('.login_form')[0].addEventListener('blur',function(e){
                e = e || window.event;
                var tar = e.target || e.srcElement;
    
                var $next = $(tar).parents('.login_form_text').next('.login_form_msg');
                
               
                
                //手机号码验证
                if(tar===$('#username')[0]){
                    var reg = /^1[34578]\d{9}$/g;
                    var istrue = reg.test($(tar).val());
                    if(istrue){
                        $.post('../../src/php/checkTel.php',{
                            elephone : $(tar).val()
                        },function(response){
                            var $obj = eval('(' + response + ')');
                            if(!$obj.state){
                                $next.html('对不起，用户名已经存在!');
                                $next.css('color','#f00');
                                check1 = false;
                            }else{
                                $next.html('该手机号能使用');
                                $next.css('color','#0f0');
                                check1 = true;
                            }
                        });
                    }else {
                        $next.html('请输入正确的手机号码');
                        $next.css('color','#f00');
                        check1 = false;
                    }
                }
    
                //验证验证码
                if(tar === $('#yanzhengma')[0]){
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
                    if($(tar).val() == ''){
                        $next.html('请输入验证码');
                        $next.css('color','#f00');
                        check2 = false;
                    }else if($(tar).val() == sum) {
                        $next.html('验证码输入正确');
                        $next.css('color','#0f0');
                        check2 = true;
                    }else {
                        $next.html('验证码输入不正确');
                        $next.css('color','#f00');
                        check2 = false;
                    }
                }
                
                //密码验证
                if(tar === $('#pwd1')[0]){
                    var reg = /^[\S]{6,20}$/i;
                    
                    var res = reg.test($(tar).val());
                    
                    if(res){
                        $next.html('密码符合要求');
                        $next.css('color','#0f0');
                        check3 = true;
                    }else{
                        $next.html('密码长度只能在6-20位字符之间');
                        $next.css('color','#f00');
                        check3 = false;
                    }
                }
                
                //验证密码是否一致
                if(tar === $('#pwd2')[0]){
                    if($(tar).val() === $('#pwd1').val()){
                        $next.html('两次密码一致');
                        $next.css('color','#0f0');
                        check4 = true;
                    }else {
                        $next.html('两次密码不一致');
                        $next.css('color','#f00');
                        check4 = false;
                    }
                }
                
            },true);

            // ajax发送post到register.php
            $('#sub').click(function(){
                if(check1==check2==check3==check4==true){
                    $.post('../../src/php/register.php',{
                        elephone: $('#username').val(),
                        password: $('#pwd1').val(),
                    }, function(response){
                        var $obj = eval('(' + response + ')');
                        if($obj.state){
                            window.location.href = '../../src/index.html';
                        } else {
                            alert($obj.message);
                        }
                    })
                }
                
            })
        })
    });
});