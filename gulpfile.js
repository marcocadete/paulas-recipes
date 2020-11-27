const { parallel, src, dest, watch } = require('gulp');
const cleanCSS = require('gulp-clean-css');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');


sass.compiler = require('node-sass');

function javascript(cb) {
    return src('src/js/**/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(dest('static/js'))
    cb();
}

function scss(cb) {
    return src('src/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(dest('static/css'))
    cb();
}

function watchJS(cb) {
    return watch('src/js/**/*.js', javascript)
}

function watchSCSS(cb) {
    return watch('src/scss/**/**.scss', scss)
}

exports.default = parallel(javascript, scss);
exports.watch = parallel(watchJS, watchSCSS);
