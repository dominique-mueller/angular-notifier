'use strict';

const del = require( 'del' );
const gulp = require( 'gulp' );

/**
 * Gulp task: Put files & folders to be released into the 'dist' folder
 */
gulp.task( 'env:dist', () => {

	return gulp
		.src( [
			'build/library-bundles/**/*',
			'build/library-es2015/**/*.d.ts',
			'build/library-es2015/**/*.metadata.json',
			'build/library-styles/**/*'
		] )
		.pipe( gulp.dest( 'dist' ) );

} );
