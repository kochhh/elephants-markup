global.$ = {
  path: {
    task: require('./gulp/config/tasks.js')
  },
  gulp: require('gulp'),
  del: require('del'),
  fs: require('fs'),
  browserSync: require('browser-sync').create(),
  inject: require('gulp-inject'),
  glp: require('gulp-load-plugins')()
};

$.path.task.forEach(function(taskPath) {
  require(taskPath)();
});

$.gulp.task('dev', $.gulp.series(
  'clean',
  $.gulp.parallel('styles:dev', 'styles-legacy:dev', 'pug', 'libsjs:dev', 'js:dev', 'js:copy', 'svg', 'img:dev', 'fonts', 'svg:copy')
));

$.gulp.task('build', $.gulp.series(
  'clean',
  $.gulp.parallel('styles:build', 'styles-legacy:build', 'pug', 'libsjs:build', 'js:build', 'js:copy', 'svg', 'img:build', 'fonts', 'svg:copy', 'favicon:generate'),
  'favicon:inject',
  'favicon:clean'
));

$.gulp.task('default', $.gulp.series(
  // 'dev',
  'build',
  $.gulp.parallel(
    'watch',
    'serve'
  )
));