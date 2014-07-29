var gulp = require('gulp'),
  bower = require('bower'),
  eslint = require('gulp-eslint'),
  assemble = require('gulp-assemble'),
  connect = require('gulp-connect'),
  less = require('gulp-less'),
  path = require('path'),
  rimraf = require('rimraf'),
  runSequence = require('run-sequence'),
  gutil = require('gulp-util'),
  csslint = require('gulp-csslint');


var option = {
  assemble: {
    partials: 'src/templates/partials/*.hbs',
    layoutdir: 'src/templates/layouts/',
    data: 'src/data/*.yml'
  }
};


gulp.task('rm', function (cb) {
  rimraf('./_gh_pages', cb);
});


gulp.task('setup', function () {
  bower.commands.install().on('end', function () {
    gulp.src([
      './bower_components/jquery/dist/jquery.min.js',
      './bower_components/jquery/dist/jquery.min.map',
      './bower_components/jquery/dist/jquery.js',
      './bower_components/html5shiv/dist/html5shiv.js'
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

gulp.task('eslint', function () {
  gulp.src(['./*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(connect.reload());
});

gulp.task('csslint', function () {
  gulp.src(['_gh_pages/css/*.css'])
    .pipe(csslint())
    .pipe(csslint.reporter());
});

gulp.task('assemble', function () {
  gulp.src('src/pages/*.hbs')
    .pipe(assemble(option.assemble))
    .pipe(gulp.dest('_gh_pages'))
    .pipe(connect.reload());
});

gulp.task('less', function () {
  gulp.src('src/less/**/*.less')
    .pipe(less({
      paths: [path.join(__dirname, 'less', 'includes')],
      compress: (gutil.env.type === 'production')
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
  gulp.watch(['./src/**/*.hbs', './src/data/*.yml'], ['assemble']);
  gulp.watch(['./src/less/**/*.less'], ['less']);
  gulp.watch(['./*.js'], ['eslint']);
  gulp.watch(['./gh_pages/css/*.css'], ['csslint']);
});


gulp.task('default', ['lint', 'compile']);
gulp.task('lint', ['eslint', 'csslint']);
gulp.task('ci', ['lint', 'compile']);
gulp.task('serve', ['compile', 'connect', 'watch']);

