var gulp = require('gulp');
var autoprefixer = require('autoprefixer');
var browserify = require('browserify');
var browserSync = require('browser-sync').create();
var buffer = require('vinyl-buffer')
var babelify = require('babelify');
var concat = require('gulp-concat');
var eslint = require('gulp-eslint');
var pug = require('gulp-pug');
var cssnano = require('gulp-cssnano');
var postcss = require('gulp-postcss');
var sass = require('gulp-sass');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

/**
 * Compile .jsx and ES6 with Babelify; bundle with Browserify using CommonJS syntax
 */
gulp.task('js', ['lint'], function () {
  return browserify({entries: 'src/js/app/app.js', extensions: ['.jsx', '.js'], debug: true})
      .transform(babelify)
      .bundle()
      .pipe(source('app.js'))
      .pipe(gulp.dest('static/js'));
});

/**
 * Lint the .jsx files before compiling
 */
gulp.task('lint', function () {
    return gulp.src(['src/js/app/**/*.{js,jsx}'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});

/**
 * Compile .scss files to .css and stream to BrowserSync
 */
var supportedBrowsers = [
  'last 2 Edge versions', 
  'Explorer >= 10', 
  'last 2 Chrome versions',
  'last 2 Firefox versions',
  'last 2 Safari versions',
  'iOS >= 7',
  'Android >= 4.4',
  'last 2 ChromeAndroid versions'
];

gulp.task('sass', function() {
  return gulp.src('src/scss/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compact' }).on('error', sass.logError))
    .pipe(postcss([ autoprefixer({ browsers: supportedBrowsers }) ]))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('static/css'))
    .pipe(browserSync.stream({match: '**/*.css'}));
});

/**
 * Minify the app.js
 */
gulp.task('compress-js', ['lint'], function() {
  process.env.NODE_ENV = 'production';
  return browserify({entries: 'src/js/app/app.js', extensions: ['.jsx', '.js'], debug: false})
      .transform(babelify)
      .bundle()
      .pipe(source('app.min.js'))
      .pipe(buffer())
      .pipe(uglify())
      .pipe(gulp.dest('static/js'));
});

/**
 * Minify the main.css
 */
gulp.task('compress-css', ['sass'], function() {
  return gulp.src('static/css/main.css')
    .pipe(rename('main.min.css'))
    .pipe(cssnano())
    .pipe(gulp.dest('static/css'));
});

/**
 * Compile the .pug templates
 */
gulp.task('pug', function() {
  return gulp.src('src/pug/*.pug')
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest('static/html'));
});

/**
 * Reload the browser only after the 'js' task is complete
 */
gulp.task('watch-js', ['js'], function() {
  browserSync.reload();
});

/**
 * Reload the browser only after the 'pug' task is complete
 */
gulp.task('watch-pug', ['pug'], function() {
  browserSync.reload();
});

/**
 * Init BrowserSync and watch for changes
 */
gulp.task('serve', ['pug', 'sass', 'js'], function () {

  // Serve files from the static folder
  browserSync.init({
      server: {
          baseDir: 'static',
          index: "html/index.html"
      },
      open: false
  });

  // Watch the .pug files for changes and run 'watch-pug' task
  gulp.watch('src/pug/**/*.pug', ['watch-pug']);

  // Watch the .js files for changes and run 'watch-js' task
  gulp.watch('src/js/app/**/*.{js,jsx}', ['watch-js']);

  // Watch the .scss files for changes and run 'sass' task
  gulp.watch('src/scss/**/*.scss', ['sass']);

});

/**
 * Create minified app.min.js and main.min.css files 
 */
gulp.task('compress', ['compress-js', 'compress-css']);

/**
 * Copy the src files to the static folder
 */
gulp.task('copy-assets', function() {
  gulp.src('src/data/**/*.json')
    .pipe(gulp.dest('static/data/'));  
  gulp.src('src/fonts/**/*.{svg,woff,woff2,eot,ttf}')
    .pipe(gulp.dest('static/fonts/'));  
  gulp.src('src/img/**/*.{svg,png,jpg,gif,ico}')
    .pipe(gulp.dest('static/img/'));
});

/**
 * Build task
 */
gulp.task('build', ['pug', 'sass', 'js', 'copy-assets']);

/**
 * Default task
 */
gulp.task('default', ['serve']);