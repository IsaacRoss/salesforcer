(function() {
    "use strict";


    var gulp = require('gulp'),
        jshint = require('gulp-jshint'),
        size = require('gulp-size');


    gulp.task('hint', function () {
        return gulp.src([
            'lib/**/*.js',
            'test/**/*.js',
            './*.js'
        ])
            .pipe(jshint())
            .pipe(jshint.reporter('jshint-stylish'))
            .pipe(size());
    });
})();