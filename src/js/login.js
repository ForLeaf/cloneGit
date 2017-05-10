require(['config'],function(){
    // 这里不能保证jquery,gdszoom,common的加载顺序
    require(['jquery','common'],function(){
        console.log('首页')
    });
});