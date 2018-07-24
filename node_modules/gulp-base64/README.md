gulp-base64
===========

Gulp task for converting all files found within a stylesheet (those within a url( ... ) declaration) into base64-encoded data URI strings.

## Example usage
```js
var gulp = require('gulp');
var base64 = require('./build/gulp-base64');

//basic example
gulp.task('build', function () {
    return gulp.src('./css/*.css')
        .pipe(base64())
        .pipe(concat('main.css'))
        .pipe(gulp.dest('./public/css'));
});
...
//example with options
gulp.task('build', function () {
    return gulp.src('./css/*.css')
        .pipe(base64({
            baseDir: 'public',
            extensions: ['svg', 'png', /\.jpg#datauri$/i],
            exclude:    [/\.server\.(com|net)\/dynamic\//, '--live.jpg'],
            maxImageSize: 8*1024, // bytes
            debug: true
        }))
        .pipe(concat('main.css'))
        .pipe(gulp.dest('./public/css'));
});

```
## Options

  - `baseDir`  (String)  
    If you have absolute image paths in your stylesheet, the path specified
    in this option will be used as the base directory (relative to gulpfile).

  - `extensions`  (Array of `String` or `RegExp`s)  
    Proccess only specified extensions.  
    Strings are matched against file-extension only, while RegExps are tested against the raw URL value.

  - `exclude`  (Array of `String` or `RegExp`s)  
    Skip files with URLs that match these patterns.  
    Unlike with the `extensions` option Strings are sub-string matched against the whole URL value.

  - `maxImageSize` (Number)  
    Maximum filesize in bytes for changing image to base64.

  - `debug` (Boolean)  
    Enable log to console.
