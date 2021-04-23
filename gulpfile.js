const gulp = require('gulp');

function html(){
  return gulp.src('src/*.html').pipe(gulp.dest('dist'));
}

function style(){
  return gulp.src('src/*.css').pipe(gulp.dest('dist'));
}

function styles(){
  return gulp.src('src/styles/*.css').pipe(gulp.dest('dist/css'));
}

function scripts(){
  return gulp.src('src/scripts/*.js').pipe(gulp.dest('dist/js'));
}

function script(){
  return gulp.src('src/*.js').pipe(gulp.dest('dist'));
}

function images(){
  return gulp.src('src/images/*').pipe(gulp.dest('dist/images'));
}

exports.default = gulp.parallel(html,styles,scripts,images,script,style);