"use strict";

var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    maps = require('gulp-sourcemaps'),
     del = require('del'),
      bs = require('browser-sync').create(),
cleanCSS = require('gulp-clean-css');

// static server     
gulp.task('browser-sync', function() {
    bs.init({
        server: {
            baseDir: "./src"
        }
    });
});

// concat scripts and create sourcemap
gulp.task("concatScripts", function() {
  return gulp.src([
      'src/js/main.js',
      'src/js/secondary.js'
      ])
    .pipe(maps.init())    
    .pipe(concat('app.js'))
    .pipe(maps.write('./'))
    .pipe(gulp.dest('src/js'));
});

// minify js files
gulp.task("minifyScripts", ["concatScripts"], function() {
	return gulp.src("src/js/app.js")
		.pipe(uglify())
		.pipe(rename('app.min.js'))
		.pipe(gulp.dest('src/js'));
});

// compile sass into css and create sourcemap
gulp.task("compileSass", function() {
  return gulp.src("src/scss/styles.scss")
      .pipe(maps.init())
      .pipe(sass())
      .pipe(maps.write('./'))
      .pipe(gulp.dest('src/css'))
      .pipe(bs.reload({stream: true}));
});

// minify css files after compileSass is done
gulp.task('minify-css', ['compileSass'], function() {
  return gulp.src('src/css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/css'));
});

// watch for file changes
gulp.task("watchFiles", ["browser-sync"], function() {
  gulp.watch(["src/scss/**/*.scss"], ["compileSass"]);
  gulp.watch("src/js/*.js", ["concatScripts"]);
  gulp.watch("src/*.html").on('change', bs.reload);
});

// clean old files created by gulp
gulp.task("clean", function() {
  del(['dist', 'src/scss/.css*', 'src/js/app.*.js*']);
})

// build dist folder for production
gulp.task("build", ['minifyScripts', 'compileSass', 'minify-css'], function() {
  return gulp.src(["src/js/app.min.js", "src/index.html", "src/img/**", "fonts/**"], {base: './'})
      .pipe(gulp.dest('dist'));
});

// serve with live reload for development
gulp.task("serve", ["watchFiles"]);

// tricker the building proces 
gulp.task("default", ["clean"], function() {
  gulp.start("build");                                  // start will not work anymore in gulp 4
});
