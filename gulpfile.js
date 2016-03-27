'use strict';

const path = require('path');
const gulp = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const autoprefixer = require('gulp-autoprefixer');
const nodemon = require('gulp-nodemon');
const browserSync = require('browser-sync');
const Eyeglass = require("eyeglass").Eyeglass;

let rootDir = __dirname;
let assetsDir = path.join(rootDir, "node_modules");

let options = {
	enableImportOnce: false,
	outputStyle: 'compressed'
};

let eyeglass = new Eyeglass(options, sass);

eyeglass.assets.addSource(assetsDir);

gulp.task('sass', () => {
	gulp.src('./public/stylesheets/**/*.scss')
		.pipe(sass(eyeglass.sassOptions()).on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(gulp.dest('./public/stylesheets/'))
		.pipe(browserSync.stream());
});

gulp.task('serve', ['nodemon'], () => {
	browserSync.init(null, {
		proxy: 'http://localhost:3000',
		files: ['public/**/*.*', 'views/*.*'],
		browser: 'firefox',
		port: 9000
	});

	gulp.watch('./public/stylesheets/**/*.scss', ['sass']);
	gulp.watch('./public/javascripts/*.js', ['babel']);
	gulp.watch(['./views/**/*.ejs', './public/javascripts/min/*.js'])
		.on('change', browserSync.reload);
});

gulp.task('babel', () => {
	gulp.src('public/javascripts/*.js')
		.pipe(babel({
			presets: ['es2015']
		}))
		// .pipe(uglify())
		.pipe(gulp.dest('./public/javascripts/min'));
});

gulp.task('nodemon', (cb) => {
	let started = false;

	return nodemon({
		script: './bin/www'
	}).on('start', () => {
		if(!started) {
			cb();
			started = true;
		}
	});
});

gulp.task('default', ['serve'], () => {
	return false;
});
