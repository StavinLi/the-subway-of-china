var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'), // 处理css中浏览器兼容的前缀  
    babel = require("gulp-babel"), //转码
    runSequence = require('gulp-sequence'), //任务顺序'
    cssmin = require('gulp-clean-css'), //压缩css
    jsmin = require('gulp-uglify'), //压缩js
    stripDebug = require('gulp-strip-debug'), //去console.log
    htmlmin = require('gulp-htmlmin'), //压缩html
    base64 = require('gulp-base64'),
    sourcemaps = require('gulp-sourcemaps'), // 来源地图
    rev = require('gulp-rev'),
    revCollector = require('gulp-rev-collector');
gulp.task('css', function() {
    return gulp.src('src/css/*.css')
        .pipe(sourcemaps.init())
        .pipe(autoprefixer({
            browsers: ['last 4 versions'],
        }))
        .pipe(base64({
            extensions: ['jpg', 'png'],
            maxImageSize: 20 * 1024, // bytes 
            debug: true
        }))
        .pipe(cssmin({
            advanced: false, //类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
            compatibility: 'ie8', //保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
            keepBreaks: false, //类型：Boolean 默认：false [是否保留换行]
            keepSpecialComments: '*', //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
            debug: true,
            rebase: false
        }, function(details) {
            console.log(details.name + ': 原始-' + details.stats.originalSize + ',压缩后-' + details.stats.minifiedSize);
        }))
        .pipe(sourcemaps.write('_srcmap'))
        .pipe(rev())
        .pipe(gulp.dest('dest/css'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/css'))
});

gulp.task('js', function() {
    return gulp.src('src/js/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(jsmin({
            mangle: true, //类型：Boolean 默认：true 是否修改变量名
            compress: true //类型：Boolean 默认：true 是否完全压缩
        }))
        .pipe(stripDebug())
        .pipe(sourcemaps.write('_srcmap'))
        .pipe(rev())
        .pipe(gulp.dest('dest/js'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/js'))
});


gulp.task('html', function() {
    return gulp.src(['rev/**/*.json', 'src/*.html'])
        .pipe(revCollector({
            replaceReved: true
        }))
        .pipe(htmlmin({
            removeComments: true, //清除HTML注释
            collapseWhitespace: true, //压缩HTML
            collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input />
            removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
            removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
            removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
            minifyJS: true, //压缩页面JS
            minifyCSS: true //压缩页面CSS
        }))
        .pipe(gulp.dest('dest'));
});

//监控文件变化
gulp.task('watch', function() {
    gulp.watch(["src/css/*.css", "src/js/*.js"], ['default']);
});

gulp.task('default', function(cb) {
    runSequence(['css', 'js'], 'html', 'watch')(cb);
})