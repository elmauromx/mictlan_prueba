const gulp = require('gulp');
const babel = require('gulp-babel');
const eslint = require('gulp-eslint');
const runseq = require('run-sequence');
const del = require('del');

const JSON_FILES = ['src/*.json', 'src/**/*.json'];
const BUILD_DIR = 'dist';

gulp.task('clean', () => del([ BUILD_DIR ]));

gulp.task('lint', () =>
  gulp.src('src/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
);

gulp.task('transpiler', ['lint'], () =>
  gulp.src('src/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest(BUILD_DIR))
);

gulp.task('assets', () =>
  gulp.src(JSON_FILES)
    .pipe(gulp.dest(BUILD_DIR))
);

gulp.task('build', () => { runseq('clean', 'assets', 'transpiler') });

gulp.task('default', ['build']);
