'use strict';

const gulp = require( 'gulp' );

/**
 * Gulp task: Put files & folders to be released into the 'dist' folder
 */
gulp.task( 'env:dist', () => {

	return gulp
		.src( [

			// Bundles, typings, sourcemaps
			'build/library-bundles/**/*',
			'build/library-es2015/**/*.d.ts',
			'build/library-es2015/**/*.metadata.json',
			'build/library-styles/**/*',

			// Source SASS files
			'src/lib/**/*.scss',

			// Additional files
			'package.json',
			'README.md',
			'CHANGELOG.md',
			'LICENSE'

		] )
		.pipe( gulp.dest( 'dist' ) );

} );
