module.exports = function() {
  $.gulp.task('favicon:generate', function() {
    return $.gulp.src('./src/static/img/favicon.svg')
      .pipe($.glp.favicons({
        // appName: null,
        // appDescription: null,
        // developerName: null,
        // developerURL: null,
        background: "#fff",
        // dir: "auto",
        // lang: "en-US",
        path: "static/i/general/favicons/",
        url: "/dist/",
        // display: "standalone",
        // orientation: "any",
        // start_url: "/?homescreen=1",
        // version: "1.0",
        // logging: false,
        // online: false,
        // preferOnline: false,
        html: "./favicon.html",
        pipeHTML: true,
        replace: true,
        icons: {
          android: false,
          appleIcon: false,
          appleStartup: false,
          coast: false,
          favicons: true,
          firefox: false,
          windows: false,
          yandex: false
        }
      }))
      .on('error', $.glp.notify.onError(function(error) {
        return {
          title: 'Favicon',
          message: error.message
        };
      }))
      .pipe($.gulp.dest('./dist/static/i/general/favicons/'))
  });

  $.gulp.task('favicon:inject', function() {
    return $.gulp.src('./dist/*.html')
      .pipe($.inject($.gulp.src(['./dist/static/i/general/favicons/favicon.html']), {
        starttag: '<!-- inject:head:{{ext}} -->',
        transform: function(filePath, file) {
          return file.contents.toString('utf8'); // return file contents as string
        }
      }))
      .pipe($.gulp.dest('./dist/'));
  });

  $.gulp.task('favicon:clean', function() {
    return $.del(['./dist/static/i/general/favicons/favicon.html']);
  });
};