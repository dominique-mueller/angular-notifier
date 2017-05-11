'use strict';

const gulp = require( 'gulp' );

/**
 * Gulp task: Copy files changed by the automatic-release process
 */
gulp.task( 'env:release', () => {

	return gulp
		.src( [

			// Changed files
			'package.json',
			'CHANGELOG.md'

		] )
		.pipe( gulp.dest( 'dist' ) );

} );
