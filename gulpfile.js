const gulp = require('gulp')
const sass = require('gulp-sass')
const babel = require('gulp-babel')

gulp.task('sass', (() => elgulp.src('./src/scss/**/*.scss')
  .pipe(sass.sync().on('error', sass.logError))
  .pipe(gulp.dest('./dist/css'))))

gulp.task('sass:watch', (() => {
  gulp.watch('./src/scss/**/*.scss', ['sass'])
}))

gulp.task('babel', (() => gulp.src('./src/js/**/*.js')
  .pipe(babel({
    presets: ['env']
  }))
  .pipe(gulp.dest('./dist/js'))))
