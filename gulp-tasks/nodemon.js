module.exports = function (gulp, plugins, paths) {
	return function () {
		plugins.livereload.listen();

		plugins.nodemon({
		    script: 'index.js'
		  , ext: ''
		  , ignore: 'app'
		  , env: { 'NODE_ENV': 'development' }
		})
		.on('restart', function(){
			// when the app has restarted, run livereload.
			setTimeout(function() {
				gulp.src('index.js').pipe(plugins.livereload());
			}, 2000);
		});
		setTimeout(function() {
			gulp.src('').pipe(plugins.open({uri: 'http://localhost:' + 5000}));
		}, 2000);
	};
};
