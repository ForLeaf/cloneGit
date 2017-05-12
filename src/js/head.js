require(['config'],function(){
    // 这里不能保证jquery,gdszoom,common的加载顺序
    require(['jquery','lazyload'],function($){
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
                console.log(777);
                var timeout = setTimeout(function() {
                    $("img.lazy").trigger("sporty")
                }, 1000);
            })
            
            //
        });
    });
});


