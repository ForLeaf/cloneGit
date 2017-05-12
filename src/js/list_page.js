require(['config'],function () {
    require(['jquery','lazyload'],function(){
        $(function () {
            //懒加载
            $('img.lazy').lazyload(function () {
            
            })
        })
    });
});