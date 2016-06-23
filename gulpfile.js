var gulp = require('gulp');
var fs = require('fs');
var path = require('path');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require("gulp-rename");
var jade = require('gulp-jade');
var wrap = require('gulp-wrap');
var markdown = require('gulp-markdown');
var watch = require('gulp-watch');
var md_rev = require('./gulp-markdown-rev');
var data = require('gulp-data');
var $ = require('gulp-load-plugins')({});

var highlight = require('gulp-highlight');
// var highlight = require('highlight');

var config = {
    md: './markdowns',
    jade: './jades',
    sass: './sass',
    tmp: './.tmp',
    page: './pages',
    css: './stylesheets'
};

console.log($.replace);

gulp.task('markdown', ['template'], function() {
    return gulp.src(path.join(config.md, '**/*.md'))
        .pipe(md_rev())
        .pipe(markdown({
            pedantic: true,
            smartypants: true
        }))
        .pipe($.replace('&quot;', '"'))
        .pipe($.replace('&#39;', '"'))
        .pipe($.replace('&gt;', '>'))
        .pipe(wrap({
            src: config.tmp + '/blog.html'
        }))
        .pipe(highlight())
        .pipe(gulp.dest(path.join(config.page)));
});

gulp.task('template', function() {
    return gulp.src(path.join("./includes/blog.jade")).pipe(jade()).pipe(gulp.dest(config.tmp));
});

gulp.task('jade', ['markdown'], function() {
    var json = JSON.parse(fs.readFileSync(path.join(config.tmp, 'markdown.index.json')));
    gulp.src(path.join(config.jade, '**/*.jade'))
        .pipe(data(function(file) {
            return json;
        }))
        .pipe(jade())
        .pipe(gulp.dest(path.join(config.page)));

    return gulp.src(path.join('index.jade'))
        .pipe(jade())
        .pipe(gulp.dest(path.join('./')));
});

gulp.task('sass', function() {
    var stream = gulp.src(path.join(config.sass, 'style.scss'))
        .pipe(sass({ style: 'compressed' }).on('error', sass.logError))
        .pipe(minifyCss())
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest(path.join(config.css)));
});

gulp.task('watch', function() {
    watch(['markdowns/*.md', 'markdowns/**/*.md'], function() {
        gulp.run(['markdown']);
    });
    watch(['jades/*.jade', 'jades/**/*.jade', 'includes/*.jade'], function() {
        gulp.run(['jade', 'template']);
    });
    watch('sass/*.scss', function() {
        gulp.run(['sass']);
    });
})

gulp.task('default', ['sass', 'markdown', 'jade'], function() {
    // gulp.start('markdown');
});