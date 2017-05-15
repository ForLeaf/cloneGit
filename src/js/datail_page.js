require(['config'],function () {
    require(['jquery', 'side_cart', 'head'],function () {

    //加载头部和尾部
    $('header').load('../../src/html/head.html .head');
    $('footer').load('../../src/html/foot.html .foot');
    $('sidebar').load('../../src/html/side_cart.html .side_cart');

        require(['common', 'lazyload', 'jqfly'], function (com) {
            $(function () {


                //图片进行懒加载
                $("img.lazy").lazyload({
                    effect: "fadeIn",
                    threshold: -300
                });


                // 保存购物车所有商品信息
                // 获取原cookie中的值
                var carlist = com.getCookie('carlist');
                var qtysum = 0;
                carlist = carlist ? JSON.parse(carlist) : [];
    
                var login = com.getCookie('login');
                login = login ? login : null;

                $('.goods_right').on('click', '.goods_btn', function () {
                    //飞入效果
                    var offset = $('#end').offset();
                    console.log(offset);
                    var $img = $(this).parents('li').find('img');
                    var flyer = $img.clone().addClass("u-flyer");

                    flyer.fly({
                        start: {
                            left: event.clientX,
                            top: event.clientY

                        },
                        end: {
                            left: offset.left,
                            top: offset.top - window.scrollY,
                            width: 20,
                            height: 20
                        },
                        //动画结束后调用函数，清除飞入的图片
                        onEnd: function () {
                            flyer.remove();
                            //   	// 刷新页面
                            // location.reload();
                        }
                    });


                    $currentLi = $(this).parents('li');

                    var guid = $currentLi.attr('data-guid');
                    var goods_img = $currentLi.find('.goods_img').prop('src');
                    var goods_price = $currentLi.find('.goods_price').html();
                    var goods_til = $currentLi.find('.goods_til').html();

                    // cookie中是否存在当前商品
                    var hasGoods = false;
                    for (var i = 0; i < carlist.length; i++) {
                        if (carlist[i].guid === guid) {
                            hasGoods = true;

                            // 如果当前商品已经存在cookie中，则商品数量+1
                            carlist[i].qty++;
                            break;
                        }
                    }

                    if (!hasGoods) {

                        var goods = {
                            guid: guid,
                            name: goods_til,
                            price: goods_price,
                            imgurl: goods_img,
                            qty: 1
                        };

                        // 把当前商品信息写入carlist
                        carlist.push(goods);
                    }

                    com.setCookie('carlist', JSON.stringify(carlist));


                    // 2）把cookie中的商品信息写入#carList
                    var qtysum = 0;
                    var mokuai = carlist.map(function (item) {
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
                    //
                    $('#end').find('.num').html(qtysum);
                    $('.shopping_car').find('.num').html(qtysum);
    
                    for(var i = 0; i < carlist.length; i++){
                        $.post('../php/goodsList.php',{
                            elephone : login,
                            guid : carlist[i].guid,
                            imgurl : carlist[i].imgurl,
                            goodsname : carlist[i].name,
                            price : carlist[i].price,
                            qty : carlist[i].qty
                        }, function(response){
                            var $obj = eval('(' + response + ')');
                            if($obj.state){
                                console.log($obj.state);
                            } else {
                                console.log($obj.message);
                            }
                        })
                    }


                });
                $('.goods_datail').click(function () {
                    window.location.href = 'list_page.html';
                })
            })
        })
    })
});