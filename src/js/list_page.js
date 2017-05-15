require(['config'],function () {
    require(['jquery','side_cart','head'],function () {
        //加载头部和尾部
        $('header').load('../../src/html/head.html .head');
        $('footer').load('../../src/html/foot.html .foot');
        $('sidebar').load('../../src/html/side_cart.html .side_cart');

        require(['common','lazyload','gdszoom','jqfly'],function (com) {
            $(function () {




                //图片进行懒加载
                $("img.lazy").lazyload({
                    effect: "fadeIn",
                    threshold :20
                });

                //放大镜显示位置
                $('.zoom').gdszoom({
                    position:'right'
                });
                //点击小图切换图片
                $('.small-list').on('click','img',function() {
                    event.preventDefault();
                    $('.zoom img').attr({
                        src: this.src,
                        'data-big': $(this).attr('data-big')
                    });
                })

                var qtysum = 0;
                $('#addCart').click(function(){

                    //飞入效果
                    var offset = $('#end').offset();
                    console.log(offset);
                    var flyer = $('.zoom img').clone().addClass("u-flyer");

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
                        onEnd: function(){
                            flyer.remove();
                            //   	// 刷新页面
                            // location.reload();
                        }
                    });


                    //生成cookie
                    //1)
                    var carlist = com.getCookie('carlist');
                    carlist = carlist ? JSON.parse(carlist) : [];
                    var login = com.getCookie('login');
                    login = login ? login : null;
                   

                    var guid = $('.data_mid').attr('data-guid');
                    var goods_img = $('.currentimg').attr('src');
                    var goods_price = $('#salePrice').html();
                    var goods_til = $('.goods_til').html();
                    console.log(guid,goods_img,goods_price,goods_til);

                    // cookie中是否存在当前商品
                    var hasGoods = false;
                    for(var i=0;i<carlist.length;i++){
                        if(carlist[i].guid === guid){
                            hasGoods = true;

                            // 如果当前商品已经存在cookie中，则商品数量+1
                            carlist[i].qty += parseInt($('#buyNum').val());
                            break;
                        }
                    }

                    if(!hasGoods){

                        var goods = {
                            guid:guid,
                            name:goods_til,
                            price:goods_price,
                            imgurl:goods_img,
                            qty:1
                        };

                        // 把当前商品信息写入carlist
                        carlist.push(goods);
                    }

                    com.setCookie('carlist',JSON.stringify(carlist));


                    // 2）把cookie中的商品信息写入#carList
                    var qtysum = 0;

                    var mokuai = carlist.map(function(item){
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
    
    
                //点击改变样式
                $('.patter').click(function () {
                    $(this).css('border-color','#f00');
                });
                $('.ptattr').click(function () {
                    $(this).css('border-color','#f00');
                    $(this).siblings().css('border-color','#ccc');
                })



                //点击增加
                $('.ptnr').on('click','span',function () {
                    if(this.className == 'add'){
                        var num = parseInt($('#buyNum').val());
                        $('#buyNum').val(++num);
                    }
                    if(this.className == 'cut'){
                        var num = parseInt($('#buyNum').val());
                        $('#buyNum').val(--num);
                    }
                })
            })
        })
    })
});