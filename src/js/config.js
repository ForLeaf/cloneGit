require.config({
    // baseUrl:'lib'//data-main文件所在的文件夹
    paths : {
        //这里的路径基于baseUrl
        "jquery": "../../src/lib/jquery-3.1.1",
        "gdszoom":"../lib/jquery-gdszoom/jquery.gdszoom",
        "slideshow":"../lib/juqey-slideshow/jquery-slideshow",
        "jquery-ui":"../lib/jquery-ui-1.12.1.custom/jquery-ui",
        "lazyload":"../lib/jquery.lazyload.min",
        "jqfly" : "../lib/jquery.fly.min"
    },


    shim:{
        // 表示gdszoom依赖jqueryy
        "gdszoom":["jquery"],
        "slideshow":["jquery"],
        "jquery-ui":["jquery"],
        "lazyload" : ["jquery"],
        "jqfly" : ["jquery"],
        "side_cart" : ["jquery"]
    }
})