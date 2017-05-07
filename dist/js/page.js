//购物车
(function($){
	console.log('购物车');
	$('#box').html('购物车');

	function show(name,age){
		console.log(name,age);
	}

	show();
})(jQuery)
//公共模块
//
//定义一个标准模块
//定义的模块可以在require方法的回掉函数中调用
//什么时候需要定义成模块
//* 希望利用requirejs加载，并且需要在回掉函数中使用
//* 公共方法
//* 多次使用的功能

/*
	定义模块
	* 添加依赖
 */
define(['jquery'],function($){
	// 在此处安全使用$符号
	return {
		getCss : function(attr){
			console.log(666);

			return $('h1').css(attr);
		},
		randomColor : function(){  },
		randomNum:function(){}
	}
});
/*require.config({
	// baseUrl:'lib'//data-main文件所在的文件夹
	paths : {
        "jquery": "../lib/jquery-3.1.1",
        "gdszoom":"../lib/jquery-gdszoom/jquery.gdszoom"
    }
})

//首页

// 利用require引用其他js
// js/
// js/lib/jquery-3.1.1
require(['jquery','common','list'],function($,com){
	console.log($);
	console.log(com);
	com.randomNum();
	console.log('home.js')
});*/


// baseUrl:js/
// * 不添加后缀名
// * 不使用绝对路径
require(['config'],function(){
	// 这里不能保证jquery,gdszoom,common的加载顺序
	require(['jquery','common'],function(){
		console.log('首页')
	});
});



//列表
console.log('list');

/*require(['config'],function(){
	require(['jquery'],function($){

	});
});*/
require(['config'],function(){
	require(['jquery','common'],function(jq,com,gds){
		console.log(jq,com,gds);
		console.log(com.getCss('font-size'));
	});
});


