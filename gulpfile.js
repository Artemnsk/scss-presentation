var gulp = require('gulp');
var dest = require('gulp-dest');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var stripCssComments = require('gulp-strip-css-comments');
var cssbeautify = require('gulp-cssbeautify');
var argv = require('yargs').argv;
var insert = require('gulp-insert');

gulp.task('default', function () {
  // Code for the default task
});

gulp.task('sass', function () {
	var site = argv.site;
	if (!site) {
		console.log("ERROR:", "You must provide the site parameter.");
		console.log("gulp sass --site SITENAME");
		return false;
	}
	return gulp.src(['./custom/' + site + '/sass/style.scss'])
		.pipe(insert.transform(function(contents, file) {
			return '$sitename: ' + site + ';' + contents;
		}))
		.pipe(sass().on('error', sass.logError))
		.pipe(stripCssComments())
		.pipe(cssbeautify())
		.pipe(rename('style-' + site + '.css'))
		.pipe(gulp.dest('./css'));
});
