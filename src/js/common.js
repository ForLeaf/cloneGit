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