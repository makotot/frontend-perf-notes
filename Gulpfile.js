var gulp = require('gulp'),
  bower = require('bower'),
  eslint = require('gulp-eslint'),
  assemble = require('gulp-assemble'),
  connect = require('gulp-connect'),
  less = require('gulp-less'),
  path = require('path'),
  rimraf = require('rimraf'),
  runSequence = require('run-sequence');

var option = {
  assemble: {
    partials: 'src/templates/partials/*.hbs',
    layoutdir: 'src/templates/layouts/'
  }
};


gulp.task('rm', function (cb) {
  rimraf('./_gh_pages', cb);
});


gulp.task('setup', function () {
  bower.commands.install().on('end', function () {
    gulp.src([
      './bower_components/jquery/dist/jquery.min.js'
    ])
    .pipe(gulp.dest('_gh_pages/js/lib'));

    gulp.src([
      './bower_components/normalize-css/normalize.css'
    ])
    .pipe(gulp.dest('_gh_pages/css/lib'));
  });
});


gulp.task('connect', function () {
  connect.server({
    root: '_gh_pages',
    livereload: true
  });
});

gulp.task('lint', function () {
  return gulp.src(['./*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(connect.reload());
});

gulp.task('assemble', function () {
  return gulp.src('src/pages/*.hbs')
    .pipe(assemble(option.assemble))
    .pipe(gulp.dest('_gh_pages'))
    .pipe(connect.reload());
});

gulp.task('less', function () {
  return gulp.src('src/less/**/*.less')
    .pipe(less({
      paths: [path.join(__dirname, 'less', 'includes')]
    }))
    .pipe(gulp.dest('_gh_pages/css/'))
    .pipe(connect.reload());
});

gulp.task('compile', function (cb) {
  runSequence(
    'rm',
    'setup',
    'assemble',
    'less',
    cb
  );
});

gulp.task('watch', function () {
  gulp.watch(['./src/**/*.hbs'], ['assemble']);
  gulp.watch(['./*.js'], ['lint']);
  gulp.watch(['./src/less/**/*.less'], ['less']);
});


gulp.task('default', ['lint', 'compile']);
gulp.task('ci', ['lint', 'compile']);
gulp.task('serve', ['compile', 'connect', 'watch']);

