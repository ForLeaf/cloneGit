require(['config'],function () {
    require(['jquery','head','side_cart'],function(){
        //加载模块
        $('header').load('html/head.html .head');
        $('footer').load('html/foot.html .foot');
        $('sidebar').load('html/side_cart.html .side_cart');

        require(['slideshow','lazyload'],function () {
            $(function () {


                //图片进行懒加载
                $("img.lazy").lazyload({
                    effect: "fadeIn",
                    threshold :10
                });

                //轮播图
                $('.ban_img').xqcarousel({

                    imgs:['img/index/banner01.jpg','img/index/banner02.jpg','img/index/banner03.jpg'],
                    width:990,
                    height:460,
                    buttons:true,
                    smallPictures:false,
                    autoCarousel:true,
                    carouselType:'fade'
                });

                //设置倒数计时
                var odate = new Date('2017/5/16 10:21:50');
                console.log(odate);

                var countDown = function(){

                    var ndate = new Date();
                    var difTime = (odate.getTime() - ndate.getTime())/1000;

                    var hour = Math.floor(difTime/60/60)%24;
                    var min = Math.floor(difTime/60)%60;
                    var sec = parseInt(difTime)%60;

                    if(hour < 10){
                        hour = '0' + hour;
                    }
                    if(min < 10){
                        min = '0' + min;
                    }
                    if(sec < 10){
                        sec = '0' + sec;
                    }
                    $('.hour').html(hour);
                    $('.min').html(min);
                    $('.sec').html(sec);

                    if(difTime <= 0){
                        clearInterval(timer);
                        $('.til').html('本场结束');
                    }
                };
                timer = setInterval(countDown,1000);

                //进行阴影操作


                    $('.mmrx').on('mouseenter',function () {
                        var xDirection = '', yDirection = '';
                        var $this = $(this).find('.bw_img');
                        var shadow = $this.siblings('.shadow');
                        var offset = $this.offset();
                        var top = offset.top - window.scrollY;
                        var left = offset.left - window.scrollX;
                        var width = $this.outerWidth();
                        var height = $this.outerHeight();
                        var cx = event.clientX;
                        var cy = event.clientY;



                        //判断鼠标位置
                        if(cy < top + 5 && cx < left + width && cx > left){
                            yDirection = 'top';
                        }
                        if(cy > top + height - 5 && cx < left + width && cx > left){
                            yDirection = 'bottom';
                        }
                        if(cx > left + 5 && cy > top && cy < top + height){
                            xDirection = 'right';
                        }
                        if(cx < left + width - 5 && cy >top && cy < top + height){
                            xDirection = 'left';
                        }
                        console.log($(this),shadow,yDirection,xDirection,cx,cy,width,height,offset);
                        //根据yDirection 和 xDirection 改变shadow
                        if(yDirection == 'top'){
                            $(shadow).css({
                                left : 0,
                                top : -height
                            });
                            $(shadow).stop().animate({top:0});
                            return;
                        }
                        if(yDirection == 'bottom'){
                            $(shadow).css({
                                left : 0,
                                top : height
                            });
                            $(shadow).stop().animate({top:0});
                            return;
                        }
                        if(xDirection == 'left'){
                            $(shadow).css({
                                left : -width,
                                top : 0
                            });
                            $(shadow).stop().animate({left:0});
                            return;
                        }
                        if(xDirection == 'right'){
                            $(shadow).css({
                                left : width,
                                top : 0
                            });
                            $(shadow).stop().animate({left:0});
                            return;
                        }

                    })

                    $('.mmrx').on('mouseleave',function () {
                        var xDirection = '', yDirection = '';
                        var $this = $(this).find('.bw_img');

                        var shadow = $this.siblings('.shadow');
                        var offset = $this.offset();
                        var top = offset.top - window.scrollY;
                        var left = offset.left - window.scrollX;
                        var width = $this.outerWidth();
                        var height = $this.outerHeight();
                        var cx = event.clientX;
                        var cy = event.clientY;



                        //判断鼠标位置
                        if(cy <= top  && cx < left + width && cx > left){
                            yDirection = 'top';
                        }
                        if(cy >= top + height  && cx < left + width && cx > left){
                            yDirection = 'bottom';
                        }
                        if(cx >= left  && cy > top && cy < top + height){
                            xDirection = 'right';
                        }
                        if(cx <= left + width  && cy >top && cy < top + height){
                            xDirection = 'left';
                        }

                        //根据yDirection 和 xDirection 改变shadow
                        if(yDirection == 'top'){
                            $(shadow).stop().animate({top:-height});
                            return;
                        }
                        if(yDirection == 'bottom'){
                            $(shadow).stop().animate({top:height});
                            return;
                        }
                        if(xDirection == 'left'){
                            $(shadow).stop().animate({left:-width});
                            return;
                        }
                        if(xDirection == 'right'){
                            $(shadow).stop().animate({left:width});
                            return;
                        }
                    })

                //判断鼠标位置

            });
        });
   }) ;
});