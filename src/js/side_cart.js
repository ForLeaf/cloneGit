define(['jquery'],function(){
    $(function(){
        //初始化 .cart .num
        $goodsSum = $('.goods').length;
        $('.right-guide').find('.num').html($goodsSum);
        
        //点击弹出相应的模块
        $('.right-guide').on('click','li',function(){
            var index = $(this).index();
            var $num = $('.right-cont').children();
            var isOpen;
            console.log(this);
            
            //判断点击次数
            if(!this.isOpen){
                this.isOpen = true;
                $(this).siblings().prop('isOpen',false);
                $('.side_cart').stop().animate({right:-3});
            }else{
                $('.side_cart').stop().animate({right:-330});
                $('.right-guide').children('li').prop({isOpen:false});
            }
            
            //打开相应的页面
            $num.each(function (idx,ele) {
                $(ele).css('display','none');
                if(idx == index){
                    $(ele).css('display','block');
                }
            })
        });
        //点击按钮 关闭页面
        $('.closebtn').click(function () {
            $('.side_cart').stop().animate({right:-330});
            $('.right-guide').children('li').prop({isOpen:false});
        });
        
        //myCenter点击事件
        $('.myCenter_logo').click(function () {
            $('.myCenter_main').css('display','none');
            $('.myCenter_main_wx').css('display','block');
        });
        $('.wx_login').click(function () {
            $('.myCenter_main').css('display','block');
            $('.myCenter_main_wx').css('display','none');
        });
        
        //跟新数据函数
        function dataChange() {
            //更改数据
            var discountSum = 0,sum = 0;
            var $checked = $('.goods_check').filter(':checked');
            var num = $checked.length;
            $checked.each(function (idx,ele) {
                var $price = parseInt($(ele).parents('.goods').find('.goods_price').html());
                var $count = parseInt($(ele).parents('.goods').find('.discount').html());
                var $sum = parseInt($(ele).parents('.goods').find('.sum').html());
                //console.log($price,$count,$sum);
                sum =sum + $price*$sum;
                discountSum = discountSum + $count*$sum;
            });
            //console.log(num,discountSum,sum);
            console.log($('.myCart_foot').find('.sum').find('span'));
            $('.myCart_foot').find('.sum').find('span').html(num);
            $('.myCart_foot').find('.discount').find('span').html(discountSum);
            $('.myCart_foot').find('.price').find('span').html(sum);
        }
        
        //myCart 点击事件
        $('.myCart').on('click','.checkall',function(){
            $('.goods_check').prop('checked',$(this).prop('checked'));
            dataChange();
            
        }).on('click','.goods_check',function(){
            var $checked = $('.goods_check').filter(':checked');
            console.log($checked);
            $('.checkall').prop('checked',$checked.length===$('.goods_check').length);
            dataChange();
            
        }).on('click','.goods_closebtn',function(){
            $(this).parents('.goods').remove();

        }).on('click','.account-btn',function () {
        
        })
        
        
    })
});

