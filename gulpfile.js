var gulp = require('gulp');
var fs = require('fs');
var path = require('path');
// var minifyCss = require('gulp-minify-css');
// var rename = require("gulp-rename");
// var wrap = require('gulp-wrap');
var md_rev = require('./gulp-markdown-rev');
var $ = require('gulp-load-plugins')({});
var pygmentize = require('pygmentize-bundled');

var config = {
    md: './markdowns',
    jade: './jades',
    sass: './sass',
    tmp: './.tmp',
    page: './pages',
    css: './stylesheets'
};

gulp.task('markdown', ['template'], function() {
    return gulp.src(path.join(config.md, '**/*.md'))
        .pipe(md_rev())
        .pipe($.markdown({
            highlight: function(code, lang, callback) {
                pygmentize({ lang: lang, format: 'html' }, code, function(err, result) {
                    callback(err, result.toString());
                });
            },
            pedantic: true,
            gfm: true,
            santize:true,
            smartypants: true
        }))
        .pipe($.wrap({
            src: config.tmp + '/blog.html'
        }))
        .pipe(gulp.dest(path.join(config.page)));
});

gulp.task('template', function() {
    return gulp.src(path.join("./includes/blog.jade")).pipe($.jade()).pipe(gulp.dest(config.tmp));
});

gulp.task('jade', ['markdown'], function() {
    var json = JSON.parse(fs.readFileSync(path.join(config.tmp, 'markdown.index.json')));
    gulp.src(path.join(config.jade, '**/*.jade'))
        .pipe($.data(function(file) {
            return json;
        }))
        .pipe($.jade())
        .pipe(gulp.dest(path.join(config.page)));

    return gulp.src(path.join('index.jade'))
        .pipe($.jade())
        .pipe(gulp.dest(path.join('./')));
});

gulp.task('sass', function() {
    var stream = gulp.src(path.join(config.sass, 'style.scss'))
        .pipe($.sass({ style: 'compressed' }).on('error', $.sass.logError))
        .pipe($.minifyCss())
        .pipe($.rename({ extname: '.min.css' }))
        .pipe(gulp.dest(path.join(config.css)));
});

gulp.task('watch', function() {
    $.watch(['markdowns/*.md', 'markdowns/**/*.md'], function() {
        gulp.run(['markdown']);
    });
    $.watch(['jades/*.jade', 'jades/**/*.jade', 'includes/*.jade'], function() {
        gulp.run(['jade', 'template']);
    });
    $.watch('sass/*.scss', function() {
        gulp.run(['sass']);
    });
})

gulp.task('default', ['sass', 'markdown', 'jade'], function() {
    // gulp.start('markdown');
});