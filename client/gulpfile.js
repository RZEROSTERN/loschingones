var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserify = require('gulp-browserify'),
    browserifyHandlebars = require('browserify-handlebars'),
    browserifyShim = require('browserify-shim');

/* CONFIG */
var src = {
    styles: [
        './src/sass/**/*.scss'
    ],
    js: './src/app/main.js',
    stat: [
        './src/**/*.html'
    ]
};
var dist = {
    root: './www',
    styles: './www/css',
    js: './www/app'
}

/* TASKS */

// Styles
gulp.task('styles', function () {
    return gulp.src(src.styles)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(dist.styles));
});

// Javascript
gulp.task('scripts', function () {
	return gulp.src(src.js)
	.pipe(browserify({
        insertGlobals: true,
        transform: [browserifyHandlebars],
        shim: {
            snapsvg: {
                path: './node_modules/snapsvg/dist/snap.svg-min.js',
                exports: 'Snap'
            }
        }
	}))
	.pipe(gulp.dest(dist.js));
});

// Static
gulp.task('static', function () {
    return gulp.src(src.stat)
    .pipe(gulp.dest(dist.root));
});

gulp.task('build', ['static', 'styles', 'scripts']);

gulp.task('default', ['build']);