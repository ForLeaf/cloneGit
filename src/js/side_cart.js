require(['config'],function () {

    require(['common','jquery', 'lazyload'], function (com) {
        /*efine(['jquery'],function($){*/
        $(function () {
            //初始化 .cart .num
            $goodsSum = $('.goods').length;
            $('.right-guide').find('.num').html($goodsSum);

            //点击弹出相应的模块
            $('.right-guide').on('click', 'li', function () {
                var index = $(this).index();
                var $num = $('.right-cont').children();
                var isOpen;
                console.log(this);

                //判断点击次数
                if (!this.isOpen) {
                    this.isOpen = true;
                    $(this).siblings().prop('isOpen', false);
                    $('.side_cart').stop().animate({right: -3});
                } else {
                    $('.side_cart').stop().animate({right: -330});
                    $('.right-guide').children('li').prop({isOpen: false});
                }

                //打开相应的页面
                $num.each(function (idx, ele) {
                    $(ele).css('display', 'none');
                    if (idx == index) {
                        $(ele).css('display', 'block');
                    }
                })
            });
            //点击按钮 关闭页面
            $('.closebtn').click(function () {
                $('.side_cart').stop().animate({right: -330});
                $('.right-guide').children('li').prop({isOpen: false});
            });

            //myCenter点击事件
            $('.myCenter_logo').click(function () {
                $('.myCenter_main').css('display', 'none');
                $('.myCenter_main_wx').css('display', 'block');
            });
            $('.wx_login').click(function () {
                $('.myCenter_main').css('display', 'block');
                $('.myCenter_main_wx').css('display', 'none');
            });

            //跟新数据函数
            function dataChange() {
                //更改数据
                var discountSum = 0, sum = 0;
                var $checked = $('.goods_check').filter(':checked');
                var num = $checked.length;
                $checked.each(function (idx, ele) {
                    var $price = parseInt($(ele).parents('.goods').find('.goods_price').html());
                    var $count = parseInt($(ele).parents('.goods').find('.discount').html());
                    var $sum = parseInt($(ele).parents('.goods').find('.sum').html());
                    //console.log($price,$count,$sum);
                    sum = sum + $price * $sum;
                    discountSum = discountSum + $count * $sum;
                });
                //console.log(num,discountSum,sum);
                console.log($('.myCart_foot').find('.sum').find('span'));
                $('.myCart_foot').find('.sum').find('span').html(num);
                $('.myCart_foot').find('.discount').find('span').html(discountSum);
                $('.myCart_foot').find('.price').find('span').html(sum);
            }

            //myCart 点击事件
            $('.myCart').on('click', '.checkall', function () {
                $('.goods_check').prop('checked', $(this).prop('checked'));
                dataChange();

            }).on('click', '.goods_check', function () {
                var $checked = $('.goods_check').filter(':checked');
                console.log($checked);
                $('.checkall').prop('checked', $checked.length === $('.goods_check').length);
                dataChange();

            }).on('click', '.account-btn', function () {

            })

            
            // 1）获取cookie
            var goodslist = com.getCookie('carlist');
            var qtysum = 0;
            // 把json字符串转换成js对象
            goodslist = goodslist ? JSON.parse(goodslist) : [];
            
            /*var login = com.getCookie('login');
            login = login? login : null;
            
            if(login){
                $.post('http://localhost/git/src/php/getList.php',{
                    elephone : login,
                }, function(response){
                    var $obj = eval('(' + response + ')');
                    if($obj.state){
                    
                    } else {
                        console.log($obj.message);
                    }
                })
            }*/

            // 2）把cookie中的商品信息写入#carList
            var mokuai = goodslist.map(function(item){
                qtysum += Number(item.qty);
                return `<div class="goods" data-guid="${item.guid}">
                    <div class="check">
                    <input type="checkbox" class="goods_check">
                    </div>
                    <div class="goods_img">
                    <img src="${item.imgurl}" alt="">
                    </div>
                    <div class="goods_msg">
                    <p class="goods_tit">${item.name}</p>
                <p class="goods_style">颜色：黑色   尺码：L</p>
                <div class="price_msg">
                    <span class="goods_price">${item.price}</span>
                    <span class="sum">${item.qty}</span>
                    <span class="discount">0.00</span>
                    </div>
                    </div>
                    <span class="goods_closebtn">&times;</span>
                </div>`;
            }).join('');

            $('.cartlist').html(mokuai);
            console.log(qtysum);
            $('#end').find('.num').html(qtysum);


            // 删除单个商品
            // 移除DOM节点
            // 清除cookie中对应的商品信息
            $('.cartlist').on('click','.goods_closebtn',function(){
                console.log(goodslist)
                var $parent = $(this).parents('.goods');
                var num = $parent.attr('data-guid');

                $parent.remove();

                // 清除cookie中对应的商品信息
                for(var i=0;i<goodslist.length;i++){

                    if(goodslist[i].guid == num){
                        goodslist.splice(i,1);
                        break;
                    }
                }
                console.log(num,goodslist)
                // 删除后重写cookie
                com.setCookie('carlist',JSON.stringify(goodslist));
    
                /*var $num = 0;
    
                goodslist.forEach(function (ele) {
                    $num +=ele.qty;
                });
    
                $('.shopping_car').find('.num').html($num);
                $('#end').find('.num').html($num);*/
            })


            //点击回到顶部
            $('.backtop').click(function () {
                var timer = setInterval(function () {
                    // 先获取滚动过的距离
                    var scrollTop = window.scrollY;//2000

                    // 关键：利用滚动过的距离计算速度
                    var speed = Math.ceil(scrollTop/5);

                    // 设置滚动条滚动距离
                    var _scrollTop = scrollTop - speed;

                    console.log(scrollTop,_scrollTop,speed);

                    if(_scrollTop <= 20){
                        clearInterval(timer);
                        _scrollTop = 0;
                    }

                    window.scrollTo(0,_scrollTop);
                },30)

            })
            
        })
    });

});