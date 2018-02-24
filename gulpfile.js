const gulp = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');

function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}

gulp.task('sass', (() => gulp.src('./src/scss/**/*.scss')
  .pipe(sass.sync().on('error', sass.logError))
  .pipe(gulp.dest('./dist/css'))));

gulp.task('sass:watch', (() => {
  gulp.watch('./src/scss/**/*.scss', ['sass']);
}));

// ACHTUNG: Experimental
gulp.task('babel', (() => gulp.src('./src/js/**/*.js')
  .pipe(babel({
    presets: ['env', 'react'],
  }))
  .on('error', handleError)
  .pipe(gulp.dest('./dist/js'))));

gulp.task('babel:watch', (() => {
  gulp.watch('./src/js/**/*.js', ['babel']);
}));
