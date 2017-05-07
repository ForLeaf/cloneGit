//引入gulp模块
//commonjs规范引用模块
var gulp = require('gulp');
var sass = require('gulp-sass');

//创建gulp任务
//用来编译sass文件
gulp.task('compileSass',function(){
	//先查找sass文件所在的位置
	gulp.src('src/sass/*.scss')

	//通过pipe 方法引导到gulp的插件中实现编译sass
	.pipe(sass({outputStyle:'compact'}).on('error',sass.logError))

	//把编译后的文件输出
	.pipe(gulp.dest('src/css'));

})

gulp.task('jtSass',function(){
	//监听sass文件 如果有修改 则编译
	gulp.watch('src/sass/*.scss',['compileSass']);

});


//用于js文件压缩
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
gulp.task('compressJS',function(){
	gulp.src('src/js/*.js')

	// 合并
	.pipe(concat('page.js'))

	//输入合并后但未压缩的版本
	.pipe(gulp.dest('dist/js/'))

	//压缩
	.pipe(uglify({
		mangle:false,
		compress:false
	}))

	//重命名
	.pipe(rename({
		suffix:'.min'
	}))

	//输出
	.pipe(gulp.dest('dist/js/'))
})

//同步任务
var browserSync = require('browser-sync');
gulp.task('server',function(){
	browserSync({
		//server: "./src",
		
		//代理服务器
		proxy: 'http://localhost/git/',

		//自定义端口
		port:999,

		//监听文件的修改，自动刷新浏览器
		files:['./src/*.html','./src/css/*.css','./src/html/*.html']
	});
	gulp.watch('src/sass/*.scss',['compileSass']);
});