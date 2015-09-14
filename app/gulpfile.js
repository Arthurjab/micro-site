/* ## Dependencies
================================================== */

  var gulp          = require('gulp');
  var sass          = require('gulp-sass');
  var jade          = require('gulp-jade');
  var livereload    = require('gulp-livereload');
  var svgmin        = require('gulp-svgmin');
  var gzip          = require('gulp-gzip');
  var inject        = require('gulp-inject');
  var jsmin         = require('gulp-jsmin');
  var concat        = require('gulp-concat');
  var rename        = require('gulp-rename');
  var rimraf        = require('gulp-rimraf'); 
  var runSequence   = require('gulp-run-sequence'); 
  var minifyCss     = require('gulp-minify-css');
  var imagemin      = require('gulp-imagemin');
  var pngquant      = require('imagemin-pngquant');


/* ## Paths
================================================== */

  var paths = {

      templates: {
          files: './src/*.jade',
          dest: './dist/'     
      },

      styles: {
          src: './src',
          files:  './src/style/*.scss',
          dest: './dist/style/'
      },

      assets : {
        src: './src/assets/*',
        dest: './dist/assets/'
      },

      jsminifier: {
          files: './src/js/*.js',
          dest: './src/js/min/'
      },

      jsconcat : {
        files: './src/js/min/*.js',
        filename: 'c.app.min.js',
        dest: './dist/'
      },

      injections: {
        target: './dist/index.html',
        sources: ['./dist/**/*.js', './dist/**/*.css'],
        dest: './dist'
      }

  }


/* ## displayErrors instead of crash
================================================== */

  var displayError = function(error) {

      var errorString = '[' + error.plugin + ']';
      errorString += ' ' + error.message.replace("\n",''); 

      if(error.fileName)
          errorString += ' in ' + error.fileName;

      if(error.lineNumber)
          errorString += ' on line ' + error.lineNumber;
      console.error(errorString);

  }

/* ## concat
================================================== */

  gulp.task('concat', function() {
    return gulp.src(paths.jsconcat.files)
      .pipe(concat(paths.jsconcat.filename))
      .pipe(gulp.dest(paths.jsconcat.dest));
  });


/* ## js minifier
================================================== */

  gulp.task('js-minify', function () {
      return gulp.src(paths.jsminifier.files)
          .pipe(jsmin())
          .pipe(rename({suffix: '.min'}))
          .pipe(gulp.dest(paths.jsminifier.dest));
  });


/* ## html injector
================================================== */

  gulp.task('injector', function () {
    var target = gulp.src(paths.injections.target);
    var sources = gulp.src(paths.injections.sources, {read: false});
   
    return target.pipe(inject(sources, {relative: true}))
      .pipe(gulp.dest(paths.injections.dest))
      .pipe(livereload());
  });


/* ## cleaner
================================================== */

  gulp.task('clean', function() {
    return gulp.src('./dist/index.html', { read: false })
      .pipe(rimraf({ force: true }));
  });


/* ## Jade template 
================================================== */

  gulp.task('jade', function() {
    var YOUR_LOCALS = {};

    return gulp.src(paths.templates.files)
      .pipe(jade({
        locals: YOUR_LOCALS
      }))
      .on('error', function(err){
          displayError(err);
      })
      .pipe(gulp.dest(paths.templates.dest));

  });


/* ## Sass
================================================== */

  gulp.task('sass', function (){
      return gulp.src(paths.styles.files)
      .pipe(sass())
      .on('error', function(err){
          displayError(err);
      })
      .pipe(gulp.dest(paths.styles.dest));
  });

/* ## SVG Minify
================================================== */

  gulp.task('svgmin', function() {
    return gulp.src('./src/assets/*.svg')
        .pipe(svgmin({
            plugins: [{
                removeDoctype: false
            }, {
                removeComments: false
            }]
        }))
        .pipe(gulp.dest('./dist/assets/'));
  });

/* ## Imagemin
================================================== */

gulp.task('imagemin', function () {
    return gulp.src(paths.assets.src)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(paths.assets.dest));
});


/* ## Watch
================================================== */

  gulp.task('watch', function() { 
    livereload({ start: true });
    livereload.listen();
    gulp.watch(['./src/*.jade','./src/style/**/*.scss', './src/js/*.js'], ['build-dev']);
  });


/* ## Run sequences
================================================== */

  gulp.task('build-dev', function(cb) {
    runSequence('clean', ['sass', 'jade', 'js-minify'], 'concat', 'injector', cb);
  });

  gulp.task('build-prod', function(cb) {
    runSequence('clean', ['sass', 'jade', 'js-minify', 'imagemin'], 'concat', 'injector', cb);
  });

/* ## Options
================================================== */

  gulp.task('default', ['watch']);
  gulp.task('dev'), ['build-dev'];
  gulp.task('production', ['build-prod']);

