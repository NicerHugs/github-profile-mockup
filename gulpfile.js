var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    express     = require('express'),
    app         = express();


gulp.task('css', function() {
  return gulp.src('app/styles/*.scss')
    .pipe(
      sass( {
        includePaths: ['app/styles'],
        errLogToConsole: true
      } ) )
    .pipe( gulp.dest('dist/styles') )
});

gulp.task('express', function() {
  app.use(express.static(__dirname + './dist'));
  app.listen(1337);
  console.log('Listening on port: 1337');
});

gulp.task('watch', function () {
  gulp.watch('app/styles/*.scss',['css']);
});

gulp.task('default', ['css','express','watch']);
