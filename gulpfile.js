var gulp = require('gulp');
var path = require('path');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require("gulp-rename");
var jade = require('gulp-jade');

var config = {
  md: './markdowns',
  jade: './jades',
  sass: './sass',
  tmp: './.tmp',
  page: './pages',
  css: './stylesheets'
};

gulp.task('markdown', function(){
  return gulp.src(path.join(config.md,'**/*.md'))
    .pipe(gulp.dest(path.join(config.tmp)));
});

gulp.task('jade', function(){
  gulp.src(path.join(config.jade,'**/*.jade'))
  .pipe(jade())
  .pipe(gulp.dest(path.join(config.page)));

  return gulp.src(path.join('index.jade'))
    .pipe(jade())
    .pipe(gulp.dest(path.join('./')));
});

gulp.task('sass', function(){
  var stream =  gulp.src(path.join(config.sass,'style.scss'))
    .pipe(sass({style: 'compressed'}).on('error', sass.logError))
    .pipe(minifyCss())
    .pipe(rename({extname:'.min.css'}))
    .pipe(gulp.dest(path.join(config.css)));
});

gulp.task('default',['sass','markdown','jade'], function(){
  // gulp.start('markdown');
});