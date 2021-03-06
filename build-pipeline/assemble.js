var gulp = require('gulp');
var assemble = require('gulp-assemble');
var browserSync = require('browser-sync');
var prettify = require('gulp-prettify');
var gulpif = require('gulp-if');

var config = require('./_config');

var options = {
  layout:    'default.hbs',
  partials:  'app/templates/partials/*.hbs',
  layoutdir: 'app/templates/layouts/',
  data:      'app/data/*.json',
  helpers:   ['build-pipeline/_helpers/helper-*.js']
};

// add some middleware to run when the files are loaded
// var middleware = require('./_middleware/assemble');
// assemble.instance.onLoad(/\.*/, middleware(assemble));

gulp.task('assemble', function () {
  gulp.src('app/templates/pages/*.hbs')
    .pipe(assemble(options))
    // .pipe(htmlmin())

    .pipe(gulpif(config.isProduction, prettify({indent_size: 2})))

    .pipe(gulp.dest('app/'));
});

gulp.task('assemble-watch', ['assemble'], function() {
  gulp.watch("app/templates/**/*.hbs", ['assemble', browserSync.reload]);
});
