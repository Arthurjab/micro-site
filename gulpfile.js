'use strict';

  var gulp          = require('gulp');
  var watch         = require('gulp-watch');
  var plugins       = require('gulp-load-plugins')();

  var paths = {
      clean: {
        files: './app/dist'
      },
      serve : {
        port: '8000',
        root: './app/dist'
      },
      fonts: {
        files: './app/src/assets/fonts/**/*',
        dest: './app/dist/assets/fonts/',
        watch: ['./app/src/assets/fonts/**/*']
      },
      vendor: {
        name: 'vendor.min.js',
        dest: './app/dist/vendor/',
        watch: './bower_components/*'
      },
      templates: {
          files: './app/src/**/*.jade',
          dest: './app/dist/',
          watch: './app/src/**/*.jade'
      },
      styles: {
          files:  './app/src/styles/*.scss',
          dest: './app/dist/styles/',
          watch: './app/src/styles/**/*.scss'
      },
      ressources: {
        files: './app/src/ressources/*',
        dest: './app/dist/ressources/',
        watch: './app/src/ressources/*'
      },
      scripts: {
          files: ['./app/src/scripts/directives/*.js', './app/src/scripts/app.js', './app/src/scripts/services/*.js', './app/src/scripts/controllers/*.js'],
          dest: './app/dist/scripts/',
          name: 'app.min.js',
          watch: './app/src/scripts/**/*.js'
      },
      assets : {
        files: ['./app/src/assets/imgs/**/*{png,svg,jpg}'],
        dest: './app/dist/assets/imgs/',
        watch: './app/src/assets/imgs/**/*',
        clean: './app/dist/assets/imgs/**/*'
      }
  }
  
  function getTask(task) {
      return require('./gulp-tasks/' + task)(gulp, plugins, paths);
  }

  gulp.task('clean', getTask('clean'));
  gulp.task('serve', getTask('nodemon'));
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
