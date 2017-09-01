const gulp = require('gulp')
const concat = require('gulp-concat')
const uglify = require('gulp-uglify')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const cssmin = require('gulp-cssmin')
const rename = require('gulp-rename')
const sourceMap = require('gulp-sourcemaps')
const htmlReplace = require('gulp-html-replace')
const del = require('del')
const browerSync = require('browser-sync').create()


gulp.task('concat-script', () => {
	return gulp.src('assets/js/*.js')
	.pipe(sourceMap.init())
	.pipe(concat('app.js'))
	.pipe(sourceMap.write('/'))
	.pipe(gulp.dest('assets/js'))
	.pipe(browerSync.stream())
})

gulp.task('ug-script', ['concat-script'], () => {
	return gulp.src('assets/js/*.js')
	.pipe(uglify())
	.pipe(rename('app.min.js'))
	.pipe(gulp.dest('dist/assets/js'))
})

gulp.task('comp-sass', () => {
	return gulp.src('assets/css/*.scss')
	.pipe(sourceMap.init())
	.pipe(sass())
	.pipe(autoprefixer())
	.pipe(sourceMap.write('/'))
	.pipe(gulp.dest('assets/css'))
	.pipe(browerSync.stream())
})

gulp.task('ug-css', ['comp-sass'], () => {
	return gulp.src('assets/css/*.css')
	.pipe(cssmin())
	.pipe(rename('app.min.css'))
	.pipe('dist/assets/css')
})

gulp.task('b-sync', () => {
	browerSync.init({
		server: {
			baseDir: '/'
		}
	})
})

gulp.task('clean', () => {
	del('dist')
})

gulp.task('watchfile', () => {
	gulp.watch('assets/css/*.scss', ['comp-sass'])
	gulp.watch('assets/css/*.js', ['concat-script'])
})

gulp.task('serve', ['watchfile'], () => {
	browerSync.init({
		server: {
			basDir: './'
		}
	})
	gulp.watch('*.html', browerSync.reload)
	gulp.watch('assets/css/*.scss', ['comp-sass'])
})

gulp.task('rn-src', () => {
	return gulp.src('*.html')
	.pipe(htmlReplace({
		'js' : 'assets/js/app.min.js',
		'css':  'assets/css/app.min.css',
	}))
})

gulp.task('build', ['ug-script', 'ug-css'], () => {
	return gulp.src([
		'*.html',
		'assets/img/*',
		'assets/video/*',
		'assets/fonts/*'
	], { base: './'})
	.pipe(gulp.dest('dist'))
})

gulp.task('default', ['clean', 'build'], () => {
	return gulp.start('rn-source')
})