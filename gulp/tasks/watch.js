module.exports = function() {
	$.gulp.task('watch', function() {
		$.gulp.watch('./src/pug/**/*.pug', $.gulp.series('pug'));
		$.gulp.watch('./src/static/sass/**/*.scss', $.gulp.series('styles:dev', 'styles-legacy:dev'));
		$.gulp.watch('./src/static/img/svg/*.svg', $.gulp.series('svg'));
		$.gulp.watch('./src/static/js/**/*.js', $.gulp.series('libsjs:dev', 'js:dev', 'js:copy'));
		$.gulp.watch([
			'./src/static/img/general/**/*.{png,jpg,gif}',
			'./src/static/img/content/**/*.{png,jpg,gif}'
		], $.gulp.series('img:dev'));
	});
};