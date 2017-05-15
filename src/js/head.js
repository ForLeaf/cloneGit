require(['config'],function(){
    // 这里不能保证jquery,gdszoom,common的加载顺序
    require(['common','jquery','lazyload'],function(com){
        $(function () {
            //懒加载
            $("img.lazy").lazyload({
                // threshold:-400,
                effect:"fadeIn",
                placeholder:'http://localhost/git/src/img/alg-lodding.gif',
                event:'sporty',
                skip_invisible:true
            });
            
            //获取
            $('.select_bar').hover(function () {
                var timeout = setTimeout(function() {
                    $("img.lazy").trigger("sporty")
                }, 1000);
            });

            var cookie = com.getCookie('login');
            if(cookie){
                $('.login').css('display','none');
                $('.register').css('display','none');
                $('#quit').css('display','block');
                $('#user').css('display','block');
                $('#user').html(cookie);
            }
            $('#quit').click(function () {
                com.removeCookie('login');
                $('.login').css('display','block');
                $('.register').css('display','block');
                $('#quit').css('display','none');
                $('#user').css('display','none');
                window.location.reload();
            });


            var carlist = com.getCookie('carlist');
            carlist = carlist? JSON.parse(carlist) : [];
            var $num = 0;

            carlist.forEach(function (ele,idx) {
                $num +=ele.qty;
            });

            $('.shopping_car').find('.num').html($num);

            $('#selectall').on('mouseover',function () {
                console.log(666)
                $('.select_cont').css('display','block');
                $('.select_cont').on('mouseover','li',function () {
                    event.stopPropagation();
                    var $goods = $(this).find('.books');
                    $goods.css('display','block');
                    $goods.stop().animate({opacity:1,top:0});
                    $(this).siblings().find('.books').css('display','none');
                })
            })
            $('.select_cont').on('mouseout','li',function () {
                event.stopPropagation();
                var $goods = $(this).find('.books');
                $goods.stop().animate({opacity:0,top:80},function () {
                    $goods.css('display','none');
                })

            }).on('mouseleave',function () {
                // event.stopPropagation();
               $(this).css('display','none');
            })
            
            window.onscroll = function () {
                if(window.scrollY >= 1100){
                    $('.topline').css('display','block');
                    $('#selectall').attr('id','fixedlist');
                    $('.shopping_car').attr('id','fixedCart');
                    $('.head_sh_up').attr('id','fixedsearch');
                }else if(window.scrollY < 1100){
                    $('.head_sh_up').attr('id','ox');
                    $('.shopping_car').attr('id','ox');
                    $('#fixedlist').attr('id','selectall');
                    $('.topline').css('display','none');
                }

            }
        });
    });
});


