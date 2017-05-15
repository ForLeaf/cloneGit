;(function($){
	$.fn.xqcarousel = function(obj){
		var options = {
			width:810,
			height:320,
			index:0,
			duration:3000,
			buttons:true,
			smallPictures:true,
			autoCarousel:true,
			carouselType:'show'
		};

		this.each(function(idx,ele){
			var $self = $(ele);
			var opt = $.extend(true,{},options,obj);

			//无缝
			opt.imgs.push(opt.imgs[0]);

			//定义变量
			var $ul,$sIList;

			init();

			function init(){
				
				//设置样式
				$self.addClass('carousel');
				$self.css({width:opt.width,height:opt.height});
				$ul = $('<ul/>');

				

				$ul.html(opt.imgs.map(function(item){
					return `<li><img src="${item}"></li>`;
				}))
				$self.append($ul);

				 //设置li的height值
				 $li = $ul.children('li');
				 $li.css({height:opt.height,width:opt.width});

				//根据buttons smallPictures 生成节点
				if(opt.buttons){
					//console.log('true')
					var $prev = $('<div/>');
					$prev.addClass('prev');
					$prev.html('&lt;')

					var $next = $('<div/>');
					$next.addClass('next');
					$next.html('&gt;')

					$self.append($prev);
					$self.append($next);

					//按钮前进 后退
					$self.on('click','.prev',function(){
						opt.index--;
						showPic();
					})
					$self.on('click','.next',function(){
						opt.index++;
						showPic();
					})
				}

				if(opt.smallPictures){
					var $smallimglist = $('<div/>');
					$smallimglist.addClass('smallimglist');
					$sIList = $('<ul/>');

					//填充
					opt.imgs.unshift(opt.imgs[opt.imgs.length-2]);
					opt.imgs.unshift(opt.imgs[opt.imgs.length-3]);
					opt.imgs.push(opt.imgs[3]);
					opt.imgs.push(opt.imgs[4]);

					$sIList.html(opt.imgs.map(function(item){
						return `<li><img src="${item}"></li>`;
					}))

					$smallimglist.append($sIList);
					$self.after($smallimglist);

					//计算ul的width
					width = opt.imgs.length * 162;
					$sIList.css('width',width);
					//console.log($sIList.css('width'))
					
					//初始化样式
					$sIList.find('img').eq(opt.index + 2).css('opacity',1);
					//console.log(opt.imgs)
					//移除填充
					opt.imgs.shift();
					opt.imgs.shift();
					opt.imgs.pop();
					opt.imgs.pop();
					//console.log(opt.imgs)
				}

				//根据carouselType 改变li
				if(opt.carouselType === 'fade'){
					$ul.css('height',opt.height);
					//console.log($li);
					$li.eq(0).css('opacity',1);
					$li.addClass('fade');
				}else if(opt.carouselType === 'horizontal'){
					$ul.children('li').addClass('horizontal');
					$ul.css('width',opt.imgs.length*opt.width);
				}

				if(opt.autoCarousel){
					//轮播
					$self.timer = setInterval(function(){
						opt.index++;
						showPic();
					},opt.duration);
					//mouseover时停止
					$self.on('mouseover',function(){
						//event.stopPropagation();
						clearInterval($self.timer);
					})

					//mouseout时开始
					$self.on('mouseout',function(){
						$self.timer = setInterval(function(){
							opt.index++;
							showPic();
						},opt.duration);
					})
				}
			
				
			}

			function showPic(){
				if(opt.index > opt.imgs.length-1){
					opt.index = 1;

					if(opt.carouselType === 'vertial'){
						$ul.css('top',0);
					}else if(opt.carouselType === 'horizontal'){
						$ul.css('left',0);
					}

					if(opt.smallPictures){
						$sIList.css('left',0);
					}
				}else if(opt.index < 0){
					opt.index = opt.imgs.length-2;

					if(opt.carouselType === 'vertial'){
						$ul.css('top',-opt.height*(opt.imgs.length-1));
					}else if(opt.carouselType === 'horizontal'){
						$ul.css('left',-opt.width*(opt.imgs.length-1));
					}

					if(opt.smallPictures){
						$sIList.css('left',-162*(opt.imgs.length-1));
					}
				}
				

				if(opt.smallPictures){
					//smallimglist动画
					$sIList.animate({left:-162 * opt.index})

					//改变smallimglist透明度
					
					$sIList.find('img').each(function(idx,ele){
						$(ele).css('opacity',0.6);
					})
					$sIList.find('img').eq(opt.index + 2).css('opacity',1);
				}
				

				
				
				//根据不同的carouselType 生成不同的animate
				if(opt.carouselType === 'vertial'){
					$ul.stop().animate({top:-opt.index*opt.height});

				}else if(opt.carouselType === 'horizontal'){
					$ul.stop().animate({left:-opt.index*opt.width});

				}else if(opt.carouselType === 'fade'){
					$li.each(function(idx,ele){
						$(ele).stop().animate({opacity:0});
					})
					$li.eq(opt.index).stop().animate({opacity:1});

				}else{
					//console.log(opt.index)
					$ul.css('top',-opt.index*opt.height);
				}
			}
		})
		return this;
	}
})(jQuery);