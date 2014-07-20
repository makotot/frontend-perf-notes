var gulp = require('gulp'),
  eslint = require('gulp-eslint'),
  assemble = require('gulp-assemble');

var option = {
  assemble: {
    partials: 'src/templates/partials/*.hbs',
    layoutdir: 'src/templates/layouts/'
  }
};

gulp.task('lint', function () {
  gulp.src(['./*.js'])
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('assemble', function () {
  gulp.src('src/pages/*.hbs')
    .pipe(assemble(option.assemble))
    .pipe(gulp.dest('_gh_pages'));
});


gulp.task('default', ['lint', 'assemble']);
