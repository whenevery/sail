var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    minifycss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    del = require('del'),
    rev = require('gulp-rev'),
    revCollector = require('gulp-rev-collector'),
    less = require('gulp-less');


/**
 * 清除
 */
gulp.task('clean', function(cb) {
    console.log('clean start');
    return del(['*.zip','public','views','rev'], cb);
});
gulp.task('less',['clean'], function(cb) {
    console.log('less start');
    gulp.src('./build/less/*.less').pipe(less()).pipe(gulp.dest('./build/css')).on('end', cb); //编译less
});
/*
* 合并JS
* 减少请求次数
* */
gulp.task('concatJs',['less'], function(cb) {
    console.log('concatJs start');
    var concatData = require('./concat');
    concatData.forEach(function(o , i){
        if(i == concatData.length - 1){
            gulp.src(o.src).pipe(concat(o.concatName)).pipe(gulp.dest(o.destPath)).on('end' , cb);;
        }else{
            gulp.src(o.src).pipe(concat(o.concatName)).pipe(gulp.dest(o.destPath));
        }
    });
});

/**
 * 上线编译任务
 */
gulp.task('images',['concatJs'],function(cb) {
    console.log('images rev');
    gulp.src('build/images/**')
    .pipe(rev())
    .pipe(gulp.dest('public/images'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('rev/images')).on('end',cb);
});
gulp.task('css',['images'],function(cb) {
    console.log('css rev');
    gulp.src(['rev/**/*.json', 'build/css/**/*.css'])
    .pipe(revCollector({
        replaceReved: true,
        dirReplacements: {
            'images/': 'images/'
        }
    }))
    .pipe(gulp.dest('rev/css'))
    .pipe(rev())
    .pipe(gulp.dest('public/css'))
    .pipe(minifycss())
    .pipe(gulp.dest('public/css'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('rev/css')).on('end',cb);
});
gulp.task('js',['css'],function(cb) {
    console.log('js rev');
    gulp.src(['rev/**/*.json', 'build/js/**/*.js'])
    .pipe(revCollector({
        replaceReved: true,
        dirReplacements: {
            'images/': 'images/',
            'css/': 'css/'
        }
    }))
    .pipe(gulp.dest('rev/js'))
    .pipe(rev())
    .pipe(gulp.dest('public/js'))
    .pipe(uglify())
    .pipe(gulp.dest('public/js'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('rev/js')).on('end',cb);
});
gulp.task('rev',['js'],function(cb) {
    console.log('rev');
    gulp.src(['rev/**/*.json', 'build/views/**/*.html'])
    .pipe(revCollector({
        replaceReved: true,
        dirReplacements: {
            'css/': 'css/',
            'js/': 'js/',
            'images/': 'images/'
        }
    }))
    .pipe(gulp.dest('views'))
    .on('end',cb);
});
gulp.task('default',['concatJs'],function() {
    console.log('default end');
});
gulp.task('build',['rev'],function(cb) {
    console.log('build gulp');
    // gulp.src(['./build/images/**']).pipe(gulp.dest('./public/images'));
    // gulp.src(['./build/css/**']).pipe(minifycss()).pipe(gulp.dest('./public/css')); //
    // gulp.src(['./build/js/**']).pipe(uglify()).pipe(gulp.dest('./public/js')); //
    // gulp.src(['./build/views/**']).pipe(gulp.dest('views'));
    gulp.src(['./build/common/**']).pipe(uglify()).pipe(gulp.dest('./public/common')); //
    gulp.src(['./build/enum/**']).pipe(uglify()).pipe(gulp.dest('./public/enum')); //
    gulp.src(['./build/validate/**']).pipe(uglify()).pipe(gulp.dest('./public/validate')); //
    gulp.src(['./build/favicon.ico']).pipe(uglify()).pipe(gulp.dest('./public/favicon.ico')); //
    gulp.src(['./build/upload']).pipe(uglify()).pipe(gulp.dest('./public/upload')); //
    gulp.src(['./build/fonts']).pipe(uglify()).pipe(gulp.dest('./public/fonts')).on('end' , cb); //
});