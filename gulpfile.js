const gulp = require('gulp');
const del = require('del');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const gulpIf = require('gulp-if');
const gcmq = require('gulp-group-css-media-queries');
const less = require('gulp-less');
const browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const webpHTML = require('gulp-webp-html');
const webpCss = require('gulp-webp-css');
const ttf2woff = require('gulp-ttf2woff');
const  ttf2woff2 = require('gulp-ttf2woff2');
const fonter = require('gulp-fonter');


let isMap = process.argv.includes('--map');
let isMinify = process.argv.includes('--clean');
let isSync = process.argv.includes('--sync');

function clean(){
	return del('./build/*');
}

function html(){
	return gulp.src('./src/**/*.html')
				// silense
				.pipe(webpHTML())
				.pipe(gulp.dest('./build'))
				.pipe(gulpIf(isSync, browserSync.stream()));
}

function styles(){
	return gulp.src('./src/css/main.less')
				.pipe(gulpIf(isMap, sourcemaps.init()))
				.pipe(less())
				//.pipe(gcmq())
				.pipe(gulpIf(isMinify, cleanCSS({
					level: 2
				})))
				.pipe(gulpIf(isMap, sourcemaps.write()))
				.pipe(webpCss(['.jpg','.jpeg']))
				.pipe(gulp.dest('./build/css'))
				.pipe(gulpIf(isSync, browserSync.stream()));
}

function images(){
	return gulp.src('./src/img/**/*')
			.pipe(imagemin([
					imagemin.gifsicle({interlaced: true}),
					imagemin.mozjpeg({quality: 75, progressive: true}),
					imagemin.optipng({optimizationLevel: 5}),
					imagemin.svgo({
							plugins: [
									{removeViewBox: true},
									{cleanupIDs: false}
							]
					})
			]))
			.pipe(gulp.dest('./build/img'));							
}
function imagesToWebp(){
	return gulp.src('./src/img/**/*')
			.pipe(webp({
				quality: 70
			}))
			.pipe(gulp.dest('./build/img'));
		}
		
function fonts(){
	gulp.src('./src/fonts/*.ttf')
				.pipe(ttf2woff())
				.pipe(gulp.dest('./build/fonts'));
				return gulp.src('./src/fonts/*.ttf')
				.pipe(ttf2woff2())
				.pipe(gulp.dest('./build/fonts'))
}
function js(){
	return gulp.src('./src/js/*.js')
				.pipe(gulp.dest('./build/js'));
}
function copyCss(){
	return gulp.src('./src/css/*.css')
				.pipe(gulp.dest('./build/css'));
}


function watch(){
	if(isSync){
		browserSync.init({
			server: {
				baseDir: "./build/"
			}
		});
	}

	gulp.watch('./src/css/**/*.less', styles);
	gulp.watch('./src/**/*.html', html);
	gulp.watch('./src/js/**/*.js', js);
	gulp.watch('./src/img/**/*.*', images);
}


let build = gulp.parallel(html, styles, images, imagesToWebp, fonts, js, copyCss);
let buildWithClean = gulp.series(clean, build);
let dev = gulp.series(buildWithClean, watch);

gulp.task('build', buildWithClean);
gulp.task('watch', dev);


gulp.task('otf2ttf', () => {
  return gulp
    .src('./src/fonts/*.otf')
    .pipe(fonter({
        subset: [66,67,68, 69, 70, 71],
        formats: ['ttf']
      }))
    .pipe(gulp.dest('./src/fonts'));
});