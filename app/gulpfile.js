'use strict';

  var gulp          = require('gulp');
  var watch         = require('gulp-watch');
  var plugins       = require('gulp-load-plugins')();

  var paths = {
      clean: {
        files: './dist'
      },
      serve : {
        port: '8000',
        root: './dist'
      },
      fonts: {
        files: './src/assets/fonts/**/*',
        dest: './dist/assets/fonts/',
        watch: ['./src/assets/fonts/**/*']
      },
      vendor: {
        name: 'vendor.min.js',
        dest: './dist/vendor/',
        watch: './bower_components/*'
      },
      templates: {
          files: './src/**/*.jade',
          dest: './dist/',
          watch: './src/**/*.jade'
      },
      styles: {
          files:  './src/styles/*.scss',
          dest: './dist/styles/',
          watch: './src/styles/**/*.scss'
      },
      ressources: {
        files: './src/ressources/*',
        dest: './dist/ressources/',
        watch: './src/ressources/*'
      },
      scripts: {
          files: ['./src/scripts/directives/*.js', './src/scripts/app.js', './src/scripts/services/*.js', './src/scripts/controllers/*.js'],
          dest: './dist/scripts/',
          name: 'app.min.js',
          watch: './src/scripts/**/*.js'
      },
      assets : {
        files: ['./src/assets/imgs/**/*{png,svg,jpg}'],
        dest: './dist/assets/imgs/',
        watch: './src/assets/imgs/**/*',
        clean: './dist/assets/imgs/**/*'
      }
  }
  
  function getTask(task) {
      return require('./gulp-tasks/' + task)(gulp, plugins, paths);
  }

  gulp.task('clean', getTask('clean'));
  gulp.task('serve', getTask('serve'));
  gulp.task('style', getTask('style'));
  gulp.task('assets', getTask('assets'));
  gulp.task('jade', getTask('jade'));
  gulp.task('scripts', getTask('scripts'));
  gulp.task('vendor', getTask('vendor'));
  gulp.task('watch', getTask('watch'));
  gulp.task('test', getTask('test'));
  gulp.task('ressources', getTask('ressources'));


  gulp.task('build-prod', function(cb) {
    plugins.runSequence('clean', 'style', 'jade', 'assets', 'vendor', 'scripts', 'ressources');
  });

  gulp.task('default', ['watch', 'serve']);
  gulp.task('production', ['build-prod']);
