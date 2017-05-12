require(['config'],function () {
    require(['jquery','lazyload','side_cart'],function () {
        $(function () {
            //加载头部和尾部
            $('header').load('../../src/html/head.html .head');
            $('footer').load('../../src/html/foot.html .foot');
            $('sidebar').load('../../src/html/side_cart.html .side_cart');
            
            //图片进行懒加载
            $("img.lazy").lazyload({
                effect: "fadeIn",
                threshold :20
            });
            
        })
    })
});